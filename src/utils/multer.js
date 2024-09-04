import path from 'path'
import fs from 'fs'
import  multer  from 'multer'
import { nanoid } from 'nanoid'








export const filevalidation = {
    image :['']
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
// export const fileUploads = multer({ storage: storage })

export const fileUploads = ({folder,allowType=filevalidation.image}) =>{
    const storage = multer.diskStorage({
        destination: (req,res,cb) =>{
            const folderPath = path.resolve(`uploads/${folder}`)
            if(!fs.existsSync(folderPath)){
                fs.mkdir(folderPath,{recursive: true})
            }cb(null, folderPath)
        },
        filename: (req,res,cb) => {
            cb(null, nanoid() + file.originalname)
        }   

    })
    return multer({storage: storage})
}