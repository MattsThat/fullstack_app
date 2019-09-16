// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const Premises = new Schema(
  {
    // centerid: Number,
    loginid: String,
    // ownerfirstname: String,
    // ownerlastname: String,
    // companyname: String,
    // companynameinlocallang: String,
    premisename:String,
    premisedesc:String,
    // email: String,
    // phone: String,
    // lineid: String,
    // country: String,
    // city: String,
    pincode: String,
    address1: String,
    address2: String,
    accessdetails: String,
    availablesports: Array,
    availablepaymentmenthods: Array,
    availablecourtids: Array,
    parking:Boolean,
    shower: Boolean,
    clubhouse:Boolean,
    food: Boolean,
    sportsshop: Boolean,
    joineddate: Date
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Premises", Premises,"Premises");