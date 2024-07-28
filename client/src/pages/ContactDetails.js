import {
  Container,
  Typography,
  Paper,
  IconButton,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getContactMessages } from "../services/api";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 64,
      height: 64,
      fontSize: "2rem",
      borderRadius: "50%",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

const ContactDetails = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await getContactMessages();
        setContactDetails(response.data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    fetchContactDetails();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <IconButton color="primary" onClick={() => navigate(-1)} sx={{ mb: 0 }}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" gutterBottom>
        Contact Details
      </Typography>
      <Grid container spacing={3}>
        {contactDetails.map((contact, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: "flex",
                alignItems: "center",
                borderRadius: 2,
                height: "auto", // Auto height to cover all content
                minHeight: "150px", // Minimum height to maintain consistency
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for better UX
              }}
            >
              <Avatar {...stringAvatar(contact.name)} sx={{ mr: 2 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {contact.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography
                    variant="body2"
                    sx={{ overflowWrap: "break-word" }}
                  >
                    {contact.email}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MessageIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography
                    variant="body2"
                    sx={{ overflowWrap: "break-word" }}
                  >
                    {contact.message}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContactDetails;
