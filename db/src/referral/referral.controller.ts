import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
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

  @MessagePattern("updateReferral")
  public async updateReferral() {
    await this.referralService.updateReferral();
  }

  @MessagePattern("deleteReferral")
  public async deleteReferral() {
    await this.referralService.deleteReferral();
  }

  @MessagePattern({ cmd: "getReferral" })
  public async getReferral(id: number): Promise<Referral> {
    return await this.referralService.getReferral(id);
  }
}
