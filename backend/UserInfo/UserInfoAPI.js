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

router.get("/goToHome", (req, res) => {
  return res.json({success : true});
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateUserInfo", (req, res) => {
//   console.log('req.body params ',req.body.params);
//   console.log('req.body id ',req.body.params.update.id);
//   console.log('req.body update data',req.body.params.update);
  const id = req.body.params.update.id;
  const update = req.body.params.update;
  UserInfo.findOneAndUpdate(id, update, err => {
    if (err){
        console.log('findOneAndUpdate err ',err);
        return res.json({ success: false, error: err });
    } else{
        // console.log('findOneAndUpdate ',res);
        return res.json({ success: true });
    }
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
    // console.log('id selectUserInfo',req.query.id);
    const id  = req.query.id;
    UserInfo.findOne({'id' : id}, function(err,data){
        if(err || data === null){
        // console.log('findOne err',err);
        // console.log('findOne data',data);
        resdata = {...data, error:'wrong userid'}; 
        // console.log('after data',resdata);
        return res.json({ success: false, data:resdata });
        }else{
            resdata = {...data}; 
            // console.log('after data',resdata);
            return res.json({ success: true, data:resdata });
        }//end of else
    });
});

// this method adds new host and individual data in our database
router.post("/putUserInfo", (req, res) => {
  let data = new UserInfo();
  const { firstname, lastname, email, lineid, gender, address } = req.body;

  data.firstname = firstname;
  data.lastname = lastname;
  data.email = email;
  data.lineid = lineid;
  data.address = address;
  console.log('before save data',data);
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

module.exports = router ;
