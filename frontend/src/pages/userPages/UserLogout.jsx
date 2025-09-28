import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { stopLocationWatcher } from '../../utils/locationWatcher';
const UserLogout = () => {
    
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const watchId = useSelector((state) => state.location.watchId);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const logoutfn = async () => {      
            try {
                if (token) {
                    await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    ).then((res) => {
                        if (res.status == 200) {
                            localStorage.removeItem('token');
                            dispatch(logout());
                            stopLocationWatcher(watchId);
                        }
                    })
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };
        logoutfn();
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Loader/> ;
};

export default UserLogout;