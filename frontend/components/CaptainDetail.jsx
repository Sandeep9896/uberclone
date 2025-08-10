import React from 'react'

const CaptainDetail = (props) => {
  return (
   <>
    <div className='flex justify-between items-center'>
          <div className='flex justify-between items-center gap-3'>
            <img className='w-16 rounded-full object-cover' src="/images/user.png" alt="" />
            <h4 className='text-lg font-medium'>{props.captain.fullname}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold '>{props.captain.earnings}</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>

        </div>
        <div  className='flex item-start p-5 mt-4 bg-gray-100 rounded-lg gap-5 justify-center'>
          <div className='text-center' >
            <i className=" text-3xl font-thin ri-pin-distance-fill"></i>
            <h5 className='text-lg font-medium'>{props.captain.hoursOnline}</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
            </div>
          <div  className='text-center'>
            <i className=" text-3xl font-thin ri-speed-up-fill"></i>
            <h5 className='text-lg font-medium'>{props.captain.speed}</h5>
            <p className='text-sm text-gray-600'>Speed</p>
            </div>
          <div  className='text-center'>
            <i className=" text-3xl font-thin ri-book-line"></i>
            <h5 className='text-lg font-medium'>{props.captain.rating}</h5>
            <p className='text-sm text-gray-600'>Rating</p>
            </div>
        </div>
   </>
  )
}

export default CaptainDetail