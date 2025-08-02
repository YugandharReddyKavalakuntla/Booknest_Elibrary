// src/pages/ResetPassword.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (newPwd !== confirmPwd) {
      return setMsg("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/reset-password', {
        token,
        newPassword: newPwd,
      });
      setMsg(res.data);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMsg("Reset failed. Token may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 480 }}>
      <h3>Reset Password</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={newPwd}
          onChange={e => setNewPwd(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          value={confirmPwd}
          onChange={e => setConfirmPwd(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Resetting…' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

