import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const config = app.get<ConfigService>(ConfigService);

  const port = config.get('payments.port')
  const tcpPort = config.get<number>('payments.microservice.port')
  const tcpHost = config.get('payments.microservice.host')

  await app.listen(port, async() => {
    console.log('Payments Service\n---------------')
    console.log(`Http Server running on ${await app.getUrl()}`);
    console.log(`TCP Server running on port ${tcpPort}\n`)
  });
}
bootstrap();
