import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { DbModule } from './db.module';
import { ValidationPipe } from '@nestjs/common';
import { RpcValidationFilter } from './interface/RpcValidationFilter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<TcpOptions>(DbModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcValidationFilter());
  await app.listen();
}
bootstrap();
