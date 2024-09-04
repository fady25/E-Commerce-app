import Jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/classError.js";
import { sendEmail } from "../../service/sendEmail.js";
import bcrypt from "bcrypt"
import { User } from "../../../DB/Model/user.model.js";
import { AppError } from './../../utils/classError';





// ===========================  signUp  =================================================
export const signUp = asyncHandler(async(req,res,next)=>{
    const { name,  email, password, cpassword, age, phone, address}=req.body
    const userExist = await user.findOne({email:email.toLowerCase()})
    userExist && next(new AppError ("user already exist", 409))
    
    const token = Jwt.sign({email},"generateTokenSecret",{expiresIn:60*2})
    const link =`http://localhost:3000/users/verifyEmail/${token}`

    await sendEmail (email,"verify your email", `<a href="${link}">click here</a>`)
    const hash =bcrypt.hashSync(password,10)
    const user =new user({name,  email, password:hash, age, phone, address})
    const newUser = await user.save()

    newUser? res.status(201).json({msg:"user created successfully", user:newUser}): next(new AppError ("user not created", 500 ))

})
export const signin = asyncHandler(async (req,res,next)=>{
    let user = await User.findOne({email:req.body.email})
    if (user&&bcrypt.compareSync(req.body.password,user.password)){
        let token=Jwt.json({userId:user._id,role:user.role},"ahmed")
        return res.json({message:"success", token})
    }
    next(AppError('incorrect email or password', 401))
})

// ===========================  verifyEmail  =================================================
export const verifyEmail = asyncHandler(async(req,res,next)=>{
    const { token }=req.params
    const decoded = Jwt.verify(token,"generateTokenSecret")
    if(!decoded?.email) return next(new AppError("invalid token", 400))
    const user = await user.findOneAndUpdate({email: decoded.email , confirmed: false},{confirmed:true})
    user?
     res.status(201).json({msg:" done"}):
     next(new AppError("user does  not exist or already confirmed",400 ))
})


