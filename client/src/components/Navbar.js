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
import image from "../images/Logo.png";
import LoginDialog from "./LoginDialog";

const Navbar = ({ isLoggedIn, handleLogin, handleLogout, userRole }) => {
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
      navigate("/home");
      handleClose();
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message || "An unexpected error occurred.",
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
        p: 1,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <img
            src={image}
            alt="Blog Bite"
            style={{
              width: "220px",
              margin: "0 auto",
              height: "auto",
            }}
          />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/home">
          {isLoggedIn && userRole === "admin" ? (
            <ListItemText primary="Admin Panel" />
          ) : (
            <ListItemText primary="Home" />
          )}
        </ListItem>
        <ListItem component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>

        <ListItem component={Link} to="/contact">
          {isLoggedIn && userRole === "admin" ? (
            <ListItemText primary="Contact Details" />
          ) : (
            <ListItemText primary="Contact" />
          )}
        </ListItem>
      </List>
      <Divider />
      <ListItem onClick={isLoggedIn ? handleButtonLogout : handleClickOpen}>
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
          boxShadow: "0px 1px rgba(0, 0, 0, 0.075)",
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between", px: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src={image}
                  alt="Blogger"
                  style={{
                    width: "80px", // Increased the size of the logo
                    height: "auto",
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
                  display: { xs: "none", sm: "block" },
                  fontWeight: "bold",
                  ml: 1,
                }}
              >
                Blog Bite
              </Typography>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
            >
              {isLoggedIn && userRole === "admin" ? (
                <Button
                  component={Link}
                  to="/home"
                  sx={{
                    textTransform: "none",
                    color: "black",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary,
                      color: "white",
                    },
                  }}
                >
                  Admin Panel
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/home"
                  sx={{
                    textTransform: "none",
                    color: "black",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary,
                      color: "white",
                    },
                  }}
                >
                  Home
                </Button>
              )}

              <Button
                component={Link}
                to="/about"
                sx={{
                  textTransform: "none",
                  color: "black",
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary,
                    color: "white",
                  },
                }}
              >
                About
              </Button>
              {isLoggedIn && userRole === "admin" ? (
                <Button
                  component={Link}
                  to="/contact"
                  sx={{
                    textTransform: "none",
                    color: "black",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary,
                      color: "white",
                    },
                  }}
                >
                  Contact Details
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/contact"
                  sx={{
                    textTransform: "none",
                    color: "black",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary,
                      color: "white",
                    },
                  }}
                >
                  Contact
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title={isLoggedIn ? "Logout" : "Login"}>
                <Button
                  onClick={isLoggedIn ? handleButtonLogout : handleClickOpen}
                  sx={{
                    textTransform: "none",
                    color: "black",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary,
                      color: "white",
                    },
                    ml: 1,
                  }}
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
            </Box>
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
            p: 1,
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

export default Navbar;
