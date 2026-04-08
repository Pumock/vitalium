import { Controller, Get } from '@nestjs/common';
import { GetAdminDashboardUseCase } from '../../../application/use-cases/admin/get-admin-dashboard.use-case';

@Controller('admin/dashboard')
export class AdminDashboardController {
  constructor(
    private readonly getAdminDashboardUseCase: GetAdminDashboardUseCase,
  ) {}

  @Get()
  async getDashboard() {
    return this.getAdminDashboardUseCase.execute();
  }
}
