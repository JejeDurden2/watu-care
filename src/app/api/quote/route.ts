import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  return new Resend(apiKey);
}

const quoteRequestSchema = z.object({
  companyName: z.string().min(2),
  email: z.string().email(),
  country: z.string().min(2),
  message: z.string().optional(),
  products: z
    .array(
      z.object({
        productId: z.string(),
        productName: z.string(),
        category: z.string(),
      }),
    )
    .optional(),
});

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: unknown = await request.json();
    const data = quoteRequestSchema.parse(body);

    // Format product list for the email body
    const productList = data.products?.length
      ? data.products
          .map((p) => `  - ${p.productName} (${p.category})`)
          .join('\n')
      : 'No specific products selected';

    const emailBody = [
      `New Quote Request from ${data.companyName}`,
      '',
      `Company: ${data.companyName}`,
      `Email: ${data.email}`,
      `Country: ${data.country}`,
      `Message: ${data.message || 'N/A'}`,
      '',
      'Products:',
      productList,
      '',
      `Submitted: ${new Date().toISOString()}`,
    ].join('\n');

    // Log for server-side visibility (structured for log aggregation)
    console.info('[quote-request]', {
      company: data.companyName,
      email: data.email,
      country: data.country,
      productCount: data.products?.length ?? 0,
      timestamp: new Date().toISOString(),
    });

    const recipient = process.env.QUOTE_EMAIL_TO || 'contact@watu-care.com';

    const resendClient = getResendClient();
    const { error } = await resendClient.emails.send({
      from: 'Watu Care Quotes <onboarding@resend.dev>',
      to: recipient,
      subject: `Quote Request: ${data.companyName}`,
      text: emailBody,
    });

    if (error) {
      console.error('[quote-request] Email send failed:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send quote request' },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { success: true, message: 'Quote request received' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 },
      );
    }

    console.error('[quote-request] Unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}
