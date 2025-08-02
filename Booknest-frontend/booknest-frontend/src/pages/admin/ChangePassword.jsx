// src/pages/admin/ChangePassword.jsx
import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export default function AdminChangePassword() {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErr(''); setMsg('');
    try {
      await api.put('/auth/change-password', { oldPassword: oldPwd, newPassword: newPwd });
      setMsg('✅ Password changed. Please log in again.');
      setTimeout(() => {
        localStorage.removeItem('token');
        nav('/login');
      }, 1500);
    } catch {
      setErr('Failed to change password. Check your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h3>Admin Change Password</h3>
      {err && <Alert variant="danger">{err}</Alert>}
      {msg && <Alert variant="success">{msg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="oldPwd">
          <Form.Label>Current Password</Form.Label>
          <Form.Control type="password" required
            value={oldPwd} onChange={e => setOldPwd(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newPwd">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" required minLength={6}
            value={newPwd} onChange={e => setNewPwd(e.target.value)} />
        </Form.Group>
        <Button type="submit" disabled={loading} className="w-100">
          {loading ? <Spinner animation="border" size="sm" /> : 'Change Password'}
        </Button>
      </Form>
    </div>
  );
}
