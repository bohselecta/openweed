import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/onboard/register', request.url))
    }
    
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Driver dashboard protection (if implemented)
  if (pathname.startsWith('/driver-dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/onboard/register', request.url))
    }
    
    if (token.role !== 'DRIVER') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // API routes protection
  if (pathname.startsWith('/api/admin')) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  if (pathname.startsWith('/api/drivers') && request.method !== 'GET') {
    if (!token || (token.role !== 'ADMIN' && token.role !== 'DRIVER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  if (pathname.startsWith('/api/products') && request.method !== 'GET') {
    if (!token || (token.role !== 'ADMIN' && token.role !== 'DRIVER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  if (pathname.startsWith('/api/orders')) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  if (pathname.startsWith('/api/chat') && request.method !== 'GET') {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/driver-dashboard/:path*',
    '/api/admin/:path*',
    '/api/drivers/:path*',
    '/api/products/:path*',
    '/api/orders/:path*',
    '/api/chat/:path*',
  ],
}
