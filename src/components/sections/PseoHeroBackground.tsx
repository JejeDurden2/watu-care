/**
 * Atmospheric background for pSEO page heroes.
 * Exact same mesh-gradient blobs + spotlight as the main Hero.
 * Does NOT include the ECG pulse (that's in-flow in the main hero, not a bg layer).
 */
export function PseoHeroBackground(): React.ReactElement {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Living mesh blobs — same as main Hero */}
      <div
        className="hero-mesh-1 absolute -left-[20%] -top-[20%] h-[80%] w-[70%] rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(200 65% 55%), transparent 70%)' }}
      />
      <div
        className="hero-mesh-2 absolute -bottom-[25%] -right-[15%] h-[75%] w-[65%] rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(175 50% 45%), transparent 70%)' }}
      />
      <div
        className="hero-mesh-3 absolute left-[20%] top-[15%] h-[60%] w-[55%] rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(200 65% 70%), transparent 65%)' }}
      />
      <div
        className="hero-mesh-4 absolute -right-[10%] -top-[15%] h-[55%] w-[50%] rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(175 50% 50%), transparent 70%)' }}
      />

      {/* Central spotlight */}
      <div
        className="hero-spotlight absolute left-1/2 top-[40%] h-[50%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(ellipse, hsl(200 65% 55% / 0.12), hsl(175 50% 45% / 0.04) 50%, transparent 70%)' }}
      />

      {/* Dot pattern */}
      <div className="pattern-dots-light absolute inset-0 opacity-30" />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, hsl(206 50% 10% / 0.6) 100%)' }}
      />
    </div>
  );
}
