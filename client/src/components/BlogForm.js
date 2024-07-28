// src/components/BlogForm.js
import React, { useState } from "react";
import { createBlog } from "../services/api";
import { toast } from "react-toastify";
import { TextField, Button, Box } from "@mui/material";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    images: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("shortDescription", formData.shortDescription);
    formDataObj.append("content", formData.content);
    formData.images.forEach((image) => {
      formDataObj.append("images", image);
    });

    try {
      await createBlog(formDataObj);
      toast.success("Blog created successfully!");
      setFormData({ title: "", shortDescription: "", content: "", images: [] });
    } catch (error) {
      toast.error("Error creating blog");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Short Description"
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <input
        type="file"
        name="images"
        onChange={handleImageChange}
        multiple
        style={{ marginBottom: "16px" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Create Blog
      </Button>
    </Box>
  );
};

export default BlogForm;
