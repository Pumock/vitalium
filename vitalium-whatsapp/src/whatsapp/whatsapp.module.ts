import { Module } from "@nestjs/common";
import { RabbitMQModule } from "../shared/messaging/rabbitmq.module";
import { WhatsappController } from "./whatsapp.controller";
import { WhatsappApiService } from "./whatsapp-api.service";
import { WhatsappIncomingProducer } from "./whatsapp-incoming.producer";
import { WhatsappOutgoingConsumer } from "./whatsapp-outgoing.consumer";

@Module({
  imports: [RabbitMQModule],
  controllers: [WhatsappController],
  providers: [
    WhatsappApiService,
    WhatsappIncomingProducer,
    WhatsappOutgoingConsumer,
  ],
})
export class WhatsappModule {}
