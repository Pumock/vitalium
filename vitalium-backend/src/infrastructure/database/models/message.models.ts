import type { MessageChannel } from '../../../shared/enums/message-channel.enum';
import type { MessageOrigin } from '../../../shared/enums/message-origin.enum';
import type { MessageStatus } from '../../../shared/enums/message-status.enum';

export class Message {
  id: string;
  conversationId: string;
  senderId?: string | null;
  content: string;
  origin: MessageOrigin;
  channel: MessageChannel;
  status: MessageStatus;
  metadata?: Record<string, unknown> | null;
  timestamp: Date;
}
