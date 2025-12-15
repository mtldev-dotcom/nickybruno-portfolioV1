"use client";

import React from "react";

type WordmarkProps = {
  text?: string; // Main brand text
  tagline?: string; // Optional small text under the line
  accent?: string; // Neon accent color
  className?: string; // Extra utility classes
  compact?: boolean; // Compact header-friendly layout
  showSparkles?: boolean; // Toggle sparkles row
  showLine?: boolean; // Toggle neon line
};

export default function Wordmark({
  text = "NEXT X LEVEL",
  tagline,
  accent = "#7BFF00", // bright neon lime
  className = "",
  compact = false,
  showSparkles = true,
  showLine = true,
}: WordmarkProps) {
  const textClasses = compact
    ? "text-white text-base sm:text-lg md:text-xl"
    : "text-white text-2xl sm:text-3xl md:text-4xl";
  const lineHeightClass = compact ? "h-[2px]" : "h-[4px]";
  const gapClass = compact ? "gap-1" : "gap-2";
  const sparklesRowClass = compact
    ? "hidden md:flex items-center justify-center gap-12 py-0.5"
    : "flex items-center justify-center gap-16 py-1";
  const sparkleSize = compact ? 12 : 18;
  const showSparklesRow = showSparkles && !compact;
  const letterSpacing = compact ? "0.12em" : "0.22em";
  const trackingClass = compact ? "tracking-[0.12em]" : "tracking-[0.2em]";

  return (
    <div className={`flex flex-col items-center ${gapClass} ${className}`}>
      {/* Wordmark */}
      <h1
        className={`${trackingClass} text-center font-semibold uppercase leading-none whitespace-nowrap`}
        style={{
          // Slight “extended” feel & crisp edges
          letterSpacing: letterSpacing,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <span className={textClasses}>{text}</span>
      </h1>

      {/* Neon line */}
      {showLine && (
        <div
          className={`w-full max-w-screen-lg ${lineHeightClass} rounded-full`}
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent})`,
            boxShadow: `0 0 8px ${accent}, 0 0 18px ${accent}66`,
          }}
          aria-hidden
        />
      )}

      {/* Sparkles row */}
      {showSparklesRow && (
        <div className={sparklesRowClass}>
          <Sparkle accent={accent} size={sparkleSize} />
          <Sparkle accent={accent} size={sparkleSize} />
        </div>
      )}

      {/* Optional tagline (hidden in compact to keep header short) */}
      {tagline && !compact ? (
        <p className="text-center text-sm text-zinc-300/80">{tagline}</p>
      ) : null}
    </div>
  );
}

/** Small 4-point sparkle matching the neon accent */
function Sparkle({ accent = "#7BFF00", size = 18 }: { accent?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ filter: `drop-shadow(0 0 6px ${accent}AA)` }}
    >
      <path
        d="M12 2c-.7 2.5-2.5 4.3-5 5 2.5.7 4.3 2.5 5 5 .7-2.5 2.5-4.3 5-5-2.5-.7-4.3-2.5-5-5Z"
        fill={accent}
      />
    </svg>
  );
}
