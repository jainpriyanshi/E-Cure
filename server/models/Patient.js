const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const PatientSchema = new Schema({
    name: {
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
    phone : {
        type : String,
        required: true,
    },
    prescription : [{
        prescriptionNo: {
            type: String
        },
        doctor : {
            type: String
        },
        licenseNo : {
            type: String
        },
        comment : {
            type: String
        },
    }],
    newchat: [{
        user_name : {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        }
    }]
});

module.exports = Patient = mongoose.model("patient", PatientSchema);