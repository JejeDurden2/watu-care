import { ImageResponse } from 'next/og';

// Shared OG-image frame. Reuses the root opengraph-image.tsx visual language
// (brand gradient, radial dot grid, pill badge, accent #5fb8a5, system-ui).
// English-only on purpose: OG cards are brand assets, not localized content.

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface OgFrameProps {
  badge: string;
  title: string;
  subtitle?: string;
  /** Bottom bar. Defaults to the brand line so every card is branded. */
  footer?: string;
}

export function ogImage({
  badge,
  title,
  subtitle,
  footer = 'Watu Care — Premium Medical Supplies for Africa & Middle East',
}: OgFrameProps): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a3a52 0%, #2d5a7b 50%, #3d8b8b 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            textAlign: 'center',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '28px',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#5fb8a5' }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px' }}>{badge}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: 'white',
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              maxWidth: '1000px',
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              style={{
                fontSize: '26px',
                color: '#5fb8a5',
                margin: '20px 0 0 0',
                fontWeight: 500,
                maxWidth: '900px',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '18px',
          }}
        >
          {footer}
        </div>
      </div>
    ),
    { ...size },
  );
}
