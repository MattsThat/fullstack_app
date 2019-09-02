const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const LoginDetails = require("./LoginDetails");
const UserInfo = require("./../UserInfo/UserInfo");

const cors = require("cors"); 
const mailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// const API_PORT = 3001;
const app = express();
const router = express.Router();

router.get("/goToHome", (req, res) => {
  return res.json({success : true});
});

// this method fetches all available data in our database
// router.get("/getLoginDetails", withAuth, (req, res) => {
router.get("/getLoginDetails", (req, res) => {
  LoginDetails.find((err, data) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: err });
    }
    else{
      // console.log('data',data);
      return res.json({ success: true, data: data });
    }  
  });
});

// this method overwrites existing data in our database
router.post("/updateLoginDetails", (req, res) => {
  const { id, update } = req.body;
  LoginDetails.findOneAndUpdate({'id' : id}, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this method removes existing data in our database
router.delete("/deleteLoginDetails", (req, res) => {
  const { id } = req.body;
  LoginDetails.findOneAndDelete({'id' : id}, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this method selects existing data from our database
router.get("/selectLoginDetails", (req, res) => {
  const username  = req.query.username;
  const password  = req.query.password;
  const secret = "itsmevik";
  LoginDetails.findOne({'username' : username}, function(err,data){
    if(err || data === null){
      // console.log('findOne err',err);
      resdata = {...data, error:'wrong userid'}; 
      // console.log('after data',resdata);
      return res.json({ success: false, data:resdata });
    }else{
      let valid = bcrypt.compareSync(password, data.password); // true
      // console.log('valid',valid);
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
router.post("/putLoginDetails", (req, res) => {
  let data = new LoginDetails();
  let userdata = new UserInfo();

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

  try {
    let expiresIn = '3600';
    const payload = { username };
    const token = jwt.sign(payload, secret, {
      expiresIn: '3600'
    });
    resdata = {...data, token:token,expiresIn:expiresIn,nickname:nickname, hostsignup:data.hostsignup}; 
    req.app.get('db').collection('LoginDetails').insertOne(data)
    .then(function(result){
      userdata.id = id;
      userdata.nickname = nickname;
      userdata.loginid = username;
      userdata.email = username;    
      req.app.get('db').collection('UserInfo').insertOne(userdata)
      .then(function(result){
        return res.json({success: true, data:resdata});      
      });
    });
  } catch(err){
      console.log('in catch',err);
      return res.json({success: false, error: err});
  }
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
module.exports = router ;