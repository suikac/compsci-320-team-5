import { CanActivate, ExecutionContext, Injectable,HttpException,HttpStatus,Inject } from '@nestjs/common';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserData } from './interfaces';
import { ClientProxy} from '@nestjs/microservices';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Inject('LOGIN_SERVICE') private loginService: ClientProxy) {}
  canActivate(
    context: ExecutionContext,): boolean{
    const request = context.switchToHttp().getRequest();
    const userRole = request.roles
    if(userRole == undefined){
      throw new HttpException('missing credentials', HttpStatus.UNAUTHORIZED)
    }
    const cmd = {cmd: 'roles-guard'};
    try{
      const response: UserData = await firstValueFrom(
        this.loginService.send(cmd,{role: userRole})
      );
      request.roles = response;
      return true;
    }
  }
}
