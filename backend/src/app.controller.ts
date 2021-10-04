import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtGuard } from './jwt-guard';
import { response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('LOGIN_SERVICE') private readonly loginClient: ClientProxy,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("api/login")
  login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    console.log("Received login request")
    const cmd = { cmd: "login" }
    const data = { username: username, password: password }
    return this.loginClient.send(cmd, data)
  }
}
