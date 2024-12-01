import React, { useState } from 'react';
import { forgotPassword } from '../api';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      toast.success('Password reset link sent to your email');
    } catch (error) {
      alert(error.response?.data?.msg || 'Failed to send password reset link');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input className='buttonInputwidthFull' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button className='buttonInputwidthFull' type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
