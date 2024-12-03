
const mutler = require('multer')

const storage = mutler.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})

const multerMidddleware = mutler({storage})
module.exports =multerMidddleware