import React, { useEffect, useState, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVehicleImage, setVehicleType } from '../../slices/rideSlice';
import { RiArrowDownWideLine, RiMapPin2Fill, RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';

const VehiclePanel = (props) => {
    const fareDetails = useSelector((state) => state.ride.fareDetail);
    console.log(fareDetails)
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // Example: Memoize a derived value (e.g., filtered vehicles)
    const vehicles = useMemo(() => [
        {
            type: 'car',
            seats: 4,
            time: '2 min away',
            price: fareDetails?.car || 199.20,
            img: '/images/car.webp'
        },
        {
            type: 'bike',
            seats: 1,
            time: '3 min away',
            price: fareDetails?.bike || 65,
            img: '/images/bike.webp'
        },
        {
            type: 'auto',
            seats: 4,
            time: '5 min away',
            price: fareDetails?.auto || 116.20,
            img: '/images/auto.jpeg'
        }
    ], [fareDetails]);

    if (error) return <div>{error}</div>;

    return (
        <div className='md:flex-row md:min-h-[80vh] md:w-[60%] mx-auto  '>
            <h3 className='text-2xl font-bold mb-5'>Choose a vehicle</h3>
            {vehicles.map((v, idx) => (
                <div
                    key={v.type}
                    onClick={() => {
                        dispatch(setVehicleType(v.type)); // Set the selected vehicle type
                        dispatch(setVehicleImage(v.img)); // Set the selected vehicle image
                        props.nextStep();
                    }}
                    tabIndex={idx}
                    className='flex gap-4 mb-2 justify-between items-center w-full border-gray-200 border-2 rounded-lg p-3 active:border-black'
                >
                    <img className='h-10' src={v.img} alt={v.type} />
                    <div className='-ml-2 w-1/2'>
                        <h4 className='text-base font-medium'>
                            {v.type} <span><RiMapPinUserFill className='inline' />{v.seats} seats</span>
                        </h4>
                        <h5 className='text-xs font-medium'>{v.time}</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹{v.price}</h2>
                </div>
            ))}
        </div>
    );
};

export default memo(VehiclePanel);
