import React from 'react'
import { useContext } from 'react';
import { captaindataContext } from '../context/CaptainContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../src/slices/captainSlice';
import { useSelector } from 'react-redux';
import { SocketContext } from '../context/SocketContext';

const CaptainLogout = () => {
    const { setIsLoggedIn } = useContext(SocketContext); // Check if user is logged in
    const dispatch = useDispatch();
    const isLoggedIn=useSelector((state)=>state.captain.isLoggedIn)

    useEffect(() => {
        const token = localStorage.getItem('token');
        const logoutfn = async () => {
            try {
                if (token) {
                    await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/captains/logout`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    ).then((res) => {
                        if (res.status === 200) {
                            localStorage.removeItem('token');
                           dispatch(logout());
                            setIsLoggedIn(false); // Set login state to false
                        }
                    })
                }
            }
            catch (error) {
                console.error('Error logging out:', error);
            }
        }
        logoutfn();
    }, [dispatch]);
    if (!isLoggedIn) {
        return <Navigate to="/captain-login" replace />;

    }
    return <>Logging out...</>;
};


    export default CaptainLogout