import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('LOGIN_SERVICE') private readonly loginClient: ClientProxy,
    @Inject('DB_SERVICE') private readonly dbClient: ClientProxy
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("login")
  login(
    @Query('username') username: string,
    @Query('password') password: string
  ) {
    const cmd = { cmd: "login" }
    const data = { username: username, password: password }
    return this.loginClient.send(cmd, data)
  }
}
