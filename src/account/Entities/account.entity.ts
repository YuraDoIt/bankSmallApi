import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Transaction } from '../../transaction/entities/transaction.entity';

export type AccountDocumet = Account & Document;

@Schema()
export class Account {
  @Transform(({ value }) => value.toString())
  public _id: Types.ObjectId;

  @Prop()
  public username: string;

  @Prop()
  public phone: string;

  @Prop()
  public date: string;

  @Prop()
  public balans: number;

  @Prop()
  public transaction: Transaction[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
