// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const PaymentInfo = new Schema(
  {
    paymentid: Number,
    userid: Number,
    loginid: String,
    preferredpaymentmethod: String,
    ccnumber: Number,
    seccode: Number,
    expiry: Date,
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("PaymentInfo", PaymentInfo,"PaymentInfo");