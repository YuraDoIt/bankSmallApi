import { Account } from '../account/entities/account.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

type typeAccount = (Account & Document) | (Account[] & Document) | null;
type typeTransaction = Transaction | Transaction[] | null;

export class ResponseInterface extends Document {
  public code?: number;
  public account?: typeAccount;
  public transaction?: typeTransaction;
}
