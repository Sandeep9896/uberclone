import React from 'react'
import { memo } from 'react';
import axios from 'axios';
import { RiArrowDownWideLine, RiMapPin2Fill, RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';

const ConfirmRide = (props) => {
    const createRide = async () => {
        try {
        const res=  await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/rides/create-ride`,
            {
              pickupLocation: props.pickupLocation,
              dropLocation: props.dropLocation,
              vehicleType: props.vehicleType
            },
            {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
           
          );
           console.log(res.data)
        } catch (error) {
          console.error("Error creating ride:", error);
        }
      };
    return (
        <>
            <h3 className='text-2xl font-bold mb-5' >Confirm Your Ride</h3>
            <div className='flex justify-between items-center flex-col h-1/3 ' >
                <img className='h-18 w-20' src={props.vehicleImage} alt="ddd" />
                <div className='w-full '>

                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <RiMapPin2Fill className="text-2xl" />
                        <div>
                            <p className='text-sm -mt-1'>Pickup Location</p>
                            <h3 className='text-md font-medium'>{props.pickupLocation}</h3>

                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <RiMapPinUserFill className="text-2xl" />
                        <div>
                            <p className='text-sm -mt-1'>Drop Location</p>
                            <h4 className='text-md font-medium'>{props.dropLocation}</h4>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <RiCurrencyLine className="text-2xl" />
                        <div>
                            <h3 className='text-lg font-medium'>{props.fare?.[props.vehicleType]}</h3>
                            <p className='text-sm -mt-1'>cash cash</p>
                        </div>
                    </div>

                </div>
                <button onClick={
                    async () => {
                        await createRide();
                        props.nextStep();
                    }
                } className='w-full mt-5 bg-green-600 rounded-lg p-2'>Confirm Ride</button>
            </div>
        </>
    )
}

export default memo(ConfirmRide);