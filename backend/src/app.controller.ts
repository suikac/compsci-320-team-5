import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
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

  @Get('login')
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    console.log('Received login request');
    const cmd = { cmd: 'login' };
    const data = { email: email, password: password };
    const result = this.loginClient.send(cmd, data);
    try {
      let response: any = await firstValueFrom(result);
      return response;
    } catch (exception) {
      if (exception.message == 'invalid credentials') {
        throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      console.log('Unhandled exception: ' + exception.message);
    }
  }
}
