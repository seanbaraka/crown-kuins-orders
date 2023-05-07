import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('orders.port');
  const rabbitUrl = config.get('rabbit.url');

  const rabbitOptions: RmqOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitUrl],
      queue: 'orders_queue',
      queueOptions: {
        durable: false
      }
    }
  }
  app.connectMicroservice<MicroserviceOptions>(rabbitOptions)
  await app.startAllMicroservices()
  await app.listen(port, async() => {
    console.log('Orders Service\n--------------')
    console.log(`Http Server running on ${await app.getUrl()}`);
    console.log(`Connected to rabit on ${rabbitUrl}\n`)
  });
}
bootstrap();
