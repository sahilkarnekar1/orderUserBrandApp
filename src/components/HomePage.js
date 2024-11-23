import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api.js";

const HomePage = () => {
  const [drinksWithShops, setDrinksWithShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch nearest shops when the component mounts
  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      setError("");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `${API_BASE_URL}/api/nearest-shops`,
              {
                params: { latitude, longitude },
              }
            );

            if (response.data.message) {
              console.log(response.data.message);
            } else {
              const transformedData = response.data
                .filter((shopData) => shopData.drinks && shopData.drinks.length > 0)
                .flatMap((shopData) =>
                  shopData.drinks.map((drink) => ({
                    shopId: shopData.shop._id,
                    shopName: shopData.shop.shopName,
                    address: `${shopData.shop.address}, ${shopData.shop.city}, ${shopData.shop.state} - ${shopData.shop.postalCode}`,
                    contactNumber: shopData.shop.contactNumber,
                    estimatedDeliveryTime: Math.round(shopData.estimatedDeliveryTime),
                    drinkId: drink._id,
                    drinkName: drink.name,
                    drinkType: drink.category,
                    drinkPrice: drink.price,
                  }))
                );

              setDrinksWithShops(transformedData);
            }
          } catch (err) {
            setError("Failed to fetch shops. Please try again.");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError("Failed to get location. Please allow location access.");
          setLoading(false);
        }
      );
    };

    fetchShops();
  }, []);

  // Handle order creation
  const handleOrderCreation = async (drink) => {
    try {
      // Get token from localStorage (or your preferred storage)
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        alert("You need to log in to create an order.");
        return;
      }

      // Send the request to create the order
      const response = await axios.post(
        `${API_BASE_URL}/api/orders/create-orders`,
        {
          items: [
            {
              productId: drink.drinkId, // ID of the drink
              quantity: 1, // Default quantity (can be made dynamic)
            },
          ],
        },
        {
          headers: {
            "x-auth-token": token, // Include token in headers for authentication
          },
        }
      );

      if (response.status === 201) {
        alert("Order created successfully!");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to create order. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Drinks</h2>
      {drinksWithShops.length === 0 ? (
        <p>No drinks found nearby.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {drinksWithShops.map((drinkData, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "300px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
              onClick={() => handleOrderCreation(drinkData)}
            >
              <h3>{drinkData.shopName}</h3>
              <p>
                <strong>Address:</strong> {drinkData.address}
              </p>
              <p>
                <strong>Contact:</strong> {drinkData.contactNumber}
              </p>
              <p>
                <strong>Estimated Delivery Time:</strong>{" "}
                {drinkData.estimatedDeliveryTime} mins
              </p>
              <hr />
              <h4>Drink Details</h4>
              <p>
                <strong>Name:</strong> {drinkData.drinkName}
              </p>
              <p>
                <strong>Type:</strong> {drinkData.drinkType}
              </p>
              <p>
                <strong>Price:</strong> ${drinkData.drinkPrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
