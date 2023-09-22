import { Router } from "express";
import { validateRequest, validateToken } from "../../middleware";
import { createFetchChat, getUserChat, getUserChats } from "../../controllers";

const router = Router();

router.get("/get-user-chat/:id", validateRequest, validateToken, getUserChat);

router.get("/get-user-chats", validateRequest, validateToken, getUserChats);

router.post("/create-fetch-chat", validateRequest, validateToken, createFetchChat);

module.exports = router;
