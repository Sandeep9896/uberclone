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
const App = () => {
  return (
   <div>
    <Routes>
      <Route path="/"   element={<Start/>} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/riding" element={<Riding />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-riding" element={<CaptainRiding />} />
      <Route path="/home"   element={
        <UserProtectwrapper>
          <Home />
        </UserProtectwrapper>
      } />
      <Route path="/users/logout"   element={
        <UserProtectwrapper>
          <UserLogout />
        </UserProtectwrapper>
      } />
      <Route path="/captain-home"   element={
        <CaptainProtectwrapper>
        <CaptainHome />
        </CaptainProtectwrapper>} />
      <Route path="/captains/logout"   element={
        <CaptainProtectwrapper>
        <CaptainLogout />
        </CaptainProtectwrapper>} />
      </Routes>   


</div>)
  }


export default App