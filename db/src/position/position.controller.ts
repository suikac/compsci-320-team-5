import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PositionService } from './position.service';

@Controller('Position')
export class PositionController {
  constructor(
    @Inject(PositionService)
    private positionService: PositionService
  ) {}

  // Matt Cappucci
  // Test route to see if connection to DB is working
  @MessagePattern({ cmd: 'test' })
  public async test() {
    return this.positionService.test();
  }

  // Matt Cappucci
  // Route for getting a position by its ID
  @MessagePattern({ cmd: 'getPositionById' })
  public async getPositionById(@Payload('id') id: string) {
    const position = this.positionService.getPositionById(id).catch(() => null);
    return position;
  }

  @MessagePattern({ cmd: 'getAllPositions' })
  public async getAllPositions() {
    const position = this.positionService.getAllPositions().catch(() => null);
    return position;
  }

  @MessagePattern({ cmd: 'createPosition' })
  public async createPosition(data: Object) {
    console.log(data);
    let position = this.positionService.createPosition(data).catch(() => null);
    console.log(position);
    return position;
  }

  @MessagePattern({ cmd: 'addTagToPosition' })
  public async addTagToPosition(
    @Payload('positionId') positionId: string,
    @Payload('tag') tag: string
  ) {
    let getTag = await this.positionService.getTagByName(tag).catch(() => null);
    if (getTag == null) {
      getTag = await this.positionService.createTag(tag);
    }
    let addedTag = this.positionService
      .addTagToPosition(positionId, getTag)
      .catch(() => null);
    return addedTag;
  }

  @MessagePattern({ cmd: 'updatePosition' })
  async updatePosition(
    @Payload('id') id: string,
    @Payload('title') title: string
  ) {
    this.positionService.updatePosition(id, title);
    return 'ok';
  }

  @MessagePattern({ cmd: 'deletePosition' })
  async deletePosition(@Payload('id') id: string) {
    this.positionService.deletePosition(id);
    return 'ok';
  }
}
