// src/pages/user/Profile.jsx
import { useState } from 'react';
import api from '../../api.js';

export default function Profile() {
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState('');

  const changePwd = async (e) => {
    e.preventDefault();
    const token = prompt('Enter reset token printed by backend:');
    const { data } = await api.post('/auth/reset-password', {
      token, newPassword: pwd,
    });
    setMsg(data);
  };

  return (
    <div className="col-md-6 mx-auto">
      <h3>Change Password</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={changePwd}>
        <input className="form-control mb-3" type="password"
               value={pwd} onChange={(e) => setPwd(e.target.value)}
               placeholder="New password" required />
        <button className="btn btn-primary w-100">Update</button>
      </form>
    </div>
  );
}
