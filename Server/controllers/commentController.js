const Comment = require("../models/Comment");

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { postId, authorName, content } = req.body;
    console.log(req.body);

    // Create a new comment object
    const newComment = new Comment({
      blogId: postId,
      authorName,
      content,
      // Optional author field
      // author: {
      //   id: req.user._id,
      //   name: req.user.name,
      // },
    });

    // Save the new comment to the database
    await newComment.save();
    console.log("newComment", newComment);

    res.status(201).json(newComment);
  } catch (error) {
    // Log the error and respond with a 500 status code
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

// Get comments for a specific blog post
const getCommentsByBlog = async (req, res) => {
  try {
    console.log("req.params.blogId", req.params.blogId);

    // Fetch comments for the specified blog post, sorted by creation date
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({
      createdAt: -1,
    });
    console.log("comments", comments);

    res.json(comments);
  } catch (error) {
    // Log the error and respond with a 500 status code
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments" });
  }
};

module.exports = {
  createComment,
  getCommentsByBlog,
};
