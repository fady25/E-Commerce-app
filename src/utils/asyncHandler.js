import { AppError } from "./classError.js"


export const asyncHandler = (fn)=>{
    return (req,res,next) => {
        fn(req,res,next).catch((err) =>{
        return next(new AppError(err.message, err.statusCode))})
    }
}


