// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const CourtInfo = new Schema(
  {
    courtid: Number,
    courtname:String,
    centerid: String,
    sportsname: String,
    courtdetails: String,
    userfacilitydetails: String,
    joineddate: Date
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", CourtInfo);