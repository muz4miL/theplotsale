import { NextResponse } from 'next/server';

export const ADMIN_COOKIE_NAME = 'lavita_admin_auth';
export const ADMIN_COOKIE_VALUE = 'authenticated';

export function ensureAdminRequest(request) {
  const authCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = authCookie === ADMIN_COOKIE_VALUE;

  if (isAuthenticated) {
    return null;
  }

  return NextResponse.json(
    {
      success: false,
      message: 'Unauthorized admin request.',
    },
    { status: 401 }
  );
}
