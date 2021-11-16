import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthorizedRequest, UserData } from 'src/interfaces';
import { JwtGuard } from '../guards/jwt-guard';

import { ManagerOnly, RolesGuard } from '../guards/role.guards';

@UseGuards(JwtGuard, RolesGuard)
@Controller('employee')
export class EmployeeController {
  constructor(@Inject('DB_SERVICE') private readonly dbService: ClientProxy) {}

  @Get('getByEmail')
  public async getByEmail(@Query('email') email: string) {
    console.log('in backend');
    const cmd = { cmd: 'getByEmail' };
    const data = { email: email };
    try {
      return this.dbService.send(cmd, data);
    } catch (exception) {
      throw exception;
    }
  }

  @Get('getSessionInfo')
  public async getSessionInfo(@Req() req: AuthorizedRequest) {
    return req.user
  }

  @ManagerOnly()
  @Post('signUp')
  public async signUpEmployee(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    console.log('signing up api..');
    const cmd = { cmd: 'signUp' };
    const data = { email: email, password: password };
    const response = this.dbService.send(cmd, data);
    return response;
  }

  @Post('get')
  public async getEmployee(@Body() query) {
    return this.dbService.send({ cmd: 'getEmployee' }, query);
  }
}
