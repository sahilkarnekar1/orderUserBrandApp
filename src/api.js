import axios from 'axios';

// export const API_BASE_URL = 'https://orderbackend-1.onrender.com';
export const API_BASE_URL = 'http://localhost:5000'

export const registerUser = (data) => axios.post(`${API_BASE_URL}/api/auth/user/register`, data);
export const loginUser = (data) => axios.post(`${API_BASE_URL}/api/auth/user/login`, data);
export const forgotPassword = (data) => axios.post(`${API_BASE_URL}/api/auth/user/forgot-password`, data);
export const resetPassword = (token, data) => axios.post(`${API_BASE_URL}/api/auth/user/reset-password?token=${token}`, data);
export const updateLocation = (data) => axios.patch(`${API_BASE_URL}/api/auth/user/update-location`, data);
export default axios;