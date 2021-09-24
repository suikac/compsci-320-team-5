import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { MessagePattern, Payload } from '@nestjs/microservices';


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

    @Get('/:EmployeeId')
    public getEmployee(@Param('EmployeeId') employeeId: number) :Promise<Employee> {
        return this.employeeService.getEmployee(employeeId);
    }

    @Post('/edit/:EmployeeId')
    public async updateEmployee(@Param('EmployeeId') employeeId: number,
     @Body() createEmployeeDto: CreateEmployeeDto) {
        const employee = await this.employeeService.editEmployee(createEmployeeDto, employeeId)
        return employee
    }
}
