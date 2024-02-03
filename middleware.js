import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  if (path === '/signin' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (path === '/dashboard' && !token)
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/signin', '/', '/dashboard/:path*'],
};
