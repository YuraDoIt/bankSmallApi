import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { moneyOperationType } from '../commonStructure/moneyOperationType';
import { AccountService } from './account.service';
import { CreateAccountI } from './dto/create.account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/byid')
  async getAccoutnById(
    @Body() body: { id: string },
    @Param() currency: string,
  ) {
    return this.accountService.findById(body.id);
  }

  @Get('getAll')
  async getAllAccount() {
    return this.accountService.getAllAccount();
  }

  @Get('addMoney')
  async moneyTransact(
    @Body()
    body: {
      id: string;
      amount: number;
      typeTransact: moneyOperationType;
    },
  ) {
    return this.accountService.moneyOperation(
      body.id,
      body.amount,
      body.typeTransact,
    );
  }

  @Post('create')
  async createAccount(@Body() dto: CreateAccountI) {
    return await this.accountService.createAccount(dto);
  }

  @Delete('delete')
  async deleteAll() {
    return await this.accountService.deleteAll();
  }
}
