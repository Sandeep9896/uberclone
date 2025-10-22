import React from "react";

function LoginLoading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        {/* Animated spinner */}
        <div className="w-12 h-12 border-4 border-blue-500  rounded-full animate-spin">
            
        </div>
        
        {/* Loading text */}
        <p className="mt-4 text-black text-lg font-semibold animate-pulse">
          Logging you in...
        </p>
      </div>
    </div>
  );
}

export default LoginLoading;    
