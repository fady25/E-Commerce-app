import express from "express"
import connectionDB from "./DB/connection.js"
import { AppError } from "./src/utils/classError.js"
import userRouter from "./src/modules/users/user.routes.js"
import categoryRouter from "./src/modules/category/category.routes.js"
import subCategoryRouter from "./src/modules/subcategory/subcategory.routes.js"
import productRouter from "./src/modules/product/product.routes.js"
import brandRouter from "./src/modules/brand/brand.router.js"
import { bootstrap } from './src/modules/Bootstrap.js';
import { globalError } from './src/middleware/globalError.js';


const app = express()


    

app.use(express.json())
app.use('/uploads',express.static('uploads'))
//connect to db
connectionDB()
const port = 3000
    
app.use("/users", userRouter)  
app.use('/categories',categoryRouter)
app.use('/subcategories',subCategoryRouter)
app.use('/brands',brandRouter)
app.use('/products',productRouter)

bootstrap(app)

//GlobalErrorHandler
app.use(globalError) 

//handle invalid URLs
app.use("*",(req,res,next)  =>{
    next(new AppError(`invalid url : ${req.originalUrl}`, 404))
    
})     
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
