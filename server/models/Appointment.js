const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const AppointmentSchema = new Schema({
    doctor_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    patient_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    patient_name: {
        type: String,
        required: true
    },
    doctor_name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default:0
    },
    specialization: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    ailment: {
        type: String,
        required: true
    }
});

module.exports = Patient = mongoose.model("appointment", AppointmentSchema);