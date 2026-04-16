import type { User } from '../../../../infrastructure/database/models/user.models';

export interface IAuthRepository {
  findByEmailWithOutPassword(email: string): Promise<User | null>;
  findByIdWithRefreshToken(id: string): Promise<User | null>;
  updateRefreshToken(
    userId: string,
    refreshToken: string | null,
    expiresAt: Date | null,
  ): Promise<void>;
}
