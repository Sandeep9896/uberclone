import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userdataContext } from '../context/Usercontext';
import axios from 'axios';

const UserProtectwrapper = ({ children }) => {
  const { user, setUser } = useContext(userdataContext);
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(true);
      setIsLoading(false);
      return;
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        setUser(response.data.user);
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      setError(true);
      setIsLoading(false);
    });
  // eslint-disable-next-line
  }, [token, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtectwrapper;