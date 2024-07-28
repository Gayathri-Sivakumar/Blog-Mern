const express = require("express");
// const { authenticateToken } = require("../middlewares/authMiddleware");
const commentController = require("../controllers/commentController");

const router = express.Router();

// router.post("/comments", authenticateToken, commentController.createComment); // Only registered users4
router.post("/", commentController.createComment); //  Publicly accessible
router.get("/:blogId", commentController.getCommentsByBlog); // Publicly accessible

module.exports = router;
