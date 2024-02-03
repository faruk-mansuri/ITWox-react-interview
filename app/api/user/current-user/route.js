import { NextResponse } from 'next/server';
import User from '@/models/UserModal';
import { connect } from '@/connectDB';
import { getDataFromToken } from '@/utils/getDataFromToken';

export const GET = async (request) => {
  try {
    await connect();

    const userId = await getDataFromToken(request);
    if (!userId) return new NextResponse('User not found', { status: 404 });

    const user = await User.findById(userId).select('-password');

    return NextResponse.json({ user });
  } catch (error) {
    console.log('CURRENT_USER_ERROR', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
