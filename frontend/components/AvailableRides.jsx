import React from 'react'

const AvailableRides = (props) => {
    return (
        <>
            <h5
                onClick={() => {
                    props.setAvailableRidePanel(false);
                    console.log('Available Ride panel closed');
                }
                }
                className=' absolute  top-0 text-center w-[93%]  text-3xl' >
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h1 className="text-2xl font-semibold mb-4 ">Available Rides</h1>
            <ul
                role="list"
                className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm"
            >
                {props.ride?.map((ride) => (
                    <li key={ride._id} className="p-4 hover:bg-gray-50 transition">
                        <div  className="flex items-start justify-between mx-2">
                            <h2 className="text-lg font-medium text-gray-900">
                                Name: {ride?.user?.fullname?.firstname}
                            </h2>
                            <button onClick={() => props.handleRideSelect(ride)}
                                className={` text-large items-center rounded-full px-2 py-1  font-medium ' bg-green-400 text-gray-800`}
                            >
                                Accept ride
                            </button>
                        </div>
                        <dl className="mt-2 grid grid-cols-1 gap-1 text-sm text-gray-600 sm:grid-cols-2">
                            <div className="flex gap-2">
                                <dt className="font-medium text-gray-700">Pickup:</dt>
                                <dd className="truncate">{ride.pickupLocation}</dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="font-medium text-gray-700">Dropoff:</dt>
                                <dd className="truncate">{ride.dropLocation}</dd>
                            </div>
                        </dl>
                    </li>
                ))}
                {(!props.ride || props.ride.length === 0) && (
                    <li className="p-6 text-center text-gray-500">No rides available</li>
                )}
            </ul>
        </>
    )
}

export default AvailableRides