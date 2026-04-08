import { Module } from '@nestjs/common';
import { PrismaModule } from '../infrastructure/database/prisma.module';
import { AdminDashboardController } from '../presentation/controllers/admin/admin-dashboard.controller';
import { GetAdminDashboardUseCase } from '../application/use-cases/admin/get-admin-dashboard.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [AdminDashboardController],
  providers: [GetAdminDashboardUseCase],
})
export class AdminModule {}
