import express from "express"
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import cookie from 'cookie'
import conversationModel from '../models/conversationModel.js'
import messageModel from '../models/messageModel.js'

const app = express();
app.use(cookieParser());
app.use(cors())

export const sendMessage = async (req, res) => {
  try {
    // const token = cookie.parse(req.headers.cookie || "");
    const {message}=req.body;
    const {id:idString}=req.params;
    const receiverId = new mongoose.Types.ObjectId(idString);
    let senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      participants:{$all:[senderId,receiverId]}
    });

    if(!conversation){
      conversation = await conversationModel.create({
        participants:[senderId,receiverId]
      });
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message
    })

if (newMessage) {
  conversation.messages.push(newMessage._id)
}

await Promise.all([conversation.save(),newMessage.save()])

    res.send("message sent successfully");
  } catch (error) {
    console.log("error in sending message:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};


export const getMessage = async (req,res)=>{
  try {
    const {id:userToChatId} = req.params;
    const senderId = req.user._id

const conversation  = await conversationModel.findOne({
  participants:{$all:[senderId,userToChatId,]}
}).populate('messages')


res.status(200).send(conversation)

  } catch (error) {
    console.log("error in getting message:", error.message);
    res.status(500).json({ error: "internal server error" });
    
  }
}
