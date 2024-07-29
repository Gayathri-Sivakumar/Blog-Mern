import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Paper,
  Divider,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  getBlogById,
  getCommentsByBlogId,
  createComment,
} from "../services/api";
import CommentSection from "../components/CommentSection";

const BlogPostPage2 = ({ isLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ authorName: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getBlogById(id);
        setPost(response);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getCommentsByBlogId(id);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = { postId: id, ...comment };
      await createComment(newComment);
      setComments((prevComments) => [...prevComments, newComment]);
      setComment({ authorName: "", content: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={5}
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <IconButton color="primary" onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
        {post.authorName} - {new Date(post.createdAt).toLocaleDateString()}
      </Typography>
      {post.images && post.images[0] && (
        <Box
          component="img"
          src={`data:image/jpeg;base64,${post.images[0]}`}
          alt={post.title}
          sx={{
            display: "block",
            height: "auto",
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
            mb: 2,
            mx: "auto",
          }}
        />
      )}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography
          variant="body1"
          paragraph
          sx={{ whiteSpace: "pre-wrap", width: "100%" }}
        >
          {post.content}
        </Typography>
      </Paper>
      <Divider sx={{ my: 4 }} />
      <CommentSection comments={comments} />
      <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Leave a Comment
        </Typography>
        <TextField
          label="Your Name"
          name="authorName"
          value={comment.authorName}
          onChange={handleCommentChange}
          fullWidth
          required
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Add a comment"
          name="content"
          multiline
          required
          rows={4}
          value={comment.content}
          onChange={handleCommentChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ display: "block", ml: "auto" }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default BlogPostPage2;
