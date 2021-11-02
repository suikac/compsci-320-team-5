import { Position } from 'src/entities/Position';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Position)
export class PositionRepository extends Repository<Position> {}
