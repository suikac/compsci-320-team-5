import {
    Body,
    Controller,
    Get,
    Inject,
    NotFoundException,
    Post,
    Patch,
    Query,
    Req,
    Res,
    HttpStatus,
    Delete
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express'
import { PositionService } from './position.service';
import { Response } from 'express'
  
@Controller('position')
export class PositionController {
    constructor(
        //private readonly positionService: PositionService,
        @Inject('DB_SERVICE') private readonly dbService: ClientProxy
    ) {}

    @Get('test')
    public async test() {
        return this.dbService.send({cmd: 'test'}, {})
    }

    @Get('GetPosition')
    public async getByTitle(@Query('title') title: string) {
        console.log('in backend');
        console.log(title)
        const cmd = { cmd: 'getPositionByTitle' };
        const data = { title: title };
        const position = this.dbService.send(cmd, data);
        if (!position) throw new NotFoundException('Position not found');
        else return position;
    }

    @Post('CreatePosition')
    public async createPosition(
        @Body('title') title: string,
        @Body('description') description: string,
    ) {
        console.log('in backend');
        console.log(title)
        console.log(description)
        const cmd = { cmd: 'createPosition' };
        const data = { title: title, description: description };
        const response = this.dbService.send(cmd, data);
        return response;
    }

    @Patch('UpdatePosition')
    public async updatePosition(
        @Body('title') title: string,
        @Body('id') id: string
    ) {
        console.log('in backend update position title')
        const cmd = { cmd: 'updatePosition' }
        const data = { title: title, id: id }
        const response = this.dbService.send(cmd, data)
        return response
    }

    @Delete('DeletePosition')
    public async(@Body('id') id: string) {
        console.log('in backend delete position')
        const cmd = { cmd: 'deletePosition' }
        const data = { id: id }
        const response = this.dbService.send(cmd, data)
        return response
    }
}