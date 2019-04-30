const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const UserInfo = require("./UserInfo");
const cors = require("cors"); 
const mailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// const API_PORT = 3001;
const app = express();
const router = express.Router();

// // this is our MongoDB database
// //const dbRoute = "mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest";
// const dbRoute = "mongodb://sysadmin:sysadmin123@ds123664.mlab.com:23664/reserve";
// // connects our back end code with the database
// mongoose.connect(
//   dbRoute,
//   { useNewUrlParser: true }
// );

// let db = mongoose.connection;
// db.once("open", () => console.log("connected to the database"));
// // checks if connection with the database is successful
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// // (optional) only made for logging and
// // bodyParser, parses the request body to be a readable json format
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger("dev"));
// app.use(cors());
// app.use(cookieParser());
// // append /api for our http requests
// app.use("/api", router);

router.get("/goToHome", (req, res) => {
  return res.json({success : true});
});
// this is our get method
// this method fetches all available data in our database
// router.get("/getUserInfo", withAuth, (req, res) => {
router.get("/getUserInfo", (req, res) => {
  UserInfo.find((err, data) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: err });
    }
    else{
      console.log('data',data);
      return res.json({ success: true, data: data });
    }  
  });
});
// this is our update method
// this method overwrites existing data in our database
router.post("/updateUserInfo", (req, res) => {
  const { id, update } = req.body;
  UserInfo.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
// this is our delete method
// this method removes existing data in our database
router.delete("/deleteUserInfo", (req, res) => {
  const { id } = req.body;
  UserInfo.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});
// this is our select method //withAuth,
// this method selects existing data from our database
router.get("/selectUserInfo", (req, res) => {
  const username  = req.query.username;
  const password  = req.query.password;
  const secret = "itsmevik";
  UserInfo.findOne({'username' : username}, function(err,data){
    if(err || data === null){
      // console.log('findOne err',err);
      resdata = {...data, error:'wrong userid'}; 
      console.log('after data',resdata);
      return res.json({ success: false, data:resdata });
    }else{
      let valid = bcrypt.compareSync(password, data.password); // true
      console.log('valid',valid);
      if(valid){
          // Issue token
          let expiresIn = '3600';
          const payload = { username };
          const token = jwt.sign(payload, secret, {
            expiresIn: '3600'
          });
          resdata = {...data, token:token, expiresIn:expiresIn, nickname:data.nickname, hostsignup:data.hostsignup}; 
          // console.log('in register data',resdata);
        return res.json({ success: true, data:resdata }); 
      }//end of if
      else{
        // console.log('before data',data);
        resdata = {...data, error:'wrong password'}; 
        // console.log('after data',resdata);
        return res.json({ success: false, data:resdata });
      }//end of else
    }//end of outer else
  });
});
// this method adds new host and individual data in our database
router.post("/putUserInfo", (req, res) => {
  let data = new UserInfo();
  const { id, hostsignup, nickname, username, password } = req.body;
  const saltRounds=10;
  const secret = "itsmevik";
  if ((!id && id !== 0) || !username) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  let hashedPassword=bcrypt.hashSync(password, saltRounds);
  data.id = id;
  data.hostsignup = hostsignup;
  data.nickname = nickname;
  data.username = username;
  data.password = hashedPassword;
  // console.log('before save data',data);
  data.save(err => {
    if (err) 
      return res.json({ success: false, error: err });
    else{
      let expiresIn = '3600';
      const payload = { username };
      const token = jwt.sign(payload, secret, {
        expiresIn: '3600'
      });
      resdata = {...data, token:token,expiresIn:expiresIn}; 
      return res.json({ success: true, data:resdata });
      }//end of else
    } //
  );//end of save
});

router.get("/sendemail",(req, res) => {
  const email  = req.query.email;
  console.log("Message email: %s", email);
  let transporter = mailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  });
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"React Test" <test60482@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
   };
  // verify connection configuration
  transporter.sendMail({
    from: 'test60482@gmail.com',
    to: email,
    subject: 'Message',
    text: 'I hope this message gets delivered!'
    }, (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
  });
});//end of sendEmail
// launch our backend into a port
// app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
module.exports = router ;