import axios from "axios";

const API_URL = "http://localhost:8081";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    const { token } = response.data;

    // Save token in localStorage
    localStorage.setItem("authToken", token);

    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const signup = (user) => api.post("/auth/signup", user);

// Blogs
// Function to get all blogs (public access, no token needed)
export const getAllBlogs = async () => {
  try {
    const response = await api.get("/blogs/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch blogs");
  }
};

// Function to get a specific blog (public access, no token needed)
export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch blog");
  }
};

// Function to create a new blog
export const createBlog = async (formData) => {
  const token = localStorage.getItem("authToken");
  console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data", // Ensure this is set for file uploads
  };
  console.log(headers);
  // Log form data content
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
  try {
    const response = await api.post(`/blogs`, formData, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create blog");
  }
};

// Function to update a blog
export const updateBlog = async (id, formData) => {
  const token = localStorage.getItem("authToken");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data", // Ensure this is set for file uploads
  };

  try {
    const response = await api.put(`/blogs/${id}`, formData, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update blog");
  }
};
// Function to delete a blog (authentication required)
export const deleteBlog = async (id) => {
  const token = localStorage.getItem("authToken");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await api.delete(`/blogs/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete blog");
  }
};

export const getBlogsByUser = async () => {
  const token = localStorage.getItem("authToken");
  const headers = { Authorization: `Bearer ${token}` };

  try {
    const response = await api.get("/blogs/user", { headers });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user blogs");
  }
};

// Comments
export const getCommentsByBlogId = (blogId) => api.get(`/comments/${blogId}`);
export const createComment = (comment) => api.post("/comments", comment);

// Contacts
export const createContactMessage = (message) => api.post("/contacts", message);

export default api;
