import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BlogPostPage from "./pages/BlogPostPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard";
import ContactDetails from "./pages/ContactDetails";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import PostForm from "./pages/PostForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Router>
        <ToastContainer />
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          userRole={userRole}
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              isLoggedIn && userRole === "admin" ? (
                <AdminDashboard />
              ) : (
                <HomePage />
              )
            }
          />
          <Route path="/post/:id" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/contact"
            element={
              isLoggedIn && userRole === "admin" ? (
                <ContactDetails />
              ) : (
                <ContactPage />
              )
            }
          />
          <Route
            path="/admin/new"
            element={
              isLoggedIn && userRole === "admin" ? (
                <PostForm />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              isLoggedIn && userRole === "admin" ? (
                <PostForm />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </Box>
  );
};

export default App;
