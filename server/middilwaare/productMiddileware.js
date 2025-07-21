const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads/products')
    },
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg'
  ) {
    callback(null, true);
  } else {
    callback(new Error('Please upload only PNG, JPEG, or JPG images'), false);
  }
};

const multerConfig= multer({
    storage,fileFilter
})
module.exports=multerConfig