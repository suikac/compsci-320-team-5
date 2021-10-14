import { Inject, Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployeeController } from './employee.controller';
import { ReferralController } from './referral.controller';
import { JwtGuard } from "../guards/jwt-guard";
import { AppModule } from "../app.module";
import { GuardsModule } from "../guards/guards.module";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DB_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.db_host,
          port: 3001,
        },
      },
    ]),
    GuardsModule.forRoot(),
  ],
  controllers: [EmployeeController, ReferralController],

})
export class DbModule {}
