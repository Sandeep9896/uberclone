import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { userdataContext } from '../context/Usercontext';

const UserLogout = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const { setUser } = useContext(userdataContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const logout = async () => {
            try {
                if (token) {
                    await axios.get(
                        `${import.meta.env.VITE_BASE_URL}/api/users/logout`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    ).then((res) => {
                        if (res.status == 200) {
                            localStorage.removeItem('token');
                            setUser(null);
                            setLoggedOut(true);
                        }
                    })
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
        };
        logout();
    }, [setUser]);

    if (loggedOut) {
        return <Navigate to="/login" replace />;
    }

    return <>Logging out...</>;
};

export default UserLogout;