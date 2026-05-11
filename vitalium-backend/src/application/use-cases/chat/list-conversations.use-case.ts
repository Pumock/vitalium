import { Inject, Injectable } from '@nestjs/common';
import type { IConversationRepository } from '../../../domain/interfaces/repositories/chat/conversation.repository.interface';
import type { Conversation } from '../../../infrastructure/database/models/conversation.models';
import { ConversationStatus } from '../../../shared/enums/conversation-status.enum';

@Injectable()
export class ListConversationsUseCase {
  constructor(
    @Inject('IConversationRepository')
    private readonly conversationRepository: IConversationRepository,
  ) {}

  async byDoctor(
    doctorId: string,
    status?: ConversationStatus,
  ): Promise<Conversation[]> {
    return this.conversationRepository.findAllByDoctor(doctorId, status);
  }

  async byPatient(
    patientId: string,
    status?: ConversationStatus,
  ): Promise<Conversation[]> {
    return this.conversationRepository.findAllByPatient(patientId, status);
  }
}
