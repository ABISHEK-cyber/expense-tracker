// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      nav("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/dashboard" className="brand">Expense Tracker Pro</Link>
      </div>
      <div className="nav-right">
        {currentUser ? (
          <>
            <span className="nav-user">{currentUser.email}</span>
            <button onClick={handleLogout} className="btn small">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
