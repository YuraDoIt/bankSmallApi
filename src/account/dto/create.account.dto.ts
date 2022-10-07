import { Transaction } from '../../transaction/entities/transaction.entity';

export interface CreateAccountI {
  username: string;
  phone: string;
  date: string;
  balans: number;
  transaction: Transaction[];
}
