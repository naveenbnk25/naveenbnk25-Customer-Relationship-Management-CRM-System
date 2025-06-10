import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Notification from "./pages/Notification"; // Your notification page
import InteractiveDemo from "./components/InteractiveDemo"; // Your demo
import SalesDashboard from "./pages/SalesDashboard"; // New page
import NotificationDashboard from "./pages/NotificationDashboard"; // New page

import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("useRole");
    if (role) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="app">
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          <Routes>
            {/* Default route, will show the Dashboard page when not authenticated */}
            <Route
              path="/"
              element={
                !isAuthenticated ? (
                  <Dashboard onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <Home />
                )
              }
            />
            {/* Routes that require authentication */}
            {isAuthenticated && (
              <>
                <Route path="/users" element={<Users />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/demo" element={<InteractiveDemo />} />
                <Route path="/sales" element={<SalesDashboard />} />
                <Route path="/notifications" element={<NotificationDashboard />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
