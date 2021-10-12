import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('db')
export class EmployeeController {
  constructor(@Inject('DB_SERVICE') private readonly dbService: ClientProxy) {}

  @Get('getByEmail')
  public async getByEmail(@Query('email') email: string) {
    console.log('in backend');
    const cmd = { cmd: 'getByEmail' };
    const data = { email: email };
    const employee = this.dbService.send(cmd, data);
    if (!employee) throw new NotFoundException('Employee not found');
    else return employee;
  }

  @Post('signUp')
  public async signUpEmployee(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    console.log('signing up db..');
    const cmd = { cmd: 'signUp' };
    const data = { email: email, password: password };
    const response = this.dbService.send(cmd, data);
    return response;
  }
}
