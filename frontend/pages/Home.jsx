import React, { useRef, useState, useCallback, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VechilePanel from '../components/VechilePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDiver from '../components/LookingForDiver';
import WaitingForDriver from '../components/WaitingForDriver';
import FindRide from '../components/FindRide';
import { SocketContext } from '../context/SocketContext';
import { userdataContext } from '../context/Usercontext';


// Debounce utility
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const home = () => {

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vechilePanel, setVechilePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vechileFound, setVechileFound] = useState(false);
  const [waitingPanel, setWaitingPanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'destination'
  const [fareDetails, setFareDetails] = useState(null);
  const [rideDetails, setRideDetails] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [error, setError] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [isFareLoading, setIsFareLoading] = useState(false);
  const { socket, sendMessage, receiveMessage } = useContext(SocketContext);
  const { user } = useContext(userdataContext);

  useEffect(() => {
    if (socket && socket.connected && user) {
      sendMessage('join', { userType: 'user', userId: user._id });
    }
  }, [socket, user]);

  useEffect(() => {
    const unsubscribe = receiveMessage('confirm-ride', (data) => {
      console.log('Ride confirmed:', data);
      setVechileFound(false);
      setWaitingPanel(true);
      setRideDetails(data);

    });

    return () => {
      unsubscribe();
    };
  }, [receiveMessage]);



  // Debounced handlers
  const debouncedPickupHandler = useCallback(
    debounce(async (value) => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions?input=${value}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setPickupSuggestions(response.data.suggestions);
        }
      } catch (error) {
        console.error("Error fetching pickup suggestions:", error);
      }
    }, 400),
    []
  );

  const debouncedDestinationHandler = useCallback(
    debounce(async (value) => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions?input=${value}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setDestinationSuggestions(response.data.suggestions);
        }
      } catch (error) {
        console.error("Error fetching destination suggestions:", error);
      }
    }, 400),
    []
  );

  const pickupHandler = (value) => {
    setPickup(value);
    debouncedPickupHandler(value);
  };

  const destinationHandler = (value) => {
    setDestination(value);
    debouncedDestinationHandler(value);
  };

  const fetchFare = async () => {
    setIsFareLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/rides/get-fares`,
        {
          params: {
            pickupLocation: pickup,
            dropLocation: destination
          },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      setFareDetails(response.data);
      setIsFareLoading(false);
    } catch (err) {
      setError('Error fetching fare details. Please try again later.');
      setIsFareLoading(false);
      throw err;
    }
  };
  const findRide = async (e) => {
    e.preventDefault();
    if (!pickup || !destination) {
      alert("Please enter both pickup and destination locations.");
      return;
    }

    try {
      await fetchFare();
      setVechilePanel(true);
      setPanelOpen(false);

    } catch (error) {
      alert("Route does not exist or is not available");
      setDestination("");
      setPickup("");
      document.querySelector('input').focus();
    }
  };


  const createRide = async () => {
    console.log("Creating ride with vehicle type:", vehicleType);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rides/create-ride`,
        {
          pickupLocation: pickup,
          dropLocation: destination,
          vehicleType: vehicleType
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      console.log("Ride created successfully:", response.data);
      setRideDetails(response.data.ride);
      // Handle successful ride creation
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  const waitingPanelRef = useRef(null);
  const vechileFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vechilePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);


  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current,
        {
          height: "65%",
          padding: "24px 0",
          display: "block",
          zIndex: 10,

        });
      gsap.to(panelCloseRef.current, { opacity: 1 });

    }
    else {
      gsap.to(panelRef.current,
        {
          height: "0",
          padding: "0",
          display: "none"

        });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }

  }, [panelOpen]);

  useGSAP(() => {
    if (vechilePanel) {
      gsap.to(vechilePanelRef.current, {
        translateY: "0"
      });
    }
    else {
      gsap.to(vechilePanelRef.current, {
        translateY: "100%"
      });
    }
  }, [vechilePanel]);
  // For confirm ride panel
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        translateY: "0"
      });
    }
    else {
      gsap.to(confirmRidePanelRef.current, {
        translateY: "100%"
      });
    }
  }, [confirmRidePanel]);
  useGSAP(() => {
    if (vechileFound) {
      gsap.to(vechileFoundRef.current, {
        translateY: "0"
      });
    }
    else {
      gsap.to(vechileFoundRef.current, {
        translateY: "100%"
      });
    }
  }, [vechileFound]);
  useGSAP(() => {
    if (waitingPanel) {
      gsap.to(waitingPanelRef.current, {
        translateY: "0"
      });
    }
    else {
      gsap.to(waitingPanelRef.current, {
        translateY: "100%"
      });
    }
  }, [waitingPanel]);
  // Example where useMemo would help:
  const findRideParentRef = useRef(null);
  if(panelOpen){
    findRideParentRef.current.style.zIndex = "10";
  }

  return (
    <div className='flex flex-col h-screen relative overflow-hidden'>
      <div className='flex items-center flex-row justify-between z-2'>
        <img className=' w-16 absolute left-5 top-5 ' src="images\uber.png" alt="" />
        <Link onClick={() => console.log("Logging out...")} to="/users/logout" className='h-12 w-12 p-3 absolute right-2 top-5 bg-white flex items-center justify-center rounded-full shadow-lg'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-screen w-screen  '>
        {/* image for temprary use */}
        <img className='h-full w-full object-cover' src="images/map.png" alt="" />
      </div>
     

      <div ref={findRideParentRef} className=' h-screen flex flex-col  justify-end absolute top-0 w-full  '>
        <FindRide
          setPanelOpen={setPanelOpen}
          pickup={pickup}
          destination={destination}
          pickupHandler={pickupHandler}
          destinationHandler={destinationHandler}
          findRide={findRide}
          setActiveInput={setActiveInput}
          setPickupSuggestions={setPickupSuggestions}
          setDestinationSuggestions={setDestinationSuggestions}
          panelOpen={panelOpen}
          panelCloseRef={panelCloseRef}
        />
        <div ref={panelRef} className=' bg-white  '>

          {panelOpen &&
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              fare={fareDetails}
              suggestions={activeInput === 'pickup' ? pickupSuggestions : destinationSuggestions}
              onSelect={(location) => {
                if (activeInput === 'pickup') {
                  setPickup(location.address || location.name);
                  setPickupSuggestions([]);
                } else {
                  setDestination(location.address || location.name);
                  setDestinationSuggestions([]);
                }
              }}
            />
          }


        </div>
      </div>
      <div ref={vechilePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <VechilePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVechilePanel={setVechilePanel}
          setVehicleType={setVehicleType}
          setVehicleImage={setVehicleImage}
          fare={fareDetails}
        />
      </div>
      <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVechileFound={setVechileFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fareDetails}
          vehicleImage={vehicleImage}
          vehicleType={vehicleType}
        />
      </div>
      <div ref={vechileFoundRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <LookingForDiver
          setConfirmRidePanel={setConfirmRidePanel}
          setVechilePanel={setVechilePanel}
          ride={rideDetails}
          setVechileFound={setVechileFound}
          setWaitingPanel={setWaitingPanel}
        />
      </div>
      <div ref={waitingPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingPanel={setWaitingPanel} ride={rideDetails} />
      </div>

    </div>
  )
}

export default home