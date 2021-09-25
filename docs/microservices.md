# Microservices

## What is it?
- Instead of running everything in 1 process, the backend is split into separate components called services that run on separate processes (sometimes even on different machines).
  - Each service is basically its own project
- The services communicate by sending messages using some agreed-upon protocol (HTTP, TCP, etc).

## Why are we doing it?
By splitting it into separate components, the application is going to be more reliable
- E.g: If the emailing service goes down, employees can still make referrals; hiring managers can still look at referrals, etc.

Each service can be deployed without waiting for other services to be done with their bugfixes, etc
- Assuming that there aren't any API changes to messages

## How to add a new service to the project?
(Look at how `login` does it) 

- Make a new folder `service_name` in the root directory
- Copy over `package.json`, `nest-cli.json`, `tsconfig.build.json`, `tsconfig.json` from an existing service
  - Make changes to the service's dependencies inside this `package.json` file (not the one in the root folder)
- Add a `src/` folder
- To install dependencies, run these lines through the terminal: (do this whenever you change dependencies in `package.json`)
```
  cd service_folder     (you can also `cd root_folder`)
  yarn install
```
- To run the service:
```
  cd service_folder   
  yarn run start
```

## How to setup microservices in NestJS?
https://docs.nestjs.com/microservices/basics
### Make the new service listen for incoming messages
Since each service is basically an independent application, you need to add a `main.ts` file to each service's `src/` folder.
This is an example `main.ts` file from `login`:
```ts
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { LoginModule } from './login.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<TcpOptions>(
    LoginModule,
    {
      transport: Transport.TCP,
      options: {
        port: 1234
      }
    }
  );
  await app.listen();
}
bootstrap();
```
Things that you should change:
- `port` number (1234 in this case). Make sure that the port is not already in use by other services (TODO: config files)
- `LoginModule` should be changed to the service's own module.

### Sending messages to the new service:
Let's say I want to send a message from `backend` to `login` (the new service). The `port` that I assigned is port 1234.

First, `backend` needs to register `login`:

In `backend.module.ts`:
```ts
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'LOGIN_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 1234
        }
      }
    ])
  ],
  ...
})
export class BackendModule {}
```
- Here, `name` (`LOGIN_SERVICE`) can be anything.
- `port` number (`1234`) is the same as the listening port.

Then, `backend` needs a proxy object to talk to `login`

Wherever you want to send a message (e.g.: `backend.service.ts`):
```ts
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
...
export class BackendService {
  constructor(
    ...
    @Inject('LOGIN_SERVICE') private readonly loginClient: ClientProxy
  ) {}
  
  someFunction() {
    const pattern = { cmd: "is this login legit?" }
    const payload = { username: 'hello', password: 'world' }
    return this.loginClient.send(pattern, payload)
  }
}
```
- `LOGIN_SERVICE` is the same name that is registered in `backend.module.ts`. You can `@Inject` to multiple files as well.
- A message is sent to `login` via `proxy.send(pattern, payload)`.
  - The first parameter acts as an id for the message

### Handling incoming messages
Now, `login` needs to handle the message in its Controller class:
In `login.controller.ts`:
```ts
import { MessagePattern, Payload } from '@nestjs/microservices';
...
@Controller()
export class LoginController {

  @MessagePattern({ cmd: "is this login legit?" })
  login_local(
    @Payload('username') username: string,
    @Payload("password") password: string
  ) {
      ...
      return 'all good' // (an object, a string, etc.)
  }
}
```
- `@MessagePattern` determines which message this function will handle. (In this case, `{ cmd: "is this login legit?" }`, which is the first parameter in `proxy.send`)
- `@Payload` maps the fields inside the payload to the function parameters.
- The return value will be returned to the `proxy.send` call as an `Observable`

// TODO: a demo perhaps

Reference materials:
- https://docs.nestjs.com/microservices/basics


