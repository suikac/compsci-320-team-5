import {
  ArgumentsHost,
  CanActivate,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UseFilters,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export interface AuthorizedRequest extends Request {
  user: string;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(@Inject('LOGIN_SERVICE') private loginService: ClientProxy) {}

  async canActivate(context: ExecutionContext) {
    let http = context.switchToHttp();
    let request: AuthorizedRequest = http.getRequest();
    let tokenString = request.headers['authorization'];
    console.log('Token received: ' + tokenString);
    if (tokenString == undefined) {
      throw new HttpException('missing credentials', HttpStatus.UNAUTHORIZED);
    }

    tokenString = tokenString.split([' '])[1];

    let cmd = { cmd: 'jwt-auth' };
    try {
      let response: any = await firstValueFrom(
        this.loginService.send(cmd, { token: tokenString }),
      );
      request.user = response.userId;
      return true;
    } catch (exception) {
      if (exception.message == 'invalid token') {
        throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
      }
      console.log('Unhandled exception: ' + exception.message);
    }
  }
}
