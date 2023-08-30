import { Schema } from "mongoose";

export interface ITransaction {
  id?: string;
  phone?: string;
  clientId: String;
  amount: number;
  mode: string;
  item: string;
  userId: Schema.Types.ObjectId;
  customerAppeal?: string;
  appeal?: string;
  orderId?: string;
  comment?: string;
  accountNumber?: string;
  status?: string;
  customerStatus?: string;
}
