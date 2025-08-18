import React from 'react'
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { captaindataContext } from '../context/CaptainContext.jsx';
import axios from 'axios';

const CaptainLogin = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCaptain } = useContext(captaindataContext); // Correct usage
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // If token exists, redirect to captain home
            navigate('/captain-home');
        }
    }, []);

    const submitHandler = async (e, email, password) => {
        e.preventDefault();
        const loginData = {
            email: email,   
            password: password
        };
  
      try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captains/login`, loginData);
        if (response.status === 200) {
            setCaptain(response.data.captain); // set captain from backend response
            localStorage.setItem('token', response.data.token); // store token in local storage
            navigate('/captain-home');
        }
      }
        catch (error) {
                console.error('Error logging in:', error);
                alert('Login failed. Please check your credentials.');
            }
        setEmail('');
        setPassword('');
    }
    
    return (
        <div className='p-7 h-screen flex flex-col  bg-gray-100'>
            <img className=' w-16 mb-10 ' src="images\uberdriver.png" alt="" />
            <form onSubmit={(e) => {
                submitHandler(e, email, password)
            }
            }>
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
                    className='border-2 border-gray-300 rounded-md p-2 w-full mb-4' />
                <button className='bg-black text-white py-2 px-4 rounded-md w-full'>Login</button>

            </form>
            <div className='mt-4 mx-auto text-center'>
                <p className='text-gray-600'>Don't have an account? <Link to='/captain-signup' className='text-blue-500'>Sign Up as Captian</Link></p>
                 <Link to='/login' className='flex bg-orange-400 text-white justify-center py-2 px-4 rounded-md w-full mt-10'>Login as user</Link>

            </div>

        </div>
    )
}


export default CaptainLogin