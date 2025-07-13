import React from 'react'

const home = () => {
  return (
    <div className='flex flex-col h-screen relative '> 
      <img className=' w-16 absolute left-5 top-5 '  src="images\uber.png" alt="" />
      <div className='h-screen w-screen '>
        {/* image for temprary use */}
        <img className='h-full w-full object-cover' src="images/map.png" alt="" />
      </div>
      <div className=' h-screen flex flex-col  justify-end absolute top-0 w-full '>
      <div className=' h-[30%] bg-white p-5 '>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form action="">
          <input type="text" placeholder='Enter your pickup location' className='bg-[#eee] text-base w-full rounded-lg py-2 px-12 mt-5' />
          <input type="text" placeholder='Enter your destination' className='bg-[#eee] text-base w-full  rounded-lg py-2 px-12 mt-5' />
        </form>
      </div>
      <div className='h-[70%] bg-yellow-100 hidden'>
  
      </div>
      </div>

    </div>
  )
}

export default home