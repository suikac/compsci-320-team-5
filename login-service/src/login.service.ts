import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  loginWithPassword(usr: string, pwd: string): boolean {
    return usr == 'user' && pwd == 'pwd';
  }
}
