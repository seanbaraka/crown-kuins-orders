import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('orders.port');
  const tcpPort = config.get<number>('orders.microservice.port');
  const tcpHost = config.get('orders.microservice.host')
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: tcpHost,
      port: tcpPort
    }
  })
  await app.startAllMicroservices()
  await app.listen(port, async() => {
    console.log('Orders Service\n--------------')
    console.log(`Http Server running on ${await app.getUrl()}`);
    console.log(`TCP Server running on port ${tcpPort}\n`)
  });
}
bootstrap();
