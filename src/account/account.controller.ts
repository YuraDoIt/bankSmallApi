import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountInterface } from './dto/create.account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/byid')
  async getAccoutnById(@Body() body: { id: string }) {
    console.log(body.id);
    return this.accountService.findById(body.id);
  }

  @Get('/getAll')
  async getAllAccount() {
    return this.accountService.getAllAccount();
  }

  @Get('addMoney')
  async addMonyet() {
    return this.accountService.addMoney(1, 200);
  }

  @Post('create')
  async createAccount(@Body() dto: CreateAccountInterface) {
    return await this.accountService.createAccount(dto);
  }

  @Delete('all')
  async deleteAll() {
    return await this.accountService.deleteAll();
  }
}
