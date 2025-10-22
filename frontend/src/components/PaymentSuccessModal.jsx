import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccessModal({ role, isOpen, onClose }) {
  const navigate = useNavigate();
const [countdown, setCountdown] = React.useState(10);
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        navigate(`/${role}/home`); // redirect to home
        
        if (onClose) onClose();
      }, 10000);
      const interval = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isOpen, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-700 mb-2">
          Thank you, <span className="font-semibold">{role}</span>!
        </p>
        <p className="text-gray-500">
          You will be redirected to the home page in {countdown} seconds.
        </p>

        <button
          onClick={() => {
            if (onClose) onClose();
            window.location.href = `/${role}/home`;
          }}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Go Now
        </button>
      </div>
    </div>
  );
}
