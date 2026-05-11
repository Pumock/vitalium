import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IConversationRepository } from '../../../domain/interfaces/repositories/chat/conversation.repository.interface';
import type { IMessageRepository } from '../../../domain/interfaces/repositories/chat/message.repository.interface';
import type { Conversation } from '../../../infrastructure/database/models/conversation.models';

@Injectable()
export class GetConversationUseCase {
  constructor(
    @Inject('IConversationRepository')
    private readonly conversationRepository: IConversationRepository,
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}

  async findById(id: string): Promise<Conversation> {
    const conversation = await this.conversationRepository.findById(id);
    if (!conversation) {
      throw new NotFoundException('Conversa não encontrada');
    }
    return conversation;
  }

  async findMessages(
    conversationId: string,
    page = 1,
    limit = 50,
  ): Promise<{
    messages: unknown[];
    total: number;
    page: number;
    limit: number;
  }> {
    const conversation =
      await this.conversationRepository.findById(conversationId);
    if (!conversation) {
      throw new NotFoundException('Conversa não encontrada');
    }

    const { messages, total } = await this.messageRepository.findByConversation(
      conversationId,
      page,
      limit,
    );

    return { messages, total, page, limit };
  }
}
