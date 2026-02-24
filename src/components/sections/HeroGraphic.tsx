'use client';

import { useEffect, useState } from 'react';

function MobileNodeBadge({
  label,
  sublabel,
  isCenter = false,
}: {
  label: string;
  sublabel: string;
  isCenter?: boolean;
}): React.ReactElement {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
          isCenter
            ? 'border-accent/40 bg-accent/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
            : 'border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
        }`}
      >
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            isCenter ? 'bg-accent' : 'bg-primary'
          }`}
        />
      </div>
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${
          isCenter ? 'text-accent' : 'text-white/80'
        }`}
      >
        {label}
      </span>
      <span className="text-[9px] text-white/40">{sublabel}</span>
    </div>
  );
}

export function HeroGraphic(): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full">
      {/* Mobile: simplified HTML node badges */}
      <div className="flex items-center justify-between px-2 lg:hidden">
        <MobileNodeBadge label="Asia" sublabel="Manufacturers" />
        <div className="relative flex-1 mx-2">
          <div className="h-px w-full border-t border-dashed border-primary/30" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50" />
        </div>
        <MobileNodeBadge label="Hong Kong" sublabel="Watu Care" isCenter />
        <div className="relative flex-1 mx-2">
          <div className="h-px w-full border-t border-dashed border-accent/30" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50" />
        </div>
        <MobileNodeBadge label="Africa & ME" sublabel="Healthcare" />
      </div>

      {/* Desktop: full SVG horizontal band */}
      <svg
        viewBox="0 0 1000 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden w-full lg:block"
        aria-hidden="true"
      >
        <defs>
          {/* Glow filter for traveling dots — primary */}
          <filter id="hgGlow2" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="hsl(200, 65%, 55%)" floodOpacity="0.85" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
            <feMerge>
              <feMergeNode in="colorBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Glow filter for traveling dots — accent */}
          <filter id="hgGlowAccent2" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="hsl(175, 50%, 45%)" floodOpacity="0.85" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
            <feMerge>
              <feMergeNode in="colorBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial glow behind center hub */}
          <radialGradient id="hgHubGlow" cx="500" cy="80" r="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(175, 50%, 45%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(175, 50%, 45%)" stopOpacity="0" />
          </radialGradient>

          {/* Edge fade mask — both edges */}
          <linearGradient id="hgEdgeFade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="8%" stopColor="white" stopOpacity="1" />
            <stop offset="92%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="hgEdgeMask">
            <rect width="1000" height="160" fill="url(#hgEdgeFade)" />
          </mask>
        </defs>

        <g mask="url(#hgEdgeMask)">
          {/* Hub radial glow */}
          <circle cx="500" cy="80" r="80" fill="url(#hgHubGlow)" />

          {/* Connection path 1: Asia → Hong Kong (upward S-curve) */}
          <g className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <path
              d="M 140 80 C 250 30, 390 30, 460 80"
              stroke="hsl(200, 65%, 55%)"
              strokeWidth="1.5"
              strokeDasharray="8 5"
              fill="none"
              opacity="0.45"
              className={isVisible ? 'animate-draw-line' : ''}
              style={{ animationDelay: '0.4s' }}
            />
            {/* Connection path 2: Hong Kong → Africa/ME (downward S-curve) */}
            <path
              d="M 540 80 C 610 130, 750 130, 860 80"
              stroke="hsl(175, 50%, 45%)"
              strokeWidth="1.5"
              strokeDasharray="8 5"
              fill="none"
              opacity="0.45"
              className={isVisible ? 'animate-draw-line' : ''}
              style={{ animationDelay: '0.9s' }}
            />
          </g>

          {/* Path labels */}
          <g
            className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1.4s' }}
          >
            <text
              x="300" y="18"
              textAnchor="middle"
              fill="hsl(200, 65%, 65%)"
              fontSize="9"
              letterSpacing="2"
              fontFamily="system-ui, sans-serif"
              fontWeight="500"
            >
              CERTIFIED SUPPLY
            </text>
            <text
              x="700" y="150"
              textAnchor="middle"
              fill="hsl(175, 50%, 58%)"
              fontSize="9"
              letterSpacing="2"
              fontFamily="system-ui, sans-serif"
              fontWeight="500"
            >
              QUALITY DELIVERY
            </text>
          </g>

          {/* Traveling dots — path 1 (Asia → HK) */}
          <g className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {[0, 1, 2].map((i) => (
              <circle key={`p1-${i}`} r="4" fill="hsl(200, 65%, 62%)" filter="url(#hgGlow2)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 140 80 C 250 30, 390 30, 460 80"
                  begin={`${1.2 + i * 1.3}s`}
                />
              </circle>
            ))}

            {/* Traveling dots — path 2 (HK → Africa/ME) */}
            {[0, 1, 2].map((i) => (
              <circle key={`p2-${i}`} r="4" fill="hsl(175, 50%, 52%)" filter="url(#hgGlowAccent2)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                  path="M 540 80 C 610 130, 750 130, 860 80"
                  begin={`${2.0 + i * 1.3}s`}
                />
              </circle>
            ))}
          </g>

          {/* Node 1: Asia */}
          <g
            className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <circle cx="100" cy="80" r="44" fill="none" stroke="hsl(200, 65%, 55%)" strokeWidth="1" opacity="0.15" />
            <circle cx="100" cy="80" r="34" fill="hsl(206, 50%, 16%)" stroke="hsl(200, 65%, 55%)" strokeWidth="2" opacity="0.95" />
            {/* Factory icon */}
            <g transform="translate(84, 68)">
              <rect x="4" y="8" width="24" height="14" fill="none" stroke="white" strokeWidth="1.5" rx="1" opacity="0.85" />
              <rect x="7" y="11" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <rect x="13" y="11" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <rect x="19" y="11" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <rect x="7" y="17" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <rect x="19" y="17" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <path d="M 16 8 L 16 4 L 21 4 L 21 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85" />
            </g>
            <text x="100" y="138" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="system-ui, sans-serif" opacity="0.9">
              ASIA
            </text>
            <text x="100" y="152" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui, sans-serif" opacity="0.45">
              Manufacturers
            </text>
          </g>

          {/* Node 2: Hong Kong (hub) — enhanced */}
          <g
            className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.35s' }}
          >
            {/* Outermost animated pulse ring */}
            <circle
              cx="500" cy="80" r="54"
              fill="none"
              stroke="hsl(175, 50%, 45%)"
              strokeWidth="1.5"
              className="animate-hero-pulse-ring"
            />
            {/* Middle ring */}
            <circle cx="500" cy="80" r="44" fill="none" stroke="hsl(175, 50%, 45%)" strokeWidth="1" opacity="0.3" />
            {/* Inner fill */}
            <circle cx="500" cy="80" r="36" fill="hsl(175, 50%, 38%)" stroke="white" strokeWidth="2" opacity="0.95" />
            {/* Shield/check icon */}
            <g transform="translate(487, 67)">
              <path
                d="M 13 2 L 24 6.5 L 24 14 C 24 19 19 22 13 25 C 7 22 2 19 2 14 L 2 6.5 L 13 2 Z"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <path d="M 7.5 13.5 L 11 17 L 18.5 9.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            </g>
            <text x="500" y="148" textAnchor="middle" fill="hsl(175, 50%, 65%)" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="system-ui, sans-serif">
              HONG KONG
            </text>
          </g>

          {/* Node 3: Africa & Middle East */}
          <g
            className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.55s' }}
          >
            <circle cx="900" cy="80" r="44" fill="none" stroke="hsl(200, 65%, 55%)" strokeWidth="1" opacity="0.15" />
            <circle cx="900" cy="80" r="34" fill="hsl(206, 50%, 16%)" stroke="hsl(200, 65%, 55%)" strokeWidth="2" opacity="0.95" />
            {/* Medical cross icon */}
            <g transform="translate(887, 67)">
              <rect x="10" y="3" width="6" height="20" fill="white" rx="1.5" opacity="0.85" />
              <rect x="3" y="10" width="20" height="6" fill="white" rx="1.5" opacity="0.85" />
            </g>
            <text x="900" y="138" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" letterSpacing="1.5" fontFamily="system-ui, sans-serif" opacity="0.9">
              AFRICA &middot; MIDDLE EAST
            </text>
            <text x="900" y="152" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui, sans-serif" opacity="0.45">
              Healthcare
            </text>
          </g>

          {/* Decorative corner brackets */}
          <g opacity="0.08">
            <path d="M 20 20 L 20 8 L 32 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 968 8 L 980 8 L 980 20" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 20 140 L 20 152 L 32 152" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 968 152 L 980 152 L 980 140" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}
