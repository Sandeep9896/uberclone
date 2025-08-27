import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetail from '../components/CaptainDetail';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePanel';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SocketContext } from '../context/SocketContext';
import { captaindataContext } from '../context/CaptainContext.jsx';
import { Socket } from 'socket.io-client';
import axios from 'axios';
import AvailableRides from '../components/AvailableRides.jsx';



const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = React.useState(false);
  const ridePopPanelRef = React.useRef(null);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = React.useState(false);
  const confirmRidePopupRef = React.useRef(null);
  const [rideDetail, setRideDetail] = React.useState([]);
  const [rides, setRides] = React.useState([]);
  const AvailableRidesRef = React.useRef(null);
  const [AvailableRidepanel, setAvailableRidePanel] = React.useState(false);

  const { sendMessage, receiveMessage, socket } = useContext(SocketContext);
  const { captain } = useContext(captaindataContext);

  useEffect(() => {
    sendMessage('join', {
      userType: 'captain',
      userId: captain?._id
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const payload = {
            userType: 'captain',
            userId: captain?._id,
            location: { lat: latitude, lng: longitude }
          };
          console.log('Emitting update-location-captain event:', payload);
          sendMessage('update-location-captain', payload);
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 600000); // Update location every 10 minutes

    return () => {
      clearInterval(locationInterval);
    };
  }, [socket]);

  receiveMessage('AvailableRides', (data) => {
    setRides(data);
  });
  receiveMessage('new-ride', (data) => {
    setRideDetail(data);
    setRidePopupPanel(true);
    setAvailableRidePanel(false);
  });


  useGSAP(() => {
    if (AvailableRidesRef.current) {
      if (AvailableRidepanel) {
        gsap.to(AvailableRidesRef.current, {
          translateY: "0",
          minHeight: "90vh"
        });
      } else {
        gsap.to(AvailableRidesRef.current, {
          translateY: "100%"
        });
      }
    }
  }, [AvailableRidepanel]);

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopPanelRef.current, {
        translateY: "0",
        display: "block"

      });
    } else {
      gsap.to(ridePopPanelRef.current, {
        translateY: "100%",
        display: "none"
      });
    }
  }, [ridePopupPanel]);
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
  }, [confirmRidePopupPanel]);

  const handleRideSelect = (ride) => {
    setRideDetail(ride);
    setRidePopupPanel(true);
    setAvailableRidePanel(false);
  };


  const confirmRide = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/rides/confirm`, {
        rideId: rideDetail._id,
        captainId: captain._id
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  };

  const AvailableRide = async() => {
    console.log("AvailableRide function called"); // <-- put BEFORE setState
    setRidePopupPanel(false);
    setAvailableRidePanel(true);
    // sendMessage('get-available-rides', {
    //   userType: 'captain',
    //   userId: captain?._id
    // });
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/rides/available-rides`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    }
    catch (error) {
      console.error('Error fetching available rides:', error);
    }
  };


return (
  <div>
    <div className='h-screen w-full '>
      <div className='fixed w-full top-0 flex justify-between items-center p-5 '>
        <img className=' w-16 ' src="images\uber.png" alt="" />
        <Link to="/captains/logout" className='h-10 p-3 right-2 top-2 bg-white flex items-center justify-center rounded-full shadow-lg'>
          <i className="tetx-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5 '>
        <img className='h-full w-full object-cover' src="images/map.png" alt="" />
      </div>
      <div className='h-2/5 p-5 overflow-hidden'>
        <CaptainDetail AvailableRide={AvailableRide} setAvailableRidePanel={setAvailableRidePanel} />
      </div>
      {AvailableRidepanel && (
        <div ref={AvailableRidesRef} className='absolute  overflow-y-auto z-10 top-20  bg-white w-full h-fit px-3 py-6 pt-12'>
          <AvailableRides handleRideSelect={handleRideSelect} setRidePopupPanel={setRidePopupPanel} setAvailableRidePanel={setAvailableRidePanel} ride={rides} confirmRide={confirmRide} />
        </div>
      )}
      <div ref={ridePopPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>

        <h5
          onClick={() => {
            AvailableRide();
          }}
          className=' absolute  top-0 text-center w-[93%]  text-3xl z-50 cursor-pointer' >
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} rideDetail={rideDetail} confirmRide={confirmRide} />
      </div>
      <div ref={confirmRidePopupRef} className='fixed z-10 h-screen bottom-0 translate-y-full justify-between bg-white w-full px-3 py-6 pt-12'>
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>

    </div>
  </div >
)
}

export default CaptainHome