const express = require("express");
// const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");
const { authenticateToken } = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  blogController.upload.single("image"),
  blogController.createBlog
);
router.get("/", blogController.getAllBlogs); // Publicly accessible
// router.get("/user", authenticateToken, blogController.getBlogsByUser);
router.get("/:id", blogController.getBlogById);
router.put(
  "/:id",
  authenticateToken,
  blogController.upload.single("image"),
  blogController.updateBlog
);
router.delete("/:id", authenticateToken, blogController.deleteBlog);

// router.get(
//   "/blogs",
//   authenticateToken,
//   isAdmin,
//   blogController.getAllBlogs
// ); // Admin only

module.exports = router;
