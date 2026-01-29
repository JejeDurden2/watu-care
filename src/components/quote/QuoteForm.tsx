'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Send, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { countries } from '@/data/countries';
import { useQuoteStore } from '@/lib/quote-store';

interface QuoteFormData {
  companyName: string;
  email: string;
  country: string;
  message?: string;
}

function createQuoteFormSchema(t: (key: string) => string) {
  return z.object({
    companyName: z.string().min(2, t('validation.companyRequired')),
    email: z.string().email(t('validation.emailInvalid')),
    country: z.string().min(2, t('validation.countryRequired')),
    message: z.string().optional(),
  });
}

interface QuoteFormProps {
  onSuccess: () => void;
}

export function QuoteForm({ onSuccess }: QuoteFormProps): React.ReactElement {
  const t = useTranslations('quote');
  const { items, clearItems } = useQuoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const quoteFormSchema = createQuoteFormSchema(t);
  const [formData, setFormData] = useState<QuoteFormData>({
    companyName: '',
    email: '',
    country: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev: QuoteFormData) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev: Partial<Record<keyof QuoteFormData, string>>) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = quoteFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
      result.error.issues.forEach((error) => {
        const field = error.path[0] as keyof QuoteFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Log the submission data (ready for future API integration)
    const submissionData = {
      ...formData,
      products: items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        category: item.categoryTitle,
      })),
      submittedAt: new Date().toISOString(),
    };

    console.log('Quote Request Submitted:', submissionData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    clearItems();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder={t('form.companyPlaceholder')}
          className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.companyName ? 'border-red-500' : 'border-border'
          }`}
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
          value={formData.email}
          onChange={handleChange}
          placeholder={t('form.emailPlaceholder')}
          className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.email ? 'border-red-500' : 'border-border'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
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
          className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.country ? 'border-red-500' : 'border-border'
          }`}
        >
          <option value="">{t('form.countryPlaceholder')}</option>
          <optgroup label={t('regions.africa')}>
            {countries
              .filter((c) => c.region === 'africa')
              .map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
          </optgroup>
          <optgroup label={t('regions.middleEast')}>
            {countries
              .filter((c) => c.region === 'middle-east')
              .map((country) => (
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
          placeholder={t('form.messagePlaceholder')}
          rows={3}
          className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

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
    </form>
  );
}
