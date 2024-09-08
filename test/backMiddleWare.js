import { NextResponse } from 'next/server';
import { verifyToken } from '../../lib/auth';

const rolePermissions = {
  admin: ['/api/admin/*', '/api/settings/*'],
  editor: ['/api/admin/*'],
  viewer: [],
};

export function middleware(req) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = verifyToken(token);

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userRole = user.role;
  const pathname = req.nextUrl.pathname;

  const allowedRoutes = rolePermissions[userRole] || [];
  const isAllowed = allowedRoutes.some(route => pathname.startsWith(route));

  if (!isAllowed) {
    return new Response('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}
