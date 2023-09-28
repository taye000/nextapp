import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config";
import { config } from "./config/config";
import { configureMiddleware } from "./middleware";
import { configureRoutes } from "./routes";
import Message from "./models/message";
import Chat from "./models/chat";

const main = async () => {
  //connect to db
  await connectDB();

  //initialize express
  const app = express();

  //initialize http server
  const server = http.createServer(app);

  // initialize socket.io
  const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "HEAD", "PATCH", "POST", "PUT", "DELETE"],
    },
  });

  //configure express middleware
  configureMiddleware(app);

  //set up routes
  configureRoutes(app);

  //start server
  server.listen(config.PORT || 5001, () => {
    console.log(`Server started at port ${config.PORT}`, server.address());
  });

  // socket.io
  io.on("connection", (socket) => {
    console.log("a user connected");

    // receive user data from client
    socket.on("userData", (data) => {
      socket.join(data.id);
      socket.emit("connected:", data.id);
      console.log("user data received:", data.id);
    });
    // join room
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log("user joined room:", room);
    });

    socket.on("chatMessage", async (msgData) => {
      if (!msgData) return;

      // find receiver
      let receiver;
      if (msgData.clientId !== msgData.senderId) {
        receiver = msgData.clientId;
      } else {
        receiver = msgData.userId;
      }

      try {
        // save chat to db
        const chat = await Chat.create({
          chatName: msgData.chatName,
          users: [msgData.senderId, msgData.clientId],
          // latestMessage: message.message,
        });
        await chat.save();
        console.log("chat saved", chat);

        console.log("chat users", chat.users);

        console.log("receiver", receiver);

        // save message to db
        const msg = await Message.create({
          content: msgData.content,
          senderId: msgData.senderId,
          receiverId: receiver,
          transactionId: msgData.transactionId,
          chatId: chat._id,
        });
        await msg.save();
        console.log("msg saved", msg);

        // broadcast message to client
        socket.in(msgData.transactionId).emit("messageReceived", msg);
        console.log("message received", msg);
      } catch (error) {
        console.log("Error saving chat", error);
      }
    });

    // to print any event received from client
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

main();
