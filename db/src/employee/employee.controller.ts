import { Controller, HttpException, HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { EmployeeService } from "./employee.service";

@Controller("employee")
export class EmployeeController {
  constructor(
    @Inject(EmployeeService)
    private employeeService: EmployeeService
  ) {}

  @MessagePattern({ cmd: "password" })
  getPassword(@Payload("email") email: string) {
    console.log("welcome db service");
    const employee = this.employeeService.getEmployee();
    return employee;
  }

  @MessagePattern({ cmd: "getByEmail" })
  getEmployeeByEmail(@Payload("email") email: string) {
    console.log("in db");
    const employee = this.employeeService.getEmployeeByEmail(email);
    console.log(employee);
    if (!employee) {
      console.log("in exception branch");
      throw new HttpException(
        {
          STATUS_CODES: 404,
          error: "Employee Not Founded",
        },
        HttpStatus.NOT_FOUND
      );
    } else {
      return employee;
    }
  }

  @MessagePattern({ cmd: "signUp" })
  async signUpEmployee(
    @Payload("email") email: string,
    @Payload("password") password: string
  ) {
    this.employeeService.signUpEmployee(email, password);
    return "ok";
  }

  @MessagePattern({ cmd: "retrieve password hash" })
  async retrievePwdHash(@Payload("email") email: string) {
    console.log("welcome to db");
    const employee = this.employeeService.getEmployeeByEmail(email);
    try {
      return {
        pwdHash: (await employee).password,
        userId: (await employee).id,
      };
    } catch (exception) {
      throw new NotFoundException("db not found");
    }
  }
}
