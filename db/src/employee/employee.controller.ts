import { Controller, Get, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
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
    console.log("welcome to db_service")
    const employee = this.employeeService.getEmployee()
    return employee
  }

  @Get("hello")
  getEmployee() {
    const employee = this.employeeService.getEmployee()
    return employee
  }
}
