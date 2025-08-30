import React from 'react'
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
    
    return (
        <div>
            <h5
                onClick={() => {
                    props.setFinishRidePanel(false);
                }
                }
                className=' absolute  top-0 text-center w-[93%]  text-3xl' >
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-bold mb-5' >Finish this ride to start</h3>
            <div className='flex justify-between items-center mt-4 p-2 rounded-lg bg-yellow-500'>
                <div className='flex justify-between items-center gap-3'>
                    <img className='h-16 rounded-full w-16' src="/images/user.png" alt="" />
                    <h2 className='text-lg font-medium '>{props.rideDetail?.user?.fullname?.firstname}</h2>
                </div>
                <h5>{props.rideDetail?.distance} </h5>
            </div>
            <div className='flex justify-between items-center flex-col' >
                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>pickup Location</h3>
                            <p className='text-sm -mt-1'>{props.rideDetail?.pickupLocation}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>dropoff Location</h3>
                            <p className='text-sm -mt-1'>{props.rideDetail?.dropLocation}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.rideDetail?.fare}</h3>
                            <p className='text-sm -mt-1'>fare</p>
                        </div>
                    </div>
                </div>
                <div className='mt-6 w-full flex justify-center'>

                    <Link to="/captain-home"
                        onClick={() => {

                        }}
                        className='w-full  text-center bg-green-600 text-white font-semibold rounded-lg p-3'>Finish Ride</Link>
                </div>
            </div>
        </div>
    )
}

export default FinishRide