import { model, Schema } from "mongoose";




const CategorySchema = new Schema({
    name:{ 
        type: String, 
        required : true,
        unique:[true, 'name is required'], 
        trim : true,
        minLength: [2, 'too short category name']
    },
    slug:{ type: String, required : true, unique:true, trim : true },
    Image:String,
    createdBy:{
        type :Schema.Types.ObjectId,
        ref:"user" ,
        required: false,
        },
},{
    timestamps: true,versionKey:false
})
Schema.post('init', function(doc){
    doc.image = "http://localhost3000/uploads/categoreis/"+ doc.image
})

// model
export const Category = model.Category || model('Category', CategorySchema)