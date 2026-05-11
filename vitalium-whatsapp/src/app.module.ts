import { Module } from "@nestjs/common";
import { WhatsappModule } from "./whatsapp/whatsapp.module";
import { HealthController } from "./health/health.controller";

@Module({
  imports: [WhatsappModule],
  controllers: [HealthController],
})
export class AppModule {}
