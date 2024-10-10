import userModel from "../models/userModel.js";

export const getUserForSidebar = async (req,res)=>{

    try {
        const loggedInUserId = req.user._id;
        const filterusers = await userModel.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.send(filterusers)
    } catch (error) {
        console.log("error in getUserForSidebar",error.message)
        res.status(500).send("internal server error")
    }

}