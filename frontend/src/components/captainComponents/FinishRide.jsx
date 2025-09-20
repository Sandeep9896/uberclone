import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LiveRoute from '../LiveRoute'
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext.jsx';
import { useState,useEffect } from 'react';
import PaymentSuccessModal from "../PaymentSuccessModal.jsx";
import {RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';






const FinishRide = (props) => {
    const ride = useSelector((state) => state.ride.ride);
    const { receiveMessage } = useSocket();
    const [showModal, setShowModal] = useState(false);
    console.log(showModal);
    const [buttonText, setButtonText] = useState("Finish Ride");
    const navigate = useNavigate();
    receiveMessage('send_payment_success', (data) => {
        console.log('Payment successful:', data);
        setShowModal(true);
    });
    const completeRide = async (e) => {
        e.preventDefault();
        console.log("completeRide called");
        try {
            await axios.post('/api/rides/end-ride',
                { rideId: ride._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ custom header
                        "Content-Type": "application/json",  // usually needed
                    },
                }
            );
            setButtonText("Waiting for payment...");
        } catch (error) {
            console.error("Error completing ride:", error);
        }
    };

    return (
        <>

            <div className="h-full">
                <PaymentSuccessModal
                    role={"captain"}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />

                <div className="h-[30vh]" >
                    <LiveRoute />
                </div>
                <h3 className='text-2xl font-bold mb-5' >Finish this ride </h3>
                <div className='flex justify-between items-center mt-4 p-2 rounded-lg bg-yellow-500'>
                    <div className='flex justify-between items-center gap-3'>
                        <img className='h-16 rounded-full w-16' src="/images/user.png" alt="" />
                        <h2 className='text-lg font-medium '>{ride?.user?.fullname?.firstname}</h2>
                    </div>
                    <h5>{ride?.distance} </h5>
                </div>
                <div className='flex justify-between items-center flex-col' >
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                            <RiMapPinUserFill className="text-2xl" />
                            <div>
                                <h3 className='text-lg font-medium'>dropoff Location</h3>
                                <p className='text-sm -mt-1'>{ride?.dropLocation}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3 '>
                            <RiCurrencyLine className="text-2xl" />
                            <div>
                                <h3 className='text-lg font-medium'>{ride?.fare}</h3>
                                <p className='text-sm -mt-1'>fare</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6 w-full flex justify-center'>

                        <button
                            onClick={completeRide}
                            className='w-full  text-center bg-green-600 text-white font-semibold rounded-lg p-3'>{buttonText}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FinishRide