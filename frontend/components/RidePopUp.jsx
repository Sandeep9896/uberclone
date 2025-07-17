import React from 'react'

const RidePopUp = () => {
  return (
 <>
            <h5 
            onClick={() => {
                props.setConfirmRidePanel(false);
            }
            }
                className=' absolute  top-0 text-center w-[93%]  text-3xl' >
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='text-2xl font-bold mb-5' >New Ride for you</h3>
            <div>
                <div className='flex justify-between items-center gap-3'>
                    <img className='h-16 rounded-full w-16' src="/images/user.png" alt="" />
                    <h2 className='text-lg font-medium '>shubham</h2>
                </div>
                <h5>2.4 KM</h5>
            </div>
            <div className='flex justify-between items-center flex-col' >
                 <div className='w-full mt-5'>
                    
                  <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                      <i className="ri-map-pin-2-fill"></i>
                    <div>
                       <h3 className='text-lg font-medium'>562/33-A</h3>
                       <p className='text-sm -mt-1'>jmit,radur</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
                      <i className="ri-map-pin-user-fill"></i>
                    <div>
                       <h3 className='text-lg font-medium'>562/33-A</h3>
                       <p className='text-sm -mt-1'>jmit,radur</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-5 p-3 '>
                      <i className="ri-currency-line"></i>
                    <div>
                       <h3 className='text-lg font-medium'>177</h3>
                       <p className='text-sm -mt-1'>cash cash</p>
                    </div>
                  </div>
                 
                 </div>
                 <button
                  className='w-full mt-5 bg-green-600 text-white font-semibold rounded-lg p-2'>Continue</button>
                 <button 
                 
                  className='w-full mt-1 bg-gray-300 text gray-700  font-semibold rounded-lg p-2'>ignore</button>
            </div>
        </>
  )
}

export default RidePopUp