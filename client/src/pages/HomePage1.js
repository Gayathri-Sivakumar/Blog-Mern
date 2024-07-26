import { Container, Grid } from "@mui/material";
import BlogPostCard from "../components/BlogPostCard";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../services/api";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage1 = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllBlogs();
        setPosts(response); // Update based on actual response structure
      } catch (error) {
        toast.error("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) return <LoadingSpinner />;

  return (
    <Container>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <BlogPostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage1;
