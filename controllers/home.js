const Post = require("../models/Post")
const { truncate } = require("../helpers/truncate")

module.exports = {
    getIndex: async (req, res) => {
        try {
            const posts = await Post.find().sort({ likes: "desc" }).lean()
            posts.map(x => x.title = truncate(x.title, 38))
            res.render("index.ejs", { posts: posts, user: req.user })
        } catch(err) {
            console.log(err)
        }
    },
    getUpload: (req, res) => {
        res.render("upload.ejs")
    }
}