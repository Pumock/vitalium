import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../../domain/interfaces/repositories/user/user.repository.interface';
import type { User } from '../../../infrastructure/database/models/user.models';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
