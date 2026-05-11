import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import type { Response } from "express";
import { WhatsappIncomingProducer } from "./whatsapp-incoming.producer";
import { WhatsappWebhookDTO } from "./dto/whatsapp-webhook.dto";
import type { MessagePayloadDTO } from "../shared/dto/message-payload.dto";

/**
 * Controller do webhook do WhatsApp (Meta Cloud API).
 *
 * GET  /webhook — verificação do webhook pelo Meta (challenge)
 * POST /webhook — recebimento de mensagens do paciente
 */
@Controller("webhook")
export class WhatsappController {
  private readonly logger = new Logger(WhatsappController.name);

  private readonly verifyToken =
    process.env.WHATSAPP_VERIFY_TOKEN ?? "vitalium_webhook_verify_dev";

  constructor(
    private readonly whatsappIncomingProducer: WhatsappIncomingProducer,
  ) {}

  /**
   * Verificação do webhook pelo Meta.
   * O Meta envia hub.mode, hub.verify_token e hub.challenge.
   * Se o token bater, responde com o challenge para confirmar o endpoint.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  verify(
    @Query("hub.mode") mode: string,
    @Query("hub.verify_token") token: string,
    @Query("hub.challenge") challenge: string,
    @Res() res: Response,
  ): void {
    if (mode === "subscribe" && token === this.verifyToken) {
      this.logger.log("Webhook verificado com sucesso pelo Meta");
      res.status(HttpStatus.OK).send(challenge);
    } else {
      this.logger.warn("Falha na verificação do webhook — token inválido");
      res.status(HttpStatus.FORBIDDEN).send("Forbidden");
    }
  }

  /**
   * Recebe eventos de mensagem do WhatsApp Cloud API.
   * Filtra apenas mensagens de texto e publica na fila whatsapp.incoming.
   * Sempre responde 200 OK para o Meta (mesmo em caso de erro interno).
   */
  @Post()
  @HttpCode(HttpStatus.OK)
  async receive(
    @Body() webhookDTO: WhatsappWebhookDTO,
    @Res() res: Response,
  ): Promise<void> {
    // Meta exige resposta 200 imediata — processamento é assíncrono
    res.status(HttpStatus.OK).send("EVENT_RECEIVED");

    try {
      if (webhookDTO.object !== "whatsapp_business_account") return;

      for (const entry of webhookDTO.entry ?? []) {
        for (const change of entry.changes ?? []) {
          if (change.field !== "messages") continue;

          for (const msg of change.value?.messages ?? []) {
            if (msg.type !== "text" || !msg.text?.body) continue;

            const payload: MessagePayloadDTO = {
              channel: "WHATSAPP",
              patientId: msg.from, // número E.164 — o backend resolve para o ID do paciente
              message: msg.text.body,
              timestamp: new Date(Number(msg.timestamp) * 1000).toISOString(),
              origin: "PATIENT",
              metadata: { whatsappMessageId: msg.id },
            };

            await this.whatsappIncomingProducer.publish(payload);

            this.logger.debug(
              `Mensagem recebida de ${msg.from}: ${msg.text.body.slice(0, 50)}`,
            );
          }
        }
      }
    } catch (error) {
      this.logger.error("Erro ao processar webhook", error);
    }
  }
}
