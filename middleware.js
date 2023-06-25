import { NextResponse } from 'next/server'
import { verifyToken } from './utils/jwt.utils'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // return NextResponse.redirect(new URL('/home', request.url))
  return
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}