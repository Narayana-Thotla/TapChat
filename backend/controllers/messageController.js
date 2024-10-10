import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
import { getReceiverId } from "../socket/Socket.js";
import { app, io, server } from "../socket/Socket.js";

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

export const sendMessage = async (req, res) => {
  try {
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
      io.to(receiverSocketId).emit("haha", newMessage);
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
