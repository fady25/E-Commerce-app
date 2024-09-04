import { Router } from "express";
import { fileUploads } from "../../utils/multer.js";
import { createSubCategory } from "./subcategory.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createSubcategoryVal } from "./subcategory.validation.js";
import { isValid } from "../../middleware/validation.js";







const subCategoryRouter = Router({mergeParams:true})


subCategoryRouter.post('/',
    fileUploads({ folder:'subcategory'}).single('image'),
    isValid(createSubcategoryVal),
    asyncHandler(createSubCategory)
)
export default subCategoryRouter

