import { Schema, model, Model } from "mongoose";
import { IUser } from "../@types/";
import { PasswordManager } from "../utils";

//an interface that describes attributes a user model should have
interface UserModel extends Model<IUser> {
  build(attrs: IUser): IUser;
}

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 50,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: "Nairobi, Kenya",
    },
    photo: {
      type: String,
      default: "",
    },
    coverPhoto: {
      type: String,
      default: "",
    },
    account_type: {
      type: String,
      default: "",
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    passwordReset: {
      is_changed: {
        type: Boolean,
      },
    },
    otp: {
      type: String,
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
//pre save hook to hash password before it is saved to db
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("Password Changed");
    const hashedPassword = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  next();
});

//statics
UserSchema.statics.build = (attrs: IUser) => {
  return new User(attrs);
};

//creating user model
const User = model<IUser>("users", UserSchema);

export default User;
