import { NextResponse } from 'next/server';

const ADMIN_COOKIE_NAME = 'lavita_admin_auth';
const ADMIN_COOKIE_VALUE = 'authenticated';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = authCookie === ADMIN_COOKIE_VALUE;
  const isLoginRoute = pathname === '/admin/login';

  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (pathname.startsWith('/admin') && !isLoginRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
