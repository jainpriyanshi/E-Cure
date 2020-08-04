const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    licenseNo: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    specialisation:{
       type: String,
       tequired: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    isVerified: {
        type : Boolean,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
   
});
module.exports = doctor = mongoose.model("doctor",DoctorSchema);