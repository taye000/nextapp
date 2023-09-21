import { Schema } from "mongoose";

export interface IMessage {
  id?: string;
  chat: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  content: string;
}