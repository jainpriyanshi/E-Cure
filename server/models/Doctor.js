const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const DoctorSchema = new Schema({
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
    reg_num : {
        type : String,
        required: true,
    },
    specialization : {
        type : String,
        required: true,
    },
    hospital_name : {
        type : String,
        required: true,
    },
    address : {
        type : String,
        required: true,
    },
    phone : {
        type : String,
        required: true,
    },
    mon: [
        {
            type: String, 
        }
    ],
    tues: [
        {
            type: String, 
        }
    ],
    wed: [
        {
            type: String, 
        }
    ],
    thrus: [
        {
            type: String, 
        }
    ],
    fri: [
        {
            type: String, 
        }
    ],
    sat: [
        {
            type: String, 
        }
    ],
    sun: [
        {
            type: String, 
        }
    ],
});

module.exports = Doctor = mongoose.model("doctors", DoctorSchema);