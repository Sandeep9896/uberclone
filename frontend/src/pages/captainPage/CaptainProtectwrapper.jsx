import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCaptain } from '../../slices/captainSlice';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';

const CaptainProtectwrapper = ({ children }) => {
    const dispatch = useDispatch();    
    const [authError, setAuthError] = useState(false);
    const token = localStorage.getItem('token');
    const isLoggedIn = useSelector((state) => state.captain.isLoggedIn);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setAuthError(true);
            setIsLoading(false);
        }
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
            }
        })
        .then((response) => {
            dispatch(setCaptain(response.data.captain));
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching captain profile:", error);
            setAuthError(true);
            setIsLoading(false);
        });
        // eslint-disable-next-line
    }, [token, setCaptain]);

    if (isLoading) {
        return <Loader />;
    }

    if(!isLoggedIn || authError) {
        localStorage.removeItem('token');
        return <Navigate to="/captain-login" replace />;
    }

    return children;
};

export default CaptainProtectwrapper;