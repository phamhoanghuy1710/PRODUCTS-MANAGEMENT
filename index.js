const express = require("express"); // nhung express
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
require("dotenv").config();
const database = require("./config/database")
const systemConfig = require("./config/systems");
const route = require("./routes/client/index.route")
const routeadmin = require("./routes/admin/index.route")

database.connect();

const app = express(); // nhung app
app.use(methodOverride("_method")); // method override dung de truy cap pt patch
const port = process.env.PORT; 

app.use(bodyParser.urlencoded({extended: false})); // body-parser dung de hien thi tt from

//flash dung hien thi thong bao
app.use(cookieParser("keyboard cat"));
app.use(session({cookie: {maxAge:6000}}));
app.use(flash());
//end flash


app.use(express.static(`${__dirname}/public`)); // nhung tinh

// Views
app.set("views",`${__dirname}/views`); // luc nay la dang o thu  muc view r
app.set("view engine","pug");

// app locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// Routes
route(app);
routeadmin(app);

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})