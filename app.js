/*  */

const app = require('express')();
const bodyParser = require('body-parser');
const db = require("./db/config");
const userRouter = require('./routers/user/userRouter');
const postRouter = require('./routers/post/postRouter');


/**********************************/


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
db.on('error',console.error.bind(console,"MongoDB error: "));

app.use('/',postRouter);
app.use('/',userRouter);



app.listen(4000, () => {
    console.log("Server @ 4000");
});