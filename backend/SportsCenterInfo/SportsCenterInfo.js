// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const SportsCenterInfo = new Schema(
  {
    centerid: Number,
    loginid: String,
    ownerfirstname: String,
    ownerlastname: String,
    companyname: String,
    companynameinlocallang: String,
    email: String,
    phone: String,
    country: String,
    city: String,
    pincode: String,
    address: String,
    accessdetails: String,
    availablesports: Array,
    availablepaymentmenthods: Array,
    availablecourtids: Array,
    parking:Boolean,
    shower: Boolean,
    clubhouse:Boolean,
    foodanddrink: Boolean,
    drinks: Boolean,
    sportsshop: Boolean,
    joineddate: Date
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", SportsCenterInfo);