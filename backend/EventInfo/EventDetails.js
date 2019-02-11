// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const EventDetails = new Schema(
  {
    eventid:Number,
    eventname:String,
    startdate:Date,
    enddate:Date,
    eventowner:String,
    eventdesc:String,
    participantuserid: Array
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("EventDetails", EventDetails,"EventDetails");