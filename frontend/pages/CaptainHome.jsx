import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetail from "../components/CaptainDetail";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePanel";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";
import axios from "axios";
import AvailableRides from "../components/AvailableRides.jsx";
import LiveLocation from "../components/LiveLocation.jsx";
import { LocationContext } from "../context/LocationContext.jsx";
import LiveRoute from "../components/LiveRoute.jsx";
const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopPanelRef = useRef(null);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupRef = useRef(null);
  const [rideDetail, setRideDetail] = useState([]);
  const [rides, setRides] = useState([]);
  const AvailableRidesRef = useRef(null);
  const [AvailableRidepanel, setAvailableRidePanel] = useState(false);
  const liveRouteRef = useRef(null);
  const { sendMessage, receiveMessage, socket } = useContext(SocketContext);
  const captain = useSelector((state) => state.captain.captain);
  const [liveRoute, setLiveRoute] = useState([]);
  const { setCaptainCoords, captainCoords, userCoords } = useContext(LocationContext);
  const [liveRoutePopup, setLiveRoutePopup] = useState(false);

  // join as captain + send location

  useEffect(() => {
    sendMessage("join", {
      userType: "captain",
      userId: captain?._id,
    });
    if (!socket || !captain?._id) return;

    // Start watching
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const payload = {
          userType: "captain",
          userId: captain._id,
          location: { lat: latitude, lng: longitude },
        };

        console.log("Captain live location:", userCoords);

        sendMessage("update-location-captain", payload);
        setCaptainCoords({ lat: latitude, lng: longitude });

      },
      (err) => {
        console.error("Captain geolocation error:", err);
      },
      {
        enableHighAccuracy: true, // use GPS if available
        timeout: 20000,           // wait up to 20s before failing
        maximumAge: 0,            // don’t use cached location
      }
    );
    // Cleanup when component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, [socket, captain?._id]);

  // available rides
  useEffect(() => {
    receiveMessage("AvailableRides", (data) => {
      console.log("Available rides received:", data);
      setRides(data);
    });
  }, [receiveMessage]);

  receiveMessage("new-ride", (data) => {
    setRideDetail(data);
    setRidePopupPanel(true);
    setAvailableRidePanel(false);
  });

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
     else{
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
    setRideDetail(ride);
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

  const liveLocation = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/rides/live-route`, {
        rideId: rideDetail._id,
        captainId: captain._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      setLiveRoute(res.data);
      console.log("Live route data:", res.data);
    } catch (error) {
      console.error("Error fetching live location:", error);
    }

  }

  return (
    <div className="h-screen w-full relative">
      {/* Header */}
      <div className="fixed z-20 w-full top-0 flex justify-between items-center p-5">
        <img className="w-16" src="images/uber.png" alt="" />
        <Link
          to="/captains/logout"
          className="h-10 p-3 right-2 top-2 bg-white flex items-center justify-center rounded-full shadow-lg"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map section */}
      <div className="h-3/5 relative z-0">
        <LiveLocation coords={captainCoords} />
      </div>

      {/* Bottom details */}
      <div className="h-2/5 relative z-10 p-5 bg-white shadow-xl">
        <CaptainDetail
          AvailableRide={AvailableRide}
          setAvailableRidePanel={setAvailableRidePanel}
        />
      </div>

      {/* Available rides panel */}
      {AvailableRidepanel && (
        <div
          ref={AvailableRidesRef}
          className="absolute z-30 overflow-y-auto top-20 bg-white w-full h-fit px-3 py-6 pt-12 shadow-lg"
        >
          <AvailableRides
            handleRideSelect={handleRideSelect}
            setRidePopupPanel={setRidePopupPanel}
            setAvailableRidePanel={setAvailableRidePanel}
            ride={rides}
            confirmRide={confirmRide}
          />
        </div>
      )}

      {/* Ride popup */}
      <div
        ref={ridePopPanelRef}
        className="fixed z-30 bottom-0 translate-y-full bg-white w-full px-3 py-6 pt-12 shadow-2xl"
      >
        <h5
          onClick={AvailableRide}
          className="absolute top-0 text-center w-[93%] text-3xl z-50 cursor-pointer"
        >
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          // setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          liveLocation={liveLocation}
          setLiveRoutePopup={setLiveRoutePopup}
          rideDetail={rideDetail}
          confirmRide={confirmRide}
        />
      </div>
      {liveRoute && (
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
      }

      {/* Confirm ride popup */}
      <div
        ref={confirmRidePopupRef}
        className="fixed z-40 h-screen bottom-0 translate-y-full justify-between bg-white w-full px-3 py-6 pt-12 shadow-2xl"
      >
        <ConfirmRidePopUp
          rideDetail={rideDetail}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setLiveRoutePopup={setLiveRoutePopup}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
