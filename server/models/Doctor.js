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
    mon: {
        type: Boolean,
        default:true
    },
    tues: {
        type: Boolean,
        default:true
    },
    wed: {
        type: Boolean,
        default:true
    },
    thurs: {
        type: Boolean,
        default:true
    },
    fri: {
        type: Boolean,
        default:true
    },
    sat: {
        type: Boolean, 
        default: false,
    },
    sun: {
        type: Boolean, 
        default: false
    } ,
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

module.exports = Doctor = mongoose.model("doctors", DoctorSchema);