import { Controller, Inject, Get } from '@nestjs/common';
import { LoginService } from './db.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    @Inject('BACKEND_SERVICE') private readonly backendService: ClientProxy
  ) {}

  @Get("nihao")
  hello() {
    return "hello"
  }

  @MessagePattern({ cmd: 'password'})
  getPassword(
    @Payload('email') email: string
    ) {
    console.log("you are in db_service now")
    return "password"
  }
  
}
