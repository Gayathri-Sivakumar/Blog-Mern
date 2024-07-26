import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, getCommentsByBlogId } from "../services/api";
import CommentSection from "../components/CommentSection";

const BlogPostPage2 = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

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
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)} // Go back to the previous page
        sx={{ mb: 3 }} // Margin bottom for spacing
      >
        Back
      </Button>
      <Typography
        variant="h2" // Increased size for the title
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2 }} // Bold and margin bottom for spacing
      >
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
        {post.author.name} - {new Date(post.createdAt).toLocaleDateString()}
      </Typography>
      {/* Image */}
      <Box
        component="img"
        src={`http://localhost:8081/${post.images[0].replace(/\\/g, "/")}`}
        alt={post.title}
        sx={{
          width: "95%",
          height: "auto",
          borderRadius: 2,
          boxShadow: 3,
          mb: 2,
        }}
      />
      {/* Content */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, width: "95%" }}>
        <Typography
          variant="body1"
          paragraph
          sx={{ whiteSpace: "pre-wrap", width: "100%" }}
        >
          {post.content}
        </Typography>
      </Paper>
      {/* Comments Section */}
      <Divider sx={{ my: 4 }} />
      <CommentSection comments={comments} postId={id} />
    </Container>
  );
};

export default BlogPostPage2;
