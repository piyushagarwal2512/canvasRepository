const multer = require('multer')

const fileNameArray=[]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/')
    },
    filename: function (req, file, cb) {
        cb(null,  req.query.fileName);
    },
    
    
})
const upload = multer({ storage: storage ,
    
    
    fileFilter:function(req,file,cb){

         if(!req.query.fileName.endsWith(".txt"))
         {
            cb(new Error("Invalid File Format"),false)
         }
         let index=fileNameArray.findIndex((ele)=>ele===req.query.fileName);
        
         if(index>=0)
         {
              //if filename already exist
            cb(new Error(`${req.query.fileName} already exist`),false);
         }
         else{
             
             fileNameArray.splice(0,0,req.query.fileName);
             cb(null,true);
         }


    }})


module.exports={
upload,
fileArray:fileNameArray
}