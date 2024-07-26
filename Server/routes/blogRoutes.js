const express = require("express");
const { authenticateToken } = require("../middlewares/authMiddleware");
const {
  upload,
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
} = require("../controllers/blogController");

const router = express.Router();

// For creating a blog with images
router.post("/", authenticateToken, upload.single("image"), createBlog);

// For updating a blog with images
router.put("/:id", authenticateToken, upload.single("image"), updateBlog);

router.get("/", getAllBlogs);
router.get("/user", authenticateToken, getBlogsByUser);
router.get("/:id", getBlogById);
router.delete("/:id", authenticateToken, deleteBlog);

module.exports = router;
