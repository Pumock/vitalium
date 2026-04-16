import type { Admin } from '../../../../infrastructure/database/models/admin.models';
import { CreateAdminDTO } from '../../../../presentation/dto/adminDTO/create-admin.dto';
import { UpdateAdminDTO } from '../../../../presentation/dto/adminDTO/update-admin.dto';

export interface IAdminRepository {
  create(data: CreateAdminDTO): Promise<Admin>;
  findById(id: string): Promise<Admin | null>;
  findByUserId(userId: string): Promise<Admin | null>;
  findAll(): Promise<Admin[]>;
  update(id: string, data: UpdateAdminDTO): Promise<Admin>;
  delete(id: string): Promise<void>;
}
