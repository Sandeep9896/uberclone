<<<<<<< HEAD
import React, { useEffect, useState, useMemo } from 'react';

const VechilePanel = (props) => {
    const [fareDetails, setFareDetails] = useState(props.fare || null);
    const [error, setError] = useState(null);

    // Update fareDetails when props.fare changes
    useEffect(() => {
        setFareDetails(props.fare || null);
    }, [props.fare]);

    // Example: Memoize a derived value (e.g., filtered vehicles)
    const vehicles = useMemo(() => [
        {
            type: 'car',
            seats: 4,
            time: '2 min away',
            price: fareDetails?.fare.car || 199.20,
            img: 'images/car.webp'
        },
        {
            type: 'Moto',
            seats: 1,
            time: '3 min away',
            price: fareDetails?.fare.bike || 65,
            img: 'images/bike.webp'
        },
        {
            type: 'UberAuto',
            seats: 4,
            time: '5 min away',
            price: fareDetails?.fare.auto || 116.20,
            img: 'images/auto.jpeg'
        }
    ], [fareDetails]);

    if (error) return <div>{error}</div>;

    return (
        <>
            <h5
                onClick={() => props.setVechilePanel(false)}
                className='absolute top-0 text-center w-[93%] text-3xl'>
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-bold mb-5'>Choose a vehicle</h3>
            {vehicles.map((v, idx) => (
                <div
                    key={v.type}
                    onClick={() => {
                        props.setConfirmRidePanel(true);
                        props.setVechilePanel(false);
                        props.setVehicleType(v.type); // Set the selected vehicle type
                        props.setVehicleImage(v.img); // Set the selected vehicle image
                    }}
                    tabIndex={idx}
                    className='flex gap-4 mb-2 justify-between items-center w-full border-gray-200 border-2 rounded-lg p-3 active:border-black'
                >
                    <img className='h-10' src={v.img} alt={v.type} />
                    <div className='-ml-2 w-1/2'>
                        <h4 className='text-base font-medium'>
                            {v.type} <span><i className="ri-user-3-fill"></i>{v.seats} seats</span>
                        </h4>
                        <h5 className='text-xs font-medium'>{v.time}</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹{v.price}</h2>
                </div>
            ))}
        </>
    );
};

export default VechilePanel;
=======
import React from 'react'

const VechilePanel = (props) => {
    return (
        <>
            <h5

                onClick={() => {
                    props.setVechilePanel(false);
                }
                }
                className=' absolute  top-0 text-center w-[93%]  text-3xl' >
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-bold mb-5' >Choose a vechile</h3>
            {/* for uber car */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.setVechilePanel(false);
                }
                }
                tabIndex={0}
                className='flex gap-4 mb-2 justify-between items-center w-full border-gray-200 border-2 rounded-lg p-3 active:border-black'
            >
                <img className='h-10 ' src="images\car.webp" alt="ddd" />
                <div className='-ml-2 w-1/2 '>
                    <h4 className='text-base font-medium'>carX <span><i className="ri-user-3-fill"></i>4 seats </span> </h4>
                    <h5 className='text-xs font-medium'> 2 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold' >₹199.20</h2>

            </div>
            {/* for uber bike */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.setVechilePanel(false);
                }
                }
                className='flex gap-4 mb-2 justify-between items-center w-full border-gray-200 border-2 active:border-black rounded-lg  p-3'>
                <img className='h-10 ' src="images\bike.webp" alt="ddd"  />
                <div className='-ml-2 w-1/2 '>
                    <h4 className='text-base font-medium'>Moto <span><i className="ri-user-3-fill"></i>1 seats </span> </h4>
                    <h5 className='text-xs font-medium'> 3 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold' >₹65</h2>

            </div>
            {/* for uber auto */}
            <div
                onClick={() => {
                    props.setConfirmRidePanel(true);
                    props.setVechilePanel(false);
                }
                }
                className='flex gap-4 mb-2 justify-between items-center w-full  border-gray-200 border-2 active:border-black rounded-lg  p-3'>
                <img className='h-10 ' src="images\auto.jpeg" alt="ddd"  />
                <div className=' -ml-2 w-1/2 '>
                    <h4 className='text-base font-medium'>UberAuto <span><i className="ri-user-3-fill"></i>4 seats </span> </h4>
                    <h5 className='text-xs font-medium'> 5 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold' >₹116.20</h2>

            </div>
        </>
    )
}

export default VechilePanel
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
