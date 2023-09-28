import { Request, Response } from "express";
import Chat from "../models/chat";
import { IChat } from "../@types";

//controller to get all Chats from db
export const getUserChats = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  try {
    const chats = await Chat.find({
      users: { $in: [userId] },
    }); // Retrieve Chats that match either the user ID or the client ID
    res.status(200).json({ chats });
  } catch (error: any) {
    return res.status(404).json({ msg: error.Chat });
  }
};

//controller to get a single Chat from db
export const getUserChat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findOne({ _id: id });
    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }
    res.status(200).json({ chat });
  } catch (error: any) {
    return res.status(404).json({ msg: error.Chat });
  }
};

//controller to get all Chats for a transaction from db
export const getTXUserChats = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  const transactionId = req.params?.id;

  try {
    const chats = await Chat.find({
      $and: [
      {users: { $in: [userId] },},
      {transactionId: transactionId},
      ],
    });
    res.status(200).json({ chats });
  } catch (error: any) {
    return res.status(404).json({ msg: error.Chat });
  }
};