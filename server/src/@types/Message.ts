import { Schema } from "mongoose";

export interface IMessage {
  id?: string;
  chat?: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  transactionId?: Schema.Types.ObjectId;
  orderId?: string;
  phone?: string;
  amount?: number;
  mode?: string;
  item?: string;
  customerAppeal?: string;
  appeal?: string;
  comment?: string;
  accountNumber?: string;
  status?: string;
  customerStatus?: string;
}