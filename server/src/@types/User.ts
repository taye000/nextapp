import { JwtPayload } from "jsonwebtoken";

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  photo?: string;
  coverPhoto?: string;
  location?: string;
  account_type?: string;
  is_admin?: boolean;
  is_active?: string;
  otp?: string;
  passwordReset?: {
    is_changed: boolean;
  };
}

export interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  is_active?: boolean;
  is_admin?: boolean;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export interface ISubscriber {
  id?: string;
  email: string;
  is_active?: boolean;
}