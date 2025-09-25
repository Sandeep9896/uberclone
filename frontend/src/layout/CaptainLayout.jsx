// layouts/UserLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import LiveLocation from "../components/LiveLocation";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../slices/locationSlice.js";

export default function CaptainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { socket, sendMessage } = useContext(SocketContext);
  const captain = useSelector((state) => state.captain.captain);
  const dispatch = useDispatch();
  useEffect(() => {

    sendMessage("join", {
      userType: "captain",
      userId: captain?._id,
    });
  }, [sendMessage, captain]);

  return (
    <div className="flex relative flex-col h-screen overflow-hidden box-border">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-yellow-400 text-white relative z-5">
        {/* Logo */}
        <img src="/images/uber.png" alt="Logo" className="h-10" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/captain/home" className="hover:text-gray-300">Home</Link>
          <Link to="/captain/logout" className="hover:text-gray-300">Logout</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={!menuOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
        </button>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <div className="absolute top-14 right-4 bg-black text-white rounded-lg shadow-lg p-4 flex flex-col space-y-3 md:hidden">
            <Link to="/captain/home" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/captain/logout" onClick={() => setMenuOpen(false)}>Logout</Link>
          </div>
        )}
      </header>
      {/* Live Location */}
      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
