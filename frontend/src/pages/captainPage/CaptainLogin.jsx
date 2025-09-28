import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext.jsx';
import { useDispatch } from 'react-redux';
import { setCaptain } from '../../slices/captainSlice.js';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CaptainLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn, sendMessage } = useContext(SocketContext); // Check if user is logged in
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const captain = useSelector((state) => state.captain.captain);
    const [click, setClick] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && captain) {
            // If token exists, redirect to captain home
            navigate('/captain/home');
        }
    }, []);

    const submitHandler = async (e, email, password) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        };

        try {
            setClick(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/captains/login`, loginData);
            if (response.status === 200) {
                dispatch(setCaptain(response.data.captain)); // set captain from backend response
                setIsLoggedIn(true); // Set login state to true
                localStorage.setItem('token', response.data.token); // store token in local storage
                localStorage.setItem("auth", JSON.stringify({ user: { _id: response.data.captain._id }, role: "captain" }));
                navigate('/captain/home');
            }
        }
        catch (error) {
            console.log('Error logging in:', error);
            alert('Login failed. Please check your credentials.');
            setClick(false);
        }
        setEmail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col  bg-gray-100 '>
            <img className=' w-16 mb-10 ' src="images\uberdriver.png" alt="" />
            <form onSubmit={(e) => {
                submitHandler(e, email, password)
            }
            }
            className='md:w-[50%] md:m-auto justify-center md:p-20 md:p-2'>
                <h3 className='text-xl mb-2'> Email </h3>
                {/* email input field */}
                <input
                    type="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border-2 border-gray-300 rounded-md p-2 w-full mb-4'
                />
                <h3 className='text-xl mb-2'>Password</h3>
                {/* input password field */}
                <input
                    type="password"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className='border-2 border-gray-300 rounded-md p-2 w-full mb-4' />
                <button disabled={click} className='bg-black text-white py-2 px-4 rounded-md w-full'>{click ? 'Logging in...' : 'Login'}</button>

            </form>
            <div className='mt-4 mx-auto text-center'>
                <p className='text-gray-600'>Don't have an account? <Link to='/captain-signup' className='text-blue-500'>Sign Up as Captian</Link></p>
                <Link to='/login' className='flex bg-orange-400 text-white justify-center py-2 px-4 rounded-md w-full mt-10'>Login as user</Link>

            </div>

        </div>
    )
}


export default CaptainLogin