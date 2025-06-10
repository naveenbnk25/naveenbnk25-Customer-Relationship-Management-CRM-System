import React, { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Perform logout logic (clear localStorage and call onLogout)
    localStorage.clear();
    onLogout();
    
    // Redirect to the login page (or Dashboard if login is required)
    navigate("/");  // Redirect to the Dashboard or Login page (adjust this as needed)
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>CRM Dashboard</h2>
      </div>
      <div className="navbar-right">
        {isAuthenticated && <FaBell className="icon" />}
        {isAuthenticated && (
          <div className="profile-container" onClick={handleProfileClick}>
            <FaUserCircle className="icon" />
            {isProfileOpen && (
              <div className="profile-menu">
                <button className="profile-item">My Profile</button>
                <button className="profile-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
