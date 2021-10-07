import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject, Post,
  Query,
  UseGuards
} from "@nestjs/common";

import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { JwtGuard } from './jwt-guard';
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

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log("Received login request")
    const cmd = { cmd: "login" }
    const data = { email: email, password: password }
    const result = this.loginClient.send(cmd, data);
    console.log(email)
    try {
      return await firstValueFrom(result);
    } catch (exception) {
      if (exception.message == 'invalid credentials') {
        throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      console.log('Unhandled exception: ' + exception.message);
    }
  }
}
