import jwt from "jsonwebtoken"
import { User } from './../../DB/Model/user.model.js'
import { asyncHandler } from "../utils/asyncHandler.js"





export const auth = (roles = []) => {
    return asyncHandler(async(req,res,next) =>{
        const {token} =req.headers
        if(!token){
            return res.status(400).json({msg:"token not exist"})
        }
        if(!token.startwith("ahmed__")){
            return res.status(400).json({msg:"invalid bearer key"})
        }
        const newToken = token.split("ahmed__")[1]
        if(!newToken){
            return res.status(400).json({msg:"invalid token"})
        }
        const decoded = jwt.verify(newToken , "generateTokenSecret")
        if(!decoded?.email){
            return res.status(400).json({msg:"invalid token payload"})
        }
        const user = await User.findOne({email:decoded.email})
        if(!user){
            return res.status(409).json({msg:"user not exist"})
        }
        if(!roles.includes(user.role)){
            return res.status(403).json({msg:"you are not authorized to access to this route"})
        }
        if(parseInt(user.passwordChangeAt.getTime()/1000) > decoded.iat) {
            return res.status(403).json({msg:"token expired please login again"})
        }
        req.user = user 
        next()
    })
}