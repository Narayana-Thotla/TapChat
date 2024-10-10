import jwt from "jsonwebtoken";
import express from "express";
import cookie from "cookie";
import userModel from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = cookie.parse(req.headers.cookie || "");
    var decoded = jwt.verify(token.token, process.env.cookieToken);

    if (!token) {
      res.status(400).send("unauthorized , no token");
    }
    if (!decoded) {
      res.status(400).send("login into the app - token error/missing");
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      res.status(400).send("login into the app -  error/missing/NO user");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("protected routing error", error.message);
    res.status(400).send("login into the application - token error/missing");
  }
};
export default protectRoute;
