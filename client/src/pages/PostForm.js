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
    authorName: "",
    content: "",
    image: null, // Initialize as null for single image
  });
  const [errors, setErrors] = useState({
    title: "",
    shortDescription: "",
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
            image: null, // Ensure image is not set during edit
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

  const validateForm = () => {
    let valid = true;
    let errors = {};

    // Validate title
    const titleWordCount = post.title.trim().split(/\s+/).length;
    if (titleWordCount > 20) {
      errors.title = "Title cannot exceed 20 words.";
      valid = false;
    }

    // Validate short description
    if (post.shortDescription.length > 120) {
      errors.shortDescription =
        "Short description cannot exceed 120 characters.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("shortDescription", post.shortDescription);
    formData.append("authorName", post.authorName);
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

  const handleCancel = () => {
    navigate("/admin");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
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
          error={!!errors.title}
          helperText={errors.title}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Short Description"
          name="shortDescription"
          value={post.shortDescription}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.shortDescription}
          helperText={errors.shortDescription}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Author Name"
          name="authorName"
          value={post.authorName}
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {id ? "Update Post" : "Create Post"}
          </Button>
        </Box>
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
