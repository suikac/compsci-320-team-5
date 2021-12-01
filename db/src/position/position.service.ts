import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entities/Position';
import { PositionRepository } from './position.repository';
import { PositionTagRepository } from './positionTag.repository';
import { TagRepository } from './tag.repository';
import { SelectQueryBuilder } from 'typeorm';
import { PositionTag } from 'src/entities/PositionTag';
import { GetPositionDto } from './position.dto';
import { EmployeeService } from '../employee/employee.service';
import { IPaginationMeta, paginate } from 'nestjs-typeorm-paginate';

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

  public async getRecommendedPositions(page: string): Promise<Position[]> {
    const PAGESIZE = 10
    const positions = await this.positionRepository
      .createQueryBuilder('Position')
      .orderBy('id', 'DESC')
      .offset(parseInt(page) * PAGESIZE)
      .limit(PAGESIZE)
      .getMany();

    await this.completePosition(positions)

    return positions
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

  public async getTagsOfPositions(positionIds: number[]) {
    const {entities, raw} = await this.positionTagRepository
      .createQueryBuilder('PositionTag')
      .innerJoin('PositionTag.tag', 'tag', 'tag.id = PositionTag.tagId')
      .addSelect('tag.name', 'name')
      .where('PositionTag.position_id in (:...positionIds)', { positionIds: positionIds })
      .orderBy('PositionTag.position_id')
      .getRawAndEntities();

    return {tags: entities, names: raw}
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

  async getTagsByNames(names: string[]) {
    return this.tagRepository
      .createQueryBuilder('Tag')
      .where('name In (:...names)', {names: names})
      .getMany()
  }

  public async searchTagByName(name: string) {
    let query = this.tagRepository
      .createQueryBuilder('Tag')
    if (name != null) {
      query.where('name like :name', { name: `%${name}%` })
    }
    return await query.getMany()
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
      .innerJoinAndSelect('position.manager', 'manager')
      .where('position.manager_id = manager.id')

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
      query
        .innerJoin('position.positionTags', 'pt')
      query = await this.getPositionByTagsName(query, param)
    }

    if (param.managerName) {
      query = await this.getPositionByManagerName(query, param)
    }

    const res =  await paginate<Position>(query,
      { page: param.page == null ? GetPositionDto.DEFAULT_PAGE : param.page,
      limit: param.limit == null ? GetPositionDto.DEFAULT_LIMIT: param.limit,
      }
    )
      .then(r => r.items)

    console.log(res.length)

    await this.completePosition(res);

    return res;
  }

  private async completePosition(positions) {
    const {tags, names} = await this.getTagsOfPositions(positions.map(r => r.id))
    positions = [...positions].sort((a, b) => a.id - b.id)
    let lastId = null
    let i = -1

    for (let j = 0; j < tags.length; j++) {
      const tag = tags[j]
      if (tag.positionId != lastId) {
        lastId = tag.positionId
        i += 1
        positions[i].tags = []
      }
      positions[i].tags.push(names[j].name)
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
        'position.manager_id in (:managerId)', { managerId: managerId }
      ) : query;
  }

  private async getPositionByTagsName(query: SelectQueryBuilder<Position>, param) {
    let tagsId = await (await this.getTagsByNames(param.tags)).map(r => r.id)
    console.log(tagsId)
    if (tagsId.length > 0) {
      return query
        .andWhere('position.id = pt.position_id')
        .andWhere('pt.tag_id in (:tagId)', {tagId : tagsId})
    }
  }
}
