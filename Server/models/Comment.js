// const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema({
//   blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
//   author: {
//     id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     name: { type: String, required: true },
//   },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Comment", commentSchema);

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  authorName: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);
