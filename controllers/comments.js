const Comment = require("../models/Comment")
const Post = require("../models/Post")
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

module.exports = {
    createComment: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            await Comment.create({
                comment: req.body.comment,
                likes: [],
                post: req.params.id,
                user: req.user.userName,
                createdAt: Date.now(),
                image: post.image
            })
            
            res.redirect("/post/"+req.params.id)
        } catch(err) {
            console.log(err)
        }
    },
    deleteComment: async (req, res) => {
        try {
            await Comment.deleteOne({ _id: req.body.itemFromJS})
            res.json('comment deleted')
        } catch(err) {
            console.log(err)
        }
    },
    getUserComments: async (req, res) => {
        try {
            let comments = await Comment.find({ user: req.user.userName }).sort({ createdAt: "desc"}).lean()
            comments.map(x => x.createdAt = dayjs(x.createdAt).fromNow())
            res.render("userComments.ejs", { comments: comments, user: req.user })
        } catch(err) {
            console.log(err)
        }
    },
    likeComment: async (req, res) => {
        try {
            const comment = await Comment.findById(req.body.itemFromJS)
            if(!comment.likes.includes(req.user.id)) {
                comment.likes.push(req.user.id)
            } else {
                comment.likes.pull(req.user.id)
            }
            comment.save()
            res.json('comment modified')
        } catch(err) {
            console.log(err)
        }
    }
}