const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const ChatSchema = new Schema({
    sender_id: {
        type: String,
        required: true
    },
    receiver_id: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    msg: 
	{ 
        type: String,
        required: true
	} 
});

module.exports = Chat = mongoose.model("chat", ChatSchema);