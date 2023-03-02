import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  getHello(): string {
    return this.paymentsService.getHello();
  }

  @MessagePattern({ cmd: 'updatePayment'})
  async updatePayments(data: Record<string, string>) {
    console.log('-> The data', data);
    return {}
  }
}
