import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDtoI } from './dto/create.transaction.dto';
import { Transaction, TransactionDocumet } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocumet>,
  ) {}

  async getAllAccount(): Promise<any> {
    return await this.transactionModel.find().exec();
  }

  async createTransaction(dto: CreateTransactionDtoI): Promise<any> {
    let newTransacton = await new this.transactionModel(dto).save();
    return newTransacton;
  }
}
