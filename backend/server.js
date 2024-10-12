import express from "express";
import dotenv from "dotenv";
import favicon from "serve-favicon";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';
import mongoose from "mongoose";
import userModel from "./models/userModel.js";
import userRoutes from "./routes/userRoutes.js";
import {app,server} from "./socket/Socket.js"
dotenv.config();

// const app = express();
const port = process.env.PORT;

const __dirname = path.resolve()


mongoose.connect(
  process.env.mongodb
);

const corsOptions = {
  origin: "http://localhost:5173", // replace with your frontend URL (e.g., http://localhost:3000 for dev)
  credentials: true, // allow sending cookies
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/frontend','/dist')));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);
app.get("*",(req,res)=>{
res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
})


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
