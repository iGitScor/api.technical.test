import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeliverCommand } from './../implementations/deliver.command';

@CommandHandler(DeliverCommand)
export class DeliverHandler implements ICommandHandler<DeliverCommand> {
  constructor() {}

  async execute(command: DeliverCommand) {
    const { occuredAt, id, courier } = command;

    return `Parcel ${id} deliverd by ${courier} at ${occuredAt.toISOString()}`;
  }
}
