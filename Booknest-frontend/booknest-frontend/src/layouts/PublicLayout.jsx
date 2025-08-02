// src/layouts/PublicLayout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/theme.css";

export default function PublicLayout() {
  return (
    <div className="bg-cream min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand fw-bold text-success" to="/">📚 BookNest</Link>
        <div className="ms-auto">
          <Link className="nav-link d-inline px-3" to="/about">About Us</Link>
          <Link className="nav-link d-inline px-3" to="/contact">Contact Us</Link>
          <Link className="btn btn-success px-3" to="/login">Login</Link>
        </div>
      </nav>
      <main className="flex-fill"><Outlet /></main>
      <footer className="bg-light text-center py-3 mt-auto border-top">
        <small>
          <Link to="#" className="text-decoration-none me-3">Privacy Policy</Link>
          <Link to="#" className="text-decoration-none me-3">Terms</Link><br/>
          Developed by Visual Readers, JFSJD_00043, TATA Strive, Hyderabad
        </small>
      </footer>
    </div>
  );
}