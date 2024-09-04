import express from "express"
import  { signUp, verifyEmail } from "./user.controller.js"



const userRouter = express.Router()




userRouter.post ("/signUp" , signUp)
userRouter.get ("/verifyEmail/:token" ,verifyEmail )


export default userRouter