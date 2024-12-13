import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import ForgotPassword from '../src/components/ForgotPassword';
import ResetPassword from '../src/components/ResetPassword';
import UpdateLocation from '../src/components/UpdateLocation';
import './App.css';
import HomePage from '../src/components/HomePage';
import CartPage from '../src/components/CartPage';
import NavbarBrand1 from '../src/components/NavbarBrand1';
import MyOrders from './components/ProfileSec/MyOrders';
import MyProfile from './components/ProfileSec/MyProfile';


function App() {
  return (
<>
    <Router>
      <NavbarBrand1/>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-location" element={<UpdateLocation />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </Router>
        <ToastContainer />
        </>
  );
}

export default App;
