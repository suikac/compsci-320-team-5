import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('employee')
export class EmployeeController {
    constructor(
        @Inject('DB_SERVICE') private readonly dbService: ClientProxy,
    ){}

    @Get('getByEmail')
    public async getByEmail(
        @Query('email') email: string
    ) {
        console.log('in backend')
        const cmd = {cmd: 'getByEmail'}
        const data = {email: email}
        return this.dbService.send(cmd, data)
    }
}
