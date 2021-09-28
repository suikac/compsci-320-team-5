import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';
import { JwtGuard } from './jwt-guard';
require('dotenv').config()

@Module({
  imports: [
    ClientsModule.register([
      { name: 'LOGIN_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 1234
        }
      },
      { name: 'DB_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001
        }
      }
    ]),
    EmployeeModule
  ],
  controllers: [AppController, EmployeeController],
  providers: [AppService, JwtGuard],
})
export class AppModule {}
