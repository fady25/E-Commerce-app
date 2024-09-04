import { model, Schema } from "mongoose";



const subCategorySchema = new Schema(
    { 
        name:{ 
            type: String, 
            required:true, 
            unique:[true,'Name is Required'], 
            trim:true ,
            minLength: [2, 'too short subcategory name']
        },
        slug:{ type: String, required : true, unique:true, trim : true },
        Image:String,
        createdBy:{
            type :Schema.Types.ObjectId,
            ref:"user" ,
            required: false,
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:"category",
            required:true
        }
    },{
        timestamps:true
    })

    // model 
    export const SubCategory = model.SubCategory || model('SubCategory',subCategorySchema)