import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('login')
  login(
    @Query('username') usr: string,
    @Query('password') pwd: string,
    @Res() res: Response
  ) {
    // console.log("Attempt to login: usr=", usr, " pwd=", pwd);
    if (this.loginService.loginWithPassword(usr, pwd)) {
      res.status(HttpStatus.OK).send('Login succeeded');
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send('Invalid login');
    }
  }
}
