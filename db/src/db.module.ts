import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EmployeeModule } from "./employee/employee.module";
import { Employee } from "./entities/Employee";
import { Resume } from "./entities/Resume";
import { Referral } from "./entities/Referral";
import { Position } from "./entities/Position";
import { PositionTag } from "./entities/PositionTag";
import { Tag } from "./entities/Tag";
import { ReferralModule } from './referral/referral.module';
import { PositionModule } from './position/position.module';
require("dotenv").config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.mysql_host,
      port: 3306,
      username: process.env.mysql_username,
      password: process.env.mysql_password,
      database: process.env.mysql_db,
      entities: [Employee, Referral, Resume, Position, PositionTag, Tag],
      synchronize: true,
    }),
    EmployeeModule,
    ReferralModule,
    PositionModule,
  ],
})
export class DbModule {}
