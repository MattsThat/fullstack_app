// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const BillingInfo = new Schema(
  {
    billingid: Number,
    userid: Number,
    loginid: String,
    reserveid: Number,
    paymentid: Number,
    amountfromuser: Number,
    amounttosportscenter: Number,
    currency: String,
    setteled: Boolean,
    refund: Boolean,
    billigdate: Date
  },
  { timestamps: true },
  // { collection: 'BillingInfo' }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("BillingInfo", BillingInfo,"BillingInfo");