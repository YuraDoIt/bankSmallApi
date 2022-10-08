import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { currencyType } from '../commonStructure/currency.type';
import { ErrorInterface } from '../commonStructure/error.interface';
import { Transaction } from '../transaction/entities/transaction.entity';
import { CreateAccountI } from './dto/create.account.dto';
import { moneyTransactionDto } from './dto/money.transaction.dto';
import { Account, AccountDocumet } from './entities/account.entity';

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
      account: await this.getAccountById(id),
    };
  }

  async addMoney(id: string, amount: number) {
    let changedAmount = 0;

    let currentAccount: Account = await await this.getAccountById(id);
    if (!currentAccount) {
      return {
        code: 400,
        message: 'current account by id not exist',
      };
    }

    changedAmount = currentAccount.balans + amount;
    await this.accountModel
      .findByIdAndUpdate(id, { $set: { balans: changedAmount } })
      .exec();

    return {
      code: 200,
      account: await this.getAccountById(id),
    };
  }

  async removeMoney(id: string, amount: number) {
    let changedAmount = 0;
    let currentAccount: Account = await this.getAccountById(id);
    if (!currentAccount) {
      return {
        code: 400,
        message: 'current account by id not exist',
      };
    }
    if (currentAccount.balans < amount) {
      return {
        code: 505,
        message: 'balanse is less than amount',
      };
    }
    if (currentAccount.balans === 0) {
      return {
        code: 400,
        message: 'balance on you account is 0 please add some money',
      };
    }

    changedAmount = currentAccount.balans - amount;
    let update = await this.accountModel
      .findByIdAndUpdate(id, { $set: { balans: changedAmount } })
      .exec();

    return {
      code: 200,
      account: await this.getAccountById(id),
    };
  }

  async makeTransaction(body: moneyTransactionDto) {
    let senderAccount = await this.removeMoney(body.id_lend, body.amount);
    if (senderAccount.code !== 200) {
      return {
        code: 400,
        message: 'cannot do this operation money is not enought',
      };
    }
    let getterAccount = await this.addMoney(body.id_get, body.amount);

    return {
      send: senderAccount,
      get: getterAccount,
    };
  }

  async deleteAll() {
    return await this.accountModel.deleteMany({}).exec();
  }

  async getAccountById(id: string): Promise<Account> {
    return await this.accountModel.findById(id).exec();
  }
}
