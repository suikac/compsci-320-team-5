import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from './jwt-guard';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { TokenResponse } from '../interfaces';
import { ManagerOnly, RolesGuard } from './role.guards';

@Controller()
export class LoginController {
  constructor(
    @Inject('LOGIN_SERVICE') private readonly loginClient: ClientProxy
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @ManagerOnly()
  @Get('managerOnly')
  getHello(): string {
    return 'hello1';
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response
  ) {
    const cmd = { cmd: 'login' };
    const data = { email: email, password: password };
    const result = this.loginClient.send(cmd, data);
    try {
      const response: TokenResponse = await firstValueFrom(result);
      res.cookie('AuthToken', response.token, {
        expires: new Date(response.expires),
        httpOnly: true,
        sameSite: 'lax',
        // secure: true
      });
      res.status(HttpStatus.OK);
      res.json({
        role: response.role,
        sessionExpires: response.expires
      });
    } catch (exception) {
      if (exception.message == 'invalid credentials') {
        throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.cookie('AuthToken', '', {
      expires: new Date(0),
      httpOnly: true,
      sameSite: 'strict',
    });
    res.status(HttpStatus.OK);
    res.send('');
  }
}
