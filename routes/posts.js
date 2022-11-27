const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get("/:id", postsController.getPost)
router.post("/createPost", upload.single("file"), postsController.createPost)
router.put("/likePost/:id", ensureAuth, postsController.likePost)
router.delete("/deletePost/:id", postsController.deletePost)
router.put("/favPost/:id", ensureAuth, postsController.favPost)

module.exports = router