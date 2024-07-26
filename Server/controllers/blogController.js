const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create a new blog post
const createBlog = async (req, res) => {
  console.log(req.body);
  try {
    const { title, shortDescription, content } = req.body;
    console.log(req.body);
    // Handle single file upload
    const image = req.file ? req.file.path : null; // For single file
    // const images = req.files.map((file) => file.path); // For multiple files

    const newBlog = new Blog({
      title,
      shortDescription,
      content,
      author: {
        id: req.user._id,
        name: req.user.name,
      },
      images: image ? [image] : [], // Ensure images is an array
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Error creating blog" });
  }
};

// Get all blog posts by the request user
const getBlogsByUser = async (req, res) => {
  try {
    const blogs = await Blog.find({ "author.id": req.user._id }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user blogs" });
  }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

// Get a specific blog post by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author.id",
      "name"
    );
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog" });
  }
};

// Update a blog post
const updateBlog = async (req, res) => {
  try {
    const { title, shortDescription, content } = req.body;
    const image = req.file ? req.file.path : null;
    console.log(req.body);

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        shortDescription,
        content,
        author: {
          id: req.user._id,
          name: req.user.name,
        },
        images: image ? [image] : [],
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Error updating blog" });
  }
};

// Delete a blog post
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    await Comment.deleteMany({ blogId: blog._id });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
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
  getBlogsByUser,
};
