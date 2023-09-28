export interface ITransaction {
  id: string;
  phone?: string;
  userId: string;
  clientId: string;
  amount: number;
  mode: string;
  item: string;
  customerStatus: string;
  orderId?: string;
  accountNumber?: string;
  status?: string;
}
export interface IUser {
  id?: string;
  name?: string;
  email: string;
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
export enum IAppealStatus {
  PENDING = "pending",
  RESOLVED = "resolved",
  UNDER_REVIEW = "under review",
}
export interface IMessage {
  createdAt?: any;
  id?: string;
  chatId?: any;
  chatName: any;
  senderId: any;
  receiverId?: string;
  transactionId: string;
  clientId: string;
  content: string;
  userId: string;
}

export interface IChat {
  id?: string;
  chatName?: string;
  users: string[];
  latestMessage?: string;
}