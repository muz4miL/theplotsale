import { NextResponse } from 'next/server';

const ADMIN_COOKIE_NAME = 'lavita_admin_auth';
const ADMIN_COOKIE_VALUE = 'authenticated';

export async function POST(request) {
  try {
    const body = await request.json();
    const rawPassword = typeof body?.password === 'string' ? body.password : '';
    /* .env values often pick up accidental spaces/newlines when pasted; trim avoids false 401s. */
    const submitted = rawPassword.trim();
    const adminPassword = (process.env.ADMIN_PASSWORD ?? '').trim();

    if (!adminPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'ADMIN_PASSWORD is not configured on the server.',
        },
        { status: 500 }
      );
    }

    if (!submitted || submitted !== adminPassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid admin password.',
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: 'Authenticated successfully.',
      },
      { status: 200 }
    );

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: ADMIN_COOKIE_VALUE,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unable to process login request.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
