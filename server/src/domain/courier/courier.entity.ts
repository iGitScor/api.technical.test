import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface CourierEntity extends InMemoryDBEntity {
  id: number;
  max_capacity: number;
}
