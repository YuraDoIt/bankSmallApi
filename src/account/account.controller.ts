import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('id')
  async getAccoutnById() {
    return this.accountService.findById('1');
  }

  @Get('account')
  async getAllAccount() {
    return this.accountService.getAllAccount();
  }
}
