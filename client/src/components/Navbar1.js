// src/components/Navbar.js
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import image from "../images/Blogger-Logo.png";

const Navbar1 = ({ isLoggedIn, handleLogin, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [alertOpen, setAlertOpen] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      handleLogin();
      navigate("/admin");
      handleClose();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Login failed: Invalid credentials.",
      });
      setAlertOpen(true);
    }
  };

  const handleAlertClose = () => setAlertOpen(false);

  const handleButtonLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    handleLogout();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2, // Add some padding
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Box
                component="img"
                src={image}
                alt="Blogger"
                sx={{
                  width: "60px",
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Link>
            <Typography variant="h3" sx={{ flexGrow: 1, ml: 2 }}>
              Blogger
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{ textTransform: "none" }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{ textTransform: "none" }}
              >
                About
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/contact"
                sx={{ textTransform: "none" }}
              >
                Contact
              </Button>
            </Box>
            <Button
              color="inherit"
              onClick={isLoggedIn ? handleButtonLogout : handleClickOpen}
              sx={{ textTransform: "none", ml: 2 }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To access the admin panel, please enter your email and password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            value={credentials.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            name="password"
            fullWidth
            variant="outlined"
            value={credentials.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Login</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar1;
