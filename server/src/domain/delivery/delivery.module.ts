import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DeliveryController } from './delivery.controller';
import { DeliveryEventService } from './event.service';

@Module({
  imports: [CqrsModule],
  controllers: [DeliveryController],
  providers: [DeliveryEventService, InMemoryDBService],
  exports: [DeliveryEventService],
})
export class DeliveryModule {}
