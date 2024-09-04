import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

// create subcategory val
export const createSubcategoryVal= joi.object({
    name: generalFields.name.required(),
    category: generalFields.objectId.required(),
    createdBy: generalFields.objectId.required()
}).required()

// get subcategory 

export const getSubcategoryVal = joi.object({
    categoryId: generalFields.objectId.required()
}).required()
