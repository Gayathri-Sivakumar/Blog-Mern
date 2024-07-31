const { combineTableNames } = require("sequelize/lib/utils");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const multer = require("multer");

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    console.log(req.body);
    const { title, shortDescription, content, authorName } = req.body;
    let image = null;

    // Convert image to base64 if present
    if (req.file) {
      image = req.file.buffer.toString("base64");
    }

    // Create new blog post
    const newBlog = new Blog({
      title,
      shortDescription,
      content,
      authorName,
      images: image ? [image] : [],
    });

    // Save blog post to the database
    await newBlog.save();
    console.log(newBlog);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Error creating blog" });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    // Fetch all blogs sorted by creation date
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

// Get a specific blog post by ID
const getBlogById = async (req, res) => {
  try {
    // Fetch blog post by ID
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
    console.log(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Error fetching blog" });
  }
};

// Update a blog post
const updateBlog = async (req, res) => {
  try {
    const { title, shortDescription, content, authorName } = req.body;
    let image = null;

    // Convert image to base64 if present
    if (req.file) {
      image = req.file.buffer.toString("base64");
    }

    // Fetch blog post by ID
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Ensure only the author or an admin can update the blog (commented out)
    // if (blog.author.id.toString() !== req.user._id.toString() && !req.isAdmin) {
    //   return res.status(403).json({ error: "Access denied" });
    // }

    // Update blog post fields
    blog.title = title;
    blog.shortDescription = shortDescription;
    blog.content = content;
    blog.authorName = authorName;
    if (image) {
      blog.images = [image];
    }
    blog.updatedAt = Date.now();

    // Save updated blog post to the database
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Error updating blog" });
  }
};

// Delete a blog post
const deleteBlog = async (req, res) => {
  try {
    // Fetch blog post by ID
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Ensure only the author or an admin can delete the blog (commented out)
    // if (blog.author.id.toString() !== req.user._id.toString() && !req.isAdmin) {
    //   return res.status(403).json({ error: "Access denied" });
    // }

    // Delete the blog post
    await Blog.deleteOne({ _id: req.params.id });

    // Delete comments associated with the blog post
    await Comment.deleteMany({ blogId: blog._id });

    res.status(200).json({ success: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Error deleting blog" });
  }
};

module.exports = {
  upload,
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
