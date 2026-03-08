'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { z } from 'zod';
import { Send, Loader2, Shield, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { countries } from '@/data/countries';
import { useQuoteStore } from '@/lib/quote-store';
import { cn } from '@/lib/utils';

interface QuoteFormData {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  message?: string;
}

const EMAIL_TYPO_MAP: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gnail.com': 'gmail.com',
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yahho.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'hotmal.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmaill.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outloo.com': 'outlook.com',
  'outllook.com': 'outlook.com',
};

function detectEmailTypo(email: string): string | null {
  const parts = email.split('@');
  if (parts.length !== 2) return null;
  const domain = parts[1]?.toLowerCase();
  if (!domain) return null;
  const suggestion = EMAIL_TYPO_MAP[domain];
  if (suggestion) {
    return `${parts[0]}@${suggestion}`;
  }
  return null;
}

function createQuoteFormSchema(t: (key: string) => string) {
  return z.object({
    contactName: z.string().optional(),
    companyName: z.string().min(2, t('validation.companyRequired')),
    email: z.string().email(t('validation.emailInvalid')),
    phone: z.string().optional(),
    country: z.string().min(2, t('validation.countryRequired')),
    message: z.string().optional(),
  });
}

const africaCountries = countries.filter((c) => c.region === 'africa');
const middleEastCountries = countries.filter((c) => c.region === 'middle-east');

interface QuoteFormProps {
  onSuccess: () => void;
}

export function QuoteForm({ onSuccess }: QuoteFormProps): React.ReactElement {
  const t = useTranslations('quote');
  const { items, clearItems } = useQuoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const quoteFormSchema = useMemo(() => createQuoteFormSchema(t), [t]);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<QuoteFormData>({
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev: QuoteFormData) => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev: Partial<Record<keyof QuoteFormData, string>>) => ({ ...prev, [name]: undefined }));
    }
    if (name === 'email') {
      setEmailSuggestion(null);
    }
  };

  const handleEmailBlur = useCallback((): void => {
    if (formData.email) {
      const suggestion = detectEmailTypo(formData.email);
      setEmailSuggestion(suggestion);
    }
  }, [formData.email]);

  const acceptEmailSuggestion = useCallback((): void => {
    if (emailSuggestion) {
      setFormData((prev: QuoteFormData) => ({ ...prev, email: emailSuggestion }));
      setEmailSuggestion(null);
    }
  }, [emailSuggestion]);

  const trackFieldEvent = useCallback((fieldName: string, event: 'focus' | 'blur'): void => {
    if (typeof window !== 'undefined' && 'dataLayer' in window) {
      (window as Window & { dataLayer: Record<string, unknown>[] }).dataLayer.push({
        event: 'form_field_interaction',
        form_name: 'quote_request',
        field_name: fieldName,
        interaction_type: event,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    const result = quoteFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
      result.error.issues.forEach((error) => {
        const field = error.path[0] as keyof QuoteFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);

      // Focus first error field
      const firstErrorField = result.error.issues[0]?.path[0] as string | undefined;
      if (firstErrorField && formRef.current) {
        const el = formRef.current.querySelector<HTMLElement>(`[name="${firstErrorField}"]`);
        el?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          products: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            category: item.categoryTitle,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      clearItems();
      onSuccess();
    } catch {
      setSubmitError(t('validation.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = 'w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {/* Contact Name (optional) */}
      <div>
        <label
          htmlFor="contactName"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {t('form.contactName')}
        </label>
        <input
          type="text"
          id="contactName"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          onFocus={() => trackFieldEvent('contactName', 'focus')}
          onBlur={() => trackFieldEvent('contactName', 'blur')}
          placeholder={t('form.contactNamePlaceholder')}
          autoComplete="name"
          className={cn(inputClasses, 'border-border')}
        />
      </div>

      {/* Company Name */}
      <div>
        <label
          htmlFor="companyName"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {t('form.company')} *
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          onFocus={() => trackFieldEvent('companyName', 'focus')}
          onBlur={() => trackFieldEvent('companyName', 'blur')}
          placeholder={t('form.companyPlaceholder')}
          autoComplete="organization"
          className={cn(inputClasses, errors.companyName ? 'border-red-500' : 'border-border')}
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {t('form.email')} *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          inputMode="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => trackFieldEvent('email', 'focus')}
          onBlur={() => {
            trackFieldEvent('email', 'blur');
            handleEmailBlur();
          }}
          placeholder={t('form.emailPlaceholder')}
          autoComplete="email"
          className={cn(inputClasses, errors.email ? 'border-red-500' : 'border-border')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
        {emailSuggestion && !errors.email && (
          <p className="mt-1 text-sm text-amber-600">
            {t('form.emailSuggestion')}{' '}
            <button
              type="button"
              onClick={acceptEmailSuggestion}
              className="font-medium underline hover:no-underline"
            >
              {emailSuggestion}
            </button>
            ?
          </p>
        )}
      </div>

      {/* Phone (optional) */}
      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {t('form.phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          inputMode="tel"
          value={formData.phone}
          onChange={handleChange}
          onFocus={() => trackFieldEvent('phone', 'focus')}
          onBlur={() => trackFieldEvent('phone', 'blur')}
          placeholder={t('form.phonePlaceholder')}
          autoComplete="tel"
          className={cn(inputClasses, 'border-border')}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {t('form.phoneHint')}
        </p>
      </div>

      {/* Country */}
      <div>
        <label
          htmlFor="country"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {t('form.country')} *
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          onFocus={() => trackFieldEvent('country', 'focus')}
          onBlur={() => trackFieldEvent('country', 'blur')}
          autoComplete="country"
          className={cn(inputClasses, errors.country ? 'border-red-500' : 'border-border')}
        >
          <option value="">{t('form.countryPlaceholder')}</option>
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
          <p className="mt-1 text-sm text-red-500">{errors.country}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-foreground"
        >
          {t('form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => trackFieldEvent('message', 'focus')}
          onBlur={() => trackFieldEvent('message', 'blur')}
          placeholder={t('form.messagePlaceholder')}
          rows={3}
          className={cn(inputClasses, 'resize-none border-border')}
        />
      </div>

      {/* Submit Error */}
      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('form.submitting')}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {t('form.submit')}
          </>
        )}
      </Button>

      {/* Trust Signals */}
      <div className="flex flex-col items-center gap-2 pt-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {t('form.trustResponseTime')}
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5" />
            {t('form.trustPrivacy')}
          </span>
        </div>
      </div>
    </form>
  );
}
