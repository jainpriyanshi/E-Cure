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
    status: {
        type: String,
        default: "Under Consideration"
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