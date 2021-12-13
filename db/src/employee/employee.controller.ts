import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeService } from './employee.service';
import { GetReferralDto } from '../referral/referral.dto';
import { GetEmployeeDto } from './employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(
    @Inject(EmployeeService)
    private employeeService: EmployeeService
  ) {}

  @MessagePattern({ cmd: 'getByEmail' })
  getEmployeeByEmail(@Payload('email') email: string) {
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

  @MessagePattern({ cmd: 'getEmployee'} )
  async getEmployee(@Payload() query: GetEmployeeDto) {
    console
    return this.employeeService.getEmployee(query);
  }

  @MessagePattern( {cmd: 'getEmployeeById'})
  async getEmployeeById(@Payload('id') id: number) {
    return this.employeeService.getEmployeeById(id);
  }
}
