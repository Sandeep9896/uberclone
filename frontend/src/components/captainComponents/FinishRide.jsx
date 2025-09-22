import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LiveRoute from '../LiveRoute';
import PaymentSuccessModal from "../PaymentSuccessModal.jsx";
import { useSocket } from '../../context/SocketContext.jsx';
import { RiMapPinUserFill, RiCurrencyLine } from 'react-icons/ri';

const FinishRide = () => {
  const ride = useSelector((state) => state.ride.ride);
  const liveRoute = useSelector((state) => state.location.liveRoute);
  const { receiveMessage } = useSocket();
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("Finish Ride");
  const navigate = useNavigate();

  // Payment success listener
  useEffect(() => {
    const unsubscribe = receiveMessage('send_payment_success', async (data) => {
      console.log('Payment successful:', data);
      setShowModal(true);

      try {
        await axios.post(
          '/api/rides/captain-update-stats',
          {
            earnings: ride?.fare,
            distance: liveRoute?.ride?.distance,
            hoursOnline: liveRoute?.ride?.duration,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Earnings & distance sent successfully");
      } catch (error) {
        console.error("Failed to send earnings:", error);
      }
    });

    return () => unsubscribe();
  }, [ride, receiveMessage, liveRoute]);

  // Finish Ride button
  const completeRide = async (e) => {
    e.preventDefault();
    setButtonText("Waiting for payment...");

    try {
      await axios.post(
        '/api/rides/end-ride',
        { rideId: ride._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error completing ride:", error);
      setButtonText("Finish Ride");
    }
  };

  return (
    <div className="h-full w-full flex flex-col md:flex-row">
      {/* Modal */}
      <PaymentSuccessModal
        role={"captain"}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigate('/captain/home');
        }}
      />

      {/* Left: Live Route */}
      <div className="h-[30vh] md:h-full md:w-1/2 border-r">
        <LiveRoute />
      </div>

      {/* Right: Ride details */}
      <div className="flex-1 md:w-1/2 p-5 bg-white h-full">
        <h3 className="text-2xl font-bold mb-5">Finish this ride</h3>

        <div className="flex justify-between items-center mt-4 p-2 rounded-lg bg-yellow-500">
          <div className="flex items-center gap-3">
            <img className="h-16 w-16 rounded-full" src="/images/user.png" alt="" />
            <h2 className="text-lg font-medium">{ride?.user?.fullname?.firstname}</h2>
          </div>
          <h5>{ride?.distance}</h5>
        </div>

        <div className="flex flex-col mt-5 w-full">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
            <RiMapPinUserFill className="text-2xl" />
            <div>
              <h3 className="text-lg font-medium">Dropoff Location</h3>
              <p className="text-sm -mt-1">{ride?.dropLocation}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <RiCurrencyLine className="text-2xl" />
            <div>
              <h3 className="text-lg font-medium">{ride?.fare}</h3>
              <p className="text-sm -mt-1">Fare</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center w-full">
            <button
              onClick={completeRide}
              className="w-full p-3 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
