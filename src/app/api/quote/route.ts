import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { getCountryByCode } from '@/data/countries';
import { CONTACT_EMAIL } from '@/lib/constants';

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

/**
 * Escape user input before it goes into the notification e-mail.
 *
 * Every field below is attacker-controlled — the product list comes from the
 * browser's quote store, so a crafted POST can put arbitrary markup in it.
 * Without this, a phishing link renders inside a mail that looks like it came
 * from our own site.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const quoteRequestSchema = z.object({
  contactName: z.string().max(120).optional(),
  companyName: z.string().min(2).max(160),
  email: z.string().email().max(254),
  phone: z.string().max(40).optional(),
  country: z.string().min(2).max(64),
  message: z.string().max(4000).optional(),
  products: z
    .array(
      z.object({
        productId: z.string().max(120),
        productName: z.string().max(200),
        category: z.string().max(120),
      }),
    )
    .max(200)
    .optional(),
});

// ponytail: per-instance in-memory window. Serverless runs several instances,
// so the effective limit is RATE_LIMIT x instances — enough to stop a script
// hammering the Resend quota, not enough for a distributed flood. Move to
// Upstash/Vercel KV if abuse gets real.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Drop cold entries so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}

type QuoteProduct = z.infer<typeof quoteRequestSchema>['products'] extends (infer T)[] | undefined
  ? T
  : never;

function buildProductRowsHtml(products: QuoteProduct[]): string {
  return products
    .map(
      (p) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #1a2332;">
            ${escapeHtml(p.productName)}
          </td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            ${escapeHtml(p.category)}
          </td>
        </tr>`,
    )
    .join('');
}

function buildQuoteEmailHtml(data: z.infer<typeof quoteRequestSchema>): string {
  const countryData = getCountryByCode(data.country);
  const countryName = countryData
    ? `${countryData.name}${countryData.subRegion ? ` (${countryData.subRegion})` : ''}`
    : data.country;
  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Hong_Kong',
  });
  const hasProducts = data.products && data.products.length > 0;

  const productsSection = hasProducts
    ? `
      <div style="margin-top: 28px;">
        <h2 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #0f2b3c;">
          Requested Products (${data.products!.length})
        </h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; border-collapse: separate; overflow: hidden;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Product</th>
              <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">Category</th>
            </tr>
          </thead>
          <tbody>
            ${buildProductRowsHtml(data.products!)}
          </tbody>
        </table>
      </div>`
    : `
      <div style="margin-top: 28px; padding: 16px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; font-size: 14px; color: #92400e;">
          No specific products selected — the client is looking for a general quote.
        </p>
      </div>`;

  const messageSection = data.message
    ? `
      <div style="margin-top: 28px;">
        <h2 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #0f2b3c;">
          Message
        </h2>
        <div style="padding: 16px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
          <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      </div>`
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background-color: #0f2b3c; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                New Quote Request
              </h1>
              <p style="margin: 6px 0 0; font-size: 14px; color: #94a3b8;">
                ${submittedAt} (HKT)
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px; border-radius: 0 0 12px 12px;">

              <!-- Client info cards -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding-right: 8px; vertical-align: top;">
                    <div style="padding: 16px; background-color: #f0f9ff; border-radius: 8px;">
                      <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em;">Company</p>
                      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0f2b3c;">${escapeHtml(data.companyName)}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 8px; vertical-align: top;">
                    <div style="padding: 16px; background-color: #f0f9ff; border-radius: 8px;">
                      <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em;">Country</p>
                      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0f2b3c;">${escapeHtml(countryName)}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Contact & Email -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
                <tr>
                  <td width="50%" style="padding-right: 8px; vertical-align: top;">
                    <div style="padding: 16px; background-color: #f0f9ff; border-radius: 8px;">
                      <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em;">Contact</p>
                      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0f2b3c;">${escapeHtml(data.contactName || 'Not provided')}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 8px; vertical-align: top;">
                    <div style="padding: 16px; background-color: #f0f9ff; border-radius: 8px;">
                      <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em;">Email</p>
                      <a href="mailto:${escapeHtml(data.email)}" style="font-size: 16px; font-weight: 600; color: #0f2b3c; text-decoration: none;">${escapeHtml(data.email)}</a>
                    </div>
                  </td>
                </tr>
              </table>${
                data.phone
                  ? `

              <!-- Phone -->
              <div style="margin-top: 16px; padding: 16px; background-color: #f0f9ff; border-radius: 8px;">
                <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em;">Phone</p>
                <a href="tel:${escapeHtml(data.phone)}" style="font-size: 16px; font-weight: 600; color: #0f2b3c; text-decoration: none;">${escapeHtml(data.phone)}</a>
              </div>`
                  : ''
              }

              ${productsSection}
              ${messageSection}

              <!-- Reply CTA -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${escapeHtml(data.email)}?subject=Re: Quote Request — ${encodeURIComponent(data.companyName)}&body=${encodeURIComponent(`Hi${data.contactName ? ` ${data.contactName}` : ''},\n\nThank you for your interest in Watu Care. We're happy to assist with your quote request.\n\n`)}" style="display: inline-block; padding: 14px 32px; background-color: #0284c7; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                  Reply to ${escapeHtml(data.contactName || data.companyName)}
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Watu Care — Hong Kong &nbsp;|&nbsp; watu-care.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildQuoteEmailText(data: z.infer<typeof quoteRequestSchema>): string {
  const countryData = getCountryByCode(data.country);
  const countryName = countryData ? countryData.name : data.country;
  const productList = data.products?.length
    ? data.products
        .map((p) => `  • ${escapeHtml(p.productName)} (${escapeHtml(p.category)})`)
        .join('\n')
    : 'No specific products selected';

  return [
    `NEW QUOTE REQUEST`,
    `${'='.repeat(40)}`,
    '',
    data.contactName ? `Contact: ${data.contactName}` : null,
    `Company: ${data.companyName}`,
    `Email:   ${data.email}`,
    data.phone ? `Phone:   ${data.phone}` : null,
    `Country: ${countryName}`,
    '',
    `Products:`,
    productList,
    '',
    data.message ? `Message:\n${data.message}` : null,
    '',
    `Submitted: ${new Date().toISOString()}`,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const ip = clientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(RATE_WINDOW_MS / 1000) } },
      );
    }

    const body: unknown = await request.json();
    const data = quoteRequestSchema.parse(body);

    // Log for server-side visibility (structured for log aggregation)
    // eslint-disable-next-line no-console -- Structured server log for monitoring
    console.info('[quote-request]', {
      company: data.companyName,
      email: data.email,
      country: data.country,
      productCount: data.products?.length ?? 0,
      timestamp: new Date().toISOString(),
    });

    const recipient = process.env.QUOTE_EMAIL_TO || CONTACT_EMAIL;

    // Sending from a third-party domain means SPF/DKIM are aligned to that
    // domain, not ours — worse deliverability, and the address is visible to
    // whoever reads the mail. Set QUOTE_EMAIL_FROM to a verified watu-care.com
    // sender in Resend.
    const sender = process.env.QUOTE_EMAIL_FROM || `Watu Care Quotes <quotes@watu-care.com>`;

    const resendClient = getResendClient();
    const productCount = data.products?.length ?? 0;
    const subjectSuffix = productCount > 0 ? ` (${productCount} products)` : '';
    const { error } = await resendClient.emails.send({
      from: sender,
      to: recipient,
      replyTo: data.email,
      subject: `Quote Request: ${data.companyName}${subjectSuffix}`,
      html: buildQuoteEmailHtml(data),
      text: buildQuoteEmailText(data),
    });

    if (error) {
      console.error('[quote-request] Email send failed:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send quote request' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, message: 'Quote request received' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }

    console.error('[quote-request] Unexpected error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
