import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-24 h-24 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;