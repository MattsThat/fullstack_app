const express = require("express");
const EventDetails = require("./EventDetails");
// const jwt = require('jsonwebtoken');
// const app = express();
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;

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
  EventDetails.findOneAndUpdate({'id':id}, update, err => {
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
  EventDetails.findOneAndDelete({'id':id}, err => {
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

// this method was written to get the count but not used.
// function getEventsCount(){
//   // console.log('id selectEventDetails',req.query.id);
//   // const id  = req.query.id;
//   EventDetails.estimatedDocumentCount({}, function(err,count){
//       if(err || count === null){
//         console.log('count err',err);
//         console.log('count data',count);
//         count = 0;
//       }  
//       else{  
//         console.log('else count',count);
//         return count;
//       }
//     })
// };

// this method adds new host and individual data in our database
router.post("/putEventDetails", (req, res) => {
  const data = new EventDetails(req.body.params.update);
  try{
    req.app.get('db').collection('EventDetails').insertOne(data)
    .then(function(result){
      return res.json({success: true, result});
    });
  }catch(err){
    console.log('in catch',err);
    return res.json({success: false, error: err});
  }
});//end of insert


module.exports = router ;
