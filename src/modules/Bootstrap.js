
import categoryRouter from './category/category.routes.js';



export const bootstrap = (app)=>{
    app.use('/api/categories', categoryRouter)

}