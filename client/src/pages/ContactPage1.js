import { Container, Typography } from "@mui/material";
import ContactForm from "../components/ContactForm";

const ContactPage1 = () => {
  return (
    <Container sx={{ mt: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <ContactForm />
    </Container>
  );
};

export default ContactPage1;
