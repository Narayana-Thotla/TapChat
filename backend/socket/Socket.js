import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);


const allowedOrigins = ['http://localhost:5173', 'https://tapchat-34hc.onrender.com'];
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,  // Allows cookies and other credentials
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != undefined) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  console.log("a user connected", socket.id, userSocketMap);

  const someval = getReceiverId("66d55bee7b3bffd755bb0bab");

  console.log("inside server last lakshmi:", someval);

  socket.on('newMessage',(data)=>{
    
    console.log("New message received:", data);
  })





  console.log("usersocketmap:", userSocketMap["66d55bee7b3bffd755bb0bab"]);
  

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export const getReceiverId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { app, io, server };
