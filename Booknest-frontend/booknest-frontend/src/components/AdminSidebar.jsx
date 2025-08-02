// src/components/AdminSidebar.jsx
import React from "react";
import { Link,useLocation } from "react-router-dom";

const navItems = [
  { label:'Add Book', to:'/admin/add' },
  { label:'Manage Books', to:'/admin/manage' },
  { label:'Profile', to:'/admin/profile' },
  { label:'Change Password', to:'/admin/change-password' }
];

export default function AdminSidebar() {
  const {pathname} = useLocation();
  return (
    <div className="bg-dark text-white p-3 vh-100 position-fixed" style={{width:200}}>
      <h5 className="text-center mb-4">📚 Admin</h5>
      {navItems.map(({label,to}) => (
        <Link key={to} to={to}
          className={`d-block mb-3 text-decoration-none ${pathname===to?'text-warning':'text-white'}`}>
          {label}
        </Link>
      ))}
    </div>
  );
}