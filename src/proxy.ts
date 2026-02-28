import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Something like protected routes
export async function proxy(request: NextRequest) {
    // Using getToken function only will work  in case like middleware or route handler
    // getToken: Read and decode the NextAuth JWT token from cookies inside middleware or route handlers
    // It does NOT return your original backend token automatically 
    // And that the importance of storing it inside the NextAuth JWT (we already did that)
    // It Reads the NextAuth session token, then Decodes it, then Returns its payload
    const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  const { pathname } = request.nextUrl
  const authPages = ["/login", "/register"].includes(pathname)

  // If logged in → prevent login/register
  if (token && authPages) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If not logged → protect pages
  if (!token && !authPages) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/userCart/:path*",
    "/userWhishlist/:path*",
    "/login",
    "/register",
  ],
}
