var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
const express = require("express");
const router =  express.Router();
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Image= require('../models/Image');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const { verifyToken } = require('../middlewares/verifyToken');

    var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, './routes/uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
      } 
    }); 
    var upload = multer({ storage: storage })
    
    router.post("/uploadPrescription", verifyToken,upload.single('filename'), (req,  res) => {
      let doctorId = req.userId;
      let doctorName;
      Doctor.findById(doctorId)
      .then(doctor => {
        doctorName = doctor.name;
      Patient.find({name:req.body.name})
      .then(patient => {
        Image.create({
          patient_id: patient[0]._id,
          patient_name: req.body.name,
          doctor_name: doctorName,
          doctor_id: doctorId,
          img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
          } 
        })
      .then(image => { 
        console.log(image);
          res.json({success: true})
        })
      })
      })
      .catch(err => {
        console.log(err);
        res.json({success: false})
      })
    });


    module.exports = router;