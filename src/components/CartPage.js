import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api';
import {toast} from "react-toastify";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cart/get-cart`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Failed to fetch cart items:', error.response?.data?.message || error.message);
    }
  };

  // Remove item from cart
  const handleRemoveCart = async (drinkId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/cart/remove-from-cart/${drinkId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(response.data.message);
      toast.success(response.data.message);
      // Re-fetch cart items after removal
      fetchCartItems();
    } catch (error) {
      console.error('Failed to remove item from cart:', error.response?.data?.message || error.message);
    }
  };

  // Increment quantity
  const incrementQuantityBy1 = (drinkId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.drinkId === drinkId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement quantity
  const decrementQuantityBy1 = (drinkId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.drinkId === drinkId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Place order
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.drinkId,
          quantity: item.quantity,
        })),
      };
  
      // Place order
      const orderResponse = await axios.post(`${API_BASE_URL}/api/orders/create-orders`, orderData, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log('Order placed successfully:', orderResponse.data);
      toast.success('Order placed successfully!');
  
      // Clear cart in database
      const clearCartResponse = await axios.delete(`${API_BASE_URL}/api/cart/clear-cart`, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log('Cart cleared:', clearCartResponse.data.message);
  toast.success(clearCartResponse.data.message);
      // Clear cart in frontend
      setCartItems([]);
    } catch (error) {
      console.error('Error placing order or clearing cart:', error.response?.data?.message || error.message);
      alert('Failed to place order. Please try again.');
    }
  };
  

  // Fetch items on component mount
  useEffect(() => {
    if (token) {
      fetchCartItems();
    } else {
      console.error('User is not authenticated. Token not found.');
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item._id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <p><strong>Name:</strong> {item.productDetails.name}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <div>
              <button onClick={() => decrementQuantityBy1(item.drinkId)}>-</button>
              <button onClick={() => incrementQuantityBy1(item.drinkId)}>+</button>
            </div>
            <p><strong>Price:</strong> ₹{item.productDetails.price}</p>
            <button
              onClick={() => handleRemoveCart(item.drinkId)}
              style={{ backgroundColor: 'red', color: 'white', padding: '0.5rem', border: 'none', cursor: 'pointer' }}
            >
              Remove From Cart
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cartItems.length > 0 && (
        <button
          onClick={handlePlaceOrder}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '1rem',
            border: 'none',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Place Order
        </button>
      )}
    </div>
  );
};

export default CartPage;
