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
import { moneyOperationDto } from './dto/money.operation.dto';
import { moneyTransactionDto } from './dto/money.transaction.dto';

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

  @Post('money')
  async addMoney(
    @Body()
    body: moneyOperationDto,
  ) {
    return this.accountService.addMoney(body.id, body.amount);
  }

  @Post('removeMoney')
  async removeMoney(
    @Body()
    body: moneyOperationDto,
  ) {
    return this.accountService.removeMoney(body.id, body.amount);
  }

  @Post('create')
  async createAccount(@Body() dto: CreateAccountI) {
    return await this.accountService.createAccount(dto);
  }

  @Post('transaction')
  async makeTransaction(@Body() body: moneyTransactionDto) {
    return this.accountService.makeTransaction(body);
  }

  @Delete('delete')
  async deleteAll() {
    return await this.accountService.deleteAll();
  }
}
