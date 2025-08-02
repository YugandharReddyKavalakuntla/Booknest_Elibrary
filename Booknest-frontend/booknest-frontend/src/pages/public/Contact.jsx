// src/pages/public/Contact.jsx

import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const handleChange = e => setForm({...form,[e.target.name]:e.target.value});
  const handleSubmit = e => { e.preventDefault(); alert('Message sent!'); setForm({name:'',email:'',subject:'',message:''}); };
  return (
    <div className="container py-5">
      <h2 className="text-success fw-bold text-center mb-4">Contact Us</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        {['name','email','subject'].map(field => (
          <div className={`col-md-${field==='subject'?12:6}`} key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input name={field} type={field==='email'?'email':'text'} className="form-control" value={form[field]} onChange={handleChange} required/>
          </div>
        ))}
        <div className="col-12">
          <label className="form-label">message</label>
          <textarea name="message" rows={4} className="form-control" value={form.message} onChange={handleChange} required/>
        </div>
        <div className="col-12 text-center">
          <button className="btn btn-success px-4" type="submit">Send</button>
        </div>
      </form>
      <div className="mt-5 text-center">
        <h5 className="fw-bold">📍 Our Address</h5>
        <p>TATA Strive, Hyderabad, Telangana, India</p>
      </div>
    </div>
  );
}