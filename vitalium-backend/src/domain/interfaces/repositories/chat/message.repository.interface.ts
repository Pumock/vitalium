import type { Message } from '../../../../infrastructure/database/models/message.models';
import type { SendMessageDTO } from '../../../../presentation/dto/chatDTO/send-message.dto';
import type { MessageStatus } from '../../../../shared/enums/message-status.enum';

export interface IMessageRepository {
  create(dto: SendMessageDTO & { conversationId: string }): Promise<Message>;
  findById(id: string): Promise<Message | null>;
  findByConversation(
    conversationId: string,
    page: number,
    limit: number,
  ): Promise<{ messages: Message[]; total: number }>;
  updateStatus(id: string, status: MessageStatus): Promise<Message>;
}
