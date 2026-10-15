"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

interface LogoProps {
  className?: string;
  variant?: "full" | "compact" | "white" | "badge";
  size?: "sm" | "md" | "lg";
}

export default function SankalpLogo({
  className = "",
  variant = "full",
  size = "md",
}: LogoProps) {
  const { lang } = useLanguage();

  const iconSizes = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const isWhite = variant === "white";

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* SVG Emblem matching the brochure emblem */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]} rounded-full bg-white shadow-sm border border-teal-100 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          {/* Subtle Outer Circle */}
          <circle cx="50" cy="50" r="47" stroke="#0d9488" strokeWidth="2.5" strokeDasharray="4 2" />
          <circle cx="50" cy="50" r="43" fill="#f0fdfa" />

          {/* Central Person / Family Figure (Teal) */}
          {/* Head 1 (Center adult) */}
          <circle cx="50" cy="28" r="6" fill="#0d9488" />
          {/* Torso & Uplifted Arms */}
          <path
            d="M50 36 C42 36 37 43 35 52 C41 48 46 47 50 47 C54 47 59 48 65 52 C63 43 58 36 50 36 Z"
            fill="#0d9488"
          />

          {/* Left Person (Smaller child/patient) */}
          <circle cx="39" cy="42" r="3.5" fill="#14b8a6" />
          <path
            d="M39 47 C34 47 31 52 30 58 C34 56 38 56 41 57 C41 52 40 47 39 47 Z"
            fill="#14b8a6"
          />

          {/* Right Person (Smaller child/patient) */}
          <circle cx="61" cy="42" r="3.5" fill="#14b8a6" />
          <path
            d="M61 47 C66 47 69 52 70 58 C66 56 62 56 59 57 C59 52 60 47 61 47 Z"
            fill="#14b8a6"
          />

          {/* Supporting Caring Hands (Deep Navy #0a2540) */}
          {/* Left Hand */}
          <path
            d="M26 62 C26 56 28 50 30 46 C30 52 32 60 38 67 C42 72 48 76 50 82 C46 82 40 80 34 76 C28 72 26 67 26 62 Z"
            fill="#0a2540"
          />
          {/* Right Hand */}
          <path
            d="M74 62 C74 56 72 50 70 46 C70 52 68 60 62 67 C58 72 52 76 50 82 C54 82 60 80 66 76 C72 72 74 67 74 62 Z"
            fill="#0a2540"
          />
          {/* Palms cupping together at base */}
          <path
            d="M35 77 C40 81 45 83 50 83 C55 83 60 81 65 77 C60 86 40 86 35 77 Z"
            fill="#0a2540"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          {/* Starlet motif */}
          <span className="text-teal-600 text-xs">✦</span>
          <span
            className={`font-hindi font-bold tracking-tight ${
              isWhite ? "text-white" : "text-[#0a2540]"
            } ${size === "lg" ? "text-xl sm:text-2xl" : size === "sm" ? "text-base" : "text-lg sm:text-xl"}`}
          >
            संकल्प फाउंडेशन
          </span>
          <span className="text-teal-600 text-xs">✦</span>
        </div>

        <span
          className={`font-sans font-extrabold tracking-wider text-[11px] sm:text-xs uppercase ${
            isWhite ? "text-teal-200" : "text-teal-700"
          }`}
        >
          SANKALP FOUNDATION
        </span>

        {variant !== "compact" && (
          <span
            className={`text-[10px] sm:text-[11px] font-medium leading-tight mt-0.5 ${
              isWhite ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {lang === "hi"
              ? "फिजियोथैरेपी एंड रिहैबिलिटेशन सेंटर"
              : "Physiotherapy & Rehabilitation Center"}
          </span>
        )}
      </div>
    </Link>
  );
}
