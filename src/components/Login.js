import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', latitude: '', longitude: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await loginUser({ ...formData, latitude, longitude });
        console.log('Login Successful');
        localStorage.setItem('token', response.data.token);
        navigate('/homepage')
        toast.success('Login Successful');
      });
    } catch (error) {
      alert(error.response?.data?.msg || 'Login failed');
    }
  };
  const handleNavigateRegister = ()=>{
    navigate("/")
    }
    const handleForgotPass = ()=>{
    navigate("/forgot-password")
    }
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input className='buttonInputwidthFull' type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
      <input className='buttonInputwidthFull' type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
      <button className='buttonInputwidthFull' type="submit">Login</button>
      <h4 onClick={handleForgotPass}>Forgot Password</h4>
      <button className='buttonInputwidthFull' onClick={handleNavigateRegister}>Register</button>
    </form>
  );
};

export default Login;
