import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch profile data from the server
        const response = await axios.get('/profile', {
          headers: {
            Authorization: 'YOUR_JWT_TOKEN_HERE', // Replace with actual JWT token
          },
        });

        // Set user data in state
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        // Handle error
        setError(error.response.data.message);
        setIsLoading(false);
      }
    };

    fetchUserProfile();

    // Clean up function (optional)
    return () => {
      // Any cleanup code if needed
    };
  }, []); // Empty dependency array to run effect only once

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {userData && (
        <div>
          <h2>User Profile</h2>
          <p>Name: {userData.user.name}</p>
          <h3>User Posts</h3>
          <ul>
            {userData.posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
