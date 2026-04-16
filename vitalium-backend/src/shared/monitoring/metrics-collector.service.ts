import { Injectable, Logger } from '@nestjs/common';
import { PrismaProvider } from '../../infrastructure/database/prisma.provider';

@Injectable()
export class MetricsCollectorService {
  private readonly logger = new Logger('Metrics');

  constructor(private readonly prisma: PrismaProvider) {}

  async logError(data: {
    errorType: string;
    errorMessage: string;
    stackTrace?: string;
    userId?: string;
    context?: string;
    metadata?: any;
  }) {
    try {
      await this.prisma.errorLog.create({
        data: {
          errorType: data.errorType,
          errorMessage: data.errorMessage,
          stackTrace: data.stackTrace,
          userId: data.userId || null,
          context: data.context,
          metadata: data.metadata,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to log error to DB: ${error}`);
    }
  }
}
