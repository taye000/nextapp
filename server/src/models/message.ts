import { Model, model, Schema } from "mongoose";
import { IMessage } from "../@types";

interface MessageModel extends Model<IMessage> {
  build(attrs: IMessage): IMessage;
}

const MessageSchema = new Schema<IMessage, MessageModel>(
  {
    message: {
        type: String,
        trim: true,
        required: true,
        },
    clientId: {
      type: Schema.Types.ObjectId,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: true,
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