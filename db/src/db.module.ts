import { Module } from '@nestjs/common';
import { LoginController } from './db.controller';
import { LoginService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './entities/Employee';
import { Resume } from './entities/Resume';
import { Referral } from './entities/Referral';
import { Position } from './entities/Position';
import { PositionTag } from './entities/PositionTag';
import { Tag } from './entities/Tag';
require('dotenv').config()

@Module({
  imports: [
    ClientsModule.register([
      { name: 'BACKEND_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3000
        }
      }
    ]),
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: process.env.mysql_host,
        port: 3306,
        username: process.env.mysql_user,
        password: process.env.mysql_password,
        database: process.env.mysql_db,
        entities: [Employee, Referral, Resume, Position, PositionTag, Tag],
        synchronize: true,
      }
    ),
    EmployeeModule
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class DbModule {}
