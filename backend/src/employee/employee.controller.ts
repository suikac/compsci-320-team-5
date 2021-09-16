import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';


@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService){}

    @Post('create')
    public async createEmployee(
        @Body() createEmployeeDto : CreateEmployeeDto
    ) :Promise<Employee> {
        const employee = await this.employeeService.createEmployee(
            createEmployeeDto
        )
        return employee
    }

    @Get()
    public async test() {
        return "hello world"
    }
}
