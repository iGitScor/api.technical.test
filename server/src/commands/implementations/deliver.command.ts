export class DeliverCommand {
  public occuredAt: Date;
  constructor(public readonly id: number, public readonly courier: number) {
    this.occuredAt = new Date();
  }
}
