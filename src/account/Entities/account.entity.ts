import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Min } from 'class-validator';
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

  @Min(0)
  @Prop()
  public balans: number;

  @Prop({ type: [Types.ObjectId], ref: Transaction.name })
  public transaction: Transaction[];
}

export const AccountSchema = SchemaFactory.createForClass(Account);
