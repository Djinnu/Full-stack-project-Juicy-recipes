const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const { truncate } = require("../helpers/truncate")
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

module.exports = {
    getProfile: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id })
            res.render("profile.ejs", { user: req.user })
        } catch(err) {
            console.log(err)
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.user.id })
            posts.map(x => x.title = truncate(x.title, 36))
            res.render("userPosts.ejs", { posts: posts, user: req.user })
        } catch(err) {
            console.log(err)
        }
    },
    getUserFavs: async (req, res) => {
        try {
            const user = req.user.id
            const posts = await Post.find({ favourites: user})
            posts.map(x => x.title = truncate(x.title, 36))
            res.render("userFavs.ejs", { posts: posts, user: req.user})
        } catch(err) {
            console.log(err)
        }
    },
    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: "desc" }).lean()
            posts.map(x => x.title = truncate(x.title, 36))
            res.render("feed.ejs", { posts: posts, user: req.user })
        } catch(err) {
            console.log(err)
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            const ingredients = post.ingredients.split(".")
            ingredients.pop()
            let directions = post.directions.split(".")
            directions.pop()
            let comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc"}).lean()
            comments.map(x => x.createdAt = dayjs(x.createdAt).fromNow())
            res.render("post.ejs", { post: post, user: req.user, comments: comments, ingredients: ingredients, directions: directions })
        } catch(err) {
            console.log(err)
        }
    },
    createPost: async (req, res) => {
        try {
            //Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path)
            await Post.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                likes: [],
                user: req.user.id,
                ingredients: req.body.ingredients,
                directions: req.body.directions,
                cookTime: req.body.cookTime,
                cookTimeUnit: req.body.cookTimeUnit,
                prepTime: req.body.prepTime,
                prepTimeUnit: req.body.prepTimeUnit,
                favourites: []
            })
            console.log("Post has been added!")
            res.redirect("/feed")
        } catch(err) {
            console.log(err)
        }
    },
    likePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if(!post.likes.includes(req.user.id)) {
                post.likes.push(req.user.id)
            } else {
                post.likes.pull(req.user.id)
            }
            post.save()
            res.redirect(`/post/${req.params.id}`)
        } catch(err) {
            console.log(err)
        }
    },
    favPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if(!post.favourites.includes(req.user.id)) {
                post.favourites.push(req.user.id)
            } else {
                post.favourites.pull(req.user.id)
            }
            post.save()
            res.redirect(`/post/${req.params.id}`)
        } catch(err) {
            console.log(err)
        }
    },
    deletePost: async (req, res) => {
        try {
            //Find post by id
            let post = await Post.findById({ _id: req.params.id })
            //Delete image from cloudinary
            await cloudinary.uploader.destroy(post.cloudinaryId)
            //Delete post from db
            await Post.remove({ _id: req.params.id })
            console.log("Deleted Post")
            res.redirect("/profile")
        } catch(err) {
            console.log(err)
        }
    }
}