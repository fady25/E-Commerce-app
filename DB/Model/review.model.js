import { model, Mongoose, Schema } from "mongoose";
import { User } from './user.model';
import { required } from 'joi';





const reviewSchema = new Schema({
    comment:String,
    User:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    rate:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
    Product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }
},{
    timestamps: true,versionKey:false
})

// model
export const Review = model.Review || model('Review', reviewSchema)