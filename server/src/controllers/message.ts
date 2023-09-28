import { Request, Response } from "express";
import Message from "../models/message";

//controller to get all messages from db
export const getUserMessages = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;

  try {
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }); // Retrieve messages that match either the user ID or the client ID
    res.status(200).json({ messages });
  } catch (error: any) {
    return res.status(404).json({ msg: error.message });
  }
};

//controller to get a single message from db
export const getUserMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await Message.findOne({ _id: id });
    if (!message) {
      return res.status(404).json({ msg: "Message not found" });
    }
    res.status(200).json({ message });
  } catch (error: any) {
    return res.status(404).json({ msg: error.message });
  }
};

//controller to get all messages for a transactionId from db
export const getTXUserMessages = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  const transactionId = req.params?.id;

  try {
    const messages = await Message.find({
      $and: [
        { $or: [{ senderId: userId }, { receiverId: userId }] },
        { transactionId: transactionId },
      ],
    });
    res.status(200).json({ messages });
  } catch (error: any) {
    return res.status(404).json({ msg: error.message });
  }
};
