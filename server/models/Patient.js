const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    allergies : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    age: {
        type : String,
        required : true
    },
    sex: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    prescription : [{
        prescriptionNo: {
            type: String
        },
        doctor : {
            type: String
        },
        licenseNo :{
            type: String
        },
        test: 
        {type: String},
        disease: {
            type: String
        },
        medicines:
            {type: String},
        comments: 
        {type: String }
    }]
});

module.exports = Patient = mongoose.model("patient",PatientSchema);