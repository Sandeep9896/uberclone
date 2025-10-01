import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext,useEffect } from 'react';
import { SocketContext } from '../../context/SocketContext.jsx';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/userSlice.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LoginLoading from '../../components/logiinLoading.jsx';
import LoginFailedModal from '../../components/LoginFailed.jsx';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { setIsLoggedIn, sendMessage } = useContext(SocketContext); // Check if user is logged in
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [click, setClick] = useState(false);
    const [showLoginFailed, setShowLoginFailed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && user) {
            // If token exists, redirect to user home
            navigate('/user/home');
        }
    }, [navigate, user]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        };

        try {
            setClick(true);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
                loginData
            );
            if (response.status === 200) {
                dispatch(setUser(response.data.user)); // set user in redux store
                setIsLoggedIn(true); // Set login state to true
                localStorage.setItem('token', response.data.token); // store token in local storage
                localStorage.setItem("auth", JSON.stringify({ user: { _id: response.data.user._id }, role: "user" }));
                navigate('/user/home');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setClick(false);
            // alert('Login failed. Please check your credentials.');
            setShowLoginFailed(true);
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col  bg-gray-100 '>
            {click && <LoginLoading />}
            {showLoginFailed && ( <LoginFailedModal onClose={() => setShowLoginFailed(false)} /> )}


            <img className=' w-16 mb-10 ' src="images\uber.png" alt="" />
            <form onSubmit={(e) => {
                submitHandler(e, email, password)
            }
            }
                className='md:w-[50%] md:m-auto md:justify-center md:p-20 md:p-2'>
                <h3 className='text-xl mb-2'>What's yours Email</h3>
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
                <button  disabled={click} className='bg-black text-white py-2 px-4 rounded-md w-full'> {click? "Logging in..." : "Login"} </button>

            </form>
            <div className='mt-4 mx-auto text-center'>
                <p className='text-gray-600'>Don't have an account? <Link to='/signup' className='text-blue-500'>Sign Up</Link></p>
                <Link to='/captain-login' className='flex bg-green-600 text-white justify-center py-2 px-4 rounded-md w-full mt-10'>Login as Captain</Link>

            </div>

        </div>
    )
}

export default UserLogin