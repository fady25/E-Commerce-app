import joi from "joi";
import { AppError } from "../utils/classError.js";
import { Types } from "mongoose";

 
const validateObjectId = (value,helper) =>{
    const match = Types.ObjectId.isValid(value)
    if (match){
        return true
    }
    return helper ('invalid objectId')
}

export const generalFields= {
    name:joi.string(),
    email:joi.string().email(),
    password:joi.string().required(),
    rePassword:joi.string().valid(joi.ref('password')),
    // objectId:joi.string().hex().length(24)
    objectId: joi.custom(validateObjectId)
}

export const isValid = (schema)=>{
    return (req,res,next) =>{
        const data = {
            image:req.file,
            ...req.body,
            ...req.params,
            ...req.query
        }
        const {error }= schema.validate(data,{abortEarly: true})
        if(error){
            const errArr = []
            error.details.forEach(err => errArr.push(err.message))
            return next( new AppError(errArr, 400))
        }
    }

}