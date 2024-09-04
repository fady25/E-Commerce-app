import slugify from "slugify"
import { Category } from "../../../DB/Model/category.model.js"
import { Product } from "../../../DB/Model/product.model.js"
import { SubCategory } from "../../../DB/Model/subcategory.model.js"
import { AppError } from "../../utils/classError.js"
import { messages } from "../../utils/constant/message.js"

  

export const deleteCategory = async(req,res,next)=>{
    // get data from req
    const { categoryId } = req.params
    // check existance of category 
    const categoryExist = await Category.findByIdAndDelete(categoryId)
    if(!categoryExist){
        return next(new AppError(messages.category.notFound, 404))
    }
    // prepare data
    const subcategories = await SubCategory.find({category:categoryId}).select('image')
    const products=await Product.find({category:categoryId}).select('mainImage subImages')
    const SubCategoryIds = subcategories.map(sub =>sub._id)//[1,2,3.4]
    const productIds = products.map(prod => prod_id)//[1,2,3.4]
    // delete subcategories
    await SubCategory.deleteMany({_id:{$in:SubCategoryIds}})
    await Product.deleteMany({_id: {$in:productIds}})
    // delete images
    const imagePaths =subcategories.mpa(sub =>sub.image)
    for (let i = 0; i < products.length; i++) {
        imagePaths.push(products[i].mainImage)
        imagePaths.push(...products[i].subImages)
    }
    for (let i = 0; i < imagePaths.length; i++) {
        deleteFile(imagePaths[i])        
    }
}
export const addCategory = async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let category = Category(req.body)
    await category.save()
    res.json({message:"success",category})
}
export const allCategories = async(req,res,next)=>{
    
    let categories =await Category.find()
    
    res.json({message:"success",categories})
}
export const getCategory = async(req,res,next)=>{
    
    let category=await Category.findById(req.params.id)
    
    res.json({message:"success",category})
}
export const updateCategory = async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let category=await Category.findByIdandUpdate(req.params.id,req.body,{new:true})
    res.json({message:"success",category})
}
