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
import { UserData, AuthorizedRequest } from '../interfaces';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(@Inject('LOGIN_SERVICE') private loginService: ClientProxy) {}

  async canActivate(context: ExecutionContext) {
    const http = context.switchToHttp();
    const request: any = http.getRequest();
    const tokenString = request.cookies['AuthToken'];
    console.log('Token received: ' + tokenString);
    if (tokenString == undefined) {
      throw new HttpException('missing credentials', HttpStatus.UNAUTHORIZED);
    }

    const cmd = { cmd: 'jwt-auth' };
    try {
      const response: UserData = await firstValueFrom(
        this.loginService.send(cmd, { token: tokenString }),
      );
      request.user = response;
      return true;
    } catch (exception) {
      if (exception.message == 'invalid token') {
        throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
      }
      console.log('Unhandled exception: ' + exception.message);
    }
  }
}
