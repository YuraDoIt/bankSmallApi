import { Controller, Get, Body, Post } from '@nestjs/common';
import { CreateAccountI } from '../account/dto/create.account.dto';
import { CreateTransactionDtoI } from './dto/create.transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
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

  @Post('create')
  async createTransact(@Body() dto: CreateTransactionDtoI) {
    console.log(dto);
    return this.transactionService.createTransaction(dto);
  }
}
