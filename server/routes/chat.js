const express = require("express");
const router =  express.Router();

const Patient = require ("../models/Patient");
const Doctor = require ("../models/Doctor");
const Chat = require ("../models/Chat");

router.get('/getchat', function(req, res){
    Chat.find({}).then(docs => {
      res.send(docs);
    })
  });
  router.post("/createchat" , (req,res) => {
    var newchat = {
        user_name: req.body.user1_name,
        user_id : req.body.user1_id
    }
Patient.findOneAndUpdate({_id: req.body.user2_id} , {$addToSet: {newchat: newchat } } );
   newchat = {
    user_name: req.body.user2_name,
    user_id : req.body.user2_id
}
Doctor.findOneAndUpdate({_id: req.body.user1_id} , {$addToSet: {newchat: newchat } } );
});
module.exports = router;