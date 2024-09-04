import path from 'path'
import dotenv from 'dotenv'
import mongoose from "mongoose"

dotenv.config( { path: path.resolve('./config/.env') } )

const connectionDB = async() =>{
    const databaseURL = process.env.DB_URL
    return await mongoose.connect(databaseURL)
    .then(() =>{
        console.log("connected to database")
    }).catch((err) => {
        console.log({message:"fail to connect" , err})
    })
}


export default connectionDB