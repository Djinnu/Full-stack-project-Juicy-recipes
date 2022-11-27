const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require("../middleware/auth") 
const homeController = require("../controllers/home")
const commentsController = require("../controllers/comments")


router.get("/", homeController.getIndex)
router.get("/upload", ensureAuth, homeController.getUpload)
router.get("/feed", postsController.getFeed)
router.get("/profile", ensureAuth, postsController.getProfile)
router.get("/userPosts", ensureAuth, postsController.getUserPosts)
router.get("/userFavs", ensureAuth, postsController.getUserFavs)
router.get("/userComments", ensureAuth, commentsController.getUserComments)
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin)
router.get("/signup", authController.getSignup)
router.post("/signup", authController.postSignup)
router.get("/logout", authController.logout)

module.exports = router