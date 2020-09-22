import {
  InMemoryDBEntityAsyncController,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';

import { CourierEntity } from './../courier/courier.entity';
import { DeliveryEventService } from './event.service';

@Controller('deliveries')
export class DeliveryController extends InMemoryDBEntityAsyncController<
  CourierEntity
> {
  constructor(
    private deliveryEvent: DeliveryEventService,
    private courierService: InMemoryDBService<CourierEntity>,
  ) {
    super(courierService);
  }

  @Post('/:id/handover/courier')
  async assignDelivery(
    @Request() req: { id: number },
    @Body() body: { courier: number },
  ): Promise<{ courier: CourierEntity; parcel: number }> {
    const courier = this.courierService.get(body.courier);

    if (courier === undefined) {
      throw new HttpException('Courier not found', HttpStatus.NOT_FOUND);
    } else if (courier.max_capacity === 0) {
      throw new HttpException('Max capacity reached', HttpStatus.NOT_MODIFIED);
    } else {
      courier.max_capacity--;
      this.courierService.update(courier);
    }

    return {
      courier,
      parcel: req.id,
    };
  }

  @Post('/:id/handover/customer')
  async deliver(
    @Request() req: { id: number },
    @Body() body: { courier: number; customer: number },
  ): Promise<void> {
    const courier = this.courierService.get(body.courier);

    if (courier === undefined) {
      throw new HttpException('Courier not found', HttpStatus.NOT_FOUND);
    } else if (courier.max_capacity === 0) {
      throw new HttpException('Max capacity reached', HttpStatus.NOT_MODIFIED);
    } else {
      courier.max_capacity++;
      this.courierService.update(courier);
      this.deliveryEvent.deliver({
        id: req.id,
        courier: body.courier,
      });
    }
  }
}
