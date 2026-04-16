import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import type { Role } from '../../../../shared/enums';

export class AuthUserDTO {
  @ApiProperty({ example: 'cld1234abc' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'joao@exemplo.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'João' })
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Silva' })
  @Expose()
  lastName: string;

  @ApiProperty({
    example: 'PATIENT',
    enum: ['PATIENT', 'DOCTOR', 'NURSE', 'CAREGIVER', 'ADMIN'],
  })
  @Expose()
  role: Role;
}

export class AuthResponseDTO {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refreshToken: string;

  @ApiProperty({ type: AuthUserDTO })
  @Type(() => AuthUserDTO)
  user: AuthUserDTO;
}
