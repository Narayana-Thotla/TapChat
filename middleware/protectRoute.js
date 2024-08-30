import jwt from "jsonwebtoken";
import express from "express"

 const protectRoute = (req, res, next) => {
//   try {
//     var decoded = jwt.verify(token, process.env.cookieToken);
//     console.log(decoded.id);
//     if(!decoded){
//         res.status(400).send('login into the app - token error/missing')
//     }
//     if (decoded!==decoded.id) {
//         res.status(400).send('login into the app - token error/missing')
        
//     } 
//     req.userid=decoded.id
//     console.log("userid-in-protectRoute:",req.userid)
//     next();
//   } catch (error) {
//     console.log('protected routing error',error.message);
//     res.status(400).send('login into the application - token error/missing')
//   }
//-------------------------------------------------------
//   var decoded = jwt.verify(token, process.env.cookieToken);
    console.log("decoded");
    // if(!decoded){
    //     res.status(400).send('login into the app - token error/missing')
    // }
    // if (decoded!==decoded.id) {
    //     res.status(400).send('login into the app - token error/missing')
        
    // } 
    // req.userid=decoded.id
    // console.log("userid-in-protectRoute:",req.userid)
    next();


};
export default protectRoute
