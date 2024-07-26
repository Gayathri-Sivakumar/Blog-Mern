import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogPostCard from "../components/BlogPostCard";
import { getBlogsByUser, deleteBlog } from "../services/api";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogsByUser();
        console.log(response[0]); // Check the first item of the response array
        if (response) {
          setPosts(response); // Set posts directly with the response
        } else {
          setAlert({ type: "error", message: "Failed to fetch posts." });
          setOpen(true);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setAlert({ type: "error", message: "Failed to fetch posts." });
        setOpen(true);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      setAlert({ type: "success", message: "Post deleted successfully!" });
      setOpen(true);
    } catch (error) {
      console.error("Error deleting post:", error);
      setAlert({ type: "error", message: "Failed to delete post." });
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/admin/new"
      >
        Create New Post
      </Button>
      <Box mt={3}>
        {posts.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Your views are waiting for your post! Create a new post to share
            your thoughts. The community is excited to hear from you!
          </Typography>
        ) : (
          <Grid container spacing={2} mt={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <BlogPostCard post={post} />
                <Box mt={1}>
                  <Button
                    component={Link}
                    to={`/admin/edit/${post._id}`}
                    variant="contained"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(post._id)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard;
