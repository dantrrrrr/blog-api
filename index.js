const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const route=require('./routes');
const cors =require('cors');
const multer =require('multer');


dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static('public'))


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("connect to Database Successfully"))
    .catch(err => console.log(err))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")

    },filename:(req,file,cb)=>{
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.originalname.split('.')[0] + Math.round(Math.random()*1E6)+'.'+file.originalname.split('.')[1])
        // console.log(file)
        cb(null,req.body.name)
       
    }
});
const upload =multer({storage:storage}) 
app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json("file has been uploaded");
    console.log("Upload ok")
});


route(app);
app.listen(5000, () => {
    console.log("Backend listening on port 5000")
})