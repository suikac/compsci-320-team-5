import { Controller } from "@nestjs/common";
import { LoginService } from "./login.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { TokenResponse } from "./interfaces";

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @MessagePattern({ cmd: "login" })
  async login_local(
    @Payload("email") email: string,
    @Payload("password") password: string
  ): Promise<TokenResponse> {
    return this.loginService.validateLogin(email, password);
  }

  @MessagePattern({ cmd: "jwt-auth" })
  async auth_jwt(@Payload("token") token: string) {
    return this.loginService.verfiyJwt(token);
  }
}
