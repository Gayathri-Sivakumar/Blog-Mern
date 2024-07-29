import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#FAF9F6",
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        position: "sticky",
        boxShadow: 3,
        borderTop: "1px ",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          All rights reserved to Blog Bite @2024
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
