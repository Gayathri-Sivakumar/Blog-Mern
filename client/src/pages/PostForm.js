import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBlog, updateBlog, getBlogById } from "../services/api";

const PostForm = () => {
  const [post, setPost] = useState({
    title: "",
    shortDescription: "",
    content: "",
    image: null, // Initialize as null for single image
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await getBlogById(id);
          setPost({
            ...response,
          });
        } catch (error) {
          console.error("Error fetching post:", error);
          setAlert({ type: "error", message: "Failed to fetch post." });
          setOpen(true);
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleFileChange = (e) => {
    setPost({ ...post, image: e.target.files[0] }); // Update image directly
    console.log(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("shortDescription", post.shortDescription);
    formData.append("content", post.content);

    if (post.image) {
      formData.append("image", post.image);
    }

    // Log form data content
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      if (id) {
        await updateBlog(id, formData);
        setAlert({ type: "success", message: "Post updated successfully!" });
      } else {
        await createBlog(formData);
        setAlert({ type: "success", message: "Post created successfully!" });
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error saving post:", error);
      setAlert({ type: "error", message: "Failed to save post." });
    } finally {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Post" : "Create New Post"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Title"
          name="title"
          value={post.title}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Short Description"
          name="shortDescription"
          value={post.shortDescription}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Content"
          name="content"
          value={post.content}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          style={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Post" : "Create Post"}
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PostForm;
