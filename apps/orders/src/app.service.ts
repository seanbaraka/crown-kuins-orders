import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('PAYMENTS_SERVICE') private paymentService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async updatePayment() {
    return firstValueFrom(
      this.paymentService.send(
        { cmd: 'updatePayment' },
        {
          account: 'Test Account',
          amount: 2500,
          currency: 'KES',
        },
      ),
    );
  }
}
