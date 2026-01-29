import { auth } from './auth';

export const middleware = auth((req) => {
  // Redirect to signin if not authenticated
  if (!req.auth && !req.nextUrl.pathname.startsWith('/auth')) {
    const newUrl = new URL('/auth/signin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    // Protected routes
    '/',
    '/add',
    '/scan',
    '/goals',
    '/diary',
    // Exclude public routes
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};
