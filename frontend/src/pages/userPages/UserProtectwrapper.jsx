import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import axios from 'axios';
import UserLayout from '../../layout/UserLayout';

const UserProtectwrapper = ({ children }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (!token) {
      setError(true);
      setIsLoading(false);
    }
   axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      setError(true);
      setIsLoading(false);
    });
  }, [token, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserProtectwrapper;