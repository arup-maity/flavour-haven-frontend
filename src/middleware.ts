import type { NextRequest } from 'next/server'
interface Auth {
   login: boolean;
   role: string;
}
export async function middleware(request: NextRequest) {
   const token = request.cookies.get('token')?.value

   var auth: Auth = { login: false, role: 'user' };
   if (token) {
      try {
         const options = {
            headers: {
               'Authorization': `Bearer ${token}`
            }
         };
         const url = process.env.NEXT_PUBLIC_API_URL + `/auth/verify-token`

         const response = await fetch(url, options)
         const json = await response.json()
         // console.log('auth middleware => ', json)
         if (response.status === 200) {
            auth.login = json?.login
            auth.role = json?.decoded?.accessPurpose
         }
      } catch (error) {

      }
   }


   if (!auth.login && request.nextUrl.pathname.startsWith('/login')) {
      return
   }

   if (auth.login && auth.role !== "user" && request.nextUrl.pathname.startsWith('/login')) {
      return
   }

   // admin
   if (!auth.login && request.nextUrl.pathname.startsWith('/admin/login')) return;
   if (auth.login && auth.role !== "admin" && request.nextUrl.pathname.startsWith('/admin/login')) return;
   if (auth.login && auth.role === "admin" && request.nextUrl.pathname.startsWith('/admin/login')) {
      return Response.redirect(new URL('/admin', request.url));
   }
   if (auth.login && auth.role === "user" && request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/', request.url));
   }
   if (auth.login && auth.role === "user" && request.nextUrl.pathname.startsWith('/register')) {
      return Response.redirect(new URL('/', request.url));
   }

   if (auth.login && auth.role !== "admin" && request.nextUrl.pathname.startsWith('/admin')) {
      return Response.redirect(new URL('/admin/login', request.url));
   }

   if (!auth.login && request.nextUrl.pathname.startsWith('/admin')) {
      return Response.redirect(new URL('/admin/login', request.url));
   }

   // checkout page
   if (!auth.login && request.nextUrl.pathname.startsWith('/checkout')) {
      return Response.redirect(new URL('/login', request.url));
   }
   // account page
   if (!auth.login && request.nextUrl.pathname.startsWith('/account')) {
      return Response.redirect(new URL('/login', request.url));
   }
   // place order
   if (!auth.login && request.nextUrl.pathname.startsWith('/place-order')) {
      return Response.redirect(new URL('/login', request.url));
   }
}

export const config = {
   matcher: ['/admin/:path*', '/:path*']
}