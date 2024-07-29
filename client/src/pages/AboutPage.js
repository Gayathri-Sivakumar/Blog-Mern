import { Container, Typography, Box, Paper, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import image from "../images/bloggers-wiltshire.jpg";

const AboutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <IconButton color="primary" onClick={() => navigate(-1)} sx={{ mb: 0 }}>
        <ArrowBack />
      </IconButton>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          Welcome to Blog Bite!
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          gutterBottom
          sx={{ fontStyle: "italic" }}
        >
          🌟 Where Curiosity Meets Creativity 🌟
        </Typography>
      </Box>
      <Box
        component="img"
        src={image}
        alt="B;og image"
        sx={{
          display: "block",
          height: "auto",
          width: "100%",
          borderRadius: 2,
          boxShadow: 3,
          mb: 2,
          mx: "auto",
        }}
      ></Box>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
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
          sx={{
            textAlign: "left",
            mx: "auto",
            maxWidth: 600,
            listStyleType: "none",
            p: 0,
          }}
        >
          <Box
            component="li"
            sx={{ mb: 2, display: "flex", alignItems: "center" }}
          >
            <LocalLibraryIcon
              sx={{ mr: 1, color: theme.palette.primary.main }}
            />
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              <strong>Epic Reads:</strong> Articles that spark curiosity and
              captivate.
            </Typography>
          </Box>
          <Box
            component="li"
            sx={{ mb: 2, display: "flex", alignItems: "center" }}
          >
            <EmojiEventsIcon
              sx={{ mr: 1, color: theme.palette.primary.main }}
            />
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              <strong>Genius Tips:</strong> Life hacks that make everyday tasks
              easier.
            </Typography>
          </Box>
          <Box
            component="li"
            sx={{ mb: 2, display: "flex", alignItems: "center" }}
          >
            <EmojiPeopleIcon
              sx={{ mr: 1, color: theme.palette.primary.main }}
            />
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              <strong>Community Vibes:</strong> Connect with fellow enthusiasts.
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" paragraph>
          <strong>Let’s Connect!</strong> We’d love to hear from you. Reach us
          at{" "}
          <a
            href="mailto:Bloggers@gmail.com"
            style={{
              color: theme.palette.primary.main,
              textDecoration: "underline",
            }}
          >
            blogbite@gmail.com
          </a>
          . Your feedback fuels our passion!
        </Typography>
        <Typography variant="body1" paragraph>
          Thanks for being with us on this journey. Let's make it unforgettable!
        </Typography>
        <Typography variant="body1">
          Stay awesome,
          <br />
          The Blog Bite Team 🚀
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
