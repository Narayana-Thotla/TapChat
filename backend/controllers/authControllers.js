import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cookie from "cookie";

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export const signin = async (req, res) => {
  const { username, name, password, gender } = req.body;
  const userData = await userModel.findOne({ username: `${username}` });
  var dd;
  console.log(userData);

  if (userData == null) {
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const docs = await userModel.create({
          name: name,
          username: username,
          password: hash,
          gender: gender,
          profilepic: gender == "male" ? boyProfilePic : girlProfilePic,
        });
       console.log(docs)
      });
    });

    // console.log(dd._id)
    var token = jwt.sign({ id:id }, process.env.cookieToken, {
      // expiresIn: "15d",
    });
    res.cookie("token", token, {
      // maxAge: 15 * 24 * 60 * 60 * 1000,
      // httpOnly: true,
      // sameSite: "strict",
      // secure: process.env.NODE_ENV !== "developement",
    });

    res.status(201).json({ message: "sign up successfull" });
  } else {
    console.log("already exists");
    res.status(400).json({ error: "invalid user data" });
  }
};

export const login = async (req, res) => {
  const { username, name, password } = req.body;
  const userData = await userModel.findOne({ username: `${username}` });
  console.log("line 52:", req.body);
  console.log("66d0232f1fccd9e8d7afcaee:", userData.id);
  bcrypt.compare(password, userData.password || "", function (err, result) {
    if (username == userData.username && result == true) {
      // var token = jwt.sign({ id: _id }, process.env.cookieToken);
      // console.log("token:", token);
      // // console.log("cookie:",req.cookies.token);
      // res.cookie("token", token);

      var token = jwt.sign({ id: `${userData._id}` }, process.env.cookieToken, {
        // expiresIn: "15d",
      });
      res.cookie("token", token);
      // {
      // maxAge: 15 * 24 * 60 * 60 * 1000,
      // httpOnly: true,
      // sameSite: "strict",
      // secure: process.env.NODE_ENV !== "developement",
      // });
      // console.log("line-71:",token,req.cookies)
      res.send("login successfull");
    } else {
      res.status(500).json({ error: "invalid username or password" });
    }
  });
};

export const logout = (req, res) => {
  try {
    // cookieParser(req.headers.cookie)["token"];
    // cookieParser.JSONCookies(req.headers.cookie)

    const cookies = cookie.parse(req.headers.cookie || "");

    console.log("logout", cookies.token);
    res.cookie("token", "");
    res.status(200).json({ message: "successfully logged out" });
    // res.send("Birds home page logout");
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "successfully logged out" });
  }
};
