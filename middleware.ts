import { type NextRequest, NextResponse } from 'next/server';
import { homeRoute,loginRoute,sessionConsts,protectedRoutes } from './private.consts';
import { decrypt } from './lib/signSession';

export default async function middleware(request: NextRequest) {
  const cryptedCookies = request.cookies.get(sessionConsts.cookiesName)?.value || '';
  const session = await decrypt(cryptedCookies)


  // redirect to login if not session
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(loginRoute, request.nextUrl.origin));
  }

  // redirect to home if session and login 
  if (session && request.nextUrl.pathname === loginRoute) {
    return NextResponse.redirect(new URL(homeRoute, request.nextUrl.origin));
  }

  return NextResponse.next();
}