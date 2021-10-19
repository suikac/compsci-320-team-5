import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployeeController } from './employee.controller';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

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
  ],
  // Matt Cappucci - Added Position controller
  controllers: [EmployeeController, PositionController],
  // Matt Cappucci - Added Position service
  providers: [PositionService]
})
export class DbModule {}
