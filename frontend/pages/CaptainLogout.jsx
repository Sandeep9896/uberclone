import React from 'react'
import { useContext } from 'react';
import { captaindataContext } from '../context/CaptainContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CaptainLogout = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const { captain, setCaptain } = useContext(captaindataContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const logout = async () => {
            try {
                if (token) {
                    await axios.get(
                        `${import.meta.env.VITE_BASE_URL}/api/captains/logout`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    ).then((res) => {
                        if (res.status === 200) {
                            localStorage.removeItem('token');
                            setCaptain(null);
                            setLoggedOut(true);
                        }
                    })
                }
            }
            catch (error) {
                console.error('Error logging out:', error);
            }
        }
        logout();
    }, [setCaptain]);   
    if (loggedOut) {
        return <Navigate to="/captain-login" replace />;

    }
    return <>Logging out...</>;
};


    export default CaptainLogout