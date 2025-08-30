import React from 'react'
import { memo } from 'react';
const ConfirmRide = (props) => {
    return (
        <>
            <h5
                onClick={() => {
                    props.setConfirmRidePanel(false);
                }
                }
                className=' absolute  top-0 text-center w-[93%]  text-3xl' >
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-bold mb-5' >Confirm Your Ride</h3>
            <div className='flex justify-between items-center flex-col' >
                <img className='h-40' src={props.vehicleImage} alt="ddd" />
                <div className='w-full mt-5'>

                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="ri-map-pin-2-fill"></i>
                        <div>
                            <p className='text-sm -mt-1'>Pickup Location</p>
                            <h3 className='text-lg font-medium'>{props.pickup}</h3>

                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <p className='text-sm -mt-1'>Drop Location</p>
                            <h4 className='text-lg font-medium'>{props.destination}</h4>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.fare?.fare?.[props.vehicleType]}</h3>
                            <p className='text-sm -mt-1'>cash cash</p>
                        </div>
                    </div>

                </div>
                <button onClick={
                    () => {
                        props.setConfirmRidePanel(false);
                        props.setvehicleFound(true);
                        props.createRide();
                    }
                } className='w-full mt-5 bg-green-600 rounded-lg p-2'>Confirm Ride</button>
            </div>
        </>
    )
}

export default memo(ConfirmRide);