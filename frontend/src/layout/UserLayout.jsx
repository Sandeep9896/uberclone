// layouts/UserLayout.jsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LiveLocation from "../components/LiveLocation";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

export default function UserLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const userLocation = useSelector((state) => state.location.userLocation);
  const location = useLocation();
  const mapHeights = {
    "/user/home": "h-[65vh] ",
    "/user/rides": "h-1/4",
    "/user/profile": "h-1/2",
    "/user/confirm-ride": "h-[40vh]",
    "/user/riding": "hidden",
    "/user/search-Location": "hidden md:block",
  };

  const mapClass = mapHeights[location.pathname] || "h-1/3";


  return (
    <div className="flex flex-col h-screen overflow-hidden box-border">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-yellow-400 text-white relative z-5">
        {/* Logo */}
        <img src="/images/uber.png" alt="Logo" className="h-10" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/user/home" className="hover:text-gray-300">Home</Link>
          <Link to="/user/logout" className="hover:text-gray-300">Logout</Link>
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
            <Link to="/user/home" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/user/logout" onClick={() => setMenuOpen(false)}>Logout</Link>
          </div>
        )}
      </header>
      {/* Live Location */}
      <div className="md:flex  md:flex-row md:h-full">
        {/* Left Column (Map) */}
        <div className={`md:w-1/2 h-64 md:h-auto md:m-2 ${mapClass}`}>
          <LiveLocation coords={userLocation} />
        </div>

        {/* Right Column (Main Content) */}
        <main className="flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
