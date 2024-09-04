import slugify from "slugify"
import { Category } from "../../../DB/Model/category.model.js"
import { SubCategory } from "../../../DB/Model/subcategory.model.js"
import { AppError } from "../../utils/classError.js"
import { messages } from "../../utils/constant/message.js"



//create SubCategory
export const createSubCategory = async(req,res,next) =>{
//get data from req
let { name, category} = req.body
name = name.toLowerCase() 
// check existance of category 
const categoryExist = await Category.findById(category)
if(!categoryExist){
    return next(new AppError(messages.category.notFound, 404))
}
// check existance of SubCategory
const SubCategoryExist = await SubCategory.findOne({ name })
if(SubCategoryExist){
    return next( new AppError(messages.sbCategory.alreadyExist , 409))
}
if(!req.file){
    return next(new AppError(messages.image.required ))
}
// prepare data 
const slug = slugify(name)
const SubCategory = new SubCategory({
    name,
    slug,
    category
})
// add to db
const SubCategoryCreated = await SubCategoryExist.save()
if(!SubCategoryCreated){
    // todo remove the image
    return next(new AppError(messages.sbCategory.failToCreate , 500))
}


// send response 
return res.status(201).json({
    message:messages.sbCategory.createdSuccessfully,
    success:true, 
    data: SubCategoryCreated})
}



export const getSubcategories = async(req,res,next )=>{
    // get data from req 
    const {categoryId} = req.params
    // check existence of category 
    const categoryExist = await Category.findById(categoryId)
    if(!categoryExist) return next(new AppError(messages.category.notFound , 404))
    const subcategories = await SubCategory.find({category:categoryId}).populate([{path:'category'}])
    return res.status(200).json({ data: subcategories , success:true}) 
}