// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const Reservation = new Schema(
  {
    reserveid: Number,
    loginid:String,
    sportscenterid:Number,
    courtid:String,
    startdatetime: Date,
    enddatetime: Date,
    confirmationemail:Boolean,
    billingid: Number,
    paymentid : Number,
    isActive: Boolean
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Reservation", Reservation,"Reservation");