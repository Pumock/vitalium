import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { IAuthRepository } from '../../../domain/interfaces/repositories/auth/auth.repository.interface';
import { User } from '../../database/models/user.models';
import { PrismaProvider } from '../../database/prisma.provider';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  async findByEmailWithOutPassword(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email, isActive: true },
    });

    if (!user) return null;

    return plainToInstance(User, user);
  }

  async findByIdWithRefreshToken(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, isActive: true },
    });

    if (!user) return null;

    return plainToInstance(User, user);
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
    expiresAt: Date | null,
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken,
        refreshTokenExpiresAt: expiresAt,
        updatedAt: new Date(),
      },
    });
  }
}
