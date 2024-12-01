import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../api';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(token, { newPassword });
      toast.success('Password reset successfully');
    } catch (error) {
      alert(error.response?.data?.msg || 'Password reset failed');
    }
  };

  return (
    <form onSubmit={handleReset}>
      <h2>Reset Password</h2>
      <input className='buttonInputwidthFull' type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      <button className='buttonInputwidthFull' type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
