'use client';

import { useEffect, useState } from 'react';

interface SupplierHeroGraphicProps {
  countryName: string;
}

export function SupplierHeroGraphic({ countryName }: SupplierHeroGraphicProps): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Truncate long country names
  const displayName = countryName.length > 14 ? countryName.slice(0, 12) + '…' : countryName;

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* Background Pattern - Dot Grid */}
        <defs>
          <pattern
            id="dotPatternSupplier"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.1" />
          </pattern>

          {/* Gradient for connecting lines */}
          <linearGradient id="lineGradientSupplier" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(200, 65%, 55%)" />
            <stop offset="100%" stopColor="hsl(175, 50%, 45%)" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glowSupplier" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background dots */}
        <rect width="400" height="300" fill="url(#dotPatternSupplier)" className="text-white" />

        {/* Connecting Lines */}
        <g className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Asia to Hong Kong */}
          <path
            d="M 80 150 Q 140 120 200 150"
            stroke="url(#lineGradientSupplier)"
            strokeWidth="2"
            strokeDasharray="8 4"
            fill="none"
            className={isVisible ? 'animate-draw-line' : ''}
            style={{ animationDelay: '0.5s' }}
          />

          {/* Hong Kong to Country */}
          <path
            d="M 200 150 Q 260 180 320 150"
            stroke="url(#lineGradientSupplier)"
            strokeWidth="2"
            strokeDasharray="8 4"
            fill="none"
            className={isVisible ? 'animate-draw-line' : ''}
            style={{ animationDelay: '1s' }}
          />
        </g>

        {/* Traveling dots on paths */}
        <g className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1.5s' }}>
          <circle r="4" fill="hsl(200, 65%, 55%)" filter="url(#glowSupplier)">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M 80 150 Q 140 120 200 150"
              begin="1.5s"
            />
          </circle>
          <circle r="4" fill="hsl(175, 50%, 45%)" filter="url(#glowSupplier)">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M 200 150 Q 260 180 320 150"
              begin="2.5s"
            />
          </circle>
        </g>

        {/* Node 1: Asia (Manufacturers) */}
        <g
          className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.2s' }}
        >
          {/* Outer ring */}
          <circle
            cx="80"
            cy="150"
            r="36"
            fill="none"
            stroke="hsl(200, 65%, 55%)"
            strokeWidth="1"
            opacity="0.3"
          />
          {/* Inner circle */}
          <circle
            cx="80"
            cy="150"
            r="28"
            fill="hsl(206, 50%, 18%)"
            stroke="hsl(200, 65%, 55%)"
            strokeWidth="2"
          />
          {/* Icon: Factory/Building */}
          <g transform="translate(64, 138)">
            <rect x="4" y="8" width="24" height="16" fill="none" stroke="white" strokeWidth="1.5" rx="1" />
            <rect x="8" y="12" width="4" height="4" fill="white" opacity="0.7" />
            <rect x="14" y="12" width="4" height="4" fill="white" opacity="0.7" />
            <rect x="20" y="12" width="4" height="4" fill="white" opacity="0.7" />
            <rect x="8" y="18" width="4" height="4" fill="white" opacity="0.7" />
            <rect x="14" y="18" width="4" height="4" fill="white" opacity="0.7" />
            <rect x="20" y="18" width="4" height="4" fill="white" opacity="0.7" />
            <path d="M 16 8 L 16 4 L 20 4 L 20 8" stroke="white" strokeWidth="1.5" fill="none" />
          </g>
          {/* Label */}
          <text
            x="80"
            y="200"
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="600"
            opacity="0.9"
          >
            ASIA
          </text>
          <text
            x="80"
            y="214"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            opacity="0.6"
          >
            Manufacturers
          </text>
        </g>

        {/* Node 2: Hong Kong (Watu Care Hub) */}
        <g
          className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.4s' }}
        >
          {/* Outer ring - pulsing */}
          <circle
            cx="200"
            cy="150"
            r="44"
            fill="none"
            stroke="hsl(175, 50%, 45%)"
            strokeWidth="1"
            opacity="0.2"
            className="animate-pulse-subtle"
          />
          {/* Middle ring */}
          <circle
            cx="200"
            cy="150"
            r="36"
            fill="none"
            stroke="hsl(175, 50%, 45%)"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Inner circle - main */}
          <circle
            cx="200"
            cy="150"
            r="28"
            fill="hsl(175, 50%, 45%)"
            stroke="white"
            strokeWidth="2"
          />
          {/* Icon: Shield/Check (Quality) */}
          <g transform="translate(188, 138)">
            <path
              d="M 12 2 L 22 6 L 22 14 C 22 18 18 21 12 24 C 6 21 2 18 2 14 L 2 6 L 12 2 Z"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />
            <path d="M 7 13 L 10 16 L 17 9" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* Label */}
          <text
            x="200"
            y="208"
            textAnchor="middle"
            fill="hsl(175, 50%, 45%)"
            fontSize="12"
            fontWeight="700"
          >
            HONG KONG
          </text>
          <text
            x="200"
            y="222"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            opacity="0.6"
          >
            Watu Care Hub
          </text>
        </g>

        {/* Node 3: Country (Healthcare) */}
        <g
          className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.6s' }}
        >
          {/* Outer ring */}
          <circle
            cx="320"
            cy="150"
            r="36"
            fill="none"
            stroke="hsl(200, 65%, 55%)"
            strokeWidth="1"
            opacity="0.3"
          />
          {/* Inner circle */}
          <circle
            cx="320"
            cy="150"
            r="28"
            fill="hsl(206, 50%, 18%)"
            stroke="hsl(200, 65%, 55%)"
            strokeWidth="2"
          />
          {/* Icon: Medical Cross */}
          <g transform="translate(308, 138)">
            <rect x="9" y="4" width="6" height="16" fill="white" rx="1" />
            <rect x="4" y="9" width="16" height="6" fill="white" rx="1" />
          </g>
          {/* Label - Country Name */}
          <text
            x="320"
            y="200"
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="600"
            opacity="0.9"
          >
            {displayName.toUpperCase()}
          </text>
          <text
            x="320"
            y="214"
            textAnchor="middle"
            fill="white"
            fontSize="9"
            opacity="0.6"
          >
            Healthcare
          </text>
        </g>

        {/* Decorative corner elements */}
        <g opacity="0.15">
          {/* Top left corner */}
          <path d="M 10 30 L 10 10 L 30 10" stroke="white" strokeWidth="2" fill="none" />
          {/* Top right corner */}
          <path d="M 370 10 L 390 10 L 390 30" stroke="white" strokeWidth="2" fill="none" />
          {/* Bottom left corner */}
          <path d="M 10 270 L 10 290 L 30 290" stroke="white" strokeWidth="2" fill="none" />
          {/* Bottom right corner */}
          <path d="M 370 290 L 390 290 L 390 270" stroke="white" strokeWidth="2" fill="none" />
        </g>
      </svg>
    </div>
  );
}
