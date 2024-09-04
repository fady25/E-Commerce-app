import { model, Schema } from "mongoose";
import { required } from 'joi';




const couponSchema = new Schema({
   code:{
    type:String,
    unique:true,
    required:true
   },
   expires:Date,
   discount:Number,
   
},{
    timestamps: true,versionKey:false
})

// model
export const Coupon = model.Coupon || model('Coupon', couponSchema)