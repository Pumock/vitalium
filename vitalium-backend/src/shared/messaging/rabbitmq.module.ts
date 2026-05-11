import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { ChatProducer } from './producers/chat.producer';

@Module({
  providers: [RabbitMQService, ChatProducer],
  exports: [RabbitMQService, ChatProducer],
})
export class RabbitMQModule {}
