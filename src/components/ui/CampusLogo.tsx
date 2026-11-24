import React from "react";
import Link from "next/link";

interface CampusLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  light?: boolean;
}

export const CampusLogo: React.FC<CampusLogoProps> = ({
  className = "",
  size = "md",
  showTagline = false,
  light = false,
}) => {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group transition-transform ${className}`}>
      {/* Connected-Loop Vector Concept */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform group-hover:scale-105"
        >
          {/* Outer Interconnected Loop A (Navy) */}
          <path
            d="M16 12C9.37 12 4 17.37 4 24C4 30.63 9.37 36 16 36C22.63 36 26 28 32 28C38.63 28 44 22.63 44 16C44 9.37 38.63 4 32 4C25.37 4 22 12 16 12Z"
            stroke={light ? "#38BDF8" : "#142B49"}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-90"
          />
          {/* Intersecting Loop B (Teal) */}
          <path
            d="M32 36C38.63 36 44 30.63 44 24C44 17.37 38.63 12 32 12C25.37 12 22 20 16 20C9.37 20 4 25.37 4 32C4 38.63 9.37 44 16 44C22.63 44 26 36 32 36Z"
            stroke="#16A085"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Core Campus Pulse Node */}
          <circle cx="24" cy="24" r="3.5" fill="#16A085" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-tight font-sans ${textSizes[size]} ${
            light ? "text-white" : "text-campus-navy"
          }`}
        >
          Campus<span className="text-campus-teal">Loop</span>
        </span>
        {showTagline && (
          <span
            className={`text-[10px] tracking-wide font-medium uppercase ${
              light ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Everything on Campus, Connected
          </span>
        )}
      </div>
    </Link>
  );
};
