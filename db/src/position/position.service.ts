import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { REPL_MODE_STRICT } from 'repl';
import { Position } from 'src/entities/Position';
import { PositionRepository } from './position.repository';
import { PositionTagRepository } from './positionTag.repository';
import { TagRepository } from './tag.repository';
import { getRepository } from 'typeorm';
import { PositionTag } from 'src/entities/PositionTag';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionRepository)
    private positionRepository: PositionRepository,
    private tagRepository: TagRepository,
    private positionTagRepository: PositionTagRepository
  ) {}

  public async test() {
    return 'hello';
  }

  public async getPositionById(id: string): Promise<Position> {
    const position = await this.positionRepository
      .createQueryBuilder('Position')
      .where('id = :id', { id: parseInt(id) })
      .getOneOrFail();

    return position;
  }

  public async getPositionsByManager(managerId: string): Promise<Position[]> {
    const positions = await this.positionRepository
      .createQueryBuilder('Position')
      .where('manager_id = :manager_id', { manager_id: parseInt(managerId) })
      .getMany();

    return positions;
  }

  public async getAllPositions(): Promise<Position[]> {
    const positions = await this.positionRepository
      .createQueryBuilder('Position')
      .getMany();

    return positions;
  }

  public async createPosition(data: Object) {
    const position = await this.positionRepository.save(data);
    return position;
  }

  public async addTagToPosition(positionAddId: string, tag: Object) {
    console.log(tag);
    console.log(positionAddId);
    const positionTag = await this.positionTagRepository.save({
      positionId: parseInt(positionAddId),
      tagId: parseInt(tag['id']),
    });
    return positionTag;
  }

  public async deleteAllPositionTags(positionId: string) {
    await this.positionTagRepository
      .createQueryBuilder('PositionTag')
      .delete()
      .from(PositionTag)
      .where('position_id = :positionId', { positionId: parseInt(positionId) })
      .execute();
  }

  public async getTagByName(name: string) {
    let tag = await this.tagRepository
      .createQueryBuilder('Tag')
      .where('name = :name', { name: name })
      .getOneOrFail();
    return tag;
  }

  public async createTag(name: string) {
    const tag = await this.tagRepository.save({ name: name });
    return tag;
  }

  public async updatePosition(positionId: string, data: Object) {
    let value = await this.positionRepository
      .createQueryBuilder('PositionTag')
      .update(Position)
      .set(data)
      .where('id = :positionId', { positionId: parseInt(positionId) })
      .execute();
    return value;
  }

  public async deletePosition(id: string) {
    let position = await this.positionRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: id })
      .execute();
    return position;
  }
}
