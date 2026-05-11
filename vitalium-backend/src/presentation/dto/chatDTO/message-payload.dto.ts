/**
 * Payload padronizado para comunicação entre serviços via RabbitMQ.
 * Usado nas filas: whatsapp.incoming, chat.to_ai, chat.from_ai, chat.outgoing
 */
export class MessagePayloadDTO {
  channel: 'WHATSAPP' | 'WEB';
  patientId: string;
  conversationId?: string;
  message: string;
  timestamp: string; // ISO 8601
  origin: 'PATIENT' | 'DOCTOR' | 'AI' | 'SYSTEM';
  metadata?: Record<string, unknown>;
}
