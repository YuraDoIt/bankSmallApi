import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocumet } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  accountModel: any;
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocumet>,
  ) {}

  async getAllAccount(): Promise<any> {
    return await this.accountModel.find().exec();
  }
}
