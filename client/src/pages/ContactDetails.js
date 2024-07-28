// src/pages/ContactDetails.js
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getContactMessages } from "../services/api"; // Assuming this is the API call to get contact details
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";

const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

const ContactDetails = () => {
  const [contactDetails, setContactDetails] = useState([]);

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Details
      </Typography>
      <Grid container spacing={3}>
        {contactDetails.map((contact, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={3}
              sx={{ p: 3, display: "flex", alignItems: "center" }}
            >
              <Avatar {...stringAvatar(contact.name)} sx={{ mr: 2 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {contact.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">{contact.email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <MessageIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">{contact.message}</Typography>
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
