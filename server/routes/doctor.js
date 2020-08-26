const express = require("express");
const router =  express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const isEmpty = require("is-empty");
const keys = require("../config/keys");
const doctors = require('../models/Doctor');
var spawn = require("child_process").spawn;
const Appointment = require('../models/Appointment');
const { verifyToken } = require('../middlewares/verifyToken');
const Image= require('../models/Image');

const ValidateDoctorRegisterInput = function validateDoctorRegisterInput(data) {
  console.log(data);
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.reg_num = !isEmpty(data.reg_num) ? data.reg_num : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.specialization = !isEmpty(data.specialization) ? data.specialization : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.hospital_name = !isEmpty(data.hospital_name) ? data.hospital_name : "";

    
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = "Address field is required";
    }
    if (Validator.isEmpty(data.specialization)) {
        errors.specialization = "Specialisation field is required";
    }
    if (Validator.isEmpty(data.reg_num)) {
        errors.reg_num = "Registration Number field is required";
    }
    if (Validator.isEmpty(data.hospital_name)) {
      errors.hospital_name = "Hospital Name field is required";
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Contact Number field is required";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
      }
      if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
      }
      if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
        errors.password = "Password must be at least 6 characters";
      }
      if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
      }
      return {
        errors,
        isValid: isEmpty(errors)
      };
    };

    const ValidateDoctorLoginInput = function validateDoctorLoginInput(data) {
        let errors = {};
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";// Email checks
        
        if (Validator.isEmpty(data.email)) {
          errors.email = "Email field is required";
        } 
        else if (!Validator.isEmail(data.email)) {
          errors.email = "Email is invalid";
        }
      
        if (Validator.isEmpty(data.password)) {
          errors.password = "Password field is required";
        }
        return {
          errors,
          isValid: isEmpty(errors)
        };
      };
    const ValidateDoctorOTPInput = function validateDoctorOTPInput(data) {
        let errors = {};
        data.email = !isEmpty(data.email) ? data.email : "";
        data.otp = !isEmpty(data.otp) ? data.otp : "" ;// Email checks
        
        if (Validator.isEmpty(data.email)) {
          errors.email = "Email field is required";
        } 
        else if (!Validator.isEmail(data.email)) {
          errors.email = "Email is invalid";
        }
      
        if (Validator.isEmpty(data.otp)) {
          errors.otp = "otp is required";
        }
        return {
          errors,
          isValid: isEmpty(errors)
        };
      };
      const Doctor = require ("../models/Doctor");
      router.post("/verify", (req, res) => {
    
        const { errors, isValid } = ValidateDoctorOTPInput(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }
        var update = {isVerified: true}
        Doctor.findOneAndUpdate({ email: req.body.email, otp: req.body.otp },update).then(doctor => {
          if (!doctor) {
            return res.status(400).json({ email: "Email not found  or otp is incorrect" });
          } 
          else {
            console.log("doctor verified succesfully")
            return res.status(200).json({ verify: "verfied"});
          }
        });
      });
      
    
      router.post("/register", (req, res) => {
        const { errors, isValid } = ValidateDoctorRegisterInput(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }
        Doctor.findOne({ email: req.body.email }).then(doctor => {
          if (doctor) {
            return res.status(400).json({ email: "Email already exists" });
          } 
          else {
            var otp = require('random-int')(1000, 10000);
            const newDoctor = new Doctor({
              name: req.body.name,
              email: req.body.email,
              address:req.body.address,
              password: req.body.password,
              otp: otp.toString(),
              isVerified: true,
              reg_num: req.body.reg_num,
              phone: req.body.phone,
              specialization: req.body.specialization,
              hospital_name : req.body.hospital_name,
              mon: req.body.mon,
              tues: req.body.tues,
              wed: req.body.wed,
              thrus: req.body.thrus,
              fri: req.body.fri,
              sat: req.body.sat,
              sun: req.body.sun,
            });
           
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newDoctor.password, salt, (err, hash) => {
                if (err) throw err;
                newDoctor.password = hash;
                newDoctor
                  .save()
                  .then(doctor => res.json(doctor))
                  .catch(err => console.log(err));
              });
            });
          }
        });
      });
      
      router.post("/login", (req, res) => {
        const { errors, isValid } = ValidateDoctorLoginInput(req.body);// Check validation
        
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const email = req.body.email;
        const password = req.body.password;
        Doctor.findOne({ email }).then(doctor => {
    
          if (!doctor) {
            return res.status(404).json({ emailnotfound: "Email not found " });
          }
          else if(!doctor.isVerified)
          {
            return res.status(404).json({emailnotverified: "email not verified"})
          };
          bcrypt.compare(password, doctor.password).then(isMatch => {
            if (isMatch) {
              const payload = {
                id: doctor.id,
                name: doctor.name,
                reg_num: doctor.reg_num,
                doctor: true,
                patient: false,
              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
               
              );
              console.log(doctor.email);
              console.log("doctorlogin ");
            } else {
              return res.status(400).json({ passwordincorrect: "Password incorrect" });
            }
          });
        });
      });

    router.get("/getSpecialization", (req, res) => {
      doctors.find({}).then(doctor => {
        var response = {};
         for(var i = 0; i < doctor.length; i++)
         {
           var specialization = doctor[i].specialization;
           if(specialization in response)
           {
             response[specialization].push(doctor[i].name);
           }
           else
           {
             response[specialization] = [];
             response[specialization].push(doctor[i].name);
           }
           
         }
         console.log(response);
         res.json({ success: true, response })
      })
      .catch(err => {
          res.json({success: false})
      })
    });

    router.get("/getDays", (req, res) => {
      doctors.find({}).then(doctor => {
        var response = {};
        for(var i = 0; i < doctor.length; i++)
        {
          var name = doctor[i].name;
          response[name] = [];
          if(doctor[i].mon)
          response[name].push("mon");
          if(doctor[i].tues)
          response[name].push("tues");
          if(doctor[i].wed)
          response[name].push("wed");
          if(doctor[i].thurs)
          response[name].push("thurs");
          if(doctor[i].fri)
          response[name].push("fri");
          if(doctor[i].sat)
          response[name].push("sat");
          if(doctor[i].sun)
          response[name].push("sun");
        }
        console.log(response);
        res.json({ success: true, response })
      })
    });

    router.get('/getAllAppointment', (req,res) => {
      const token = req.headers['x-access-token'].split(' ')[1];
      try {
        if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

          jwt.verify(token, keys.secretOrKey, (err, decoded) => {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            console.log(decoded);
            Appointment.find({doctor_id : decoded.id}).then (data => {
            return res.json({appointment: data})
          })
      }); 
    }
     catch (error) {
        console.log(error.message);
      }
    });

    router.post('/changeStatus', (req,res) => {
      Appointment.findByIdAndUpdate(req.body.app_id, {status: req.body.status})
       .then(app => {
         res.json({success: true})
       })
       .catch(err => {
         res.json({success: true})
       })
    });
    
    router.get('/myPatients', verifyToken, (req,res) => {
      let doctorId = req.userId;
      Appointment.find({doctor_id : doctorId})
      .then(patients => {
        console.log(patients)
        var response = [];
        for(var i = 0; i < patients.length; i++)
        {
          response.push(patients[i].patient_name);
        }
        console.log(response);
        res.json({ success: true, response })
      })
      .catch(err => {
        res.json({success: false})
      })
    });

    router.get('/displayPrescription',verifyToken, (req,res) => {
      let doctorId = req.userId;
      Image.find({doctor_id: doctorId})
      .then(images => {
        console.log(images)
        res.json({images, success: true})
      })
      .catch(err => {
        res.json({success: false})
      })
    })

    router.get("/getSpecializationAndName", (req, res) => {
      doctors.find({}).then(doctor => {
        res.send(doctor)
      })
      .catch(err => {
          res.json({success: false})
      })
    });
    
    module.exports = router;

