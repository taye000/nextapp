import { Schema, model, Model } from "mongoose";
import { ITransaction } from "../@types";

export enum ITransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  APPEALED = "appealed",
}
export enum IAppealStatus {
  PENDING = "pending",
  RESOLVED = "resolved",
  UNDER_REVIEW = "under review",
}
//an interface that describes attributes the model should have
interface TransactionModel extends Model<ITransaction> {
  build(attrs: ITransaction): ITransaction;
}

const TransactionSchema = new Schema<ITransaction, TransactionModel>(
  {
    phone: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      trim: true,
      required: true,
    },
    mode: {
      type: String,
      trim: true,
    },
    item: {
      type: String,
      trim: true,
      required: true,
      max: 50,
    },
    description: {
      type: String,
      trim: true,
    },
    orderId: {
      type: String,
      trim: true,
    },
    accountNumber: {
      type: String,
      trim: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    customerComment: {
      type: String,
      trim: true,
    },
    appeal: {
      type: Schema.Types.Mixed,
    },
    customerAppeal: {
      type: Schema.Types.Mixed,
    },
    photos: {
      type: [String],
      default: [],
    },
    customerPhotos: {
      type: [String],
      default: [],
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Schema.Types.Mixed,
      default: ITransactionStatus.PENDING,
    },
    customerStatus: {
      type: Schema.Types.Mixed,
      default: ITransactionStatus.PENDING,
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

//static method to build a user
TransactionSchema.statics.build = (attrs: ITransaction) => {
  return new Transaction(attrs);
};
//create a transaction model
const Transaction = model<ITransaction>("Transactions", TransactionSchema);

export default Transaction;
