import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setRide } from '../../slices/rideSlice'
import { setCaptainLocation, setLiveRoute } from '../../slices/locationSlice'
import { SocketContext } from '../../context/SocketContext'
import { RiArrowDownWideLine, RiMapPin2Fill, RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';

const LookingForDiver = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { receiveMessage, socket } = useContext(SocketContext);

    useEffect(() => {
        const unsubscribe = receiveMessage('confirm-ride', (data) => {
            console.log('Ride confirmed:', data);
            dispatch(setRide(data));
            dispatch(setCaptainLocation({ lat: data.captain.location.coordinates[1], lng: data.captain.location.coordinates[0] }));
        });

        return () => {
            unsubscribe();
        };
    }, [socket, receiveMessage]);

    useEffect(() => {
        const unsubscribe =  receiveMessage('live-route', (data) => {
            console.log('Live route updated:', data);
             dispatch(setLiveRoute(data));
            if (data) {
                navigate('/user/riding');
            }

        });

        return () => {
            unsubscribe();
        };
    }, [receiveMessage]);


    return (
        <>
            <h3 className='text-2xl font-bold mb-5' >Looking for Driver</h3>
            <div className='flex justify-between items-center flex-col h-3/4' >
                <img className='h-18 w-20' src={props.vehicleImage} alt="ddd" />
                <div className='w-full mt-3'>

                    <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                        <RiMapPin2Fill className="text-2xl" />
                        <div>
                            <p className='text-sm -mt-1'>Pickup Location</p>
                            <h4 className='text-md font-medium'>{props.pickupLocation}</h4>
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

            </div>
           
        </>
    )
}

export default LookingForDiver