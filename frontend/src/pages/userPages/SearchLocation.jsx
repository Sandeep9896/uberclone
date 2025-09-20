import React from 'react'
import debounce from "../../utils/debounce.js"
import FindRide from '../../components/userComponents/FindRide.jsx';
import { useState, useCallback } from "react"
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import fetchFare from '../../utils/fetchFare.js';
import LocationSearchPanel from '../../components/userComponents/LocationSearchPanel.jsx';
import { useNavigate } from 'react-router-dom';
import { setFareDetail, setPickupLocation, setDropLocation } from '../../slices/rideSlice.js';
const SearchLocation = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const userLocation = useSelector((state) => state.location.userLocation);
  const fareDetails = useSelector((state) => state.ride.fareDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const debouncedPickupHandler = useCallback(

    debounce(async (value) => {
    
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/maps/get-suggestions`,
            {
              params: { input: value, lng: userLocation.lng, lat: userLocation.lat },
              headers: { Authorization: `Bearer ${token}` }
            }
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
            `${import.meta.env.VITE_BACKEND_URL}/api/maps/get-suggestions`,
            {
              params: { input: value, lat: userLocation.lat, lng: userLocation.lng },
              headers: {
                Authorization: `Bearer ${token}`,
                'ngrok-skip-browser-warning': 'true'
              }
            }
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
  const findRide = async (e) => {
    e.preventDefault();
    if (!pickup || !destination) {
      alert("Please enter both pickup and destination locations.");
      return;
    }

    try {
      dispatch(setPickupLocation(pickup));
      dispatch(setDropLocation(destination));
      dispatch(setFareDetail(await fetchFare(pickup, destination)));
      // Navigate to ride options page after setting fare details
      navigate("/user/confirm-ride");
    } catch (error) {
      alert("Route does not exist or is not available");
      setDestination("");
      setPickup("");
      document.querySelector('input').focus();
    }
  };

  return (
    <>
      {/* <div className='h-1/3 ng-white ' > */}
      <FindRide

        pickup={pickup}
        destination={destination}
        pickupHandler={pickupHandler}
        destinationHandler={destinationHandler}
        findRide={findRide}
        setActiveInput={setActiveInput}
      />
      {/* </div> */}
      <div className=' bg-white h-2/3 '>

        <LocationSearchPanel
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



      </div>
    </>
  )
}

export default SearchLocation