import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/app/api/auth/[...nextauth]/route'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  const protectedRoutes = ['/dashboard', '/cedula', '/banco', '/tarjeta', '/licencias', '/casino', '/propiedades', '/trabajos', '/inversiones', '/vehiculos', '/historia']
  const staffRoutes = ['/staff']
  const carabinerosRoutes = ['/policial']
  const pdiRoutes = ['/pdi']

  const isLoggedIn = !!session?.user

  if (!isLoggedIn && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (staffRoutes.some(route => pathname.startsWith(route))) {
    const allowed = process.env.STAFF_ROLES?.split(',') || []
    const userRole = (session?.user as any)?.roleId || ''
    if (!allowed.includes(userRole)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (carabinerosRoutes.some(route => pathname.startsWith(route))) {
    const allowed = process.env.CARABINEROS_ROLES?.split(',') || []
    const userRole = (session?.user as any)?.roleId || ''
    if (!allowed.includes(userRole)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (pdiRoutes.some(route => pathname.startsWith(route))) {
    const allowed = process.env.PDI_ROLES?.split(',') || []
    const userRole = (session?.user as any)?.roleId || ''
    if (!allowed.includes(userRole)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
