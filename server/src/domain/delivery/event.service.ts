import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeliverCommand } from '../../commands/implementations/deliver.command';

@Injectable()
export class DeliveryEventService {
  constructor(private commandBus: CommandBus) {}

  async deliver(commandParameters: {
    id: number;
    courier: number;
  }): Promise<string> {
    return this.commandBus.execute(
      new DeliverCommand(commandParameters.id, commandParameters.courier),
    );
  }
}
