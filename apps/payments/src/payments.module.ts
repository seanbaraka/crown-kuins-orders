import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'configuration';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration]})],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
