import React, { useState } from "react";
import { createBlog } from "../services/api";
import { toast } from "react-toastify";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="shortDescription"
        placeholder="Short Description"
        value={formData.shortDescription}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        required
      ></textarea>
      <input type="file" name="images" onChange={handleImageChange} multiple />
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default BlogForm;
