import React from "react";
import axios from 'axios';
import { useSocket } from "../context/SocketContext";
import {useSelector} from 'react-redux';
export default function CheckoutRazorpay(props) {
  const { sendMessage } = useSocket();
  const rideDetail = useSelector((state) => state.ride.ride);
  const handlePayment = async () => {
    // 1. Create order from backend
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/orders`, {
      amount: props.amount,
    });

    const order = res.data;

    // 2. Razorpay options
    const options = {
      key: "rzp_test_REfBuIhVuWnurt", // frontend key (not secret)
      amount: order.amount,
      currency: order.currency,
      name: "Uber",
      description: "Ride Payment",
      order_id: order.id,
      handler: async function (response) {
        // 3. Verify payment with backend
        // const verifyRes = await fetch("http://localhost:4000/api/payment/verify", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     order_id: order.id,
        //     payment_id: response.razorpay_payment_id,
        //     signature: response.razorpay_signature,
        //   }),
        // });
        const verifyRes= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`, {
          order_id: order.id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });

        const verifyData = verifyRes.data;
        if (verifyData.success) {
          // Notify server about successful payment
          sendMessage("payment_success", { rideId: rideDetail._id });
          // alert("✅ Payment Successful!");
        } else {
          alert("❌ Payment Verification Failed!");
        }
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
    >
      Pay with Razorpay
    </button>
  );
}
