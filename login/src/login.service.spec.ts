import { LoginService } from "./login.service"
import { Test, TestingModule } from '@nestjs/testing';
import { ClientProxy } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { DBPasswordResponse, TokenResponse } from "./interfaces";
import { LoginModule } from "./login.module";
import { Observable, of } from "rxjs";

@Injectable()
class MockDB {
  send(cmd, payload): Observable<DBPasswordResponse> {
    let data = {
      pwdHash: bcrypt.hashSync("123456", 1),
      userId: 5,
      role: "manager"
    }
    return of(data)
  }
}

describe('LoginService', () => {
  let loginService: LoginService
  let mockDB: MockDB

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [LoginModule]
    })
      .overrideProvider("DB_SERVICE")
      .useValue(new MockDB())
      .compile()

    loginService = app.get<LoginService>(LoginService)
    mockDB = app.get("DB_SERVICE")
  })

  describe('validateLogin', () => {
    it('should retrieve data from db', async () => {
      const spy = jest.spyOn(mockDB, 'send')
      await loginService.validateLogin('test@gmail.com', '123456')
      expect(spy).toBeCalled()

      spy.mockRestore()
    })

    it('should return appropriate fields if credentials match', async () => {
      const now = new Date()
      const result = await loginService.validateLogin('test@gmail.com', '123456')
      expect(result.role).toBe('manager')
      expect(result.expires.valueOf()).toBeGreaterThan(now.valueOf())
    })

    it('should reject invalid credentials', async () => {
      await expect(loginService.validateLogin('test@gmail.com', '1111')).rejects.toEqual(expect.anything())
    })
  })

  describe('verifyJwt', () => {
    it('should return appropriate fields if token is valid', async () => {
      const token = (await loginService.validateLogin('test@gmail.com', '123456')).token
      const payload = loginService.verfiyJwt(token)
      expect(payload.role).toBe('manager')
      expect(payload.userId).toBe(5)
    })
  })
})