import { EntityRepository, Repository } from "typeorm";
import { Position } from "../entities/Position";

@EntityRepository(Position)
export class PositionRepository extends Repository<Position> {}
