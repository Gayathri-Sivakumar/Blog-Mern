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
import PostForm from "./pages/PostForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <ToastContainer />
      <Navbar1
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<HomePage1 />} />
        <Route path="/post/:id" element={<BlogPostPage2 />} />
        <Route path="/about" element={<AboutPage1 />} />
        <Route path="/contact" element={<ContactPage1 />} />
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/new"
          element={isLoggedIn ? <PostForm /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/edit/:id"
          element={isLoggedIn ? <PostForm /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
