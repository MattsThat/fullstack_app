const express = require("express");
const Premises = require("./Premises");
const CourtInfo = require("./CourtInfo");
// const jwt = require('jsonwebtoken');
// const app = express();
const router = express.Router();
// var ObjectId = require('mongodb').ObjectID;

router.get("/goToHome", (req, res) => {
  return res.json({success : true});
});

// this method fetches all available data in our database
router.get("/getSportsCenterDetails", (req, res) => {
  Premises.find((err, data) => {
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
router.post("/updateSportsCenterDetails", (req, res) => {
//   console.log('req.body params ',req.body.params);
//   console.log('req.body id ',req.body.params.update.id);
//   console.log('req.body update data',req.body.params.update);
  const id = req.body.params.update.id;
  const update = req.body.params.update;
  Premises.findOneAndUpdate({'id':id}, update, err => {
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
router.delete("/deleteSportsCenterDetails", (req, res) => {
  const { id } = req.body;
  Premises.findOneAndDelete({'id':id}, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});
// this is our select method //withAuth,
// this method selects existing data from our database
router.get("/selectPremises", (req, res) => {
    // console.log('id selectPremises',req.query.id);
    const id  = req.query.id;
    Premises.findOne({'id' : id}, function(err,data){
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
router.post("/putSportsCenterDetails", (req, res) => {
  const data = new Premises(req.body.params.update);
  try{
    req.app.get('db').collection('Premises').insertOne(data)
    .then(function(result){
      return res.json({success: true, result});
    });
  }catch(err){
    console.log('in catch',err);
    return res.json({success: false, error: err});
  }
});//end of insert

//Court Info start here
// this method fetches all available data in our database
router.get("/getCourtInfoDetails", (req, res) => {
    CourtInfo.find((err, data) => {
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
  router.post("/updateCourtInfoDetails", (req, res) => {
  //   console.log('req.body params ',req.body.params);
  //   console.log('req.body id ',req.body.params.update.id);
  //   console.log('req.body update data',req.body.params.update);
    const id = req.body.params.update.id;
    const update = req.body.params.update;
    CourtInfo.findOneAndUpdate({'id':id}, update, err => {
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
  router.delete("/deleteCourtInfoDetails", (req, res) => {
    const { id } = req.body;
    CourtInfo.findOneAndDelete({'id':id}, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });
  // this is our select method //withAuth,
  // this method selects existing data from our database
  router.get("/selectCourtInfo", (req, res) => {
      const id  = req.query.id;
      CourtInfo.findOne({'id' : id}, function(err,data){
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
  router.post("/putCourtInfoDetails", (req, res) => {
    const data = new CourtInfo(req.body.params.update);
    try{
      req.app.get('db').collection('CourtInfo').insertOne(data)
      .then(function(result){
        return res.json({success: true, result});
      });
    }catch(err){
      console.log('in catch',err);
      return res.json({success: false, error: err});
    }
  });//end of insert

module.exports = router ;
