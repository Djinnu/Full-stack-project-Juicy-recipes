const mongoose = require("mongoose")


const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    likes: [String],
    post: {
        type: mongoose.Schema.Types.ObjectId,
        href: "Post"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: String,
        required: true
    },
    image: String
})

module.exports = mongoose.model("Comment", CommentSchema)

