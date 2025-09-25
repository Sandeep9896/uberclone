import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../slices/userSlice';
import axios from 'axios';
import Loader from '../../components/loader';

const UserProtectwrapper = ({ children }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(true);
      setIsLoading(false);
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/auth`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(setUser(response.data.user));
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [token, dispatch]);

  // Show loader while checking auth
  if (isLoading) return <Loader />;

  // Redirect if error or not logged in
  if (error || !isLoggedIn) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return children;
};

export default UserProtectwrapper;
