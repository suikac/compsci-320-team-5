import { NestFactory } from "@nestjs/core";
import { TcpOptions, Transport } from "@nestjs/microservices";
import { LoginModule } from "./login.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<TcpOptions>(LoginModule, {
    transport: Transport.TCP,
    options: {
      port: 1234,
    },
  });
  await app.listen();
}
bootstrap();
