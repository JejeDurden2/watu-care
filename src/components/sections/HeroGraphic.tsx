'use client';

import { useEffect, useState } from 'react';

function MobileNodeBadge({
  label,
  sublabel,
  isAccent = false,
}: {
  label: string;
  sublabel: string;
  isAccent?: boolean;
}): React.ReactElement {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
          isAccent
            ? 'border-accent/40 bg-accent/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
            : 'border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
        }`}
      >
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            isAccent ? 'bg-accent' : 'bg-primary'
          }`}
        />
      </div>
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${
          isAccent ? 'text-accent' : 'text-white/80'
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
      {/* Mobile: simplified HTML node badges — direct flow */}
      <div className="flex items-center justify-between px-2 lg:hidden">
        <MobileNodeBadge label="Asia" sublabel="Manufacturers" />
        <div className="relative flex-1 mx-3">
          <div className="h-px w-full border-t border-dashed border-primary/30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="block rounded-full border border-accent/30 bg-secondary px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-accent/70">
              Watu Care
            </span>
          </div>
        </div>
        <MobileNodeBadge label="Africa & ME" sublabel="Healthcare" isAccent />
      </div>

      {/* Desktop: full SVG horizontal band — direct flow */}
      <svg
        viewBox="0 0 1000 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden w-full lg:block"
        aria-hidden="true"
      >
        <defs>
          {/* Glow filter for traveling dots */}
          <filter id="hgGlow2" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor="hsl(200, 65%, 55%)" floodOpacity="0.85" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
            <feMerge>
              <feMergeNode in="colorBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

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
          {/* Connection path: Asia → Africa & ME (gentle S-curve) */}
          <g className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <path
              d="M 200 80 C 350 30, 650 130, 800 80"
              stroke="url(#hgPathGradient)"
              strokeWidth="1.5"
              strokeDasharray="8 5"
              fill="none"
              opacity="0.45"
              className={isVisible ? 'animate-draw-line' : ''}
              style={{ animationDelay: '0.4s' }}
            />
          </g>

          {/* Path gradient: primary → accent */}
          <linearGradient id="hgPathGradient" x1="200" y1="80" x2="800" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(200, 65%, 55%)" />
            <stop offset="100%" stopColor="hsl(175, 50%, 45%)" />
          </linearGradient>

          {/* Path label */}
          <g
            className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1.4s' }}
          >
            <text
              x="500" y="60"
              textAnchor="middle"
              fill="hsl(175, 50%, 58%)"
              fontSize="9"
              letterSpacing="2"
              fontFamily="system-ui, sans-serif"
              fontWeight="500"
            >
              DIRECT SUPPLY
            </text>
          </g>

          {/* Traveling dots along the path */}
          <g className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {[0, 1, 2].map((i) => (
              <circle key={`p-${i}`} r="4" fill="hsl(200, 65%, 62%)" filter="url(#hgGlow2)">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M 200 80 C 350 30, 650 130, 800 80"
                  begin={`${1.2 + i * 1.6}s`}
                />
              </circle>
            ))}
          </g>

          {/* Node 1: Asia */}
          <g
            className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <circle cx="160" cy="80" r="44" fill="none" stroke="hsl(200, 65%, 55%)" strokeWidth="1" opacity="0.15" />
            <circle cx="160" cy="80" r="34" fill="hsl(206, 50%, 16%)" stroke="hsl(200, 65%, 55%)" strokeWidth="2" opacity="0.95" />
            {/* Factory icon */}
            <g transform="translate(144, 68)">
              <rect x="4" y="8" width="24" height="14" fill="none" stroke="white" strokeWidth="1.5" rx="1" opacity="0.85" />
              <rect x="7" y="11" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <rect x="13" y="11" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <rect x="19" y="11" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <rect x="7" y="17" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <rect x="19" y="17" width="4" height="4" fill="white" opacity="0.6" rx="0.5" />
              <path d="M 16 8 L 16 4 L 21 4 L 21 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85" />
            </g>
            <text x="160" y="138" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="system-ui, sans-serif" opacity="0.9">
              ASIA
            </text>
            <text x="160" y="152" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui, sans-serif" opacity="0.45">
              Manufacturers
            </text>
          </g>

          {/* Center facilitator badge: Watu Care */}
          <g
            className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.35s' }}
          >
            <rect x="440" y="88" width="120" height="28" rx="14" fill="hsl(206, 50%, 16%)" stroke="hsl(175, 50%, 45%)" strokeWidth="1" opacity="0.9" />
            <text x="500" y="106" textAnchor="middle" fill="hsl(175, 50%, 65%)" fontSize="9" fontWeight="700" letterSpacing="1.5" fontFamily="system-ui, sans-serif">
              WATU CARE
            </text>
          </g>

          {/* Node 2: Africa & Middle East */}
          <g
            className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.55s' }}
          >
            <circle cx="840" cy="80" r="44" fill="none" stroke="hsl(175, 50%, 45%)" strokeWidth="1" opacity="0.15" />
            <circle cx="840" cy="80" r="34" fill="hsl(206, 50%, 16%)" stroke="hsl(175, 50%, 45%)" strokeWidth="2" opacity="0.95" />
            {/* Medical cross icon */}
            <g transform="translate(827, 67)">
              <rect x="10" y="3" width="6" height="20" fill="white" rx="1.5" opacity="0.85" />
              <rect x="3" y="10" width="20" height="6" fill="white" rx="1.5" opacity="0.85" />
            </g>
            <text x="840" y="138" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" letterSpacing="1.5" fontFamily="system-ui, sans-serif" opacity="0.9">
              AFRICA &middot; MIDDLE EAST
            </text>
            <text x="840" y="152" textAnchor="middle" fill="white" fontSize="9" fontFamily="system-ui, sans-serif" opacity="0.45">
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
