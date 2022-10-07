import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorInterface } from '../interfaces/error.interface';
import { ResponseInterface } from '../interfaces/response.interface';
import { CreateAccountInterface } from './dto/create.account.dto';
import {
  Account,
  AccountDocumet,
  AccountSchema,
} from './entities/account.entity';

export type moneyOperationType = 'add' | 'remove';

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

  async findById(id: string): Promise<any | ErrorInterface> {
    console.log(id);
    if (!(await this.accountModel.findById({ _id: id }))) {
      return {
        code: 404,
        message: 'user not exist',
      };
    }
    return {
      code: 200,
      account: await this.accountModel.findById({ _id: id }).exec(),
    };
  }

  async getAllAccount(): Promise<any | ErrorInterface> {
    return { code: 200, account: await this.accountModel.find().exec() };
  }

  async moneyOperation(
    id: string,
    amount: number,
    typeOperation: moneyOperationType,
  ) {
    if (!typeOperation || typeOperation != 'add' || typeOperation != 'remove') {
      return {
        code: 505,
        message: 'please put type of transaction add || remove',
      };
    }
    let currentAccount: Account = await this.accountModel.findById(id);

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
        account: await this.findById(id),
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
        account: await this.findById(id),
      };
    }
  }

  async removeMoney(id: string, amount: number) {}

  async deleteAll() {
    return await this.accountModel.deleteMany({}).exec();
  }
}
