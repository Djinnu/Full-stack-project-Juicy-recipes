const express = require("express")
const router = express.Router()
const commentsController = require("../controllers/comments")
const { ensureAuth, ensureGuest} = require("../middleware/auth")

//Comment Routes
router.post("/createComment/:id", ensureAuth, commentsController.createComment)
router.delete("/deleteComment", commentsController.deleteComment)
router.put("/likeComment", ensureAuth, commentsController.likeComment)
module.exports = router