import React from 'react'
import { memo } from 'react';
import axios from 'axios';
import { RiArrowDownWideLine, RiMapPin2Fill, RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';

const ConfirmRide = (props) => {
    const [isCreating, setIsCreating] = React.useState(false);
    const createRide = async () => {
        try {
            setIsCreating(true);
            const res = await axios.post(
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
            if (res.data.success) {
                setIsCreating(false);
            }
        } catch (error) {
            console.error("Error creating ride:", error);
        }
    };

    if (isCreating) { // show creating state
        return <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <h3 className="text-xl font-bold mb-4">Creating your ride...</h3>
                {/* Optional spinner */}
                <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        </div>
    }

    return (
        <div className='md:flex-row md:min-h-[80vh] md:w-[60%] mx-auto md:mt-10 -mt-5 mb-5'>
            <h3 className='text-xl font-bold mb-5' >Confirm Your Ride</h3>
            <div className='flex justify-between items-center flex-col ' >
                <img className='h-18 w-20' src={props.vehicleImage} alt="vehicle" />
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
                            <p className='text-sm -mt-1'>Fare</p>
                        </div>
                    </div>

                </div>
                <button onClick={
                    async () => {
                        await createRide();
                        props.nextStep();
                    }
                }
                disabled={isCreating} className='w-full mt-5 bg-green-600 rounded-lg p-2 hover:bg-green-700 transition cursor-pointer'> {isCreating ? "Creating..." : "Confirm Ride"}</button>
            </div>
        </div>
    )
}

export default memo(ConfirmRide);