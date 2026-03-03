import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest): NextResponse {
  const response = intlMiddleware(request);

  // Ensure root redirect is permanent (308) for SEO crawl efficiency
  if (request.nextUrl.pathname === '/' && response.status === 307) {
    const url = response.headers.get('location');
    if (url) {
      return NextResponse.redirect(new URL(url, request.url), 308);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
