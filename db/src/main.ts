import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { DbModule } from './db.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<TcpOptions>(DbModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  });
  await app.listen();
}
bootstrap();
