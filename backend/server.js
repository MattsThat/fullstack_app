const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const LoginDetails = require("./LoginInfo/LoginDetails");
const cors = require("cors"); 
const mailer = require("nodemailer"); 


const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
//const dbRoute = "mongodb://jelo:a9bc839993@ds151382.mlab.com:51382/jelotest";
const dbRoute = "mongodb://sysadmin:sysadmin123@ds123664.mlab.com:23664/reserve";
// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());

// append /api for our http requests
app.use("/api", router);

// this is our get method
// this method fetches all available data in our database
router.get("/getLoginDetails", (req, res) => {
  LoginDetails.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateLoginDetails", (req, res) => {
  const { id, update } = req.body;
  LoginDetails.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteLoginDetails", (req, res) => {
  const { id } = req.body;
  LoginDetails.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});
// this is our select method
// this method selects existing data from our database
router.get("/selectLoginDetails", (req, res) => {
  const username  = req.query.username;
  const password  = req.query.password;
  LoginDetails.findOne({'username' : username}, function(err,data) {
    if (err) 
      return res.send(err);
    else{
      // console.log("Mdata", data);
      let pwd = data.password;
      if(password === pwd){
        return res.json({ success: true, data:data });
      }//end of if
      else{
        return res.json({ success: false, data:data });
      }//end of else
    }//end of outer else
  });
});


// this method adds new host and individual data in our database
router.post("/putLoginDetails", (req, res) => {
  let data = new LoginDetails();
  const { id, host, nickname, username, password } = req.body;

  if ((!id && id !== 0) || !username) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.id = id;
  data.host = host;
  data.nickname = nickname;
  data.username = username;
  data.password = password;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});



router.get("/sendemail",(req, res) => {
  const email  = req.query.email;
  console.log("Message email: %s", email);
  let transporter = mailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  });
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"React Test" <test60482@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
   };
  // verify connection configuration
  transporter.sendMail({
    from: 'test60482@gmail.com',
    to: email,
    subject: 'Message',
    text: 'I hope this message gets delivered!'
    }, (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
  });
});//end of sendEmail
// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));