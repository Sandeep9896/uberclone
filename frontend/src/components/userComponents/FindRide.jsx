import React from 'react'
import { useNavigate } from 'react-router-dom';
import { RiArrowDownWideLine } from 'react-icons/ri';


const FindRide = ({ pickup, destination, pickupHandler, destinationHandler, findRide, setActiveInput }) => {
  const navigate = useNavigate();

  return (
    <div className=' h-1/3 bg-white p-5 relative md:px-10 '>
      <h5
        onClick={() => {
          navigate("/user/home");
        }}
        className=' absolute right-2 top-6 text-2xl md:px-10' >
        <RiArrowDownWideLine />
      </h5>
      <h4 className='text-2xl font-semibold'>Find a trip</h4>
      <form action="">
        <div className="line h-20 w-1 top-[43%] md:top-[38%] left-10  absolute bg-gray-700 rounded-full  "></div>
        <input
          type="text"
          value={pickup}
          onChange={(e) => pickupHandler(e.target.value)}
          required
          onClick={() => {
            navigate('/user/search-Location');
            setActiveInput('pickup');
          }}
          placeholder='Enter your pickup location'
          className='bg-[#eee] text-base w-full rounded-lg py-2 px-12 mt-5'
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => destinationHandler(e.target.value)}
          onClick={() => {
            navigate('/user/search-Location');
            setActiveInput('destination');
          }}
          required
          placeholder='Enter your destination'
          className='bg-[#eee] text-base w-full  rounded-lg py-2 px-12 mt-5'
        />
        {pickup && destination ?
          <button
            onClick={(e) => { findRide(e) }}
            className='bg-black text-white w-full rounded-lg py-2 mt-5'>
            Find a ride
          </button>
          : null}

      </form>
    </div>
  )
}

export default FindRide