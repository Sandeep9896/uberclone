import React, { useRef, useState, useContext, useEffect, lazy, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import FindRide from '../../components/userComponents/FindRide.jsx';
import { SocketContext } from '../../context/SocketContext.jsx';
// import LiveLocation from '../../components/LiveLocation.jsx';
const LiveLocation = lazy(() => import('../../components/LiveLocation.jsx'));
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { setAuth } from '../../slices/locationSlice.js';


// Debounce utility


const home = () => {

  const { socket, sendMessage } = useContext(SocketContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userLocation = useSelector((state) => state.location.userLocation);

  useEffect(() => {
    if (socket && socket.connected && user) {
      sendMessage('join', { userType: 'user', userId: user._id });
    }
    const saved = localStorage.getItem("auth")
    dispatch(setAuth(saved ? JSON.parse(saved) : { user: null, role: null }));
  }, [socket, user]);





  return (
    <div className='w-full flex flex-col'>
      <Suspense fallback={<div>Loading map...</div>}>
        <div className='h-[60vh]'>
          <LiveLocation coords={userLocation} />
        </div>
      </Suspense>
      <FindRide
      />

    </div>
  )
}

export default home