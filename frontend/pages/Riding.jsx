import React from 'react'
import { Link } from 'react-router-dom';

const Riding = () => {
    return (
        <div className='h-screen w-full'>
            <Link to="/home" className=' fixed h-10 p-3 right-2 top-2 bg-white flex items-center justify-center rounded-full shadow-lg'>
                <i className="tetx-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2 '>
                <img className='h-full w-full object-cover' src="images/map.png" alt="" />
            </div>
            <div className='h-1/2 p-5'>
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
            <button onClick={
                () => {
                    // Handle ride completion logic here
                    alert("Ride completed!");
                }
            } className='w-full mt-5 bg-green-600 rounded-lg p-2'>Make a Payment</button>
        </div>
        </div>
    )
}

export default Riding