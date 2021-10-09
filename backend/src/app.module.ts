import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployeeController } from './db/employee.controller';
import { DbModule } from './db/db.module';
import { JwtGuard } from './jwt-guard';

require("dotenv").config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOGIN_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.login_host,
          port: 1234,
        },
      },
      {
        name: 'DB_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
    ]),
    DbModule,
  ],
  controllers: [AppController, EmployeeController],
  providers: [JwtGuard],
})
export class AppModule {}
