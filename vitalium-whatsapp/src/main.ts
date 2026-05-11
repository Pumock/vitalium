import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // webhook Meta pode ter campos extras
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3002;
  await app.listen(port);

  logger.log(`Vitalium WhatsApp Gateway rodando na porta ${port}`);
}

bootstrap();
