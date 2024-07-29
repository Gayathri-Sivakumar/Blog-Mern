import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { createContactMessage } from "../services/api";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.subject) newErrors.subject = "Subject is required";
    if (!form.message) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await createContactMessage(form);
        setAlert({ type: "success", message: "Message sent successfully!" });
        setForm({ name: "", email: "", subject: "", message: "" });
      } catch (error) {
        setAlert({ type: "error", message: "Failed to send message." });
      } finally {
        setOpen(true);
      }
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.name}
        helperText={errors.name}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.email}
        helperText={errors.email}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Subject"
        name="subject"
        value={form.subject}
        onChange={handleChange}
        fullWidth
        required
        error={!!errors.subject}
        helperText={errors.subject}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        required
        error={!!errors.message}
        helperText={errors.message}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ display: "block", ml: "auto", mr: 1, width: "10%" }}
      >
        Send
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
