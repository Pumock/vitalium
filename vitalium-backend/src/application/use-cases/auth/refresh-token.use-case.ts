import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { IAuthRepository } from '../../../domain/interfaces/repositories/auth/auth.repository.interface';
import type { RefreshTokenResponseDTO } from '../../../presentation/dto/authDTO/response/refresh-token-response.dto';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(refreshToken: string): Promise<RefreshTokenResponseDTO> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não fornecido');
    }

    let decoded: { sub: string; type: string };

    try {
      decoded = await this.jwtService.verifyAsync<{
        sub: string;
        type: string;
      }>(refreshToken);
    } catch {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException('Token não é um refresh token');
    }

    const user = await this.authRepository.findByIdWithRefreshToken(
      decoded.sub,
    );

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuário inativo ou desativado');
    }

    if (
      !user.refreshTokenExpiresAt ||
      new Date(user.refreshTokenExpiresAt) < new Date()
    ) {
      throw new UnauthorizedException('Refresh token expirado');
    }

    const newAccessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      { expiresIn: '60m' },
    );

    return { accessToken: newAccessToken };
  }
}
