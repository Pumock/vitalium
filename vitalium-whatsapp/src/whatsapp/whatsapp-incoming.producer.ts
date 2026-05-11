import { Injectable, Logger } from "@nestjs/common";
import { RabbitMQService } from "../shared/messaging/rabbitmq.service";
import { QUEUES } from "../shared/messaging/queues";
import type { MessagePayloadDTO } from "../shared/dto/message-payload.dto";

/**
 * Producer responsável por publicar mensagens recebidas do WhatsApp
 * na fila whatsapp.incoming para processamento pelo backend.
 */
@Injectable()
export class WhatsappIncomingProducer {
  private readonly logger = new Logger(WhatsappIncomingProducer.name);

  constructor(private readonly rabbitmq: RabbitMQService) {}

  async publish(payload: MessagePayloadDTO): Promise<void> {
    this.logger.debug(
      `Publicando em ${QUEUES.WHATSAPP_INCOMING}: from ${payload.patientId}`,
    );
    await this.rabbitmq.publish(QUEUES.WHATSAPP_INCOMING, payload);
  }
}
