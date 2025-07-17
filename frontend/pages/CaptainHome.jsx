import React from 'react'
import { Link } from 'react-router-dom';
import CaptainDetail from '../components/CaptainDetail';
import RidePopUp from '../components/RidePopUp';

const CaptainHome = () => {
  return (
    <div>
      <div className='h-screen w-full'>
        <div className='fixed w-full top-0 flex justify-between items-center p-5 '>
          <img className=' w-16 ' src="images\uber.png" alt="" />
          <Link to="/captains/logout" className='h-10 p-3 right-2 top-2 bg-white flex items-center justify-center rounded-full shadow-lg'>
            <i className="tetx-lg font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>
        <div className='h-3/5 '>
          <img className='h-full w-full object-cover' src="images/map.png" alt="" />
        </div>
        <div className='h-2/5 p-5'>
          <CaptainDetail />
        </div>
        <div className='fixed z-10 bottom-0  bg-white w-full px-3 py-6 pt-12'>
          <RidePopUp/>
        </div>

      </div>
    </div >
  )
}

export default CaptainHome 