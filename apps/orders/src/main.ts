import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('orders.port');
  const redisPort = config.get<number>('redis.port');
  const redisHost = config.get('redis.host')
  const redisUser = config.get('redis.user');
  const redisPass = config.get('redis.password')
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: redisHost,
      port: redisPort,
      username: redisUser,
      password: redisPass
    }
  })
  await app.startAllMicroservices()
  await app.listen(port, async() => {
    console.log('Orders Service\n--------------')
    console.log(`Http Server running on ${await app.getUrl()}`);
    console.log(`Connected to redis on port ${redisPort}\n`)
  });
}
bootstrap();
