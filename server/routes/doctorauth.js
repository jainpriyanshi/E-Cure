const express = require("express");
const router =  express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const isEmpty = require("is-empty");
const keys = require("../config/keys");
const Doctor = require ("../models/doctor");
const Patient = require ("../models/Patient");

const ValidateDoctorRegisterInput = function validateDoctorRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.licenseNo = !isEmpty(data.licenseNo) ? data.licenseNo : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.contactNo = !isEmpty(data.contactNo) ? data.contactNo : "";
    data.qualification = !isEmpty(data.qualification) ? data.qualification : "";
    data.sex = !isEmpty(data.sex) ? data.sex : "";
    data.specialisation = !isEmpty(data.specialisation) ? data.specialisation : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.hospital =  !isEmpty(data.hospital) ? data.hospital : "";
    
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (Validator.isEmpty(data.address)) {
        errors.address = "Address field is required";
    }
    if (Validator.isEmpty(data.hospital)) {
      errors.address = "Hospital field is required";
  }
    if (Validator.isEmpty(data.sex)) {
        errors.sex = "Sex field is required";
    }
    if (Validator.isEmpty(data.qualification)) {
        errors.qualification = "Qualification field is required";
    }
    if (Validator.isEmpty(data.specialisation)) {
        errors.specialisation = "Specialisation field is required";
    }
    if (Validator.isEmpty(data.licenseNo)) {
        errors.licenseNo = "License Number field is required";
    }
    if (Validator.isEmpty(data.contactNo)) {
        errors.contactNo = "Contact Number field is required";
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
      router.post("/pat-otp", (req, res) => {

        Patient.findOne({ email: req.body.email, otp: req.body.otp }).then(doctor => {
          if (!doctor) {
            return res.status(400).json({ email: "Email not found  or otp is incorrect" });
          } 
          else {
            res.send(doctor._id);
            return res.status(200).json({ verify: "verfied"});
          }
        });
      });
      router.post("/pat-login", (req, res) => {
        var otp = require('random-int')(10000, 100000);
        console.log(otp);
        console.log(req.body);
        var update = {otp: otp};
        Patient.findOneAndUpdate({ email: req.body.email},update).then(patient => {
          if (!patient) {
            return res.status(400).json({ email: "Email not found" });
          } 
          else {
            var mail = require('../validations/mail').mailverify(req.body.email,otp);
            return res.status(200).json({ send : "done"});
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
            var otp = require('random-int')(100000, 1000000);
            const newDoctor = new Doctor({
              name: req.body.name,
              email: req.body.email,
              address:req.body.address,
              password: req.body.password,
              otp: otp.toString(),
              isVerified: false,
              qualification:req.body.qualification,
              licenseNo: req.body.licenseNo,
              contactNo: req.body.contactNo,
              sex: req.body.sex,
              specialisation: req.body.specialisation,
              hospital: req.body.hospital,
            });
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newDoctor.password, salt, (err, hash) => {
                if (err) throw err;
                newDoctor.password = hash;
                newDoctor
                  .save()
                  .then(doctor => res.json(doctor), require('../validations/login').otpupdate(req.body.email,otp))
                  .catch(err => console.log(err));
              });
            });
          }
        });
      });
      router.post("/addpres", (req,res) => {
        var update = {weight: req.body.weight}
        
         Patient.findOneAndUpdate({_id: req.body.patientid}, update ).then(user => {
          if(user){
              console.log(user);
          }
        });

          const Prescription = {
            "doctor": req.body.doctor,
            "licenseNo": req.body.licenseNo,
            "prescriptionNo": req.body.prescriptionNo,
            "test": req.body.test,
            "disease": req.body.disease,
            "medicines": req.body.medicines,
            "comments": req.body.comments
          };
          Patient.findOneAndUpdate({_id: req.body.patientid} , {$addToSet: {prescription: Prescription} } ).then(user => {
            if(user){
                console.log(user);
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
                doctor: true,
                patient: false
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
    
    
      module.exports = router;
