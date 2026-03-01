'use client';

import { useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Path definitions — converge at center hub (500,110), then split    */
/*  upper → Africa node, middle → between, lower → Middle East node    */
/* ------------------------------------------------------------------ */

const PATHS = {
  upper: 'M 185 85 C 300 30, 420 50, 500 110 C 580 170, 700 135, 810 78',
  middle: 'M 185 110 C 310 85, 400 125, 500 110 C 600 95, 700 108, 810 100',
  lower: 'M 160 148 C 280 175, 420 140, 500 110 C 580 80, 740 100, 855 147',
} as const;

/* ------------------------------------------------------------------ */
/*  useReducedMotion — respects prefers-reduced-motion for SVG anims  */
/* ------------------------------------------------------------------ */

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/* ------------------------------------------------------------------ */
/*  SVG Defs — gradients, filters, patterns, masks                    */
/* ------------------------------------------------------------------ */

function SvgDefs(): React.ReactElement {
  return (
    <defs>
      {/* Dot grid pattern */}
      <pattern id="hgDotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.6" fill="white" opacity="0.07" />
      </pattern>

      {/* Path gradients */}
      <linearGradient id="hgPathGrad" x1="190" y1="110" x2="810" y2="110" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(200, 65%, 55%)" />
        <stop offset="50%" stopColor="hsl(188, 55%, 50%)" />
        <stop offset="100%" stopColor="hsl(175, 50%, 45%)" />
      </linearGradient>

      {/* Center hub atmospheric glow */}
      <radialGradient id="hgCenterGlow" cx="500" cy="110" r="120" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(175, 50%, 45%)" stopOpacity="0.12" />
        <stop offset="100%" stopColor="hsl(175, 50%, 45%)" stopOpacity="0" />
      </radialGradient>

      {/* Source glow */}
      <radialGradient id="hgSourceGlow" cx="160" cy="100" r="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(200, 65%, 55%)" stopOpacity="0.06" />
        <stop offset="100%" stopColor="hsl(200, 65%, 55%)" stopOpacity="0" />
      </radialGradient>

      {/* Destination glow */}
      <radialGradient id="hgDestGlow" cx="840" cy="110" r="110" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(175, 50%, 45%)" stopOpacity="0.06" />
        <stop offset="100%" stopColor="hsl(175, 50%, 45%)" stopOpacity="0" />
      </radialGradient>

      {/* Particle glow filter */}
      <filter id="hgGlow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feFlood floodColor="hsl(200, 65%, 55%)" floodOpacity="0.7" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Accent particle glow */}
      <filter id="hgGlowAccent" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feFlood floodColor="hsl(175, 50%, 45%)" floodOpacity="0.6" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Edge fade mask */}
      <linearGradient id="hgEdgeFade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="white" stopOpacity="0" />
        <stop offset="6%" stopColor="white" stopOpacity="1" />
        <stop offset="94%" stopColor="white" stopOpacity="1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <mask id="hgEdgeMask">
        <rect width="1000" height="220" fill="url(#hgEdgeFade)" />
      </mask>
    </defs>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 0 — Background atmosphere                                    */
/* ------------------------------------------------------------------ */

function BackgroundAtmosphere({ isVisible }: { isVisible: boolean }): React.ReactElement {
  return (
    <g
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <rect width="1000" height="220" fill="url(#hgDotGrid)" />
      <ellipse cx="160" cy="100" rx="100" ry="80" fill="url(#hgSourceGlow)" />
      <ellipse cx="500" cy="110" rx="130" ry="100" fill="url(#hgCenterGlow)" />
      <ellipse cx="840" cy="110" rx="110" ry="90" fill="url(#hgDestGlow)" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 1 — Network connection paths                                 */
/* ------------------------------------------------------------------ */

function NetworkPaths({ isVisible }: { isVisible: boolean }): React.ReactElement {
  const pathConfigs = [
    { d: PATHS.upper, opacity: 0.2, dash: '6 8', delay: '0.1s', speed: '' },
    { d: PATHS.middle, opacity: 0.4, dash: '10 6', delay: '0.2s', speed: '' },
    { d: PATHS.lower, opacity: 0.25, dash: '4 10', delay: '0.3s', speed: 'slow' },
  ];

  return (
    <g>
      {pathConfigs.map((p, i) => (
        <path
          key={`path-${i}`}
          d={p.d}
          stroke="url(#hgPathGrad)"
          strokeWidth="1.5"
          strokeDasharray={p.dash}
          strokeLinecap="round"
          fill="none"
          className={isVisible ? (p.speed === 'slow' ? 'animate-hero-net-flow-slow' : 'animate-hero-net-flow') : ''}
          style={{
            opacity: isVisible ? p.opacity : 0,
            transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${p.delay}`,
          }}
        />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 1b — Traveling particles along paths                         */
/* ------------------------------------------------------------------ */

function TravelingParticles({
  isVisible,
  reducedMotion,
}: {
  isVisible: boolean;
  reducedMotion: boolean;
}): React.ReactElement {
  const particles = [
    { path: PATHS.upper, dur: '6s', begin: '1.6s', r: 3, filter: 'hgGlow' },
    { path: PATHS.upper, dur: '6s', begin: '4.8s', r: 2.5, filter: 'hgGlow' },
    { path: PATHS.middle, dur: '5s', begin: '1.8s', r: 3.5, filter: 'hgGlow' },
    { path: PATHS.lower, dur: '7s', begin: '2.2s', r: 3, filter: 'hgGlowAccent' },
    { path: PATHS.lower, dur: '7s', begin: '5.5s', r: 2.5, filter: 'hgGlowAccent' },
  ];

  return (
    <g
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.4s',
      }}
    >
      {particles.map((p, i) => (
        <circle
          key={`particle-${i}`}
          r={p.r}
          fill={p.filter === 'hgGlow' ? 'hsl(200, 65%, 62%)' : 'hsl(175, 50%, 55%)'}
          filter={`url(#${p.filter})`}
        >
          <animateMotion
            dur={reducedMotion ? '0.01s' : p.dur}
            repeatCount={reducedMotion ? '1' : 'indefinite'}
            path={p.path}
            begin={p.begin}
          />
        </circle>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 2 — Source cluster (Asia, left side)                         */
/* ------------------------------------------------------------------ */

function SourceCluster({ isVisible }: { isVisible: boolean }): React.ReactElement {
  return (
    <g>
      {/* Primary node — Asia */}
      <g
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate(105px, 55px)' : 'translate(75px, 55px)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
        }}
      >
        {/* Card body */}
        <rect width="80" height="56" rx="12" fill="hsl(206, 50%, 16%)" fillOpacity="0.9"
          stroke="hsl(200, 65%, 55%)" strokeWidth="1" strokeOpacity="0.35" className="animate-hero-net-breathe" />
        {/* Glass refraction top edge */}
        <line x1="14" y1="1" x2="66" y2="1" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
        {/* Factory icon */}
        <g transform="translate(24, 8)">
          <rect x="0" y="10" width="32" height="18" rx="2"
            fill="none" stroke="white" strokeWidth="1.2" opacity="0.75" />
          <rect x="4" y="14" width="5" height="5" fill="white" opacity="0.4" rx="1" />
          <rect x="13" y="14" width="5" height="5" fill="white" opacity="0.4" rx="1" />
          <rect x="22" y="14" width="5" height="5" fill="white" opacity="0.4" rx="1" />
          <rect x="4" y="22" width="5" height="4" fill="white" opacity="0.4" rx="1" />
          <rect x="22" y="22" width="5" height="4" fill="white" opacity="0.4" rx="1" />
          {/* Chimney */}
          <path d="M 20 10 L 20 5 L 26 5 L 26 10" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.65" />
        </g>
        {/* Label */}
        <text x="40" y="50" textAnchor="middle" fill="white" fontSize="8" fontWeight="700"
          letterSpacing="1.5" fontFamily="var(--font-body), system-ui, sans-serif" opacity="0.85">
          ASIA
        </text>
      </g>

      {/* Secondary node — Manufacturers */}
      <g
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate(65px, 128px)' : 'translate(35px, 128px)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
        }}
      >
        <rect width="64" height="38" rx="10" fill="hsl(206, 50%, 16%)" fillOpacity="0.75"
          stroke="hsl(200, 65%, 55%)" strokeWidth="0.8" strokeOpacity="0.2" />
        <line x1="12" y1="1" x2="52" y2="1" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        {/* Chip / circuit icon */}
        <g transform="translate(20, 6)">
          <rect x="4" y="4" width="16" height="12" rx="2"
            fill="none" stroke="white" strokeWidth="1" opacity="0.55" />
          <line x1="8" y1="4" x2="8" y2="1" stroke="white" strokeWidth="0.8" opacity="0.35" />
          <line x1="16" y1="4" x2="16" y2="1" stroke="white" strokeWidth="0.8" opacity="0.35" />
          <line x1="8" y1="16" x2="8" y2="19" stroke="white" strokeWidth="0.8" opacity="0.35" />
          <line x1="16" y1="16" x2="16" y2="19" stroke="white" strokeWidth="0.8" opacity="0.35" />
        </g>
        <text x="32" y="33" textAnchor="middle" fill="white" fontSize="7"
          fontFamily="var(--font-body), system-ui, sans-serif" opacity="0.45">
          Manufacturers
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 2 — Center hub (Watu Care)                                   */
/* ------------------------------------------------------------------ */

function CenterHub({
  isVisible,
  reducedMotion,
}: {
  isVisible: boolean;
  reducedMotion: boolean;
}): React.ReactElement {
  return (
    <g>
      {/* Outer pulse ring */}
      <ellipse
        cx="500" cy="110" rx="52" ry="52"
        fill="none" stroke="hsl(175, 50%, 45%)" strokeWidth="1"
        className="animate-hero-pulse-ring"
        style={{
          opacity: isVisible ? 0.25 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          transformOrigin: '500px 110px',
        }}
      />

      {/* Orbital ring */}
      <g
        className={reducedMotion ? '' : 'animate-hero-net-orbit'}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s',
          transformOrigin: '500px 110px',
        }}
      >
        <ellipse
          cx="500" cy="110" rx="42" ry="42"
          fill="none" stroke="hsl(175, 50%, 45%)" strokeWidth="0.5" strokeOpacity="0.2"
          strokeDasharray="4 8"
        />
        {/* Orbital dot */}
        <circle cx="542" cy="110" r="2.5" fill="hsl(175, 50%, 55%)" opacity="0.7" />
      </g>

      {/* Hub body */}
      <g
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.7)',
          transformOrigin: '500px 110px',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
        }}
      >
        <rect x="458" y="90" width="84" height="40" rx="20"
          fill="hsl(206, 50%, 16%)" fillOpacity="0.95"
          stroke="hsl(175, 50%, 45%)" strokeWidth="1.2" strokeOpacity="0.6" />
        {/* Glass refraction */}
        <line x1="474" y1="91" x2="526" y2="91" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
        {/* Inner glow dot */}
        <circle cx="474" cy="110" r="3" fill="hsl(175, 50%, 55%)" opacity="0.5" />
        {/* Label */}
        <text x="504" y="114" textAnchor="middle" fill="hsl(175, 50%, 70%)" fontSize="9.5"
          fontWeight="700" letterSpacing="1.8" fontFamily="var(--font-body), system-ui, sans-serif">
          WATU CARE
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 2 — Destination cluster (Africa & ME, right side)            */
/* ------------------------------------------------------------------ */

function DestinationCluster({ isVisible }: { isVisible: boolean }): React.ReactElement {
  return (
    <g>
      {/* Primary node — Africa */}
      <g
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate(810px, 50px)' : 'translate(840px, 50px)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
        }}
      >
        <rect width="80" height="56" rx="12" fill="hsl(206, 50%, 16%)" fillOpacity="0.9"
          stroke="hsl(175, 50%, 45%)" strokeWidth="1" strokeOpacity="0.35" className="animate-hero-net-breathe" />
        <line x1="14" y1="1" x2="66" y2="1" stroke="white" strokeOpacity="0.08" strokeWidth="1" />
        {/* Medical cross icon */}
        <g transform="translate(26, 8)">
          <rect x="10" y="2" width="8" height="24" fill="white" rx="2" opacity="0.7" />
          <rect x="2" y="10" width="24" height="8" fill="white" rx="2" opacity="0.7" />
        </g>
        <text x="40" y="50" textAnchor="middle" fill="white" fontSize="8" fontWeight="700"
          letterSpacing="1.5" fontFamily="var(--font-body), system-ui, sans-serif" opacity="0.85">
          AFRICA
        </text>
      </g>

      {/* Secondary node — Middle East */}
      <g
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate(855px, 128px)' : 'translate(885px, 128px)',
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
        }}
      >
        <rect width="64" height="38" rx="10" fill="hsl(206, 50%, 16%)" fillOpacity="0.75"
          stroke="hsl(175, 50%, 45%)" strokeWidth="0.8" strokeOpacity="0.2" />
        <line x1="12" y1="1" x2="52" y2="1" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        {/* Heartbeat / health icon */}
        <g transform="translate(18, 5)">
          <path d="M 4 12 L 10 12 L 13 6 L 17 18 L 20 12 L 26 12"
            stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </g>
        <text x="32" y="33" textAnchor="middle" fill="white" fontSize="7"
          fontFamily="var(--font-body), system-ui, sans-serif" opacity="0.45">
          Middle East
        </text>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 3 — Floating data badges                                     */
/* ------------------------------------------------------------------ */

function DataBadges({ isVisible }: { isVisible: boolean }): React.ReactElement {
  const badges = [
    { x: 310, y: 38, label: 'ISO 13485', width: 74, delay: '1s', animClass: 'animate-hero-net-float' },
    { x: 625, y: 170, label: '25+ Countries', width: 96, delay: '1.2s', animClass: 'animate-hero-net-float-alt' },
  ];

  return (
    <g>
      {badges.map((b, i) => (
        <g
          key={`badge-${i}`}
          className={isVisible ? b.animClass : ''}
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${b.delay}`,
          }}
        >
          <rect x={b.x} y={b.y} width={b.width} height="22" rx="11"
            fill="hsl(206, 50%, 16%)" fillOpacity="0.85"
            stroke="hsl(175, 50%, 45%)" strokeWidth="0.6" strokeOpacity="0.25" />
          <line
            x1={b.x + 10} y1={b.y + 1} x2={b.x + b.width - 10} y2={b.y + 1}
            stroke="white" strokeOpacity="0.06" strokeWidth="0.8"
          />
          <text
            x={b.x + b.width / 2} y={b.y + 14.5}
            textAnchor="middle" fill="hsl(175, 50%, 60%)" fontSize="8"
            fontWeight="600" letterSpacing="0.8"
            fontFamily="var(--font-body), system-ui, sans-serif"
          >
            {b.label}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile — Glassmorphic node badges with gradient connector          */
/* ------------------------------------------------------------------ */

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
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-sm ${
          isAccent
            ? 'border-accent/30 bg-accent/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
            : 'border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
        }`}
      >
        <div className={`h-2 w-2 rounded-full ${isAccent ? 'bg-accent' : 'bg-primary'}`} />
      </div>
      <span
        className={`text-[10px] font-bold uppercase tracking-wider ${
          isAccent ? 'text-accent' : 'text-white/80'
        }`}
      >
        {label}
      </span>
      <span className="text-[9px] text-white/35">{sublabel}</span>
    </div>
  );
}

function MobileNetworkView(): React.ReactElement {
  return (
    <div className="flex items-center justify-between px-2">
      <MobileNodeBadge label="Asia" sublabel="Manufacturers" />

      <div className="relative mx-3 flex-1">
        {/* Animated gradient line */}
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(90deg, hsl(200 65% 55% / 0.4), hsl(175 50% 45% / 0.4), hsl(200 65% 55% / 0.4))',
            backgroundSize: '200% 100%',
            animation: 'gradient-drift 8s linear infinite',
          }}
        />
        {/* Hub badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="block rounded-full border border-accent/25 bg-secondary px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-accent/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            Watu Care
          </span>
        </div>
      </div>

      <MobileNodeBadge label="Africa & ME" sublabel="Healthcare" isAccent />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function HeroGraphic(): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full">
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileNetworkView />
      </div>

      {/* Desktop */}
      <svg
        viewBox="0 0 1000 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hidden w-full lg:block"
        aria-hidden="true"
      >
        <SvgDefs />

        <g mask="url(#hgEdgeMask)">
          {/* Layer 0 — Atmosphere */}
          <BackgroundAtmosphere isVisible={isVisible} />

          {/* Layer 1 — Network paths */}
          <NetworkPaths isVisible={isVisible} />

          {/* Layer 1b — Traveling particles */}
          <TravelingParticles isVisible={isVisible} reducedMotion={reducedMotion} />

          {/* Layer 2 — Nodes */}
          <SourceCluster isVisible={isVisible} />
          <CenterHub isVisible={isVisible} reducedMotion={reducedMotion} />
          <DestinationCluster isVisible={isVisible} />

          {/* Layer 3 — Data badges */}
          <DataBadges isVisible={isVisible} />

          {/* Decorative corner brackets */}
          <g opacity="0.06">
            <path d="M 20 20 L 20 8 L 32 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 968 8 L 980 8 L 980 20" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 20 200 L 20 212 L 32 212" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 968 212 L 980 212 L 980 200" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}
