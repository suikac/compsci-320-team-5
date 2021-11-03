import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject(EmployeeService)
    private employeeService: EmployeeService
  ) {}

  @MessagePattern({ cmd: 'password' })
  getPassword(@Payload('email') email: string) {
    console.log('welcome api service');
    const employee = this.employeeService.getEmployee();
    return employee;
  }

  @MessagePattern({ cmd: 'getByEmail' })
  getEmployeeByEmail(@Payload('email') email: string) {
    console.log('in api');
    try {
      const employee = this.employeeService.getEmployeeByEmail(email);
      if (!employee) {
        return new HttpException(
          {
            STATUS_CODES: 400,
            error: 'Employee Not Founded',
          },
          HttpStatus.BAD_REQUEST
        );
      }
      return employee;
    } catch (e) {
      // throw new HttpException(
      //   {
      //     STATUS_CODES: 404,
      //     error: "Employee Not Founded",
      //   },
      //   HttpStatus.NOT_FOUND
      // );
      throw e;
    }
  }

  @MessagePattern({ cmd: 'getById ' })
  async getEmployeeById(@Payload('id') id: number) {
    return this.employeeService.getEmployeeById(id);
  }

  @MessagePattern({ cmd: 'signUp' })
  async signUpEmployee(
    @Payload('email') email: string,
    @Payload('password') password: string
  ) {
    this.employeeService.signUpEmployee(email, password);
    return 'ok';
  }

  @MessagePattern({ cmd: 'retrieve password hash' })
  async retrievePwdHash(@Payload('email') email: string) {
    console.log('welcome to api');
    try {
      const employee = await this.employeeService.getEmployeeByEmail(email);

      return {
        pwdHash: employee.password,
        userId: employee.id,
        role: employee.isManager ? 'manager' : 'employee',
      };
    } catch (exception) {
      throw new NotFoundException('api not found');
    }
  }
}
