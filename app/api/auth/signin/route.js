import { connect } from '@/connectDB';
import User from '@/models/UserModal';
import { NextResponse } from 'next/server';
import { comparePassword } from '@/utils/passwordUtil';
import { createJWT } from '@/utils/tokenUtil';

export const POST = async (req) => {
  try {
    await connect();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse('Invalid credentials', {
        status: 400,
      });
    }

    const user = await User.findOne({ email });

    const isValidUser =
      user && (await comparePassword(password, user.password));

    if (!isValidUser) {
      return new NextResponse('Invalid Credentials', { status: 400 });
    }

    const token = createJWT({ userId: user.id, name: user.name });

    const oneDay = 1000 * 60 * 60 * 24;
    const response = NextResponse.json({ msg: 'Logged in successfully.' });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + oneDay),
    });

    return response;
  } catch (error) {
    console.log('[SIGN_IN_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
