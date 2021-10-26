import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('position')
export class PositionController {
  constructor(@Inject('DB_SERVICE') private readonly dbClient: ClientProxy) {}
  @Get()
  public async getAllPositions() {
    const cmd = { cmd: 'getAllPositions' };
    const data = {};
    return this.dbClient.send(cmd, data);
  }
}
