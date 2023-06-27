import { NextResponse } from 'next/server'
import { verifyToken } from './utils/jwt.utils'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // return NextResponse.redirect(new URL('/home', request.url))
  const token = await request.cookies.get('access_token')?.value
  const isAuthorized = await verifyToken(token)
  // console.log('>>', token, isAuthorized)
  return
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}