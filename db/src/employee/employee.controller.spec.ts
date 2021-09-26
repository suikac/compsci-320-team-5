import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';

describe('EmployeeController', () => {
  let controller: EmployeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('return password', () => {
    it('should return correct password', () => {
      const password = 'aki-test123'

      const pass = controller.getPasswordByEmail('aki@gmail.com')
      expect(pass).toBe(password)
    })
  }
);
})

