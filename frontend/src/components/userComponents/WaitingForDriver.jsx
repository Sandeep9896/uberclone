import React from 'react'
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext';
import { RiArrowDownWideLine, RiMapPin2Fill, RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';

const WaitingForDriver = (props) => {
  const ride = useSelector((state) => state.ride.ride);
  const { receiveMessage } = useSocket();
  receiveMessage('ride-started', (data) => {
    console.log('Ride started:', data);
    props.nextStep();

  }, [receiveMessage]);
  return (
    <>
      <h5
        onClick={() => {
          props.setWaitingPanel(false);
        }}
        className=' absolute  top-0 text-center w-[93%]  text-3xl' >
        <RiArrowDownWideLine />
      </h5>
      <div className='flex justify-between items-center' >
        <img className='h-12' src="/images/car.webp" alt="" />
        <div className='text-right px-5'>
          <h2 className='text-lg font-bold'> Driver : {ride?.captain?.fullname?.firstname}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>Vehicle : {ride?.captain?.vehicle?.plate}</h4>
          {/* <p className='text-sm text-gray-600'>Type : {ride?.vehicleType}</p>
                <p className='text-sm text-gray-600'>Capacity : {ride?.captain?.vehicle?.capacity}</p> */}
        </div>
      </div>
      <h5 className='  text-center mt-5 mb-[-15px] text-xl font-bold' >
        OTP: {ride?.otp}
      </h5>

      <div className='flex justify-between items-center flex-col' >

        <div className='w-full mt-5'>

          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <RiMapPin2Fill className="text-2xl" />
            <div>
              <h3 className='text-lg font-medium'>{ride?.pickupLocation}</h3>
              <p className='text-sm -mt-1'>pickup location</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <RiMapPinUserFill className="text-2xl" />
            <div>
              <h3 className='text-lg font-medium'>{ride?.dropLocation}</h3>
              <p className='text-sm -mt-1'>drop location</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 '>
            <RiCurrencyLine className="text-2xl" />
            <div>
              <h3 className='text-lg font-medium'>{ride?.fare}</h3>
              <p className='text-sm -mt-1'>Total Fare</p>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default WaitingForDriver