import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('tag')
export class TagController {
  constructor(@Inject('DB_SERVICE') private readonly dbService: ClientProxy) {}

  @Get('get')
  public async get(@Query() data) {
    return this.dbService.send({ cmd: 'getTag' }, data);
  }
}
