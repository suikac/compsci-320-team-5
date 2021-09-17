import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get('/:EmployeeId')
    /**
     * getEmployee
     */
    public getEmployee(@Param('EmployeeId') employeeId: number) :Promise<Employee> {
        return this.employeeService.getEmployee(employeeId);
    }

    @Post('/edit/:EmployeeId')
    /**
     * updateEmployee
     */
    public async updateEmployee(@Param('EmployeeId') employeeId: number,
     @Body() createEmployeeDto: CreateEmployeeDto) {
        await this.employeeService.editEmployee(createEmployeeDto, employeeId)
    }
}
