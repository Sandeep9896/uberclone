<<<<<<< HEAD
import React, { useRef, useState, useCallback } from 'react'
import axios from 'axios';
=======
import React, { useRef } from 'react'
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VechilePanel from '../components/VechilePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDiver from '../components/LookingForDiver';
import WaitingForDriver from '../components/WaitingForDriver';

<<<<<<< HEAD
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
    } catch (err) {
      setError('Error fetching fare details. Please try again later.');
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
=======
const home = () => {
  const [pickup, setPickup] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [panelOpen, setPanelOpen] = React.useState(false);
  const [vechilePanel, setVechilePanel] = React.useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = React.useState(false);
  const [vechileFound, setVechileFound] = React.useState(false);
  const [waitingPanel, setWaitingPanel] = React.useState(false);
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b

  const waitingPanelRef = useRef(null);
  const vechileFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vechilePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
<<<<<<< HEAD



=======
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
  const submitHandler = (e) => {
    e.preventDefault();
  }
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current,
        {
          height: "70%",
          padding: "24px 0",
          display: "block"

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
  return (
    <div className='flex flex-col h-screen relative overflow-hidden'>
      <img className=' w-16 absolute left-5 top-5 ' src="images\uber.png" alt="" />
      <div className='h-screen w-screen '>
        {/* image for temprary use */}
        <img className='h-full w-full object-cover' src="images/map.png" alt="" />
      </div>
      <div className=' h-screen flex flex-col  justify-end absolute top-0 w-full '>
        <div className=' h-[30%] bg-white p-5 relative '>
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }
            }
            className=' absolute right-2 top-6 text-2xl' >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form action="" onSubmit={(e) => {
            submitHandler(e);
          }

          } >
            <div className="line h-20 w-1 top-[43%] left-10  absolute bg-gray-700 rounded-full  "></div>
<<<<<<< HEAD
            <input
              type="text"
              value={pickup}
              onChange={(e) => pickupHandler(e.target.value)}
              required
              onClick={() => {
                setPanelOpen(true);
                setActiveInput('pickup');
              }}
              placeholder='Enter your pickup location'
              className='bg-[#eee] text-base w-full rounded-lg py-2 px-12 mt-5'
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => destinationHandler(e.target.value)}
              onClick={() => {
                setPanelOpen(true);
                setActiveInput('destination');
              }}
              required
              placeholder='Enter your destination'
              className='bg-[#eee] text-base w-full  rounded-lg py-2 px-12 mt-5'
            />
            {pickup && destination && panelOpen ?
              <button
                onClick={() => {
                  fetchFare();
                  if (fareDetails) {
                    setVechilePanel(true);
                    setPanelOpen(false);
                  }
                  else{
                    alert("Route does not exist or is not available")
                    setDestination("");
                    setPickup("");
                    document.querySelector('input').focus();
                  }

                }}
                className='bg-black text-white w-full rounded-lg py-2 mt-5'>
                Find a ride
              </button>
              : null}

=======
            <input type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
              onClick={() => {
                setPanelOpen(true);
              }
              }
              placeholder='Enter your pickup location'
              className='bg-[#eee] text-base w-full rounded-lg py-2 px-12 mt-5' />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => {
                setPanelOpen(true);
              }}
              required
              placeholder='Enter your destination'
              className='bg-[#eee] text-base w-full  rounded-lg py-2 px-12 mt-5' />
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
          </form>
        </div>
        <div ref={panelRef} className=' bg-white '>

<<<<<<< HEAD
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

=======
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVechilePanel={setVechilePanel} />
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b

        </div>
      </div>
      <div ref={vechilePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
<<<<<<< HEAD
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
=======
        <VechilePanel setConfirmRidePanel={setConfirmRidePanel} setVechilePanel={setVechilePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVechileFound={setVechileFound} />
      </div>
      <div ref={vechileFoundRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <LookingForDiver setConfirmRidePanel={setConfirmRidePanel} setVechilePanel={setVechilePanel} setVechileFound={setVechileFound} setWaitingPanel={setWaitingPanel} />
>>>>>>> 45f6ed8015be2c9e3625d45edec2e9519015f56b
      </div>
      <div ref={waitingPanelRef} className='fixed z-10 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingPanel={setWaitingPanel} />
      </div>

    </div>
  )
}

export default home