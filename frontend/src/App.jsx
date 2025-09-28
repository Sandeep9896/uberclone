import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/userPages/UserLogin.jsx'
import UserSignup from './pages/userPages/UserSignup.jsx'
import CaptainLogin from './pages/captainPage/CaptainLogin.jsx'
import CaptainSignup from './pages/captainPage/CaptainSignup.jsx'
import UserProtectwrapper from './pages/userPages/UserProtectwrapper.jsx'
import Home from './pages/userPages/Home.jsx'
import UserLogout from './pages/userPages/UserLogout.jsx'
import CaptainHome from './pages/captainPage/CaptainHome.jsx'
import CaptainProtectwrapper from './pages/captainPage/CaptainProtectwrapper.jsx'
import CaptainLogout from './pages/captainPage/CaptainLogout.jsx'
// import CaptainRiding from './pages/captainPage/FinishRide1.jsx'
import CaptainRiding from './pages/captainPage/CaptainRiding.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setCaptainLocation, setUserLocation, setWatchId, setLiveRoute } from './slices/locationSlice.js'
import { startLocationWatcher, } from './utils/locationWatcher.jsx'
import { SocketContext } from './context/SocketContext.jsx'
import { useEffect } from 'react'
import SearchLocation from './pages/userPages/SearchLocation.jsx'
import UserLayout from './layout/UserLayout.jsx'
import UserConfirmRide from './pages/userPages/UserConfirmRide.jsx'
import Riding from './pages/userPages/Riding.jsx'
import CaptainLayout from './layout/CaptainLayout.jsx'
import { setAuth } from './slices/locationSlice.js';

const App = () => {
  useEffect(() => {
    const saved = localStorage.getItem("auth")
    dispatch(setAuth(saved ? JSON.parse(saved) : { user: null, role: null }));
  }, []);
  const { user, role } = useSelector((state) => state.location?.Auth) || "";
  const { socket, sendMessage, receiveMessage } = React.useContext(SocketContext);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user || !role) return;

    // Live Route listener
    const unsubscribeLive = receiveMessage("live-route", (data) => {
      dispatch(setLiveRoute(data));
    });

    // Start watching
    const watchId = startLocationWatcher({
      userType: role,
      userId: user._id,
      onUpdate: (payload, coords) => {
        if (role === "user") {
          sendMessage("update-location-user", payload);
          dispatch(setUserLocation(coords));
          console.log("User location updated:", role, coords);
        } else if (role === "captain") {
          sendMessage("update-location-captain", payload);
          dispatch(setCaptainLocation(coords));
        }
      },
    });

    dispatch(setWatchId(watchId));

    // Cleanup on unmount or user/role change
    return () => {
      unsubscribeLive();
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [user, role, sendMessage, dispatch, receiveMessage]);


  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/user" element={<UserLayout />}>
          <Route path="home" element={<UserProtectwrapper><Home /></UserProtectwrapper>} />
          <Route path="search-Location" element={<UserProtectwrapper><SearchLocation /></UserProtectwrapper>} />
          <Route path="confirm-Ride" element={<UserProtectwrapper><UserConfirmRide /></UserProtectwrapper>} />
          <Route path="riding" element={<UserProtectwrapper><Riding /></UserProtectwrapper>} />
        </Route>
        <Route path="/logout" element={<UserProtectwrapper><UserLogout /></UserProtectwrapper>} />

        {/* Captain Routes */}
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain" element={<CaptainLayout />} >
          <Route path="home" element={<CaptainProtectwrapper><CaptainHome /></CaptainProtectwrapper>} />
          <Route path="rides" element={<CaptainProtectwrapper><CaptainRiding /></CaptainProtectwrapper>} />
        </Route>
        <Route path="/captain/logout" element={<CaptainProtectwrapper><CaptainLogout /></CaptainProtectwrapper>} />


      </Routes>


    </div>)
}


export default App