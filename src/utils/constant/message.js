const generateMessage = (entity)=>({
    notFound:`${entity} not found`,
    alreadyExist:`${entity} already exist`,
    failToCreate:` fail to create ${entity}`,
    failToUpdate:` fail to update ${entity}`,
    createdSuccessfully:`Created ${entity} Successfully`,
    updatedSuccessfully:`updated ${entity} Successfully`,
    deletedSuccessfully:`deleted ${entity} Successfully`,
    failToDelete:`fail to delete ${entity}`,
})


export const messages ={
    category: generateMessage('category'),    
    sbCategory: generateMessage('subCategory'),
    brand: generateMessage('brand'),
    product: generateMessage('product'),
    user: generateMessage('user'),
    image: {
        required:"image is required"
    },
    file :{...generateMessage ('file'), required:"file is required"}
}