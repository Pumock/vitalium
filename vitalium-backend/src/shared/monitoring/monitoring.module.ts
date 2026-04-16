import { Module } from '@nestjs/common';
import { MetricsCollectorService } from './metrics-collector.service';
import { SystemHealthService } from './system-health.service';
import { LoggingPersistenceService } from './logging-persistence.service';
import { PrismaModule } from '../../infrastructure/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    MetricsCollectorService,
    SystemHealthService,
    LoggingPersistenceService,
  ],
  exports: [
    MetricsCollectorService,
    SystemHealthService,
    LoggingPersistenceService,
  ],
})
export class MonitoringModule {}
