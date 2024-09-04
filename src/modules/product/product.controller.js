import slugify from "slugify"
import { Brand } from "../../../DB/Model/brand.model.js"
import { Category } from "../../../DB/Model/category.model.js"
import { SubCategory } from "../../../DB/Model/subcategory.model.js"
import { AppError } from "../../utils/classError.js"
import { messages } from "../../utils/constant/message.js"
import { Product } from "../../../DB/Model/product.model.js"

export const createProduct = async(req,res,next)=>{
    // get data from req
    const {title,description,category,subcategory,price,discount,size,colors,stock}= req.body
    // check category existence
    const categoryExist = await Category.findById(category)//{},null
    if(!categoryExist){
        return next(new AppError (messages.category.notFound,404))
    }
    // check subcategory existence
    const subcategoryExist = await SubCategory.findById(subcategory)//{},null
    if(!subcategoryExist){
        return next(new AppError (messages.sbCategory.notFound,404))
    }
    // check brand existence
    const brandExist = await Brand.findById(brand)//{},null
    if(!brandExist){
        return next(new AppError (messages.brand.notFound,404))
    }
    // prepare data
    const slug = slugify(title)
    const product = new Product({
        title,
        slug,
        imageCover:req.files.imageCover[0].path,
        images:req.files.images.map(img => img.path),
        description,
        category,
        subcategory,
        price,
        discount,
        size:size, //JSON.parse(size),
        colors:colors ,//JSON.parse(colors),
        stock
    })
    const createdProduct = await productExist.save()
    if(!createdProduct){
        return next(new AppError(messages.product.failToCreate))
    }
    return res.status(201).json({
        message:messages.product.createdSuccessfully,
        success: true,
        data: createdProduct
    })

}


export const getProducts = async (req,res,next) =>{
    // page size
    // **
    // page  size  skip
    //  1    1-5    0
    //  2    6-10   5
    //  3    11-15  10
    // 
    let {page,size}=req.query
    page = parseInt(page)
    size = parseInt(size)
    if (page <=0) page = 1
    if (size <=0) size = 2
    const skip = (page -1)*size
    const products = await Product.find().limit(size).skip(skip)
    return res.json(products)
}