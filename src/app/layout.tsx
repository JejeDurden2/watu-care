import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1a3a52' },
    { media: '(prefers-color-scheme: dark)', color: '#1a3a52' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://watu-care.com'),
  title: {
    default: 'Watu Care - Premium Medical Supplies for Africa & Middle East',
    template: '%s | Watu Care',
  },
  description:
    "Premium medical devices and PPE from Asia's top manufacturers. B2B wholesale for healthcare facilities in Africa and the Middle East.",
  applicationName: 'Watu Care',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Watu Care',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexSans.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
