// src/components/AdminTopbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminTopbar() {
  const nav = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-light shadow-sm"
         style={{marginLeft:200}}>
      <h4 className="m-0">📖 BookNest Admin</h4>
      <button className="btn btn-outline-danger btn-sm" onClick={()=>{localStorage.removeItem('token');nav('/login');}}>
        Logout
      </button>
    </div>
  );
}