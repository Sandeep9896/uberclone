import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../src/slices/userSlice';
const UserLogout = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const dispatch = useDispatch();

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
                            setLoggedOut(true);
                        }
                    })
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };
        logoutfn();
    }, [dispatch]);

    if (loggedOut) {
        return <Navigate to="/login" replace />;
    }

    return <>Logging out...</>;
};

export default UserLogout;