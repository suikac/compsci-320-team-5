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
    console.log("welcome db service")
    const employee = this.employeeService.getEmployee()
    return employee
  }

  getPasswordByEmail(email: string) {
    const employee = this.employeeService.getPasswordByEmail('aki@gmail.com')
    return employee
  }
}
