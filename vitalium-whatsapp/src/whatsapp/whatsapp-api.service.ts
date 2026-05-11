import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";

/**
 * Serviço responsável por se comunicar com a API do WhatsApp Cloud (Meta).
 * Envia mensagens de texto usando o endpoint messages da Cloud API.
 */
@Injectable()
export class WhatsappApiService {
  private readonly logger = new Logger(WhatsappApiService.name);

  private readonly accessToken = process.env.WHATSAPP_ACCESS_TOKEN ?? "";
  private readonly phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";
  private readonly apiVersion = process.env.WHATSAPP_API_VERSION ?? "v20.0";

  private get baseUrl(): string {
    return `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}`;
  }

  /**
   * Envia mensagem de texto para um número WhatsApp (formato E.164 sem +).
   */
  async sendTextMessage(to: string, message: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseUrl}/messages`,
        {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to,
          type: "text",
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      this.logger.debug(`Mensagem enviada para ${to}`);
    } catch (error) {
      this.logger.error(`Falha ao enviar mensagem para ${to}`, error);
      throw error;
    }
  }
}
