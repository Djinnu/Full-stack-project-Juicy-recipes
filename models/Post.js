const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    directions: {
        type: String,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    cookTimeUnit: {
        type: String,
        required: true
    },
    prepTimeUnit: {
        type: String,
        required: true
    },
    prepTime: {
        type: Number,
        required: true
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    createdAt: {
        type: Date,
        default: Date.now
    },
    favourites: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model("Post", PostSchema)