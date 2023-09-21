import { Schema } from "mongoose";

export interface IChat {
    id?: string;
    chatName?: string;
    users: Schema.Types.ObjectId[];
    latestMessage?: Schema.Types.ObjectId;
}