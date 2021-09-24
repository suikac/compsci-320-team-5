import { Controller, Inject } from '@nestjs/common';
import { LoginService } from './login.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    @Inject('BACKEND_SERVICE') private readonly backendService: ClientProxy
  ) {}

  @MessagePattern({ cmd: 'login' })
  login_local(
    @Payload('username') username: string,
    @Payload("password") password: string) {
    if (this.loginService.loginWithPassword(username, password)) {
      const cmd = { cmd : 'password'}
      const data = { email : 'test@gamil.com'}
      console.log("enter login service")
      return this.backendService.send(cmd, data) // send the email to get the password
    } else {
      return 'Invalid login'
    }
  }

  
}
