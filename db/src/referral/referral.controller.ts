import { Controller, Inject } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { ReferralService } from "./referral.service";
import { Referral } from "../entities/Referral";
import { CreateReferralDto } from "./referral.dto";

@Controller("referral")
export class ReferralController {
  constructor(
    @Inject(ReferralService)
    private readonly referralService: ReferralService
  ) {}

  @MessagePattern({ cmd: "createReferral" })
  public async createReferral(createReferralDto: CreateReferralDto) {
    return await this.referralService.createReferral(createReferralDto);
  }

  @MessagePattern({ cmd: "updateReferral" })
  public async updateReferral(
    updateReferralDto: CreateReferralDto,
  ) {
    return await this.referralService.updateReferral(updateReferralDto,
      updateReferralDto.id);
  }

  @MessagePattern({ cmd: "deleteReferral" })
  public async deleteReferral(@Payload('id') id: number) {
    console.log(id);
    await this.referralService.deleteReferral(id);
  }

  @MessagePattern({ cmd: "getReferral" })
  public async getReferral(@Payload('id') id: number): Promise<Referral> {
    return await this.referralService.getReferral(id);
  }

  @MessagePattern({ cmd: "getReferralsByPosition" })
  public async getReferralsByPosition(positionId: number): Promise<Referral[]> {
    return await this.referralService.getReferralsByPosition(positionId);
  }

  @MessagePattern({ cmd: "getReferralsByReferrer" })
  public async getReferralsByReferrer(referrerId: number): Promise<Referral[]> {
    return await this.referralService.getReferralsByReferrer(referrerId);
  }

  @MessagePattern({ cmd: "getUnreadReferral" })
  public async getUnreadReferral(id: number): Promise<Referral[]> {
    console.log("in db");
    return await this.referralService.getUnreadReferral(id);
  }

  @EventPattern({ cmd: "readReferral" })
  public async readReferral(id: number) {
    await this.referralService.readReferral(id);
  }
}
