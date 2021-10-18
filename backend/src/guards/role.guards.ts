import { CanActivate, ExecutionContext, Injectable,HttpException,HttpStatus,Inject } from '@nestjs/common';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserData } from '../interfaces';
import { ClientProxy} from '@nestjs/microservices';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Inject('LOGIN_SERVICE') private loginService: ClientProxy) {}
  async canActivate(
    context: ExecutionContext,): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const tokenString = request.cookies['AuthToken'];
    if(tokenString == undefined){
      throw new HttpException('missing credentials', HttpStatus.UNAUTHORIZED)
    }
    const cmd = {cmd: 'jwt-guards'};
    const response: UserData = await firstValueFrom(
      this.loginService.send(cmd, { token: tokenString }),
    );
    return response.role == 'manager'
  }
}