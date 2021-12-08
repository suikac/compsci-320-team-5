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
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { JwtGuard } from 'src/guards/jwt-guard';
import { ManagerOnly, RolesGuard } from 'src/guards/role.guards';

@UseGuards(JwtGuard, RolesGuard)
@Controller('position')
export class PositionController {
  constructor(@Inject('DB_SERVICE') private readonly dbService: ClientProxy) {}

  // Matt Cappucci
  // Function used for parsing JSON sent to controller
  private parseInput(
    requestBody,
    requiredFields: string[],
    otherFields: string[]
  ) {
    const data = {};
    const requestBodyFields = Object.keys(requestBody);
    for (let i = 0; i < requiredFields.length; ++i) {
      if (!requestBodyFields.includes(requiredFields[i])) {
        return null;
      } else {
        data[requiredFields[i]] = requestBody[requiredFields[i]];
      }
    }
    for (let i = 0; i < otherFields.length; ++i) {
      if (requestBodyFields.includes(otherFields[i])) {
        data[otherFields[i]] = requestBody[otherFields[i]];
      }
    }
    return data;
  }

  // Matt Cappucci
  // /test GET route
  // Just used to make such you can connect to this controller
  // Can be deleted
  @Get('test')
  public async test() {
    return this.dbService.send({ cmd: 'test' }, {});
  }

  // To Do: get by manager
  @Get('getPositionsByManager')
  public async getPositionsByManager(@Query('id') id: string) {
    if (id == undefined || !/^\d+$/.test(id)) {
      return 'Given id (' + id + ') is undefined or is not an int';
    }
    const cmd = { cmd: 'getPositionsByManager' };
    const data = { id: id };
    const position = this.dbService.send(cmd, data);
    return position;
  }

  // Matt Cappucci
  // /getPositionById Get route
  // Get a position by ID
  @Get('getPositionById')
  public async getPositionById(@Query('id') id: string) {
    if (id == undefined || !/^\d+$/.test(id)) {
      return 'Given id (' + id + ') is undefined or is not an int';
    }
    const cmd = { cmd: 'getPositionById' };
    const data = { id: id };
    const position = this.dbService.send(cmd, data);
    return position;
  }

  // Matt Cappucci
  // /getAllPositions GET route
  // Gets all positions in the DB
  @Get('getAllPositions')
  public async getAllPositions() {
    const cmd = { cmd: 'getAllPositions' };
    const data = {};
    return this.dbService.send(cmd, data);
  }

  //Richard Paul
  // /getRecommendedPostions Get route
  // gets a page of the recommended positions
  @Get('getRecommendedPositions')
  public async getRecommendedPositions(@Query('page') page: string) {
    if (page == undefined || !/^\d+$/.test(page)) {
      return 'Given id (' + page + ') is undefined or is not an int';
    }
    const cmd = { cmd: 'getRecommendedPositions'};
    const data = {page: page};
    return this.dbService.send(cmd, data);
  }

  // Matt Cappucci
  // /createPosition POST request
  // Creates a new position with tags in the DB
  @ManagerOnly()
  @Post('createPosition')
  public async createPosition(@Req() req) {
    const requiredFields = ['title'];
    const otherFields = ['description', 'minYearExperience', 'salary', 'tags'];
    const data = this.parseInput(req.body, requiredFields, otherFields);
    if (data == null) {
      return 'Require a title field in position data';
    }
    data['managerId'] = req.user.userId;
    const cmd = { cmd: 'createPosition' };
    return this.dbService.send(cmd, data);
  }

  @ManagerOnly()
  @Patch('updatePosition')
  public async updatePosition(@Req() req: Request) {
    const requiredFields = ['id'];
    const otherFields = [
      'description',
      'minYearExperience',
      'salary',
      'managerId',
      'tags',
      'title',
    ];
    const data = this.parseInput(req.body, requiredFields, otherFields);
    if (data == null) {
      return 'Require an id field in position data';
    } else if (Object.keys(data).length == 1) {
      return 'Need data to update position along with id';
    }
    const cmd = { cmd: 'updatePosition' };
    return this.dbService.send(cmd, data);
  }

  @ManagerOnly()
  @Delete('deletePosition')
  public async(@Req() req: Request) {
    const requiredFields = ['id'];
    const otherFields = [];
    const data = this.parseInput(req.body, requiredFields, otherFields);
    if (data == null) {
      return 'Require an id field in position data';
    }
    const cmd = { cmd: 'deletePosition' };
    return this.dbService.send(cmd, data);
  }

  @Post('get')
  public async getPosition(@Req() req, @Body() query) {
    const cmd = { cmd: 'getPosition' };
    query.managerId = req.user.userId;
    console.log(query);
    return this.dbService.send(cmd, query);
  }
}
