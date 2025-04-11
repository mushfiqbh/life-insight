"use client";

import React, { useEffect, useState } from "react";

const COUNTDOWN_DURATION = 15; // seconds
const COOLDOWN_DURATION = 15 * 60 * 1000; // 15 minutes in ms

const LoadingSpinner = () => {
  const [seconds, setSeconds] = useState(COUNTDOWN_DURATION);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("lastCountdownShown");
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown) > COOLDOWN_DURATION) {
      setShowCountdown(true);
      localStorage.setItem("lastCountdownShown", now.toString());

      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowCountdown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <div className="w-2 h-5 animate-[ping_1.4s_linear_infinite] bg-sky-600"></div>
        <div className="w-2 h-5 animate-[ping_1.8s_linear_infinite] bg-sky-600"></div>
        <div className="w-2 h-5 animate-[ping_2s_linear_infinite] bg-sky-600"></div>
      </div>
      {showCountdown && (
        <p className="text-sm text-gray-600">
          Please wait for the (free) server to connect... {seconds}s
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
