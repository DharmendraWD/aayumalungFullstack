// // src/proxy.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// export async function proxy(request) {
//   const { pathname } = request.nextUrl;
//   const authCookie = request.cookies.get('accessToken')?.value;

//   // Protect /admin/... except /admin/login
//   if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
//     if (!authCookie) return NextResponse.redirect(new URL('/admin/login', request.url));

//     try {
//       jwt.verify(authCookie, process.env.JWT_SECRET);
//     } catch {
//       return NextResponse.redirect(new URL('/admin/login', request.url));
//     }
//   }

//   // Redirect logged-in users away from login
//   if (pathname === '/admin/login' && authCookie) {
//     try {
//       jwt.verify(authCookie, process.env.JWT_SECRET);
//       return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//     } catch {
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*', '/admin/login'],
// };

// 2nd 
// src/proxy.js
// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// const PUBLIC_ROUTES = [
//   '/admin/login',
//   '/admin/register',
//   '/admin/forgot-password',
//   '/admin/verify-otp',
//   '/admin/verify-email',
//   '/admin/verifying-mail/[token]',
// ];

// export async function proxy(request) {
//   const { pathname } = request.nextUrl;
//   const authCookie = request.cookies.get('accessToken')?.value;

//   const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

//   // 🔒 Protect admin routes (except public routes)
//   if (pathname.startsWith('/admin') && !isPublicRoute) {
//     if (!authCookie) {
//       return NextResponse.redirect(new URL('/admin/login', request.url));
//     }

//     try {
//       jwt.verify(authCookie, process.env.JWT_SECRET);
//     } catch {
//       return NextResponse.redirect(new URL('/admin/login', request.url));
//     }
//   }

//   // 🔁 Redirect logged-in users away from login (only login route)
//   if (pathname === '/admin/login' && authCookie) {
//     try {
//       jwt.verify(authCookie, process.env.JWT_SECRET);
//       return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//     } catch {
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*'], // middleware will handle all /admin/* routes
// };


const PUBLIC_ROUTES = [
  '/admin/login',
  '/admin/register',
  '/admin/forgot-password',
  
  '/admin/verify-otp',
  '/admin/verify-email',  
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('accessToken')?.value;

  // Allow public routes and dynamic email verification route
  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith('/admin/verifying-mail/') || pathname.startsWith('/admin/verify-otp/') || pathname.startsWith('/admin/reset-password',); // ✅ dynamic route allowed



  if (!isPublicRoute) {
    if (authCookie) {
      try {
        jwt.verify(authCookie, process.env.JWT_SECRET);
        // Valid token → allow access
        return NextResponse.next();
      } catch {
        // Invalid token → redirect to login
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else {
      // No token → redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect logged-in users away from login page
  if (pathname === '/admin/login' || PUBLIC_ROUTES && authCookie) {
    try {
      jwt.verify(authCookie, process.env.JWT_SECRET);
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
