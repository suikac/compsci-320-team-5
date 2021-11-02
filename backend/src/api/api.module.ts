import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployeeController } from './employee.controller';
import { ReferralController } from './referral.controller';
import { GuardsModule } from '../guards/guards.module';
import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';

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
  controllers: [EmployeeController, ReferralController, PositionController],
})
export class ApiModule {}
