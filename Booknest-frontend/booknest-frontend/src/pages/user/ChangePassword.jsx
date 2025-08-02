// src/pages/user/ChangePassword.jsx
import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.put('/auth/change-password', { oldPassword, newPassword });
      setMessage('✅ Password changed. Redirecting to login…');
      setTimeout(() => {
        localStorage.removeItem('token');
        navigate('/login');
      }, 1500);
    } catch {
      setError('Failed to change password. Please check your old password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h3>Change Password</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="oldPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            required
            minLength={6}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" disabled={loading} className="w-100">
          {loading ? <Spinner animation="border" size="sm" /> : 'Change Password'}
        </Button>
      </Form>
    </div>
  );
}
