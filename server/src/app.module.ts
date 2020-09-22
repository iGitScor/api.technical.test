import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DeliverHandler } from './commands/handlers/deliver.handler';
import { CourierController } from './domain/courier/courier.controller';
import { CourierModule } from './domain/courier/courier.module';
import { DeliveryController } from './domain/delivery/delivery.controller';
import { DeliveryModule } from './domain/delivery/delivery.module';

@Module({
  imports: [
    CourierModule,
    CqrsModule,
    DeliveryModule,
    InMemoryDBModule.forRoot(),
  ],
  controllers: [CourierController, DeliveryController],
  providers: [DeliverHandler],
})
export class AppModule {}
