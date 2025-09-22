import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setCaptain } from '../../slices/captainSlice.js';
import { SocketContext } from '../../context/SocketContext.jsx';
import axios from 'axios';
const CaptainSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [model, setModel] = useState('');

    const dispatch = useDispatch();
    const { setIsLoggedIn } = useContext(SocketContext); // Check if user is logged in
    const navigate = useNavigate();



    const submitHandler = async (e) => {
        e.preventDefault();
        const newCaptain = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                plate: vehiclePlate,
                color: vehicleColor,
                capacity: Number(vehicleCapacity),
                vehicleType: vehicleType,
                model: model
            }
        };
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/captains/register`, newCaptain);
            if (response.status === 201) {
                dispatch(setCaptain(response.data.captain));
                setIsLoggedIn(true); // Set login state to true
                localStorage.setItem('token', response.data.token);
                localStorage.setItem("auth", JSON.stringify({ user: { _id: response.data.captain._id }, role: "captain" }));
                navigate('/captain/home');
            }
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setVehiclePlate('');
        setVehicleColor('');
        setVehicleCapacity('');
        setVehicleType('');
        setModel('');
    }


    return (

        <div className='p-7 h-screen flex flex-col  bg-gray-100  '>
            <img className=' w-16 mb-2  ' src="images\uberdriver.png" alt="" />
            <form onSubmit={(e) => {
                submitHandler(e)
            }
            } 
            className='md:w-[50%] md:m-auto justify-center md:p-20 md:p-2'>
                <h3 className='text-base font-medium mb-2'>What's ours Captain Name</h3>
                {/* email input field */}
                <div className='flex gap-4 mb-2'>
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
                    className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-full mb-2'
                />

                <h3 className='text-base font-medium mb-2'>Password</h3>
                {/* input password field */}
                <input
                    type="password"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-full mb-2' />
                <h3 className='text-base font-medium mb-2'>Vehicle Details</h3>
                {/* vehicle plate input field */}
                <input
                    type="text"
                    placeholder='Vehicle Plate Number'
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    required
                    className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-full mb-2'
                />
                <div className='flex gap-4 mb-1'>
                    <input
                        type="text"
                        placeholder='Vehicle model'
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                        className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-1/2 mb-2'
                    />

                    {/* vehicle color input field */}
                    <input
                        type="text"
                        placeholder='Vehicle Color'
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        required
                        className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-1/2 mb-2'
                    />
                </div>
                {/* vehicle capacity input field */}
                <div className='flex gap-4 mb-1'>
                    <input
                        type="number"
                        placeholder='Vehicle Capacity'
                        value={vehicleCapacity}
                        onChange={(e) => setVehicleCapacity(e.target.value)}
                        required
                        className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-1/2 mb-2'
                    />

                    {/* vehicle type input field */}
                    <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        required
                        className='border-2 bg-[#eeeeee] border-gray-300 rounded-md p-2 w-1/2 mb-2'
                    >
                        <option value="">Select Vehicle Type</option>
                        <option value="car">car</option>
                        <option value="bike">bike</option>
                        <option value="auto">auto</option>
                    </select></div>
                <button className='bg-black text-white py-2 px-4 rounded-md w-full'>Create Captain Account</button>

            </form>
            <div className='mt-4  text-center'>
                <p className='text-gray-600'>Already have an account? <Link to='/captain-login' className='text-blue-500'>Login</Link></p>

            </div>

        </div>)
}

export default CaptainSignup