import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorInterface } from '../interfaces/error.interface';
import { CreateAccountInterface } from './dto/create.account.dto';
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

  async createAccount(
    dto: CreateAccountInterface,
  ): Promise<Account | ErrorInterface> {
    if (dto.balans < 0) {
      return {
        code: 404,
        message: 'balanse cannot be less 0',
      };
    }
    return new this.accountModel(dto).save();
  }

  async findById(id: string): Promise<Account | ErrorInterface> {
    console.log(id);
    if (!(await this.accountModel.findById({ _id: id }))) {
      return {
        code: 404,
        message: 'user not exist',
      };
    }
    return await this.accountModel.findById({ _id: id }).exec();
  }

  async getAllAccount(): Promise<any> {
    return await this.accountModel.find().exec();
  }

  async addMoney(id: number, amount: number) {
    console.log(await this.accountModel.find({ id: id }));

    let update = await this.accountModel.findOneAndUpdate(
      { id: id },
      { $set: { balans: +amount } },
    );

    console.log(update);
  }

  async deleteAll() {
    return await this.accountModel.deleteMany({}).exec();
  }
}
