import {
    Body,
    Controller,
    Get,
    Inject,
    NotFoundException,
    Post,
    Patch,
    Query,
    Delete,
    HttpStatus,
    Req,
    UseGuards
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express'
import { JwtGuard } from 'src/guards/jwt-guard';
import { ManagerOnly, RolesGuard } from 'src/guards/role.guards';



@UseGuards(JwtGuard, RolesGuard)
@Controller('position')
export class PositionController {

    constructor(
        //private readonly positionService: PositionService,
        @Inject('DB_SERVICE') private readonly dbService: ClientProxy
    ) {}




    // Matt Cappucci
    // Function used for parsing JSON sent to controller
    private parseInput(requestBody: Object, requiredFields: string[], otherFields: string[]) {
        let data = {}
        let requestBodyFields = Object.keys(requestBody)
        for (let i = 0; i < requiredFields.length; ++i) {
            if (!requestBodyFields.includes(requiredFields[i])) {
                return null
            } else {
                data[requiredFields[i]] = requestBody[requiredFields[i]]
            }
        }
        for (let i = 0; i < otherFields.length; ++i) {
            if (requestBodyFields.includes(otherFields[i])) {
                data[otherFields[i]] = requestBody[otherFields[i]]
            }
        }
        return data
    }




    // Matt Cappucci
    // /test GET route
    // Just used to make such you can connect to this controller
    // Can be deleted
    @Get('test')
    public async test() {
        return this.dbService.send({cmd: 'test'}, {})
    }




    // Matt Cappucci
    // /getPositionById Get route
    // Get a position by ID
    @Get('getPositionById')
    public async getPositionById(@Req() req: Request) {
        let id = this.parseInput(req.body, ['id'], [])['id']
        console.log(id)
        if (id == undefined || !(/^\d+$/.test(id))) {
            return 'Given id (' + id + ') is undefined or is not an int'
        }
        const cmd = { cmd: 'getPositionById' }
        const data = { id: id }
        const position = this.dbService.send(cmd, data)
        return position
    }




    // Matt Cappucci
    // /getAllPositions GET route
    // Gets all positions in the DB
    @Get('getAllPositions')
    public async getAllPositions() {
        const cmd = { cmd: 'getAllPositions' }
        const data = {}
        return this.dbService.send(cmd, data)
    }




    // Matt Cappucci
    // /createPosition POST request
    // Creates a new position with tags in the DB
    @ManagerOnly()
    @Post('createPosition')
    public async createPosition(@Req() req: Request) {
        let tags = req.body['tags']
        let requiredFields = ['title']
        let otherFields = ['description', 'minYearExperience', 'salary', 'managerId']
        let data = this.parseInput(req.body, requiredFields, otherFields)
        if (data == null) {
            return 'Require a title field in position data'
        }
        const cmd = { cmd: 'createPosition' }
        const position = this.dbService.send(cmd, data)
        if (position != null) {
            if (tags != undefined && tags.length != 0) {
                for (let i = 0; i < tags.length; ++i) {
                    let tagsCmd = { cmd: 'addTagToPosition' }
                    let tagsData = {
                        positionId: position['id'],
                        tag: tags[i]
                    }
                    const tag = this.dbService.send(tagsCmd, tagsData)
                }
            }
        }
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