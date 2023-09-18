import { Schema } from "mongoose";

export interface IMessage {
  id?: string;
  orderId?: string;
  clientId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  message: string;
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