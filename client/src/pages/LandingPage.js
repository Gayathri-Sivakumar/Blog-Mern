import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import image from "../images/landing.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "90%", // Zoom out effect
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          padding: 4,
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: 4,
            borderRadius: 2,
            maxWidth: 800,
            margin: "auto",
          }}
        >
          <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            Welcome to Blog Bite
          </Typography>
          <Typography variant="h5" sx={{ color: "#ffff " }} paragraph>
            Discover the latest and greatest in blogging. Join our community and
            share your thoughts with the world!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGetStarted}
            sx={{ marginTop: 2 }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
