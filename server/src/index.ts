import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config";
import { config } from "./config/config";
import { configureMiddleware } from "./middleware";
import { configureRoutes } from "./routes";
import Message from "./models/message";

const main = async () => {
  //connect to db
  await connectDB();

  //initialize express
  const app = express();

  //initialize http server
  const server = http.createServer(app);

  // initialize socket.io
  const io = new Server(server, {
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

    socket.on("chatMessage", async (message) => {
      try {
        // save chat to db
        const chat = await Message.create({
          message: message.message,
          clientId: message.clientId,
          userId: message.userId,
        });
        await chat.save();
        console.log("chat saved", chat);
        
        
      } catch (error) {
        console.log("Error saving chat", error);
        
      }
      // broadcast message to all clients
      const res = io.emit("chatMessage", message);
      console.log("chatMessage", res);
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