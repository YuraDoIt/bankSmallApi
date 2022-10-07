import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('id')
  async getTransactionById() {
    // return this.transactionService.findById('1');
  }

  @Get('account')
  async getAllTransaction() {
    return this.transactionService.getAllAccount();
  }
}
