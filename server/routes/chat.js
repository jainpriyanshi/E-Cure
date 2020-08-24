const express = require("express");
const router =  express.Router();

const Patient = require ("../models/Patient");
const Doctor = require ("../models/Doctor");
const Chat = require ("../models/Chat");

router.get('/getchat', function(req, res){
    Chat.find({}).then(docs => {
        console.log(docs);
      res.send(docs);
    })
  });
router.get('/getuser/:id', function(req, res){
    Patient.findOne({_id: req.params.id}).then(docs => {
        res.send(docs.newchat);                                                                                                             
})
});
router.post("/createchat" , (req,res) => {
 console.log(req.body);
var newchat = {
    user_name: req.body.user1_name,
    user_id : req.body.user1_id
}
Patient.findOneAndUpdate({_id: req.body.user2_id} , {$addToSet: {newchat: newchat } } )
.then(user => console.log(user));
   newchat = {
    user_name: req.body.user2_name,
    user_id : req.body.user2_id
}
Doctor.findOneAndUpdate({_id: req.body.user1_id} , {$addToSet: {newchat: newchat } } );
});
module.exports = router;