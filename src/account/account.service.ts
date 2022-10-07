import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { currencyType } from '../commonStructure/currency.type';
import { ErrorInterface } from '../commonStructure/error.interface';
import { moneyOperationType } from '../commonStructure/moneyOperationType';
import { ResponseInterface } from '../commonStructure/response.interface';
import { Transaction } from '../transaction/entities/transaction.entity';
import { CreateAccountI } from './dto/create.account.dto';
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

  async createAccount(dto: CreateAccountI): Promise<Account | ErrorInterface> {
    if (dto.balans < 0) {
      return {
        code: 404,
        message: 'balanse cannot be less 0',
      };
    }
    return new this.accountModel(dto).save();
  }

  async getAllAccount(): Promise<any | ErrorInterface> {
    return {
      code: 200,
      account: await this.accountModel
        .find()
        .populate('transaction', null, Transaction.name)
        .exec(),
    };
  }

  async findById(
    id: string,
    currency?: currencyType,
  ): Promise<any | ErrorInterface> {
    if (await this.findById(id)) {
      return {
        code: 404,
        message: 'user not exist',
      };
    }
    return {
      code: 200,
      account: await this.findById(id),
    };
  }

  async moneyOperation(
    id: string,
    amount: number,
    typeOperation: moneyOperationType,
  ) {
    if (!typeOperation) {
      return {
        code: 505,
        message: 'please put type of transaction add || remove',
      };
    }
    if (typeOperation != 'add') {
      if (typeOperation != 'remove')
        return {
          code: 505,
          message: 'please put type of transaction add || remove',
        };
    }

    let currentAccount: Account = await this.getAccountById(id);

    if (!currentAccount) {
      return {
        code: 400,
        message: 'current account by id not exist',
      };
    }

    if (typeOperation === 'add') {
      let update = await this.accountModel
        .findOneAndUpdate(
          { id: id },
          { $set: { balans: currentAccount.balans + amount } },
        )
        .exec();

      console.log(update);

      return {
        code: 200,
        account: await this.getAccountById(id),
      };
    } else if (typeOperation === 'remove') {
      if (currentAccount.balans < amount) {
        return {
          code: 505,
          message: 'balanse is less than amount',
        };
      }
      let update = await this.accountModel
        .findOneAndUpdate(
          { id: id },
          { $set: { balans: currentAccount.balans - amount } },
        )
        .exec();

      return {
        code: 200,
        account: await this.getAccountById(id),
      };
    }
  }

  async deleteAll() {
    return await this.accountModel.deleteMany({}).exec();
  }

  async getAccountById(id: string): Promise<Account> {
    return await this.accountModel.findById(id).exec();
  }
}
