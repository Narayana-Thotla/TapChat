import express from "express"
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
app.use(cookieParser());
app.use(cors())

export const sendMessage = (req, res) => {
  try {
    const {message}=req.body;
    const {id}=req.params;
    const senderId = req.userId
    console.log("line-14:",req.cookies)
    console.log("message sent successfully", req.params);
    res.send("message sent successfully");
  } catch (error) {
    console.log("erroe in sending message", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
