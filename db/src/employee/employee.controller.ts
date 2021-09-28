import { Controller, Get, HttpCode, HttpException, HttpStatus, Inject, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { STATUS_CODES } from 'http';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {

    constructor(
        @Inject(EmployeeService)
        private employeeService : EmployeeService
    ){}

    @MessagePattern({ cmd: 'password'})
  getPassword(
    @Payload('email') email: string
    ) {
    console.log("welcome db service")
    const employee = this.employeeService.getEmployee()
    return employee
  }

  @MessagePattern({cmd: 'getByEmail'})
  getEmployeeByEmail(
    @Payload('email') email: string
  ) {
    console.log("in db")
    const employee = this.employeeService.getPasswordByEmail(email)
    console.log(employee)
    if (!employee) {
      console.log("in exception branch")
      throw new HttpException(
        {
          STATUS_CODES: 404,
          error: "Employee Not Founded"
        }, HttpStatus.NOT_FOUND
      )
    } else {
      return employee
    }
  }
}
