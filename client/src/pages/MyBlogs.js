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
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogsByUser();
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
        Manage My Blogs
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/manage-blogs/new"
      >
        Create New Post
      </Button>
      <Box mt={3}>
        {posts.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No posts found. Create a new post to get started.
          </Typography>
        ) : (
          <Grid container spacing={2} mt={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <BlogPostCard post={post} />
                <Box mt={1}>
                  <Button
                    component={Link}
                    to={`/manage-blogs/edit/${post._id}`}
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

export default MyBlogs;
