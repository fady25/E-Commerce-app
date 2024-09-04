let mode = "prod"

export const globalError = (err,req,res,next)=> {
    let code = err.statusCode || 500
    if(mode == 'development'){
       res.status(code).json({message:"error", code,success:false})
    }else{
    res.status(code ).json({message:"error",code ,success:false})
}}