import type { Conversation } from '../../../../infrastructure/database/models/conversation.models';
import type { CreateConversationDTO } from '../../../../presentation/dto/chatDTO/create-conversation.dto';
import type { ConversationStatus } from '../../../../shared/enums/conversation-status.enum';

export interface IConversationRepository {
  create(dto: CreateConversationDTO): Promise<Conversation>;
  findById(id: string): Promise<Conversation | null>;
  findByPatientAndDoctor(
    patientId: string,
    doctorId: string,
  ): Promise<Conversation | null>;
  findAllByDoctor(
    doctorId: string,
    status?: ConversationStatus,
  ): Promise<Conversation[]>;
  findAllByPatient(
    patientId: string,
    status?: ConversationStatus,
  ): Promise<Conversation[]>;
  updateStatus(id: string, status: ConversationStatus): Promise<Conversation>;
}
