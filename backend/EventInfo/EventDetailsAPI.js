const express = require("express");
const EventDetails = require("./EventDetails");
const jwt = require('jsonwebtoken');
const app = express();
const router = express.Router();

router.get("/goToHome", (req, res) => {
  return res.json({success : true});
});

// this method fetches all available data in our database
router.get("/getEventDetails", (req, res) => {
  EventDetails.find((err, data) => {
      if (err) {
        console.log(err);
        return res.json({ success: false, error: err });
      }
      else{
        // console.log('data',data);
        return res.json({ success: true, data: data });
      }  
    });
  });

// this is our update method
// this method overwrites existing data in our database
router.post("/updateEventDetails", (req, res) => {
//   console.log('req.body params ',req.body.params);
//   console.log('req.body id ',req.body.params.update.id);
//   console.log('req.body update data',req.body.params.update);
  const id = req.body.params.update.id;
  const update = req.body.params.update;
  EventDetails.findOneAndUpdate(id, update, err => {
    if (err){
        console.log('findOneAndUpdate err ',err);
        return res.json({ success: false, error: err });
    } else{
        // console.log('findOneAndUpdate ',res);
        return res.json({ success: true });
    }
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteEventDetails", (req, res) => {
  const { id } = req.body;
  EventDetails.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});
// this is our select method //withAuth,
// this method selects existing data from our database
router.get("/selectEventDetails", (req, res) => {
    // console.log('id selectEventDetails',req.query.id);
    const id  = req.query.id;
    EventDetails.findOne({'id' : id}, function(err,data){
        if(err || data === null){
        resdata = {...data, error:'wrong userid'}; 
        // console.log('after data',resdata);
        return res.json({ success: false, data:resdata });
        }else{
            resdata = {...data}; 
            // console.log('after data',resdata);
            return res.json({ success: true, data:resdata });
        }//end of else
    });
});

// this method adds new host and individual data in our database
router.post("/putEventDetails", (req, res) => {
  const data = new EventDetails(req.body.params.update);
  console.log('before save data req.body.params.update',req.body.params.update);
  // data = req.body.params.update;
  // data.eventid = eventid;
  // data.eventname = eventname;
  // data.eventdesc = eventdesc;
  // data.eventdate = eventdate;
  // data.eventstarttime = eventstarttime;
  // data.eventendtime = eventendtime;
  // data.eventowner = eventowner;
  // data.expectedpartipants = expectedpartipants;
  // data.eventprivate = eventprivate;
  // data.eventinvitesent = eventinvitesent;
  console.log('before save data',data);
  data.save(err => {
    if (err) 
      return res.json({ success: false, error: err });
    else{
      resdata = {...data, eventid:eventid}; 
      return res.json({ success: true, data:resdata });
      }//end of else
    }//
  );//end of save
});

module.exports = router ;
