import { Inter } from 'next/font/google';
import './globals.css';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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
