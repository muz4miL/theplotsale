import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

function clearAdminCookie(response) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    maxAge: 0,
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function POST() {
  const response = NextResponse.json(
    {
      success: true,
      message: 'Signed out successfully.',
    },
    { status: 200 }
  );
  clearAdminCookie(response);
  return response;
}
