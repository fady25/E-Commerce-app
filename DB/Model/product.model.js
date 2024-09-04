import { model, Schema } from "mongoose";

// schema
const productSchema = new Schema({
// title
title:{
    type: String,
    required:[true, 'Name is required'],
    trim:true
},
slug: {
    type: String,
    required:true,
    trim:true,
    lowercase:true
},
description:{
    type: String,
    required:true,
    trim:true,
    minLength: 20,
    maxLength: 2000
},
// related ids
category: {
    type:Schema.Types.ObjectId,
    ref:"Category",
    required: true
},
subcategory: {
    type:Schema.Types.ObjectId,
    ref:"Subcategory",
    required: true
},
brand:{
    type:Schema.Types.ObjectId,
    ref:"Brand",
    required: true
},
createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required: false
},
updatedBy:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required: false
},

// images
imageCover:{type :String, required:true},
images:[String],
// price
price:{
    type:Number,
    required:true,
    min:0
},
discount:{type:Number,min:0, default:0},
finalPrice:{type:Number,required:true,min:0},
// specs
size:[String],
colors:[String],
stock:{
    type:Number,
    min:0,
    default:1
},
rateAvg:{
    type:Number,
    min:0,
    max:5
},
rateCount:Number
},{timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})
// virtual
productSchema.virtual('finalprice').get(function(){
   return this.price - (this.price*((this.discount||0 )/100))
})
Schema.post('init',function(doc){
    doc.imageCover="http://localhost:3000/uploads/products/"+doc.imageCover
    doc.images = doc.images.map(img => "http://localhost:3000/uploads/products/"+ img )
}

)



// model
export const Product = model('Product', productSchema)