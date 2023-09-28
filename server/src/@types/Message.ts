import { Schema } from "mongoose";

export interface IMessage {
  id?: string;
  chatId: Schema.Types.ObjectId;
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  transactionId: Schema.Types.ObjectId;
  content: string;
}