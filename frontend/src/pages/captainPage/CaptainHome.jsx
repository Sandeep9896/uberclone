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
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupRef = useRef(null);
  const rideDetail = useSelector((state) => state.ride.ride);
  const [AvailableRideData, setAvailableRideData] = useState([]);
  const AvailableRidesRef = useRef(null);
  const [AvailableRidepanel, setAvailableRidePanel] = useState(false);
  const liveRouteRef = useRef(null);
  const { sendMessage, receiveMessage, socket } = useContext(SocketContext);
  const captain = useSelector((state) => state.captain.captain);
  const captainLocation = useSelector((state) => state.location.captainLocation);
  const liveRoute = useSelector((state) => state.location.liveRoute);
  const [liveRoutePopup, setLiveRoutePopup] = useState(false);
  const [alertnotify, setAlertNotify] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {

    sendMessage("join", {
      userType: "captain",
      userId: captain?._id,
    });
    const saved = localStorage.getItem("auth")
    dispatch(setAuth(saved ? JSON.parse(saved) : { user: null, role: null }));
  }, [sendMessage, captain]);

  // available rides
  useEffect(() => {
    receiveMessage("AvailableRides", (data) => {
      console.log("Available rides received:", data);
      setAvailableRideData(data);
    });
  }, [receiveMessage]);

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
    if (liveRoutePopup) {
      gsap.to(liveRouteRef.current, {
        translateY: liveRouteRef.current ? "0" : "100%",
        minHeight: liveRouteRef.current ? "90vh" : "0",
      });
    }
    else {
      gsap.to(liveRouteRef.current, {
        translateY: "100%",
        minHeight: "0",
      });
    }
  }, [liveRoutePopup]);

  useGSAP(() => {
    gsap.to(ridePopPanelRef.current, {
      translateY: ridePopupPanel ? "0" : "100%",
      display: ridePopupPanel ? "block" : "none",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupRef.current, {
      translateY: confirmRidePopupPanel ? "0" : "100%",
    });
  }, [confirmRidePopupPanel]);

  const handleRideSelect = (ride) => {
    dispatch(setRide(ride));
    setRidePopupPanel(true);
    setAvailableRidePanel(false);
  };

  const confirmRide = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rides/confirm`,
        { rideId: rideDetail._id, captainId: captain._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/captain/rides");
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
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
            confirmRide={confirmRide}
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
          confirmRide={confirmRide}
          setRidePopupPanel={setRidePopupPanel}
          setAvailableRidePanel={setAvailableRidePanel}
        />
      </div>
      {/* {liveRoute && (
        <div
          ref={liveRouteRef}
          className="fixed z-40 h-screen bottom-0 translate-y-full justify-between bg-white w-full  py-6 pt-12 shadow-2xl"
        >
          <LiveRoute
            liveRoute={liveRoute}
            setLiveRoutePopup={setLiveRoutePopup}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
          />
        </div>)
      } */}

      {/* Confirm ride popup */}
      {/* <div
        ref={confirmRidePopupRef}
        className="fixed z-40 h-screen bottom-0 translate-y-full justify-between bg-white w-full px-3 py-6 pt-12 shadow-2xl"
      >
        <ConfirmRidePopUp
          rideDetail={rideDetail}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setLiveRoutePopup={setLiveRoutePopup}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div> */}
    </div>
  );
};

export default CaptainHome;
