import React,{useContext,useEffect } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetail from '../components/CaptainDetail';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePanel';
import gsap from 'gsap';
import{ useGSAP } from '@gsap/react';



const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = React.useState(false);
  const ridePopPanelRef = React.useRef(null);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = React.useState(false);
  const confirmRidePopupRef = React.useRef(null);


  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopPanelRef.current, {
        translateY: "0"
      });
    } else {
      gsap.to(ridePopPanelRef.current, {
        translateY: "100%"
      });
    }
  },[ridePopupPanel]);
  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupRef.current, {
        translateY: "0"
      });
    } else {
      gsap.to(confirmRidePopupRef.current, {
        translateY: "100%"
      });
    }
  },[confirmRidePopupPanel]);
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
        <div ref={ridePopPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
          <RidePopUp setRidePopupPanel={setRidePopupPanel}  setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
        </div>
        <div ref={confirmRidePopupRef} className='fixed z-10 h-screen bottom-0 translate-y-full justify-between bg-white w-full px-3 py-6 pt-12'>
          <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
        </div>

      </div>
    </div >
  )
}

export default CaptainHome 