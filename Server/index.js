"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");

const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
require("./db/db");

const app = express();
const port = process.env.PORT || 8081;

const uploadsDir = path.join(__dirname, "uploads");

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Uploads directory created.");
} else {
  console.log("Uploads directory already exists.");
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Security headers
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN || "https://blog-mern-frontend-two.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Set CORS headers for static files
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Serve static files
app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);
app.use("/contacts", contactRoutes);
app.use("/auth", authRoutes);
app.use("/uploads", uploadRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Server start
(async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = app;
