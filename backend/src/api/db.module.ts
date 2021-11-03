import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployeeController } from './employee.controller';
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
  ],
  // Matt Cappucci - Added Position controller
  controllers: [EmployeeController, PositionController]
})
export class DbModule {}
