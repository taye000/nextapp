import { Request, Response } from "express";
import Message from "../models/message";

//controller to get all transactions from the blockchain
export const getMessages = async (_req: Request, res: Response) => {
    try {
        const {transactionId} = _req.params;
      const messages = await Message.find({ transactionId});
      res.status(200).json({ messages });
    } catch (error: any) {
      return res.status(404).json({ msg: error.message });
    }
  };