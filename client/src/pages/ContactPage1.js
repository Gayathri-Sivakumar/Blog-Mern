import ContactForm from "../components/ContactForm";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Container, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ContactPage1 = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ mt: "20px" }}>
      <IconButton color="primary" onClick={() => navigate(-1)} sx={{ mb: 0 }}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" gutterBottom mt={2}>
        Contact Us
      </Typography>
      <ContactForm />
    </Container>
  );
};

export default ContactPage1;
