const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  try {
    const { blogId, content } = req.body;
    const newComment = new Comment({
      blogId,
      author: {
        id: req.user._id,
        name: req.user.name,
      },
      content,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
  }
};

const getCommentsByBlogId = async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

module.exports = {
  createComment,
  getCommentsByBlogId,
};
