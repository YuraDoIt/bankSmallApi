import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';

export type TransactionDocumet = Transaction & Document;

@Schema()
export class Transaction {
  @Transform(({ value }) => value.toString())
  public _id: Types.ObjectId;

  @Prop()
  public dateTransaction: string;

  @Prop()
  public idSender: string;

  @Prop()
  public idGetter: string;

  @Prop()
  public amountMoney: number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
