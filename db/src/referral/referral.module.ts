import { Module } from "@nestjs/common";
import { ReferralService } from "./referral.service";
import { ReferralController } from "./referral.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "../entities/Employee";
import { EmployeeRepository } from "../employee/employee.repository";
import { Referral } from "../entities/Referral";
import { ReferralRepository } from "./referral.repository";
import { PositionModule } from "../position/position.module";
import { EmployeeModule } from "../employee/employee.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Referral, ReferralRepository]),
    PositionModule,
    EmployeeModule,
  ],
  providers: [ReferralService],
  controllers: [ReferralController],
})
export class ReferralModule {}
