"use client";

import * as React from "react";
import clsx from "clsx";

export function Button({
  variant = "contained",
  children,
  className,
  disabled = false,
  onClick,
}: {
  variant?: "text" | "contained" | "outlined";
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex animate-shimmer h-12 items-center justify-center rounded-md px-6 font-medium transition-colors focus:outline-none",
        {
          "bg-[linear-gradient(110deg,#1e88e5,45%,#fff,55%,#1e88e5)] bg-[length:200%_100%] text-white":
            variant === "contained",
          "bg-[linear-gradient(110deg,#fff,25%,#1e88e5,30%,#fff)] bg-[length:200%_100%] text-blue-600 hover:bg-[linear-gradient(110deg,#1e88e5,45%,#fff,55%,#1e88e5)]":
            variant === "outlined",
          "text-blue-600 hover:bg-slate-100": variant === "text",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
