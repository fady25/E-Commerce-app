import { Router } from "express"
import { fileUploads } from "../../utils/multer.js"
import { isValid } from "../../middleware/validation.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { createProduct, getProducts } from "./product.controller.js"
import { createProductVal } from "./product.validation.js"

const productRouter = Router()

// create product // todo authentication
productRouter.post('/',
    fileUploads({folder:"product"}).fields([
        { name:"mainImage", maxCount: 1 },
        { name:"subImages", maxCount: 5 }
    ]),
    isValid(createProductVal),
    asyncHandler(createProduct)
)
productRouter.get('/',asyncHandler(getProducts))
export default productRouter