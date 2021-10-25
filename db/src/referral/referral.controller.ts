import { Controller, Inject } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
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
    id: number
  ) {
    return await this.referralService.updateReferral(updateReferralDto, id);
  }

  @MessagePattern({ cmd: "deleteReferral" })
  public async deleteReferral(id: number) {
    await this.referralService.deleteReferral(id);
  }

  @MessagePattern({ cmd: "getReferral" })
  public async getReferral(id: number): Promise<Referral> {
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
    console.log("in api");
    return await this.referralService.getUnreadReferral(id);
  }

  @EventPattern({ cmd: "readReferral" })
  public async readReferral(id: number) {
    await this.referralService.readReferral(id);
  }
}
