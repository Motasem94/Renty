/*  */

const app = require('express')();
const bodyParser = require('body-parser');
const db = require("./db/config");


/**********************************/

app.set('view-engine','ejs')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
db.on('error',console.error.bind(console,"MongoDB error: "));





app.listen(4000, () => {
    console.log("Server @ 4000");
});