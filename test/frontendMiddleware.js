import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/auth';

// Define roles and permissions
const rolePermissions = {
  admin: ['/admin/*', '/settings/*'],
  editor: ['/admin/*'],
  viewer: [],
};

export function middleware(req) {
  const token = req.cookies.get('token');
  const user = verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const userRole = user.role;
  const pathname = req.nextUrl.pathname;

  const allowedRoutes = rolePermissions[userRole] || [];
  const isAllowed = allowedRoutes.some(route => pathname.startsWith(route));

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  return NextResponse.next();
}
