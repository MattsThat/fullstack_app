// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserInfo = new Schema(
  {
    userid: Number,
    loginid: String,
    firstname: String,
    lastname: String,
    email: String,
    lineid: String,
    phone: String,
    country: String,
    city: String,
    pincode: String,
    address: String,
    favsports: String,
    paymentid: Number,
    preferredlocation: String,
    joineddate: Date
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("UserInfo", UserInfo,"UserInfo");