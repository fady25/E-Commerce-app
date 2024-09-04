import { Router } from "express"
import { fileUploads } from "../../utils/multer.js"
import { isValid } from "../../middleware/validation.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from './category.controller.js';
import { createCategoryVal } from "./category.validation.js";

const categoryRouter = Router()
 categoryRouter
 .route('/')
 .post('/', 
     fileUploads({folder:'category'}).single('image'),
     isValid(createCategoryVal),
     asyncHandler()
 )
categoryRouter.delete('/:categoryId',asyncHandler( deleteCategory ))
categoryRouter.route('/').post(asyncHandler( addCategory)).get(allCategories)
categoryRouter.route('/:id').get(getCategory).put(updateCategory)



export default categoryRouter








