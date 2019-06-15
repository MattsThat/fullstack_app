// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const EventDetails = new Schema(
  {
    eventid:Number,
    eventname:String,
    eventdate:Date,
    eventstarttime:String,
    eventendtime:String,
    eventowner:String,
    eventdesc:String,
    expectedpartipants:Number,
    participantuserid: Array,
    eventsports:String,
    eventpremiseid:Number,
    eventprivate:Boolean,
    eventinvitesent: Boolean
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("EventDetails", EventDetails,"EventDetails");