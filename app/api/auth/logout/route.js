import { NextResponse } from 'next/server';

export const GET = async (req) => {
  try {
    const response = NextResponse.json({ msg: 'Logged out successfully' });
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    return response;
  } catch (error) {
    console.log('[LOGOUT_ERROR]', error);
    return new NextResponse('Internal Error', error);
  }
};
