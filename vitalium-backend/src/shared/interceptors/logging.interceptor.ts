import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  Optional,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingPersistenceService } from '../monitoring/logging-persistence.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  constructor(
    @Optional()
    private readonly loggingPersistence: LoggingPersistenceService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<any>();
    const { method, url, body, headers, ip } = request;

    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    request.requestId = requestId;

    const userAgent = (headers['user-agent'] as string) || '';
    const startTime = Date.now();

    this.logger.log(
      '=============================================================================================================================',
    );
    this.logger.log(
      `📥- Method: ${method} - URL: ${url} - Body: ${body ? JSON.stringify(body) : '{}'}`,
    );
    this.logger.log(
      '=============================================================================================================================',
    );

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse<any>();
          const statusCode: number = response.statusCode;
          const duration = Date.now() - startTime;

          this.logger.log(
            '=============================================================================================================================',
          );
          this.logger.log(
            `📤- Method: ${method} - URL: ${url} - Status: ${statusCode} - Duration: ${duration}ms`,
          );
          this.logger.log(
            '=============================================================================================================================',
          );

          this.loggingPersistence
            ?.saveRequestLog({
              method,
              url,
              statusCode,
              duration,
              ip:
                (headers['x-forwarded-for'] as string)?.split(',')[0].trim() ??
                ip,
              userAgent,
              userId: request.user?.sub,
              requestId,
              requestBody: body,
              headers: {
                'content-type': headers['content-type'] as string,
                'user-agent': userAgent,
              },
            })
            .catch(() => {});
        },
      }),
    );
  }
}
