import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const MyProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    profilePicture: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace with your token retrieval logic
        const response = await axios.get(`${API_BASE_URL}/api/auth/user/get-profile`, {
          headers: {
            "x-auth-token": `${token}`,
          },
        });
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile data.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('fullName', profileData.fullName);
    formData.append('email', profileData.email);
    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
    }

    try {
      const token = localStorage.getItem('token'); // Replace with your token retrieval logic
      await axios.patch(`${API_BASE_URL}/api/auth/user/update-profile`, formData, {
        headers: {
          "x-auth-token": `${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
      setSelectedFile(null); // Clear selected file after successful update
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>My Profile</h1>
      {profileData.profilePicture && (
        <img
          src={profileData.profilePicture}
          alt="Profile"
          style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }}
        />
      )}
      <div style={{ marginTop: '20px' }}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleInputChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Profile Picture:
          <input type="file" onChange={handleFileChange} style={{ marginLeft: '10px' }} />
        </label>
      </div>
      <button onClick={handleUpdateProfile} style={{ marginTop: '20px' }}>
        Update Profile
      </button>
    </div>
  );
};

export default MyProfile;
