import React, { useState } from 'react';
import { updateLocation } from '../api';

const UpdateLocation = () => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });

  const handleUpdateLocation = async () => {
    const token = localStorage.getItem('token');
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        await updateLocation({ token, latitude, longitude });
        alert('Location updated successfully');
      });
    } catch (error) {
      alert(error.response?.data?.msg || 'Location update failed');
    }
  };

  return (
    <div>
      <h2>Update Location</h2>
      <button onClick={handleUpdateLocation}>Update Location</button>
      <p>Current Location: {location.latitude}, {location.longitude}</p>
    </div>
  );
};

export default UpdateLocation;
