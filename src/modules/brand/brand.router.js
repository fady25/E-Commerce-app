import { Router } from "express"
import { fileUploads } from "../../utils/multer.js"
import { createBrandVal, updateBrandVal } from "./brand.validation.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { createBrand, updateBrand } from "./brand.controller.js"
import { isValid } from "../../middleware/validation.js"

const brandRouter = Router()

// create brand
brandRouter.post('/', fileUploads({folder:"brand"}).single('logo'),
isValid(createBrandVal),
asyncHandler(createBrand)
)
// update brand
brandRouter.put('/:brandId',
    fileUploads({folder:"brand"}).single('logo'),
    isValid(updateBrandVal),
    asyncHandler(updateBrand)
)
export default brandRouter