import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaProvider } from '../../infrastructure/database/prisma.provider';

const SENSITIVE_PATHS = ['/auth/login', '/auth/refresh'];
const SENSITIVE_FIELDS = new Set([
  'password',
  'token',
  'refreshToken',
  'accessToken',
  'secret',
]);

function sanitizeBody(body: unknown): unknown {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return body;
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
    sanitized[key] = SENSITIVE_FIELDS.has(key) ? '[REDACTED]' : value;
  }
  return sanitized;
}

@Injectable()
export class LoggingPersistenceService implements OnModuleInit {
  private readonly logger = new Logger(LoggingPersistenceService.name);

  constructor(private readonly prisma: PrismaProvider) {}

  onModuleInit(): void {
    PrismaProvider.registerDbLogger((data) => {
      this.saveDatabaseLog(data).catch(() => {});
    });
  }

  async saveRequestLog(data: {
    method: string;
    url: string;
    statusCode: number;
    duration: number;
    ip?: string;
    userAgent?: string;
    userId?: string;
    requestId: string;
    requestBody?: unknown;
    headers?: Record<string, string>;
  }): Promise<void> {
    try {
      const isSensitive = SENSITIVE_PATHS.some((p) => data.url.startsWith(p));
      await this.prisma.requestLog.create({
        data: {
          method: data.method,
          url: data.url,
          statusCode: data.statusCode,
          duration: data.duration,
          ip: data.ip ?? null,
          userAgent: data.userAgent ?? null,
          userId: data.userId ?? null,
          requestId: data.requestId,
          requestBody: isSensitive
            ? undefined
            : data.requestBody
              ? (sanitizeBody(data.requestBody) as any)
              : undefined,
          headers: data.headers as any,
        },
      });
    } catch (error) {
      this.logger.warn(`Failed to save request log: ${error}`);
    }
  }

  async saveDatabaseLog(data: {
    operation: string;
    table: string;
    duration: number;
  }): Promise<void> {
    try {
      await this.prisma.databaseLog.create({
        data: {
          operation: data.operation,
          table: data.table,
          duration: data.duration,
          queryType: data.operation,
        },
      });
    } catch (error) {
      this.logger.warn(`Failed to save database log: ${error}`);
    }
  }

  async saveErrorLog(data: {
    errorType: string;
    errorMessage: string;
    stackTrace?: string;
    userId?: string;
    requestId?: string;
    context?: string;
    metadata?: unknown;
  }): Promise<void> {
    try {
      await this.prisma.errorLog.create({
        data: {
          errorType: data.errorType,
          errorMessage: data.errorMessage,
          stackTrace: data.stackTrace ?? null,
          userId: data.userId ?? null,
          requestId: data.requestId ?? null,
          context: data.context ?? null,
          metadata: data.metadata as any,
        },
      });
    } catch (error) {
      this.logger.warn(`Failed to save error log: ${error}`);
    }
  }
}
