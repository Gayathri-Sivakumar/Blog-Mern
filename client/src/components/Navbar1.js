import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Snackbar,
  Alert,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { login } from "../services/api";
import image from "../images/Blogger-Logo.png";
import LoginDialog from "./LoginDialog";

const Navbar1 = ({ isLoggedIn, handleLogin, handleLogout, userRole }) => {
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [alertOpen, setAlertOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      handleLogin(response.role);
      navigate("/");
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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#EAEFF2",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <img
            src={image}
            alt="Blogger"
            style={{
              width: "60px",
              display: "block",
              margin: "0 auto",
              height: "auto",
            }}
          />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>
        {isLoggedIn && userRole === "admin" ? (
          <ListItem button component={Link} to="/contact-details">
            <ListItemText primary="Contact Details" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/contact">
            <ListItemText primary="Contact" />
          </ListItem>
        )}
        {isLoggedIn && userRole === "admin" && (
          <ListItem button component={Link} to="/admin">
            <ListItemText primary="Admin Panel" />
          </ListItem>
        )}
      </List>
      <Divider />
      <ListItem
        button
        onClick={isLoggedIn ? handleButtonLogout : handleClickOpen}
      >
        <ListItemText primary={isLoggedIn ? "Logout" : "Login"} />
      </ListItem>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={image}
                alt="Blogger"
                style={{
                  width: "60px",
                  display: "block",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Link>
            <Typography
              variant="h4"
              sx={{
                flexGrow: 1,
                ml: 2,
                display: { xs: "none", sm: "block" },
                fontWeight: "bold",
              }}
            >
              Blogger
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
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
              {isLoggedIn && userRole === "admin" ? (
                <Button
                  color="inherit"
                  component={Link}
                  to="/contact-details"
                  sx={{ textTransform: "none" }}
                >
                  Contact Details
                </Button>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  to="/contact"
                  sx={{ textTransform: "none" }}
                >
                  Contact
                </Button>
              )}
              {isLoggedIn && userRole === "admin" && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin"
                  sx={{ textTransform: "none" }}
                >
                  Admin Panel
                </Button>
              )}
            </Box>
            <Tooltip title={isLoggedIn ? "Logout" : "Login"}>
              <Button
                color="inherit"
                onClick={isLoggedIn ? handleButtonLogout : handleClickOpen}
                sx={{ textTransform: "none", ml: 2 }}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </Button>
            </Tooltip>
            <IconButton
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
          }}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        {drawerContent}
      </Drawer>
      <LoginDialog
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        credentials={credentials}
      />
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
