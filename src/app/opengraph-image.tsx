import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Watu Care - Premium Medical Devices & PPE Wholesale';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage(): ImageResponse {
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
            padding: '40px',
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
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#5fb8a5',
              }}
            />
            <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px' }}>
              Trusted Healthcare Partner
            </span>
          </div>

          {/* Logo/Brand */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: 'white',
              margin: 0,
              letterSpacing: '-2px',
            }}
          >
            Watu Care
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '16px 0 0 0',
              maxWidth: '800px',
            }}
          >
            Premium Medical Devices & PPE Wholesale
          </p>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: '12px 0 0 0',
            }}
          >
            Asia → Africa & Middle East
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '32px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '16px',
          }}
        >
          <span>✓ ISO Certified Partners</span>
          <span>✓ 25+ Countries</span>
          <span>✓ 24-48h Response</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
