import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    AccountModule,
    TransactionModule,
    MongooseModule.forRoot(
      `mongodb://root:pass12345@mongodb:27017/shop?serverSelectionTimeoutMS=2000&authSource=admin`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
