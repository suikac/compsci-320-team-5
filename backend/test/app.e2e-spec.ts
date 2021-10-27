import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { ChildProcess, exec } from "child_process"
import { exit } from 'process';

let microservices: ChildProcess
beforeAll(async () => {
  console.log("Running microservices")
  microservices = exec('rm test/microservices.log && bash test/test_e2e.sh >test/microservices.log 2>&1')
  await new Promise(r => setTimeout(r, 10000));
}, 12000)

//// This doesn't kill microservices on exit. For now just ctrl-c

// afterAll(() => {
  // microservices.kill(9)
// })

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/referral/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/referral/create')
      .send({
        "resumeId":1,
        "refereeEmail":"test@gmail.com",
        "positionId":1,
        "referrerId":2
      })
      .expect(200)
  })
});