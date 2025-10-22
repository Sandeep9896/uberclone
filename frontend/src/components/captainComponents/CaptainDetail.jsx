import React from 'react'
import { useSelector } from 'react-redux';
import { RiArrowUpWideLine } from 'react-icons/ri';

const CaptainDetail = (props) => {
  const captain = useSelector((state) => state.captain.captain);

  return (
    <>
      <button
        onClick={() => {
          props.setAvailableRidePanel(true);
          props.AvailableRide();
        }}
        className="flex items-center justify-center w-full py-2 transition hover:bg-gray-100 rounded-lg focus:outline-none"
        aria-label="Show Available Rides"
      >
        <RiArrowUpWideLine className="text-4xl text-gray-700 hover:text-black transition" />
      </button>
      <div className='flex justify-between items-center '>
        <div className='flex justify-between items-center gap-3'>
          <img className='w-16 rounded-full object-cover' src="/images/user.png" alt="" />
          <h4 className='text-lg font-medium'>{captain.fullname[`firstname`]}</h4>
        </div>
        <div>
          <h4 className='text-xl font-semibold '>₹{(captain.earnings).toFixed(2)}</h4>
          <p className='text-sm text-gray-600'>Earned</p>
        </div>
      </div>
      <div className='flex md:flex-col md:p-2 md:w-2xl md:mx-auto item-start p-5 mt-4 bg-gray-100 rounded-lg gap-5 justify-center '>
        <div className='text-center' >
          <i className="text-3xl font-thin ri-pin-distance-fill"></i>
          <h5 className='text-lg font-medium'>{(captain.hoursOnline/3600).toFixed(1)}</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl font-thin ri-speed-up-fill"></i>
          <h5 className='text-lg font-medium'>{(captain.distanceCovered / 1000).toFixed(1)} km</h5>
          <p className='text-sm text-gray-600'> Distance Covered </p>
        </div>
        <div className='text-center'>
          <i className="text-3xl font-thin ri-book-line"></i>
          <h5 className='text-lg font-medium'>{(captain.rating.totalRating).toFixed(2)}</h5>
          <p className='text-sm text-gray-600'>Rating</p>
        </div>
      </div>
    </>
  )
}

export default CaptainDetail