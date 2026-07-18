'use client';

import { useRef, useState } from 'react';
import { z } from 'zod';
import { Send, Loader2, Shield, Clock, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { countries } from '@/data/countries';
import {
  trackQuoteFormStart,
  trackQuoteFormSubmit,
  trackQuoteFormError,
} from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface ContactFormData {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

const africaCountries = countries.filter((c) => c.region === 'africa');
const middleEastCountries = countries.filter((c) => c.region === 'middle-east');

const inputClasses =
  'w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary';

export function ContactForm(): React.ReactElement {
  const t = useTranslations('contact.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Mirrors the server Zod schema in src/app/api/quote/route.ts
  const schema = z.object({
    contactName: z.string().optional(),
    companyName: z.string().min(2, t('validation.companyRequired')),
    email: z.string().email(t('validation.emailInvalid')),
    phone: z.string().optional(),
    country: z.string().min(2, t('validation.countryRequired')),
    message: z.string().optional(),
  });
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);
  const [formData, setFormData] = useState<ContactFormData>({
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });

  const handleFirstInteraction = (): void => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackQuoteFormStart(0);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
      });
      setErrors(fieldErrors);
      trackQuoteFormError('validation');
      const firstErrorField = result.error.issues[0]?.path[0] as string | undefined;
      if (firstErrorField && formRef.current) {
        formRef.current.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }
      trackQuoteFormSubmit(0, formData.country);
      setSubmitted(true);
    } catch {
      trackQuoteFormError('api_error');
      setSubmitError(t('validation.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden="true" />
        </div>
        <h3 className="font-display text-xl font-bold text-secondary">{t('success.title')}</h3>
        <p className="mt-2 text-muted-foreground">{t('success.message')}</p>
      </div>
    );
  }

  const describedBy = (field: keyof ContactFormData): string | undefined =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onFocus={handleFirstInteraction}
      noValidate
      className="space-y-4"
    >
      <div>
        <label htmlFor="contactName" className="mb-1 block text-sm font-medium text-foreground">
          {t('name')}
        </label>
        <input
          type="text"
          id="contactName"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          placeholder={t('namePlaceholder')}
          autoComplete="name"
          className={cn(inputClasses, 'border-border')}
        />
      </div>

      <div>
        <label htmlFor="companyName" className="mb-1 block text-sm font-medium text-foreground">
          {t('company')} *
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          required
          value={formData.companyName}
          onChange={handleChange}
          placeholder={t('companyPlaceholder')}
          autoComplete="organization"
          aria-required="true"
          aria-invalid={!!errors.companyName}
          aria-describedby={describedBy('companyName')}
          className={cn(inputClasses, errors.companyName ? 'border-red-500' : 'border-border')}
        />
        {errors.companyName && (
          <p id="companyName-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.companyName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
          {t('email')} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          inputMode="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder={t('emailPlaceholder')}
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={describedBy('email')}
          className={cn(inputClasses, errors.email ? 'border-red-500' : 'border-border')}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-foreground">
          {t('phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          inputMode="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t('phonePlaceholder')}
          autoComplete="tel"
          className={cn(inputClasses, 'border-border')}
        />
      </div>

      <div>
        <label htmlFor="country" className="mb-1 block text-sm font-medium text-foreground">
          {t('country')} *
        </label>
        <select
          id="country"
          name="country"
          required
          value={formData.country}
          onChange={handleChange}
          autoComplete="country"
          aria-required="true"
          aria-invalid={!!errors.country}
          aria-describedby={describedBy('country')}
          className={cn(inputClasses, errors.country ? 'border-red-500' : 'border-border')}
        >
          <option value="">{t('countryPlaceholder')}</option>
          <optgroup label={t('regions.africa')}>
            {africaCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </optgroup>
          <optgroup label={t('regions.middleEast')}>
            {middleEastCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </optgroup>
        </select>
        {errors.country && (
          <p id="country-error" role="alert" className="mt-1 text-sm text-red-600">
            {errors.country}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('messagePlaceholder')}
          rows={3}
          className={cn(inputClasses, 'resize-none border-border')}
        />
      </div>

      {submitError && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            {t('submitting')}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('submit')}
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-4 pt-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {t('trustResponseTime')}
        </span>
        <span className="flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" aria-hidden="true" />
          {t('trustPrivacy')}
        </span>
      </div>
    </form>
  );
}
