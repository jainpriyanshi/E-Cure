const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const imageSchema = new Schema({
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
    img: 
	{ 
		data: Buffer, 
		contentType: String 
	} 
});

module.exports = Patient = mongoose.model("image", imageSchema);