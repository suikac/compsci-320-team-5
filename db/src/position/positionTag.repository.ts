import { PositionTag } from 'src/entities/PositionTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PositionTag)
export class PositionTagRepository extends Repository<PositionTag> {}
