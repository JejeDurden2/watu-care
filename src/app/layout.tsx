import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
    default: 'Watu Care - Premium Medical Devices & PPE Wholesale',
    template: '%s | Watu Care',
  },
  description:
    "Bridging Asia's leading manufacturers with healthcare providers across Africa and the Middle East. Premium medical devices and PPE wholesale.",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
