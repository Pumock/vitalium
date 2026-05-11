import { Injectable, Logger, type OnModuleInit } from "@nestjs/common";
import { RabbitMQService } from "../shared/messaging/rabbitmq.service";
import { QUEUES } from "../shared/messaging/queues";
import { WhatsappApiService } from "./whatsapp-api.service";
import type { MessagePayloadDTO } from "../shared/dto/message-payload.dto";

/**
 * Consumer da fila chat.outgoing.
 * Recebe mensagens do backend destinadas ao paciente via WhatsApp
 * e as entrega usando a WhatsApp Cloud API.
 *
 * Fluxo:
 *   backend → chat.outgoing → WhatsappOutgoingConsumer → WhatsApp Cloud API → paciente
 */
@Injectable()
export class WhatsappOutgoingConsumer implements OnModuleInit {
  private readonly logger = new Logger(WhatsappOutgoingConsumer.name);

  constructor(
    private readonly rabbitmq: RabbitMQService,
    private readonly whatsappApiService: WhatsappApiService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.rabbitmq.consume(QUEUES.CHAT_OUTGOING, this.handle.bind(this));
    this.logger.log(`Consumer registrado: ${QUEUES.CHAT_OUTGOING}`);
  }

  private async handle(raw: unknown): Promise<void> {
    const payload = raw as MessagePayloadDTO;

    this.logger.debug(
      `Enviando resposta ao paciente ${payload.patientId} via WhatsApp`,
    );

    // patientId no payload de outgoing contém o número de telefone do paciente
    await this.whatsappApiService.sendTextMessage(
      payload.patientId,
      payload.message,
    );
  }
}
