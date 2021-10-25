import { LoginService } from "./login.service"
import { Test, TestingModule } from '@nestjs/testing';
import { ClientProxy } from "@nestjs/microservices";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { DBPasswordResponse, TokenResponse } from "./interfaces";

@Injectable()
class MockDB {
  send(cmd, payload): DBPasswordResponse {
    return {
      pwdHash: bcrypt.hashSync("123456", 1),
      userId: 5,
      role: "manager"
    }
  }
}

describe('LoginService', () => {
  let loginService: LoginService
  let mockDB: ClientProxy

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: "DB_SERVICE",
          useClass: MockDB
        }
      ]
    }).compile()

    loginService = app.get<LoginService>(LoginService)
    mockDB = app.get("DB_SERVICE")
  })

  describe('validateLogin', () => {
    it('should retrieve data from db', async () => {
      const spy = jest.spyOn(mockDB, 'send')
      loginService.validateLogin('test@gmail.com', '123456')
      expect(spy).toBeCalled()

      spy.mockRestore()
    })

    it('should return appropriate fields if credentials match', async () => {
      const now = new Date()
      const result = await loginService.validateLogin('test@gmail.com', '123456')
      expect(result.role).toBe('manager')
      expect(result.expires.valueOf()).toBeGreaterThan(now.valueOf())
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