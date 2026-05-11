export const QUEUES = {
  WHATSAPP_INCOMING: "whatsapp.incoming",
  CHAT_TO_AI: "chat.to_ai",
  CHAT_FROM_AI: "chat.from_ai",
  CHAT_OUTGOING: "chat.outgoing",
} as const;

export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];
