// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form,setForm] = useState({name:'',email:'',password:''});
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit = async e => {
    e.preventDefault(); setError('');
    try {
      await api.post('/auth/register',form);
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch(err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5" style={{maxWidth:480}}>
      <h3 className="text-center text-primary mb-4">Register</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {['name','email','password'].map(field => (
          <input key={field}
            name={field}
            type={field}
              className="form-control mb-3"
            placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}