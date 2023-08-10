import { Schema, model, Model } from "mongoose";
import { ISubscriber } from "../@types/";

//an interface that describes attributes a user model should have
interface SubscriberModel extends Model<ISubscriber> {
  build(attrs: ISubscriber): ISubscriber;
}

const SubscriberSchema = new Schema<ISubscriber, SubscriberModel>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    }
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

//statics
SubscriberSchema.statics.build = (attrs: ISubscriber) => {
  return new Subscriber(attrs);
};

//creating Subscriber model
const Subscriber = model<ISubscriber>("Subscriber", SubscriberSchema);

export default Subscriber;
