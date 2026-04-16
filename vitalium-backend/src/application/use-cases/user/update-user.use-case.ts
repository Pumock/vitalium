import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/interfaces/repositories/user/user.repository.interface';
import { UpdateUserDTO } from '../../../presentation/dto/userDTO/update-user.dtp';
import { UserNotFoundException } from '../../../shared/execeptions/user/user-not-found.exception';
import { User } from '../../../infrastructure/database/models/user.models';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(`ID: ${id}`);
    }

    const updatedUser = await this.userRepository.update(id, updateUserDTO);
    return updatedUser;
  }
}
