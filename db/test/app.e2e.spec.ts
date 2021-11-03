import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Inject } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { DbModule } from 'src/db.module';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule,
        ClientsModule.register([
          {
            name: 'DB_SERVICE',
            transport: Transport.TCP,
            options: {
              port: 3001,
            },
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.connectMicroservice({
      transport: Transport.TCP,
    });
    await app.startAllMicroservices();
    await app.init();

    const client = app.get('DB_SERVICE');
    await client.connect();
    afterAll(async () => {
      await app.close();
      client.close();
    });
    describe('should return api by email', () => {
      const cmd = { cmd: 'getByEmail' };
      const data = { email: 'aki@gmail.com' };
      const employee = client.send(cmd, data);
      expect(employee).toBeDefined;
    });
  });
});
