import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Account,
  AccountDocumet,
  AccountSchema,
} from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocumet>,
  ) {}

  async findById(id: string) {
    await new this.accountModel({ balans: 100, transaction: '1233' }).save();
    console.log(await this.accountModel.findById({ _id: '6' }));
    return await this.accountModel.find().exec();
  }

  async getAllAccount(): Promise<any> {
    return await this.accountModel.find().exec();
  }

  async;
}
