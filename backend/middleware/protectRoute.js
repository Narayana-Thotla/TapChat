import jwt from "jsonwebtoken";
import express from "express";
import cookie from "cookie";
import userModel from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = cookie.parse(req.headers.cookie || "");
    // console.log("given token:", token);
    var decoded = jwt.verify(token.token, process.env.cookieToken);
    // console.log("decoded.id", decoded.id);

    if (!token) {
       res.status(400).send("unauthorized , no token") 
    }
    if (!decoded) {
      res.status(400).send("login into the app - token error/missing");
    }

    const user = await userModel.findById(decoded.id)
    if (!user) {
        res.status(400).send('login into the app -  error/missing/NO user')

    }
    req.user = user;
    // console.log("userid-in-protectRoute:", req.user._id);
    next();
  } catch (error) {
    console.log("protected routing error", error.message);
    res.status(400).send("login into the application - token error/missing");
  }
};
export default protectRoute;
