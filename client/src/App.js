import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Navbar1 from "./components/Navbar1";
import HomePage1 from "./pages/HomePage1";
import BlogPostPage2 from "./pages/BlogPostPage2";
import AboutPage1 from "./pages/AboutPage1";
import ContactPage1 from "./pages/ContactPage1";
import AdminDashboard from "./pages/AdminDashboard";
import ContactDetails from "./pages/ContactDetails";
// import ManageMyBlogs from "./pages/MyBlogs";
import PostForm from "./pages/PostForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <Router>
      <ToastContainer />
      <Navbar1
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userRole={userRole}
      />

      <Routes>
        <Route path="/" element={<HomePage1 />} />
        <Route path="/post/:id" element={<BlogPostPage2 />} />
        <Route path="/about" element={<AboutPage1 />} />
        <Route path="/contact" element={<ContactPage1 />} />
        <Route
          path="/admin"
          element={
            isLoggedIn && userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/contact-details" element={<ContactDetails />} />
        <Route
          path="/admin/new"
          element={
            isLoggedIn && userRole === "admin" ? (
              <PostForm />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            isLoggedIn && userRole === "admin" ? (
              <PostForm />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* <Route
          path="/manage-blogs"
          element={
            isLoggedIn && userRole === "user" ? (
              <ManageMyBlogs />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/manage-blogs/new"
          element={
            isLoggedIn && userRole === "user" ? (
              <PostForm />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/manage-blogs/edit/:id"
          element={
            isLoggedIn && userRole === "user" ? (
              <PostForm />
            ) : (
              <Navigate to="/" />
            )
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
