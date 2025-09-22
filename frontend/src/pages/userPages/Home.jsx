import React, { useRef, useState, useContext, useEffect, } from 'react'
import FindRide from '../../components/userComponents/FindRide.jsx';
import { SocketContext } from '../../context/SocketContext.jsx';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { setAuth } from '../../slices/locationSlice.js';


// Debounce utility


const home = () => {

  const { socket, sendMessage } = useContext(SocketContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (socket && socket.connected && user) {
      sendMessage('join', { userType: 'user', userId: user._id });
    }
    const saved = localStorage.getItem("auth")
    dispatch(setAuth(saved ? JSON.parse(saved) : { user: null, role: null }));
  }, [socket, user]);





  return (
    <div className='w-full flex flex-col'>
      <FindRide
      />
    </div>
  )
}

export default home