import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entities/Position';
import { PositionRepository } from './position.repository';
import { PositionTagRepository } from './positionTag.repository';
import { TagRepository } from './tag.repository';
import { SelectQueryBuilder } from 'typeorm';
import { PositionTag } from 'src/entities/PositionTag';
import { GetPositionDto } from './position.dto';
import { EmployeeRepository } from '../employee/employee.repository';
import { EmployeeService } from '../employee/employee.service';
import { GetEmployeeDto } from '../employee/employee.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionRepository)
    private positionRepository: PositionRepository,
    private tagRepository: TagRepository,
    private positionTagRepository: PositionTagRepository,
    private employeeService: EmployeeService
  ) {}

  public async test() {
    return 'hello';
  }

  public async getPositionById(id: string): Promise<Position> {
    let position = await this.positionRepository
      .createQueryBuilder('Position')
      .where('id = :id', { id: parseInt(id) })
      .getOneOrFail();

    await this.completePosition([position])

    return position;
  }

  public async getPositionsByManager(managerId: string): Promise<Position[]> {
    const positions = await this.positionRepository
      .createQueryBuilder('Position')
      .where('manager_id = :manager_id', { manager_id: parseInt(managerId) })
      .getMany();

    await this.completePosition(positions)

    return positions;
  }

  public async getAllPositions(): Promise<Position[]> {
    const positions = await this.positionRepository
      .createQueryBuilder('Position')
      .getMany();

    await this.completePosition(positions)

    return positions;
  }

  public async createPosition(data: Object) {
    const position = await this.positionRepository.save(data);
    return position;
  }

  public async getPositionTagsByPositionId(positionId: string) {
    return await this.positionTagRepository
      .createQueryBuilder('PositionTag')
      .where('position_id = :positionId', { positionId: parseInt(positionId) })
      .getMany();
  }

  public async getTagsTagId(tagIds: number[]) {
    return await this.tagRepository
      .createQueryBuilder('Tag')
      .where('id IN (:ids)', { ids: tagIds })
      .getMany();
  }

  public async getTagsByPositionId(id: string): Promise<string[]> {
    const positionTags = await this.getPositionTagsByPositionId(id).catch(
      () => null
    );

    if (positionTags != null && positionTags != undefined) {
      if (positionTags.length == 0) {
        return [];
      } else {
        let arr = positionTags.map((e) => parseInt(e['tagId']));

        let tags = await this.getTagsTagId(arr).catch(() => null);

        if (tags != null && tags != undefined && tags.length != 0) {
          tags = tags.map((e) => e['name']);
          return tags;
        }
      }
    }
    return null;
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
    console.log(name)
    let tag = await this.tagRepository
      .createQueryBuilder('Tag')
      .where('name = :name', { name: name })
      .getOneOrFail();
    return tag;
  }

  public async searchTagByName(name: string) {
    return await this.tagRepository
      .createQueryBuilder('Tag')
      .where('name like :name', { name: `%${name}%` })
      .getMany();
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

  public async getPosition(param: GetPositionDto) {
    let query = this.positionRepository
      .createQueryBuilder('position')
      .innerJoin('position.positionTags', 'pt')

    if (param.maxSalary) {
      query
        .andWhere('salary < :maxSalary', {maxSalary: param.maxSalary})
    }

    if (param.minSalary) {
      query
        .andWhere('salary > :minSalary', {minSalary: param.minSalary})
    }

    if (param.title) {
      query
        .andWhere('title like :title', {title: `%${param.title}%`})
    }

    if (param.minYearExperience) {
      query
        .andWhere('min_year_experience >= :minYearExperience',
          {minYearExperience: param.minYearExperience})
    }

    if (param.tags) {
      query = await this.getPositionByTagsName(query, param)
    }

    if (param.managerName) {
      query = await this.getPositionByManagerName(query, param)
    }

    const res = await query.getMany();

    await this.completePosition(res);

    return res;
  }

  private async completePosition(positions) {
    let tags = await this.getAllTags()
    for (const position of positions) {
      let tagsId = await this.getTagsIdByPositionId(position.id)
      position.tags = []
      for (let i = 0; i < tagsId.length; i++) {
        position.tags.push(tags[tagsId[i].tagId - 1].name)
      }
      position.manager = await this.employeeService.getEmployeeById(position.managerId)
    }
  }

  private async getAllTags() {
    return this.tagRepository
      .createQueryBuilder()
      .getMany()
  }

  private async getTagsIdByPositionId(positionId) {
    return this.positionTagRepository
      .createQueryBuilder()
      .where('position_id = :id', {id: positionId})
      .getMany()
  }

  private async getPositionByManagerName(query: SelectQueryBuilder<Position>, param) {
    let managerId = await this.employeeService
      .getEmployee(
        {name: param.managerName, email: ""})
      .then(r => r.map(e => e.id))

    console.log(managerId);
      return managerId.length > 0 ? query.andWhere(
        'manager_id in (:managerId)', { managerId: managerId }
      ) : query;
  }

  private async getPositionByTagsName(query: SelectQueryBuilder<Position>, param) {
    let tagsId = []
    for (let i = 0; i < param.tags.length; i++) {
      tagsId.push(await this.getTagByName(param.tags[i])
        .then(r => r.id))
    }
    console.log(tagsId)
    if (tagsId.length > 0) {
      return query
        .andWhere('position.id = pt.position_id')
        .andWhere('pt.tag_id in (:tagId)', {tagId : tagsId})
    }
  }
}
