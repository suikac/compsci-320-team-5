import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Position } from "src/entities/Position"
import { PositionController } from "./position.controller"
import { PositionRepository } from "./position.repository"
import { PositionService } from "./position.service"

@Module({
  imports: [TypeOrmModule.forFeature([Position, PositionRepository])],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}