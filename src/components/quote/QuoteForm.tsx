'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { countries } from '@/data/countries';
import { useQuoteStore } from '@/lib/quote-store';

const quoteFormSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email'),
  country: z.string().min(2, 'Please select a country'),
  message: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface QuoteFormProps {
  onSuccess: () => void;
}

export function QuoteForm({ onSuccess }: QuoteFormProps): React.ReactElement {
  const { items, clearItems } = useQuoteStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof QuoteFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
          Company Name *
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Your company"
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
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
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
          Country *
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
          <option value="">Select your country</option>
          <optgroup label="Africa">
            {countries
              .filter((c) => c.region === 'africa')
              .map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Middle East">
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
          Message (optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Quantities, specifications, questions..."
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
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Quote Request
          </>
        )}
      </Button>
    </form>
  );
}
