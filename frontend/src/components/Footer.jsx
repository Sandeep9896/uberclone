import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 absolute bottom-0 left-0 right-0 text-gray-300 py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} YourApp. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
