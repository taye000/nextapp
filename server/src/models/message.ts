import { Model, model, Schema } from "mongoose";
import { IMessage } from "../@types";

interface MessageModel extends Model<IMessage> {
  build(attrs: IMessage): IMessage;
}

const MessageSchema = new Schema<IMessage, MessageModel>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: false,
      ref: "Chat",
    },
    senderId: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "User",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "User",
    },
    receiverName: {
      type: String,
      trim: true,
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "Transaction",
    },
    content: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
    timestamps: true,
  }
);

// statics
MessageSchema.statics.build = (attrs: IMessage) => {
  return new Message(attrs);
};

// creating Message model
const Message = model<IMessage>("Message", MessageSchema);

export default Message;
