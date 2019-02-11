// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const LoginDetails = new Schema(
  {
    id: Number,
    host:String,
    nickname:String,
    username: String,
    password: String
  },
  { timestamps: true }, 
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("LoginDetails", LoginDetails,"LoginDetails");