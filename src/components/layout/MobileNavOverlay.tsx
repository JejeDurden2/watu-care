'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X, Globe, Linkedin } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { trackNavClick } from '@/lib/analytics';
import { LanguageSwitcher } from '@/components/ui';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavOverlayProps {
  isOpen: boolean;
  navLinks: NavLink[];
  onClose: () => void;
}

export function MobileNavOverlay({
  isOpen,
  navLinks,
  onClose,
}: MobileNavOverlayProps): React.ReactElement | null {
  const overlayRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('nav');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Scroll lock when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Focus trap within overlay
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      id="mobile-nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t('mobileNav')}
      className="fixed inset-0 z-[60] flex flex-col bg-white/[0.97] backdrop-blur-sm animate-nav-overlay-in lg:hidden"
    >
      {/* Header — logo + close */}
      <div className="flex items-center justify-between px-5 py-5">
        <Link href="/" onClick={handleClose} className="rounded-lg">
          <Image
            src="/logo.png"
            alt="Watu Care"
            width={160}
            height={46}
            className="h-10 w-auto"
            style={{ width: 'auto' }}
          />
        </Link>
        <button
          type="button"
          onClick={handleClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-secondary/50 transition-colors hover:bg-secondary/5 hover:text-secondary active:scale-[0.95]"
          aria-label={t('closeNavigation')}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links — large, left-aligned with accent bars */}
      <nav className="flex-1 overflow-y-auto px-6 py-8">
        <div className="space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'stagger-item block border-l-[3px] border-accent/60 py-3 pl-6 text-2xl font-bold text-secondary transition-all hover:border-accent hover:text-accent active:scale-[0.98]',
                `stagger-delay-${index + 1}`
              )}
              style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}
              onClick={() => {
                trackNavClick(link.href, 'mobile');
                handleClose();
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Language Section */}
        <div className="mt-12 border-t border-border/30 pt-8">
          <div
            className={cn(
              'stagger-item mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary/40',
              'stagger-delay-5'
            )}
          >
            <Globe className="h-3.5 w-3.5" />
            {t('language')}
          </div>
          <div className={cn('stagger-item', 'stagger-delay-6')}>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border/20 px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-secondary/30">
            &copy; {new Date().getFullYear()} Watu Care
          </p>
          <a
            href="https://www.linkedin.com/company/watu-care"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-secondary/35 transition-colors hover:text-primary"
            aria-label="Watu Care on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            <span className="text-xs font-medium">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}
