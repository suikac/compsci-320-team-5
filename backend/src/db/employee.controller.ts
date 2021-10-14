import { Body, Controller, Get, Inject, Post, Query, UseGuards } from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from "../guards/jwt-guard";

@UseGuards(JwtGuard)
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
