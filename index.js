const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const route = require('./routes');
const cors = require('cors');
const multer = require('multer');
const cookieParser =require('cookie-parser')


dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname+'/public/'))
app.use(cookieParser());



mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connect to Database Successfully"))
    .catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")

    }, filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.originalname.split('.')[0] + Math.round(Math.random()*1E6)+'.'+file.originalname.split('.')[1])
        // console.log(file)
        cb(null, req.body.name)

    }
});
const maxSize = 2 * 1024 * 1024;

const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize }
}).single("file")
app.post('/api/upload', upload, async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });

        }

        res.status(200).json({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
        console.log("Upload ok")
    } catch (error) {
        res.status(500).json({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        })
    }

});


route(app);
app.listen(5000, () => {
    console.log("Backend listening on port 5000")
})