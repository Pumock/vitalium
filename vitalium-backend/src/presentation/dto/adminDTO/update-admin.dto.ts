import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { AdminRole } from '../../../shared/enums/admin-role.enum';

export class UpdateAdminDTO {
  @ApiProperty({
    description: 'Tipo de admin',
    enum: AdminRole,
    example: AdminRole.CLINIC_ADMIN,
    required: false,
  })
  @IsOptional()
  @IsEnum(AdminRole)
  role?: AdminRole;

  @ApiProperty({
    description: 'Permissões customizadas (JSON livre)',
    example: { canManageUsers: false },
    required: false,
  })
  @IsOptional()
  permissions?: Record<string, unknown>;

  @ApiProperty({
    description: 'Status do admin',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
