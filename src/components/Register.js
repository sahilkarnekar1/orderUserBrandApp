import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success('User Registered Successfully');
    } catch (error) {
      alert(error.response?.data?.msg || 'Registration failed');
    }
  };
const handleNavigateLogin = ()=>{
navigate("/login")
}
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input className='buttonInputwidthFull' type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
      <input className='buttonInputwidthFull' type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
      <input className='buttonInputwidthFull' type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
      <button className='buttonInputwidthFull' type="submit">Register</button>
      <button className='buttonInputwidthFull' onClick={handleNavigateLogin}>Login</button>
    </form>
  );
};

export default Register;
