import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const config = app.get<ConfigService>(ConfigService);

  const port = config.get('payments.port');
  const rabbitHost = config.get<string>('rabbit.url');

  const rabbitOptions: RmqOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitHost],
      queue: 'payments_queue',
      queueOptions: {
        durable: false,
      },
    },
  };

  app.connectMicroservice<MicroserviceOptions>(rabbitOptions);
  await app.startAllMicroservices();

  await app.listen(port, async () => {
    console.log('Payments Service\n---------------');
    console.log(`Http Server running on ${await app.getUrl()}`);
    console.log(`Connected to rabbit on ${rabbitHost}\n`);
  });
}
bootstrap();
