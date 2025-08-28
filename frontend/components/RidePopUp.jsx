import React from 'react'

const RidePopUp = (props) => {
  // console.log('rideDetail in RidePopUp:', props.rideDetail);
  return (
    <>
      <h3 className='text-2xl font-bold mb-5' >New Ride for you</h3>
      <div className='flex justify-between items-center mt-4 p-2 rounded-lg bg-yellow-500'>
        <div className='flex justify-between items-center gap-3'>
          <img className='h-16 rounded-full w-16' src="/images/user.png" alt="" />
          <h2 className='text-lg font-medium '>{props.rideDetail?.user?.fullname?.firstname}</h2>
        </div>
        <h5>{props.rideDetail?.distance}</h5>
      </div>
      <div className='flex justify-between items-center flex-col' >
        <div className='w-full mt-5'>

          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <i className="ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.rideDetail?.pickupLocation}</h3>
               <p className='text-sm -mt-1'>pickup Location</p>

            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>{props.rideDetail?.dropLocation}</h3>
              <p className='text-sm -mt-1'>drop Location</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 '>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹ {props.rideDetail?.fare}</h3>
              <p className='text-sm -mt-1'>cash cash</p>
            </div>
          </div>
        </div>
        <div className='flex item-center justify-between w-full mt-5 '>
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className=' bg-gray-300 text gray-700  font-semibold rounded-lg px-10 p-2'>ignore</button>
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.setRidePopupPanel(false);
              props.confirmRide();
            }}
            className=' bg-green-600 text-white font-semibold rounded-lg px-10 p-2'>Accept</button>

        </div>
      </div>
    </>
  )
}

export default RidePopUp