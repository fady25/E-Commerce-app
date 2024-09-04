import { types } from "joi"
import mongoose, { model, Types } from "mongoose"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minLength:3 , 
        maxLength:15,
        trim: true
    },
    email:{
        type:String,
        required:[true, "email is required"],
        trim: true,
        unique:true,
        lowercase: true
    },
    password:{
        type:String,
        required:[true, "password is required"],
        trim:true
    },
    age:{
        type:Number,
        required:[true, "age is required"],
    },
    phone:[String],
    address:[{
        city:String,
        phone:String,
        street:String}],
    confirmed:{
        type : Boolean,
        default:false
    },
    loggedin:{
        type : Boolean,
        default:false
    },
    isBlocked:{
        type : Boolean,
        default:false
    },
    role:{
        type: String,
        enum:["admin", "user"],
        default:"user"
    },

    wishlist:[{
        type:schema.Types.ObjectId ,
        ref:"product"
    }]
    

},{
    timestamps:true,
    versionKey:false,
})

// model
export const User = model('User',userSchema)