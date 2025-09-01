import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userdataContext } from '../context/Usercontext';
import axios from 'axios';

const UserProtectwrapper = ({ children }) => {
  const { user, setUser } = useContext(userdataContext);
  const token = localStorage.getItem('token');
  console.log("Token in UserProtectwrapper:", token);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    if (!token) {
      setError(true);
      setIsLoading(false);
      return;
    }
   axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        setUser(response.data.user);``
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      setError(true);
      setIsLoading(false);
    });
  // eslint-disable-next-line
  console.log(responseData)
  }, [token, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // if (error ) {
  //   localStorage.removeItem('token'); // Clear token if error occurs
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

export default UserProtectwrapper;