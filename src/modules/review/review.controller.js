
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/classError.js"
import { messages } from "../../utils/constant/message.js"
import { Review } from './../../../DB/Model/review.model';
import { AppError } from './../../utils/classError';

export const createReview = catchError(async(req,res,next) => {
   req.body.user=req.user._id
   let isExist= await Review.findOne({user: req.user._id , product:req.body.product})
   if(isExist)return next(new AppError('you created a review before', 409 ))
   let review = new Review(req.body)
   await review.save()
   res.json({message:"success",review})}
)
export const allReviews= catchError(async (req,res,next) =>{
    let reviews = await Review.find()
    res.json({message:"success",reviews})
})
export const getReview = catchError(async (req,res,next)=>{
    let review = await Review.findbyId(req.params.id)
    review || next(new AppError('review not found', 404))
    !review || res.json({message:"success", review})
})

export const updateReview = catchError(async (req,res,next)=>{
    let review = await Review.findbyOneAndUpdate({_id:req.params.id,user: rq.user._id},req.params.id,req.body,{new: true})
    review || next(new AppError('review not found or you are not who created the review', 404))
    !review || res.json({message:"success", review})
})

export const deleteReview = catchError(async (req,res,next)=>{
    let review = await Review.findbyIdAndDelete(req.params.id,req.body)
    review || next(new AppError('review not found', 404))
    !review || res.json({message:"success", review})
})