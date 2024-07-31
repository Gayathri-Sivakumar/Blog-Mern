const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    authorName: { type: String, required: true },
    images: [String], // Array of Base64 encoded image strings
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

blogSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
