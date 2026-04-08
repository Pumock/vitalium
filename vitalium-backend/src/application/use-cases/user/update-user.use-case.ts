import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../../domain/interfaces/repositories/user/user.repository.interface';
import type { User } from '../../../infrastructure/database/models/user.models';
import type { UpdateUserDTO } from '../../../presentation/dto/userDTO/update-user.dtp';
import { DatabaseException } from '../../../shared/execeptions/system/database.exception';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    try {
      return await this.userRepository.update(id, updateUserDTO);
    } catch (error) {
      throw new DatabaseException('atualizar usuário', error);
    }
  }
}
