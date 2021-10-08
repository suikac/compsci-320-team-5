import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { DBPasswordResponse, TokenPayload, TokenResponse } from "./interfaces";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { TOKEN_DURATION_SEC } from "./constants";

@Injectable()
export class LoginService {
  constructor(
    @Inject("DB_SERVICE") private readonly dbService: ClientProxy,
    private jwtService: JwtService
  ) {}

  async validateLogin(email: string, password: string): Promise<TokenResponse> {
    const cmd = { cmd: "retrieve password hash" };
    const data = { email: email };
    try {
      let response: DBPasswordResponse = await firstValueFrom(
        this.dbService.send(cmd, data)
      ); // send the email to get the password
      if (await bcrypt.compare(password, response.pwdHash)) {
        let tokenPayload: TokenPayload = {
          userId: response.userId,
        };
        let token = this.jwtService.sign(tokenPayload);
        let expiry = new Date(Date.now() + TOKEN_DURATION_SEC * 1000)
        return {
          token: token,
          expires: expiry
        };
      } else {
        throw new RpcException("invalid credentials");
      }
    } catch (exception) {
      throw new RpcException("invalid credentials");
    }
  }

  verfiyJwt(token: string): TokenPayload {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new RpcException("invalid token");
    }
  }
}
