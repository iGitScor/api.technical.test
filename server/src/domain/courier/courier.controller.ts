import {
  InMemoryDBEntityAsyncController,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Request,
} from '@nestjs/common';

import { CourierEntity } from './courier.entity';

@Controller('couriers')
export class CourierController extends InMemoryDBEntityAsyncController<
  CourierEntity
> {
  constructor(private courierService: InMemoryDBService<CourierEntity>) {
    super(courierService);
  }

  @Get('/:id')
  async getCourier(
    @Request() req: { params: { id: number } },
  ): Promise<CourierEntity> {
    const courier = this.courierService.get(req.params.id);

    if (courier === undefined) {
      throw new HttpException('Courier not found', HttpStatus.NOT_FOUND);
    }

    return courier;
  }

  @Post('/')
  async createCourier(
    @Body() body: { id: number; max_capacity: number },
  ): Promise<void> {
    this.courierService.create(body);

    return;
  }

  @Get('/lookup')
  async getCouriers(
    @Body() body: { capacity_required: number },
  ): Promise<CourierEntity[]> {
    const couriers = this.courierService.query(
      candidate => candidate.max_capacity >= body.capacity_required,
    );

    return couriers;
  }

  @Patch('/:id/capacity')
  async updateCapacity(
    @Request() req: { params: { id: number } },
    @Body() body: { capacity: number },
  ): Promise<CourierEntity> {
    const courier = this.courierService.get(req.params.id);

    if (courier === undefined) {
      throw new HttpException('Courier not found', HttpStatus.NOT_FOUND);
    } else if (courier.max_capacity === body.capacity) {
      throw new HttpException('Capacity not changed', HttpStatus.NOT_MODIFIED);
    } else {
      courier.max_capacity = body.capacity;

      this.courierService.update(courier);
    }

    return courier;
  }
}
