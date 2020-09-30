const express=require('express');
const app=express();
const {upload,fileArray}=require("./common/multer");

const fs=require("fs")



app.use(express.json())

//set the cors
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    next()
})

//returns the file array
app.get("/filesArray",async(req,res)=>{

res.status(200).send(fileArray)

})


//save the new file
app.post("/saveFile",upload.single('file'),async(req,res)=>{

    res.status(200).send(true)
    
    },(error,req,res,next)=>{
        res.status(400).send(error.message)
})


//return the data of saved file
app.get('/file',isFileExist,async(req,res)=>{
try{
   fs.readFile(`tmp/${req.query.fileName}`,(err,data)=>{
   // console.log(data)
    res.status(200).send(data.toString());
   })
   
}
catch(e){
    res.status(400).send(e.message);
}

})




//check that file is exist already or not
async function isFileExist(req,res,next){
    let fileName=req.query.fileName;
    let index=fileArray.findIndex((ele)=>ele===fileName);
    if(index >=0)
    {
        next()
    }
    else{
        res.status(400).send("no file exist")
    }
}


app.listen('8080',()=>{
    console.log("server running");
})