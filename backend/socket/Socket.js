import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend server
    methods: ["GET", "POST"],
    credentials: true 
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != undefined) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.emit('nm', 'Message from server');
  console.log("a user connected", socket.id, userSocketMap);

  // console.log("inside server last:", userSocketMap["66d55bee7b3bffd755bb0bab"]);
  const someval = getReceiverId("66d55bee7b3bffd755bb0bab");

  console.log("inside server last lakshmi:", someval);

  // socket.on('newMessage', (data) => {
  //   console.log("New message received:", data);
  //   // Broadcast the message to all connected clients
  //   io.emit('newMessage', data);
  // });

  socket.on('newMessage',(data)=>{
    
    console.log("New message received:", data);
  })

  // socket.emit('newMessage', { text: "Welcome to the chat!" });
  




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
