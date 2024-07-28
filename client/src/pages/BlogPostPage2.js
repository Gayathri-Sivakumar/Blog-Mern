import {
  Container,
  Typography,
  Box,
  TextField,
  Paper,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBlogById,
  getCommentsByBlogId,
  createComment,
} from "../services/api";
import CommentSection from "../components/CommentSection";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogPostPage2 = ({ isLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ name: "", content: "" });
  // const [showLoginModal, setShowLoginModal] = useState(false);

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
    // if (!isLoggedIn) {
    //   setShowLoginModal(true);
    //   return;
    // }
    try {
      const newComment = { postId: id, ...comment };
      await createComment(newComment);
      setComments((prevComments) => [...prevComments, newComment]);
      setComment({ name: "", content: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) return <LoadingSpinner />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
        {post.author.name} - {new Date(post.createdAt).toLocaleDateString()}
      </Typography>
      <Box
        component="img"
        src={`http://localhost:8081/${post.images[0].replace(/\\/g, "/")}`}
        alt={post.title}
        sx={{
          display: "block", // Ensures the box behaves like a block element
          height: "auto",
          width: "100%",
          borderRadius: 2,
          boxShadow: 3,
          mb: 2,
          mx: "auto",
        }}
      />
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
          name="name"
          value={comment.name}
          onChange={handleCommentChange}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Add a comment"
          name="content"
          multiline
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
      {/* <Modal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login Required
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You need to log in or sign up to add a comment.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/signup")}
            sx={{ mt: 2, ml: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Modal> */}
    </Container>
  );
};

export default BlogPostPage2;
