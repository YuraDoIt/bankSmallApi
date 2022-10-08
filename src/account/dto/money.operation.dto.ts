import { moneyOperationType } from '../../commonStructure/moneyOperationType';

export interface moneyOperationDto {
  id: string;
  amount: number;
  typeTransact: moneyOperationType;
}
