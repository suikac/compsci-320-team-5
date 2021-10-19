import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PositionRepository } from "./position.repository";

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionRepository)
    private readonly positionRepository: PositionRepository
  ) {}

  public async getAllPositions() {
    return await this.positionRepository
      .createQueryBuilder("Position")
      .getMany();
  }
}
