const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        sender_id: {
            type: String,
            required: true
        },
        message: String
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model('message', messageSchema);

module.exports = { Message }