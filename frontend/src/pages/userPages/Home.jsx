import React, { useRef, useState, useContext, useEffect, } from 'react'
import FindRide from '../../components/userComponents/FindRide.jsx';
import { SocketContext } from '../../context/SocketContext.jsx';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';



// Debounce utility


const home = () => {

  const { socket, sendMessage } = useContext(SocketContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  





  return (
    <div className=' w-full h-full ' >

    <div className='w-full h-full flex flex-col'>
      <FindRide
      />
    </div>
    </div>
  )
}

export default home