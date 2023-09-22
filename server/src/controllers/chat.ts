import { Request, Response } from "express";
import Chat from "../models/chat";
import User from "../models/users";
import { IChat } from "../@types";

//controller to get all Chats from db
export const getUserChats = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  try {
    const chats = await Chat.find({
      $or: [{ userId }, { clientId: userId }],
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

//controller to create/fetch a Chat from db
export const createFetchChat = async (req: Request, res: Response) => {
  const { userId } = req.body;
  console.log("req.currentUser", req.currentUser);
  
  try {
    let existingChat: IChat | null = await Chat.findOne({
      users: {
        $all: [req.currentUser?.id, userId],
      },
    })
      .populate("users", "-password")
      .populate("latestMessage");

      
    if (!existingChat) {
      // If the chat doesn't exist, create a new one
      const chatData = {
        chatName: req.currentUser?.name,
        users: [req.currentUser?.id, userId],
      };

      const createdChat = new Chat(chatData);

      await createdChat.save();
      existingChat = createdChat;
    }

    res.status(200).json(existingChat);
    console.log("existingChat", existingChat);
    
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
