import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-[50vh] flex gap-2 items-center justify-center">
      <div className="w-2 h-5 animate-[ping_1.4s_linear_infinite] bg-sky-600"></div>
      <div className="w-2 h-5 animate-[ping_1.8s_linear_infinite] bg-sky-600"></div>
      <div className="w-2 h-5 animate-[ping_2s_linear_infinite] bg-sky-600"></div>
    </div>
  );
};

export default LoadingSpinner;
