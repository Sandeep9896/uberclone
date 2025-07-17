import React from 'react'

const WaitingForDriver = (props) => {
  return (
  <>
            <h5 
            onClick={() => {
                props.setWaitingPanel(false);
            }
            }
                className=' absolute  top-0 text-center w-[93%]  text-3xl' >
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
           <div className='flex justify-between items-center' > 
            <img className='h-12' src="/images/car.webp" alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium'>sandeep</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>HR02 AP 1111</h4>
                <p className='text-sm text-gray-600'>Hyundai creta</p>
            </div>
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
                 
            </div>
        </>
  )
}

export default WaitingForDriver