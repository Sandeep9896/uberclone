import React, { useContext, useEffect, useRef, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import CaptainDetail from "../../components/captainComponents/CaptainDetail.jsx";
import RidePopUp from "../../components/captainComponents/RidePopUp.jsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SocketContext } from "../../context/SocketContext.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import AvailableRides from "../../components/captainComponents/AvailableRides.jsx";
const LiveLocation = lazy(() => import("../../components/LiveLocation.jsx"));
import { useDispatch } from "react-redux";
import { setRide } from "../../slices/rideSlice.js";
import { setAuth } from "../../slices/locationSlice.js";
import { RiArrowDownWideLine, RiMapPin2Fill, RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopPanelRef = useRef(null);
  const [AvailableRideData, setAvailableRideData] = useState([]);
  const AvailableRidesRef = useRef(null);
  const [AvailableRidepanel, setAvailableRidePanel] = useState(false);
  const { receiveMessage } = useContext(SocketContext);
  const captain = useSelector((state) => state.captain.captain);
  const captainLocation = useSelector((state) => state.location.captainLocation);
  const [alertnotify, setAlertNotify] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  receiveMessage("new-ride", (data) => {
    dispatch(setRide(data));
    setRidePopupPanel(true);
    setAvailableRidePanel(false);
  });
  useEffect(() => {
    receiveMessage("ride-notification", (data) => {
      setAlertNotify(true);
    });
  }, [receiveMessage]);
  if (alertnotify) {
    alert("New ride notification received");
    setTimeout(() => {
      setAlertNotify(false);
    }, 100);
  }
  // GSAP animations
  useGSAP(() => {
    if (AvailableRidesRef.current) {
      gsap.to(AvailableRidesRef.current, {
        translateY: AvailableRidepanel ? "0" : "100%",
        minHeight: AvailableRidepanel ? "90vh" : "0",
      });
    }
  }, [AvailableRidepanel]);

  useGSAP(() => {
    gsap.to(ridePopPanelRef.current, {
      translateY: ridePopupPanel ? "0" : "100%",
      display: ridePopupPanel ? "block" : "none",
    });
  }, [ridePopupPanel]);

  const handleRideSelect = (ride) => {
    dispatch(setRide(ride));
    setRidePopupPanel(true);
    setAvailableRidePanel(false);
  };

  

  const AvailableRide = async () => {
    setRidePopupPanel(false);
    setAvailableRidePanel(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rides/available-rides`,
        {
          userType: "captain",
          captainId: captain?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Available rides fetched:", res.data);
      setAvailableRideData(res.data.rides);
    } catch (error) {
      console.error("Error fetching available rides:", error);
    }
  };



  return (
    <div className="h-screen w-full relative md:flex md:flex-row md:justify-between md:gap-1 bg-gray-100">

      {/* Map section */}
      <Suspense fallback={<div>Loading map...</div>}>
        <div className="h-3/5 md:h-[80vh] md:w-[80%] md:my-10 m-auto relative z-0  ">
          <LiveLocation coords={captainLocation} />
        </div>
      </Suspense>

      {/* Bottom details */}
      <div className="h-2/5 relative z-10 p-5 bg-white shadow-xl  md:w-[80%] md:h-[70vh] md:my-10 md:mx-auto">
        <CaptainDetail
          AvailableRide={AvailableRide}
          setAvailableRidePanel={setAvailableRidePanel}
        />
      </div>

      {/* Available rides panel */}
      {AvailableRidepanel && (
        <div
          ref={AvailableRidesRef}
          className="absolute z-30 overflow-y-auto top-20 bg-white w-full h-fit px-3 py-6 pt-12 shadow-lg md:w-[80%] md:left-1/2 md:-translate-x-1/2"
        >
          <AvailableRides
            handleRideSelect={handleRideSelect}
            setRidePopupPanel={setRidePopupPanel}
            setAvailableRidePanel={setAvailableRidePanel}
            ride={AvailableRideData}
          />
        </div>
      )}

      {/* Ride popup */}
      <div
        ref={ridePopPanelRef}
        className="fixed z-30 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12 shadow-2xl md:w-[70%] md:mx-[280px]"
      >
        <h5
          onClick={AvailableRide}
           className="absolute top-0 left-1/2 -translate-x-1/2 mt-2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition md:w-[80%]"
        >
          <RiArrowDownWideLine />
        </h5>
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setAvailableRidePanel={setAvailableRidePanel}
        />
      </div>
      
    </div>
  );
};

export default CaptainHome;
