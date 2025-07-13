import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userdataContext } from '../context/Usercontext'; // Correct import
import axios from 'axios';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { user, setUser } = useContext(userdataContext); // Correct usage
    const navigate = useNavigate();



    const submitHandler = async (e, email, password) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/register`, newUser);
        console.log(import.meta.env.VITE_BASE_URL);

        if (response.status === 201) {
            // If the registration is successful, set the user context and navigate to home
            setUser(response.data);
            LocalStorage.setItem('token', response.data.token); // store token in local storage
            navigate('/home');

        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }


    return (

        <div className='p-7 h-screen flex flex-col  bg-gray-100'>
            <img className=' w-16 mb-10 ' src="images\uber.png" alt="" />
            <form onSubmit={(e) => {
                submitHandler(e, email, password)
            }
            }>
                <h3 className='text-base font-medium mb-2'>What's yours Name</h3>
                {/* email input field */}
                <div className='flex gap-4 mb-4'>
                    <input
                        type="text"
                        placeholder='first Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-1/2'
                    />
                    <input
                        type="text"
                        placeholder='last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-1/2 '
                    />
                </div>
                <h3 className='text-base font-medium mb-2'>Email Id</h3>
                {/* email input field */}
                <input
                    type="email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-full mb-4'
                />

                <h3 className='text-base font-medium mb-2'>Password</h3>
                {/* input password field */}
                <input
                    type="password"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-full mb-4' />
                <button className='bg-black text-white py-2 px-4 rounded-md w-full'>Create Account</button>

            </form>
            <div className='mt-4  text-center'>
                <p className='text-gray-600'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>

            </div>

        </div>)
}

export default UserSignup