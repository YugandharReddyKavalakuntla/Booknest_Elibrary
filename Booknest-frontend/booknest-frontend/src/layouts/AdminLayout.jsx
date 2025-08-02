// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { isTokenValid } from "../api";
import { Navigate } from "react-router-dom";

export default function AdminLayout() {
  if (!isTokenValid()) return <Navigate to="/login" replace />;
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AdminTopbar />
        <div className="p-4" style={{marginLeft:200}}><Outlet /></div>
      </div>
    </div>
  );
}