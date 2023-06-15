const mongoose = require("mongoose");
const { title } = require("process");

const postSchema = new mongoose.Schema({

    user: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model("Posts", postSchema);
