import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const config = app.get<ConfigService>(ConfigService);

  const port = config.get('payments.port')
  const redisPort = config.get<number>('redis.port')
  const redisHost = config.get('redis.host')

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: redisHost,
      port: redisPort
    }
  });
  await app.startAllMicroservices()

  await app.listen(port, async() => {
    console.log('Payments Service\n---------------')
    console.log(`Http Server running on ${await app.getUrl()}`);
    console.log(`Connected to redis on port ${redisPort}\n`)
  });
}
bootstrap();
