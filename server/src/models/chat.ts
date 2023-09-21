import { Model, model, Schema } from "mongoose";
import { IChat } from "../@types";

interface ChatModel extends Model<IChat> {
  build(attrs: IChat): IChat;
}

const ChatSchema = new Schema<IChat, ChatModel>(
  {
    chatName: {
        type: String,
        trim: true,
        },
    users: [{
      type: Schema.Types.ObjectId,
      trim: true,
      required: true,
      ref: "User",
    }],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
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
ChatSchema.statics.build = (attrs: IChat) => {
  return new Chat(attrs);
};

// creating Chat model
const Chat = model<IChat>("Chat", ChatSchema);

export default Chat;
