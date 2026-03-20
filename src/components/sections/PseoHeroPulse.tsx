/**
 * ECG pulse for pSEO page heroes — right-side column element.
 * Single heartbeat, triple-layer glow, hidden on mobile.
 * Uses unique SVG IDs (pseo-*) to avoid conflicts with the main Hero.
 */

const ECG_PATH =
  'M 0 80 H 60 C 68 80 74 73 80 80 H 110 L 128 28 L 146 132 L 164 80 C 174 73 184 75 194 80 H 280';

export function PseoHeroPulse(): React.ReactElement {
  return (
    <div className="hero-pulse-container hidden items-center lg:flex" aria-hidden="true">
      <svg
        viewBox="0 0 280 160"
        className="h-auto w-full"
        fill="none"
      >
        <defs>
          <radialGradient id="pseo-pulse-ambient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(175 50% 55%)" stopOpacity="0.10" />
            <stop offset="60%" stopColor="hsl(175 50% 55%)" stopOpacity="0.03" />
            <stop offset="100%" stopColor="hsl(175 50% 55%)" stopOpacity="0" />
          </radialGradient>
          <filter id="pseo-trace-glow">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="pseo-trace-glow-wide">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Breathing glow at QRS peak */}
        <circle cx="146" cy="80" r="70" fill="url(#pseo-pulse-ambient)" className="hero-pulse-breathe" />

        {/* Base track */}
        <path
          d={ECG_PATH}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Wide aura glow */}
        <path
          d={ECG_PATH}
          stroke="hsl(175 50% 55%)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#pseo-trace-glow-wide)"
          className="hero-pulse-trace-wide"
          opacity="0.15"
        />

        {/* Inner glow trace */}
        <path
          d={ECG_PATH}
          stroke="hsl(175 50% 55%)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#pseo-trace-glow)"
          className="hero-pulse-trace-wide"
          opacity="0.4"
        />

        {/* Sharp crisp trace */}
        <path
          d={ECG_PATH}
          stroke="hsl(175 50% 60%)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hero-pulse-trace-wide"
        />
      </svg>
    </div>
  );
}
