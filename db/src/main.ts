import { NestFactory } from "@nestjs/core";
import { TcpOptions, Transport } from "@nestjs/microservices";
import { DbModule } from "./db.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<TcpOptions>(DbModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.service_host,
      port: 3001,
    },
  });
  await app.listen();
}
bootstrap();
