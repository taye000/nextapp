import { Schema } from "mongoose";

export interface ITransaction {
  id?: string;
  phone?: string;
  clientId: String;
  amount: number;
  item: string;
  userId: Schema.Types.ObjectId;
  mode?: string;
  description?: string;
  customerAppeal?: string;
  appeal?: string;
  orderId?: string;
  comment?: string;
  customerComment?: string;
  photos?: string[];
  customerPhotos?: string[];
  accountNumber?: string;
  status?: string;
  customerStatus?: string;
}
