import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
}));

vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: { send: mockSend },
  })),
}));

// Set env var before importing the route (getResendClient checks for it)
vi.stubEnv('RESEND_API_KEY', 're_test_123');

import { POST } from '@/app/api/quote/route';

function createRequest(body: unknown): Request {
  return new Request('http://localhost/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/quote', () => {
  beforeEach(() => {
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockSend.mockClear();
    mockSend.mockResolvedValue({ data: { id: 'test-id' }, error: null });
  });

  it('returns 200 for valid request data', async () => {
    const response = await POST(
      createRequest({
        companyName: 'Test Hospital',
        email: 'test@example.com',
        country: 'AE',
      }),
    );

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.message).toBe('Quote request received');
  });

  it('returns 200 with optional products and message', async () => {
    const response = await POST(
      createRequest({
        companyName: 'Test Hospital',
        email: 'test@example.com',
        country: 'AE',
        message: 'Need urgent delivery',
        products: [
          {
            productId: 'latex-exam-gloves-powdered',
            productName: 'Powdered Latex Exam Gloves',
            category: 'Gloves',
          },
        ],
      }),
    );

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });

  it('returns 400 for missing required fields', async () => {
    const response = await POST(
      createRequest({
        email: 'test@example.com',
      }),
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
  });

  it('returns 400 for invalid email', async () => {
    const response = await POST(
      createRequest({
        companyName: 'Test Hospital',
        email: 'not-an-email',
        country: 'AE',
      }),
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it('returns 400 for company name too short', async () => {
    const response = await POST(
      createRequest({
        companyName: 'A',
        email: 'test@example.com',
        country: 'AE',
      }),
    );

    expect(response.status).toBe(400);
  });

  it('returns 502 when email service fails', async () => {
    mockSend.mockResolvedValue({ data: null, error: { message: 'Rate limit exceeded' } });

    const response = await POST(
      createRequest({
        companyName: 'Test Hospital',
        email: 'test@example.com',
        country: 'AE',
      }),
    );

    expect(response.status).toBe(502);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it('returns 500 for malformed JSON', async () => {
    const request = new Request('http://localhost/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json',
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it('logs the quote request on success', async () => {
    await POST(
      createRequest({
        companyName: 'Test Hospital',
        email: 'test@example.com',
        country: 'AE',
      }),
    );

    expect(console.info).toHaveBeenCalledWith(
      '[quote-request]',
      expect.objectContaining({
        company: 'Test Hospital',
        email: 'test@example.com',
        country: 'AE',
      }),
    );
  });
});
