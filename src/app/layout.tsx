import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Watu Care - Premium Medical Devices & PPE Wholesale',
  description:
    'We deliver premium medical devices and PPE, ensuring quality and accessibility where it matters most. Connecting Asia\'s manufacturers with healthcare providers across Africa and the Middle East.',
  keywords: [
    'medical devices',
    'PPE',
    'wholesale medical supplies',
    'B2B medical',
    'healthcare equipment',
    'medical consumables',
    'Africa healthcare',
    'Middle East medical supplies',
  ],
  authors: [{ name: 'Watu Care' }],
  openGraph: {
    title: 'Watu Care - Premium Medical Devices & PPE Wholesale',
    description:
      'Connecting Asia\'s leading manufacturers with healthcare providers across Africa and the Middle East.',
    type: 'website',
    url: 'https://watu-care.com',
    siteName: 'Watu Care',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watu Care - Premium Medical Devices & PPE',
    description:
      'Quality and accessibility where it matters most.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
