// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const HostUserInfo = new Schema(
  {
    id: Number,
    nickname: String,
    loginid: String,
    ownerfirstname: String,
    ownerlastname: String,
    ownercompanyname: String,
    email: String,
    lineid: String,
    phone: String,
    country: String,
    city: String,
    pincode: String,
    address: String,
    joineddate: Date
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("HostUserInfo", HostUserInfo,"HostUserInfo");