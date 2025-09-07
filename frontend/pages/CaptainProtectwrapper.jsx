import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { captaindataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectwrapper = ({ children }) => {
    const { captain, setCaptain } = useContext(captaindataContext);
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState(false);
    const token = localStorage.getItem('token');
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (!token) {
            setAuthError(true);
            setIsLoading(false);
            return;
        }
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            }
        })
        .then((response) => {
            setCaptain(response.data.captain);
            setIsLoading(false);
            setLogin(true);
        })
        .catch((error) => {
            console.error("Error fetching captain profile:", error);
            setAuthError(true);
            setIsLoading(false);
        });
        // eslint-disable-next-line
    }, [token, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(!login){
        localStorage.removeItem('token');
        return <Navigate to="/captain-login" replace />;
    }

    // if (authError ) {
    //     return <Navigate to="/captain-login" replace />;
    // }

    return children;
};

export default CaptainProtectwrapper;