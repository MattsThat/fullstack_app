const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
// const LoginDetails = require("./LoginInfo/LoginDetails");
const cors = require("cors"); 
// const mailer = require("nodemailer");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://sysadmin:sysadmin123@ds123664.mlab.com:23664/reserve";
// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.set('db',db);
// append /api for our http requests
app.use("/api", router);
router.use('/login', require('./LoginInfo/LoginAPI')); 
router.use('/userinfo', require('./UserInfo/UserInfoAPI')); 
router.use('/eventdetails', require('./EventInfo/EventDetailsAPI')); 

module.exports = router ;
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));