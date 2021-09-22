import { Controller } from '@nestjs/common';
import { LoginService } from './login.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @MessagePattern({ cmd: 'login' })
  login_local(
    @Payload('username') username: string,
    @Payload("password") password: string) {
    if (this.loginService.loginWithPassword(username, password)) {
      return '[Token generated]'
    } else {
      return 'Invalid login'
    }
  }
}
