import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { PositionService } from "./position.service";

@Controller("position")
export class PositionController {
  constructor(
    @Inject(PositionService)
    private readonly positionService: PositionService
  ) {}
  @MessagePattern({ cmd: "getAllPositions" })
  public async getAllPositions() {
    return this.positionService.getAllPositions();
  }
}
