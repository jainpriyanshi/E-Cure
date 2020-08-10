const express = require("express");
const router =  express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("validator");
const isEmpty = require("is-empty");
const keys = require("../config/keys");

const ValidateRegisterInput = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.allergies = !isEmpty(data.allergies) ? data.allergies : "";
    data.sex = !isEmpty(data.sex) ? data.sex : "";
    data.age = !isEmpty(data.age) ? data.age : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.weight = !isEmpty(data.weight) ? data.weight : "";
    data.dob = !isEmpty(data.dob) ? data.dob : "";
    
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.phone)) {
      errors.phone = "Phone field is required";
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

const ValidateLoginInput = function validateLoginInput(data) {
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
   const ValidateOTPInput = function validateOTPInput(data) {
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


  const User = require ("../models/Patient");

  router.post("/verify", (req, res) => {
    
    const { errors, isValid } = ValidateOTPInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    var update = {isVerified: true}
    User.findOneAndUpdate({ email: req.body.email, otp: req.body.otp },update).then(user => {
      if (!user) {
        return res.status(400).json({ email: "Email not found  or otp is incorrect" });
      } 
      else {
        console.log("verified succesfully")
        return res.status(200).json({ verify: "verfied"});
      }
    });
  });

  router.post("/register", (req, res) => {
    console.log(req.body);
    console.log("hello");
    const { errors, isValid } = ValidateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } 
      else {
        var otp = require('random-int')(10000, 100000);
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          otp: otp.toString(),
          isVerified: false,
          phone: req.body.phone
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user), require('../validations/mail').mailverify(req.body.email,otp))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  router.post("/login", (req, res) => {
    const { errors, isValid } = ValidateLoginInput(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then(user => {

      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found " });
      }
      else if(!user.isVerified)
      {
        return res.status(404).json({emailnotverified: "email not verified"})
      };
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email
            
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
          console.log(user.email);
          console.log("login ");
        } else {
          return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });


  module.exports = router;