import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtGuard } from './jwt-guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('LOGIN_SERVICE') private readonly loginClient: ClientProxy
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("login")
  login(
    @Query('email') email: string,
    @Query('password') password: string
  ) {
    console.log("Received login request")
    const cmd = { cmd: "login" }
    const data = { email: email, password: password }
    return this.loginClient.send(cmd, data)
  }
}
