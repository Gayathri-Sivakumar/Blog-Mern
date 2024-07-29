import { Container, Grid, Typography } from "@mui/material";
import BlogPostCard from "../components/BlogPostCard";
import { useEffect, useState } from "react";
import { getAllBlogs } from "../services/api";
import { toast } from "react-toastify";
import { Box, CircularProgress } from "@mui/material";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllBlogs();
        console.log(response);
        setPosts(response);
      } catch (error) {
        toast.error("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0)
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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h2">Top Posts!</Typography>
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

export default HomePage;
