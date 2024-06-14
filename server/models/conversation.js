const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    }]
}, { timestamps: true });

module.exports = mongoose.model("conversation", conversationSchema);