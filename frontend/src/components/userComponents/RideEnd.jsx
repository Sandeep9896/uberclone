import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext.jsx';
import CheckoutRazorpay from '../../paymentGateway/CheckoutRazorpay.jsx';
import { useSelector } from 'react-redux';
import RatingModal from './RatingModal.jsx';
import { RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';


const RideEnd = () => {
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);
    const rideDetail = useSelector((state) => state.ride.ride);
    console.log(modalOpen);
    const { socket } = useContext(SocketContext);
    const { receiveMessage } = useContext(SocketContext);
    const [rideend, setRideend] = React.useState(false);

    receiveMessage('ride-ended', (data) => {
        console.log('Ride ended:', data);
        setRideend(true);
    });
    receiveMessage('send_payment_success', (data) => {
        // console.log('Payment successful:', data);
        setModalOpen(true);
    });

    const handleSubmitRating = (data) => {
        console.log("Rating submitted:", data);
        // send to server
    };


    return (
        <div className='h-screen w-full md:w-[80%]  md:mx-auto  ' >
            <div className='h-1/2 p-5'>
                <RatingModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleSubmitRating}
                />
                <div className='flex justify-between items-center' >
                    <img className='h-12' src="/images/car.webp" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{rideDetail?.captain?.fullname?.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1 uppercase'>{rideDetail?.captain?.vehicle?.plate}</h4>
                        <p className='text-sm text-gray-600'>{rideDetail?.captain?.vehicle?.vehicleType}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center flex-col' >

                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                            <RiMapPinUserFill className="text-2xl" />
                            <div>
                                <h3 className='text-lg font-medium'> {rideDetail?.dropLocation}</h3>
                                <p className='text-sm -mt-1'>drop Location</p>
                            </div>

                        </div>
                        <div className='flex items-center gap-5 p-3 '>
                            <RiCurrencyLine className="text-2xl" />
                            <div>
                                <h3 className='text-lg font-medium'>{rideDetail?.fare}</h3>
                                <p className='text-sm -mt-1'>Fare</p>
                            </div>
                        </div>
                    </div>
                </div>
                {rideend && <CheckoutRazorpay amount={rideDetail?.fare} />
                }
            </div>
        </div>
    )
}

export default RideEnd;