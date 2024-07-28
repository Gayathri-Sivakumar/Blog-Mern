const Comment = require("../models/Comment");

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { postId, name, content } = req.body;
    console.log(req.body);
    const newComment = new Comment({
      blogId: postId,
      authorName: name,
      content: content,
      // author: {
      //   id: req.user._id,
      //   name: req.user.name,
      // },
    });

    await newComment.save();
    console.log("newComment", newComment);
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
};

// Get comments for a specific blog post
const getCommentsByBlog = async (req, res) => {
  try {
    console.log("req.params.id", req.params.blogId);
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({
      createdAt: -1,
    });
    console.log("comments", comments);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

module.exports = {
  createComment,
  getCommentsByBlog,
};
