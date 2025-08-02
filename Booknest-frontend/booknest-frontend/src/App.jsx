// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Layout & Pages
import PublicLayout from './layouts/PublicLayout.jsx';
import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import Contact from './pages/public/Contact.jsx';

// Auth Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

// Admin
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import AddBook from './pages/admin/AddBook.jsx';
import ManageBooks from './pages/admin/ManageBooks.jsx';
import EditBook from './pages/admin/EditBook.jsx';
import AdminProfile from './pages/admin/Profile.jsx';
import AdminChangePassword from './pages/admin/ChangePassword.jsx';



// User
import UserLayout from './layouts/UserLayout.jsx';
import AllBooks from './pages/user/AllBooks.jsx';
import ReadBook from './pages/user/ReadBook.jsx';
import Profile from './pages/user/Profile.jsx';
import ChangePassword from './pages/user/ChangePassword.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}> 
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      


      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute role="ADMIN">
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="add" replace />} />
        <Route path="add" element={<AddBook />} />
        <Route path="manage" element={<ManageBooks />} />
        <Route path="edit/:id" element={<EditBook />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="change-password" element={<AdminChangePassword/>} />
      </Route>

      {/* User */}
      <Route
        path="/user"
        element={
          <PrivateRoute role="USER">
            <UserLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="books" replace />} />
        <Route path="books" element={<AllBooks />} />
        <Route path="read/:id" element={<ReadBook />} />
        <Route path="profile" element={<Profile />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
