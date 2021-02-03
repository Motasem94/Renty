/*  */
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/config");
const userRouter = require("./routers/user/userRouter");
const postRouter = require("./routers/post/postRouter");
const multer = require("multer");
const app = express();

/**********************************/

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4()+file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

db.on("error", console.error.bind(console, "MongoDB error: "));

app.use("/", postRouter);
app.use("/", userRouter);

app.listen(4000, () => {
  console.log("Server @ 4000");
});
