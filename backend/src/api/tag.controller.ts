import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('tag')
export class TagController {
  constructor(@Inject('DB_SERVICE') private readonly dbService: ClientProxy) {}

  @Post('get')
  public async get(@Body() data) {
    return this.dbService.send({ cmd: 'getTag' }, data);
  }
}
