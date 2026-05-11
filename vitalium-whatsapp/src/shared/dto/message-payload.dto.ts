/**
 * Payload padronizado para comunicação entre serviços via RabbitMQ.
 * Espelha o mesmo contrato do vitalium-backend.
 * Filas: whatsapp.incoming, chat.to_ai, chat.from_ai, chat.outgoing
 */
export class MessagePayloadDTO {
  channel: "WHATSAPP" | "WEB";
  /** No gateway, contém o número de telefone WhatsApp do paciente */
  patientId: string;
  conversationId?: string;
  message: string;
  timestamp: string; // ISO 8601
  origin: "PATIENT" | "DOCTOR" | "AI" | "SYSTEM";
  metadata?: Record<string, unknown>;
}
