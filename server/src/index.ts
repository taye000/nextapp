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
  server.listen(config.PORT || 5000, () => {
    console.log(`Server started at port ${config.PORT}`, server.address());
  });

  // socket.io
  io.on("connection", (socket) => {
    console.log("a user connected");

    // receive user data from client
    socket.on("userData", (data) => {
      socket.join(data.id);
      socket.emit("connected:", data.id);
    });
    // join room
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log("user joined room:", room);
    });

    socket.on("chatMessage", async (message) => {
      if (!message) return;
      try {
        // save chat to db
        const chat = await Chat.create({
          chatName: message.chatName,
          users: [message.userId, message.clientId],
          // latestMessage: message.message,
        });
        await chat.save();
        console.log("chat saved", chat);

        // find receiver from users Array
        const receiver = chat.users.find((user) => user !== message.senderId);
        console.log("chat users", chat.users);

        console.log("receiver", receiver);

        // save message to db
        const msg = await Message.create({
          content: message.message,
          senderId: message.sender,
          receiverId: receiver,
          chatId: chat._id,
        });
        await msg.save();
        console.log("msg saved", msg);
      } catch (error) {
        console.log("Error saving chat", error);
      }
      // broadcast message to client
      const res = socket.in(message.userId).emit("chatMessage", message);
      console.log("chatMessage:", res);
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
