import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../api';

const MyOrders = () => {

const [myOrders, setMyOrders] = useState([]);
const token = localStorage.getItem("token");

    const fetchOrders = async () => {
      try {
      
        const response = await axios.get(`${API_BASE_URL}/api/my-orders`, {
          headers: {
            "x-auth-token": token,
          },
        });

        if (response.status === 200) {
          setMyOrders(response.data);
        } else {
          console.error("Failed to fetch orders");
        }

    }catch (error) {
      console.error("Error fetching orders:", error);
    }
}

        
    useEffect(() => {
    fetchOrders();
  }, []);

  console.log(myOrders);

  return (
   <>
   <div>
    {
        myOrders.map((order) => (
          <div key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <p>Status: {order.status}</p>
            <p>Total Amount: {order.totalAmount}</p>
            <p>Items:</p>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  <p>Name: {item.name}</p>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
    }
   </div>
   </>
  )
}

export default MyOrders
