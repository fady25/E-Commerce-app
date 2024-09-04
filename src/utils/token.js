import  jwt  from 'jsonwebtoken'



export const verifyToken = async (req,res,next )=>{
    let {key,token }= req.headers.token.split('')
    jwt.verify(token,'MyNameIsFadouda',async(err,decoded))
    if (err)return res.status(401).json({message:error})
        req.user = decoded
    next()
}





export const generateToken = ({ payload ={}, secretKey=process.env.secretKey, expiresIn='1h'})=>{
    return jwt.sign( payload, secretKey, {expiresIn})
}


