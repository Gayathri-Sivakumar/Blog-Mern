const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  createComment,
  getCommentsByBlogId,
} = require("../controllers/commentController");

const router = express.Router();

router.post("/", authenticateToken, createComment);
router.get("/:blogId", getCommentsByBlogId);

module.exports = router;
