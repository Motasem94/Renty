/*  */
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/config");
const userRouter = require("./routers/user/userRouter");
const postRouter = require("./routers/post/postRouter");
//import for file upload
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');


const app = express();
/**************** code of file upload **********/
const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
  },
  filename: function(req, file, cb) {
      cb(null, uuidv4())
  }
});

const fileFilter=(req, file , cb)=>{
  if(
    file.mimetype ==='image/png'||
    file.mimetype === 'image/jpg'||
    file.mimetype === 'image/jpeg'
  ){
    cb(null , true);
  }else{
    cb(null , false);

  }
}

/**********************************/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const imagesRentalUnit = req.file.path; //added new 
app.use(multer({storage: fileStorage , fileFilter : fileFilter}).single('image')); //this middleware is for images 
// single(image) ==> to inform uuidv4 that i will extract a single file stored in some field named "image " in the incoming requests
//now every incoming request will be parsed for that file or such files

app.use('/images',express.static(path.join(__dirname,'images')));


// //dont know what is this yet 
// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin' , '*');
//   res.setHeader('Access-Control-Allow-Methods' , 'OPTIONS , GET , POST ,PUT , PATCH , DELETE');
//   res.setHeader('Access-Control-Allow-Headers' , 'Content-Type , Authorization');
//   next();


// })



db.on("error", console.error.bind(console, "MongoDB error: "));

app.use("/", postRouter);
app.use("/", userRouter);

app.listen(4000, () => {
  console.log("Server @ 4000");
});
