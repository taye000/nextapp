import { Schema } from "mongoose";

export interface ITransaction {
  id?: string;
  phone?: string;
  userId: Schema.Types.ObjectId;
  amount: number;
  mode: string;
  item: string;
  orderId: string;
  accountNumber?: string;
  assigned?: Schema.Types.ObjectId;
  status?: string;
}
