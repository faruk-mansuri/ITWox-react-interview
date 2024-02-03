import { connect } from '@/connectDB';
import User from '@/models/UserModal';
import { NextResponse } from 'next/server';
import { hashPassword } from '@/utils/passwordUtil';

export const POST = async (req) => {
  try {
    await connect();
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse('name, email and password are required', {
        status: 400,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse('Email all ready exists.', {
        status: 400,
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ msg: 'user created successfully' });
  } catch (error) {
    console.log('[SIGN_IN_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
