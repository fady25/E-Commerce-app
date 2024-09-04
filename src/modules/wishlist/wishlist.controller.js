import { User } from "../../../DB/Model/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/classError.js"

export const addtoWishlist = catchError(async(req,res,next)=>{
   
    let wishlist=await User.findByIdandUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true})
    wishlist || next(new AppError('wishlist not found',404))
    !wishlist || res.json({message:"success", wishlist:wishlist.wishlist})
    res.json({message:"success",category})
})
export const removeFromWishlist =catchError(async(req,res,next)=>{
   
    let wishlist=await User.findByIdandUpdate(req.user._id,{$pull:{wishlist:req.params.id}},{new:true})
    wishlist || next(new AppError('wishlist not found',404))
    !wishlist || res.json({message:"success", wishlist:wishlist.wishlist})
    res.json({message:"success",category})
})
export const getLoggedUserWishlist =catchError(async(req,res,next)=>{
   
    let wishlist=await User.findById(req.user._id).populate('wishlist')
    wishlist || next(new AppError('wishlist not found',404))
    !wishlist || res.json({message:"success", wishlist:wishlist.wishlist})
    res.json({message:"success",category})
})