import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogPostCard from "../components/BlogPostCard";
import { getAllBlogs, deleteBlog } from "../services/api";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllBlogs();
        if (response) {
          setPosts(response);
        } else {
          setAlert({ type: "error", message: "Failed to fetch posts." });
          setOpen(true);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setAlert({ type: "error", message: "Failed to fetch posts." });
        setOpen(true);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts();
  }, []);

  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBlog(selectedPostId);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== selectedPostId)
      );
      setAlert({ type: "success", message: "Post deleted successfully!" });
      setOpen(true);
    } catch (error) {
      console.error("Error deleting post:", error);
      setAlert({ type: "error", message: "Failed to delete post." });
      setOpen(true);
    } finally {
      setDeleteModalOpen(false);
      setSelectedPostId(null);
    }
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setSelectedPostId(null);
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
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
          >
            <CircularProgress />
          </Box>
        ) : posts.length === 0 ? (
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
                    onClick={() => handleDeleteClick(post._id)}
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
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={handleDeleteModalClose}
        handleConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};

export default AdminDashboard;
