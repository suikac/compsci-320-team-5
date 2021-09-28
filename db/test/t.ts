// import { Test, TestingModule } from '@nestjs/testing';
// import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
// import * as request from 'supertest';
// import { HeartbeatModule } from './../src/heartbeat.module';
// import { HeartbeatService } from './../src/heartbeat.service';
// import { Observable } from 'rxjs';

// describe('HeartbeatController (e2e)', () => {
//   let app: INestApplication;
//   let client: ClientProxy;

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [
//         HeartbeatModule,
//         ClientsModule.register([
//           { name: 'HEARTBEAT_SERVICE', transport: Transport.TCP },
//         ]),
//       ],
//     }).compile();

//     app = moduleFixture.createNestApplication();

//     app.connectMicroservice({
//       transport: Transport.TCP,
//     });

//     await app.startAllMicroservicesAsync();
//     await app.init();

//     client = app.get('HEARTBEAT_SERVICE');
//     await client.connect();
//   });

//   afterAll(async () => {
//     await app.close();
//     client.close();
//   });

//   it('sends a level 1 heartbeat message to the HeartbeatService', done => {
//     const response: Observable<any> = client.send(
//       { cmd: 'heartbeat' },
//       { type: 1 },
//     );

//     response.subscribe(json => {
//       expect(Date.parse(json.now)).toBeLessThanOrEqual(new Date().getTime());
//       expect(json.originalRequest.type).toBe(1);

//       done();
//     });
//   });

//   it('sends a level 2 heartbeat message to the HeartbeatService', done => {
//     const requestJson = {
//       type: 2,
//       startTime: 12345,
//       endTime: 67890,
//       messagesSent: 22,
//     };
//     const response: Observable<any> = client.send(
//       { cmd: 'heartbeat' },
//       requestJson,
//     );

//     response.subscribe(json => {
//       expect(Date.parse(json.now)).toBeLessThanOrEqual(new Date().getTime());
//       expect(json.messagesReceived).toBe(22);
//       expect(json.originalRequest.type).toBe(2);
//       expect(json.originalRequest.startTime).toBe(12345);
//       expect(json.originalRequest.endTime).toBe(67890);
//       expect(json.originalRequest.messagesSent).toBe(22);

//       done();
//     });
//   });

// });