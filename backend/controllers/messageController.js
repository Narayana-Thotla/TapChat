import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import cookie from "cookie";
import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
import { getReceiverId } from "../socket/Socket.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { Socket } from "node:dgram";
import {app,io,server} from '../socket/Socket.js'


// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Allow frontend server
//     methods: ["GET", "POST"],
//     credentials:true
//   },
// });
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));

export const sendMessage = async (req, res) => {
  try {
    // const token = cookie.parse(req.headers.cookie || "");
    const { message } = req.body;
    const { id: idString } = req.params;
    const receiverId = new mongoose.Types.ObjectId(idString);
    let senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverId(`${receiverId.toString()}`);
    console.log("receierSocketId:", receiverId.toString(), receiverSocketId);

    if (receiverSocketId) {
      //
      // setTimeout(() => {
      //   if (io) {
          io.to(receiverSocketId).emit('haha',newMessage)
      //     io.emit('nm','amma endi dra babu')
      //     console.log("Message emitted to client:");
      //   } else {
      //     console.log("Socket disconnected before emitting message.");
      //   }
      // }, 5000);

      // io.emit("nm", "finally the flow is going inside");

    //   console.log("Emitting new message:", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    // console.log("error in sending message:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate("messages");

    if (!conversation) return res.status(200).json([]);

    res.status(200).send(conversation.messages);
  } catch (error) {
    console.log("error in getting message:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
