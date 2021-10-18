import { CanActivate, ExecutionContext, Injectable,HttpException,HttpStatus,Inject, SetMetadata } from '@nestjs/common';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const isManagerRoute = this.reflector.getAllAndOverride<boolean>(MANAGER_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!isManagerRoute) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    return request.user.role == 'manager'
  }
}

const MANAGER_KEY = 'isManager'
export const ManagerOnly = () => SetMetadata(MANAGER_KEY, true)