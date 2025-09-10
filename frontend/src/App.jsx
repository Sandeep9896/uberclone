import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from '../pages/Start'
import UserLogin from '../pages/UserLogin'
import UserSignup from '../pages/UserSignup'
import CaptainLogin from '../pages/CaptainLogin'
import CaptainSignup from '../pages/CaptainSignup'
import UserProtectwrapper from '../pages/UserProtectwrapper'
import Home from '../pages/Home'
import UserLogout from '../pages/UserLogout.jsx'
import CaptainHome from '../pages/CaptainHome.jsx'
import CaptainProtectwrapper from '../pages/CaptainProtectwrapper.jsx'
import Riding from '../pages/Riding.jsx'
import CaptainLogout from '../pages/CaptainLogout.jsx'
import CaptainRiding from '../pages/CaptainRiding.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setCaptainLocation, setUserLocation } from './slices/locationSlice.js'
import { startLocationWatcher,stopLocationWatcher } from './utils/locationWatcher.jsx'
import { SocketContext } from '../context/SocketContext.jsx'
import { useEffect } from 'react'

const App = () => {
  const { user, role } = useSelector((state) => state.location?.Auth) || "";
  const { socket, sendMessage, receiveMessage } = React.useContext(SocketContext);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
     const watchId = startLocationWatcher({
        userType: role,
        userId: user._id,
        onUpdate: (payload, coords) => {
          
          if (role === "user") {
            sendMessage("update-location-user", payload);
            dispatch(setUserLocation(coords));
            console.log("User live location:", coords);
          }
          else if (role === "captain") {
            sendMessage("update-location-captain", payload);
            dispatch(setCaptainLocation(coords));
            console.log("Captain live location:", coords);
          }
        }
      } 
     )
    //  dispatch(stopLocationWatcher(watchId));
    }
    
  }, [user, role, sendMessage]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route path="/home" element={
          <UserProtectwrapper>
            <Home />
          </UserProtectwrapper>
        } />
        <Route path="/users/logout" element={
          <UserProtectwrapper>
            <UserLogout />
          </UserProtectwrapper>
        } />
        <Route path="/captain-home" element={
          <CaptainProtectwrapper>
            <CaptainHome />
          </CaptainProtectwrapper>} />
        <Route path="/captains/logout" element={
          <CaptainProtectwrapper>
            <CaptainLogout />
          </CaptainProtectwrapper>} />
      </Routes>


    </div>)
}


export default App