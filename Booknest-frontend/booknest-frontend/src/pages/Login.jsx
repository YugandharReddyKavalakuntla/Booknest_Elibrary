// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { getJwtPayload } from "../api";


export default function Login() {
  const [credentials, setCredentials] = useState({email:'',password:''});
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setCredentials({...credentials,[e.target.name]:e.target.value});
  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await api.post('/auth/login', credentials);
    const token = res.data;
    localStorage.setItem('token', token);
    const { role } = getJwtPayload(token);
    if (role === 'ADMIN') {
      navigate('/admin/manage');
    } else {
      navigate('/user/books'); // direct to books list
    }
  } catch {
    setError('Invalid email or password');
  }
};

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row flex-fill">
        <div className="col-md-6 d-none d-md-flex bg-light align-items-center justify-content-center">
          <img src="/images/login.jpeg" alt="Login" className="img-fluid rounded" style={{maxHeight:'80%'}}/>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="w-75 p-4 border rounded bg-white shadow">
            <h3 className="text-center text-success mb-4">BookNest Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {['email','password'].map(field => (
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input type={field} name={field} className="form-control" value={credentials[field]} onChange={handleChange} required/>
              </div>
            ))}
            <div className="d-flex justify-content-between mb-3">
              <a href="/forgot-password">Forgot Password?</a>
              <a href="/register">Register</a>
            </div>
            <button type="submit" className="btn btn-success w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}