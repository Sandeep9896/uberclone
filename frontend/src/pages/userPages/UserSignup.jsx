import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import { setUser } from '../../slices/userSlice';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    // const { setIsLoggedIn, sendMessage } = useContext(SocketContext); // Check if user is logged in
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

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, newUser);
        console.log(import.meta.env.VITE_BACKEND_URL);

        if (response.status === 201) {
            // If the registration is successful, set the user context and navigate to home
            dispatch(setUser(response.data.user)); // set user in redux store
            localStorage.setItem('token', response.data.token); // store token in local storage
            localStorage.setItem("auth", JSON.stringify({ user: { _id: response.data.user._id }, role: "user" }));
            navigate('/user/home');

        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }


    return (

        <div className='p-7 h-screen flex flex-col  bg-gray-100  '>
            <img className=' w-16 mb-10 ' src="images\uber.png" alt="" />
            <form onSubmit={(e) => {
                submitHandler(e, email, password)
            }
            }
                className='md:w-[50%] md:m-auto md:justify-center md:p-20 md:p-2'>
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
                <button disabled={isLoggedIn} className='bg-black text-white py-2 px-4 rounded-md w-full'> {!isLoggedIn ? "Create Account" : "Creating..."} </button>

            </form>
            <div className='mt-4  text-center'>
                <p className='text-gray-600'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>

            </div>

        </div>)
}

export default UserSignup