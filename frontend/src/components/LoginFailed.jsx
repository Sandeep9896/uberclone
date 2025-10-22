import React from "react";

function LoginFailedModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
      {/* Modal box */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center animate-fadeIn">
        <h2 className="text-xl font-bold text-red-600 mb-3">Login Failed</h2>
        <p className="text-gray-700 mb-5">Invalid username or password. Please try again.</p>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default LoginFailedModal;
