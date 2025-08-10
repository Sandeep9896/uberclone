import React from 'react'

const FindRide = ({ panelCloseRef,panelOpen, setPanelOpen, pickup, destination, pickupHandler, destinationHandler, findRide, setActiveInput, setPickupSuggestions, setDestinationSuggestions }) => {
  return (
     <div className=' h-[30%] bg-white p-5 relative '>
            <h5
              ref={panelCloseRef}
              onClick={() => {
                setPanelOpen(false);
              }}
              className=' absolute right-2 top-6 text-2xl' >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>
            <form action="">
              <div className="line h-20 w-1 top-[43%] left-10  absolute bg-gray-700 rounded-full  "></div>
              <input
                type="text"
                value={pickup}
                onChange={(e) => pickupHandler(e.target.value)}
                required
                onClick={() => {
                  setPanelOpen(true);
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
                  setPanelOpen(true);
                  setActiveInput('destination');
                }}
                required
                placeholder='Enter your destination'
                className='bg-[#eee] text-base w-full  rounded-lg py-2 px-12 mt-5'
              />
              {pickup && destination && panelOpen ?
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