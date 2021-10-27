import { Module } from "@nestjs/common";
import { PositionController } from "./position.controller";
import { PositionService } from "./position.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Position } from "../entities/Position";
import { PositionRepository } from "./position.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Position, PositionRepository])],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
