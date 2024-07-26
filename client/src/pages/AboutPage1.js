// src/pages/AboutPage1.js
import { Container, Typography, Box } from "@mui/material";

const AboutPage1 = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to Blogger!
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            🌟 Where Curiosity Meets Creativity 🌟
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Hello and welcome! We're a team of passionate creators who love
          sharing stories, insights, and a bit of fun. Since 2024, our goal has
          been to inspire and entertain you with our content.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Our Mission:</strong> To blend learning with entertainment.
          Whether you're looking for the latest trends, practical tips, or just
          a good laugh, we're here to brighten your day.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>What We Offer:</strong>
        </Typography>
        <Box
          component="ul"
          sx={{ textAlign: "left", mx: "auto", maxWidth: 600 }}
        >
          <Box component="li" sx={{ mb: 1 }}>
            <strong>Epic Reads:</strong> Articles that spark curiosity and
            captivate.
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <strong>Genius Tips:</strong> Life hacks that make everyday tasks
            easier.
          </Box>
          <Box component="li" sx={{ mb: 1 }}>
            <strong>Community Vibes:</strong> Connect with fellow enthusiasts.
          </Box>
        </Box>
        <Typography variant="body1" paragraph>
          <strong>Let’s Connect!</strong> We’d love to hear from you. Reach us
          at <a href="mailto:Bloggers@gmail.com">Bloggers@gmail.com</a>. Your
          feedback fuels our passion!
        </Typography>
        <Typography variant="body1">
          Thanks for being with us on this journey. Let's make it unforgettable!
        </Typography>
        <Typography variant="body1">
          Stay awesome,
          <br />
          The Blogger Team 🚀
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage1;
