'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X, ChevronRight, Globe, Linkedin } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { trackNavClick } from '@/lib/analytics';
import { LanguageSwitcher } from '@/components/ui';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  navLinks: NavLink[];
  onClose: () => void;
}

export function MobileDrawer({ isOpen, navLinks, onClose }: MobileDrawerProps): React.ReactElement | null {
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('nav');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Scroll lock when drawer is open
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

  // Focus trap within mobile menu
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
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
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-secondary/30 animate-backdrop-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t('mobileNav')}
        className="absolute right-0 top-0 h-full w-full max-w-[300px] animate-slide-in-right flex flex-col bg-white/95 backdrop-blur-xl shadow-depth-lg"
      >
        {/* Drawer Header */}
        <div className="flex h-14 items-center justify-between border-b border-border/30 px-5">
          <Image
            src="/logo.png"
            alt="Watu Care"
            width={120}
            height={35}
            className="h-7 w-auto"
            style={{ width: 'auto' }}
          />
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-secondary/60 transition-colors hover:bg-secondary/5 hover:text-secondary active:scale-[0.95]"
            aria-label={t('closeNavigation')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="space-y-0.5">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'stagger-item flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-secondary transition-all hover:bg-secondary/5 active:scale-[0.98]',
                  `stagger-delay-${index + 1}`
                )}
                onClick={() => {
                  trackNavClick(link.href, 'mobile');
                  handleClose();
                }}
              >
                {link.label}
                <ChevronRight className="h-4 w-4 text-secondary/30" />
              </Link>
            ))}
          </div>

          {/* Language Section */}
          <div className="mt-8 border-t border-border/30 pt-6">
            <div
              className={cn(
                'stagger-item mb-3 flex items-center gap-2 px-4 text-xs font-medium uppercase tracking-wider text-secondary/40',
                'stagger-delay-4'
              )}
            >
              <Globe className="h-3.5 w-3.5" />
              {t('language')}
            </div>
            <div className={cn('stagger-item px-2', 'stagger-delay-5')}>
              <LanguageSwitcher />
            </div>
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="border-t border-border/30 px-5 py-4 bg-muted/30">
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://www.linkedin.com/company/watu-care"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-secondary/40 transition-colors hover:text-primary"
              aria-label="Watu Care on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              <span className="text-xs font-medium">LinkedIn</span>
            </a>
          </div>
          <p className="mt-2 text-center text-xs text-secondary/30">
            &copy; {new Date().getFullYear()} Watu Care
          </p>
        </div>
      </div>
    </div>
  );
}
