// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   // TEMPORARILY DISABLED FOR DEVELOPMENT
//   // Uncomment the following code when ready to enable authentication
  
//   /*
//   const session = request.cookies.get("session")?.value
  
//   // If the user is not logged in and trying to access a protected route
//   if (!session && !request.nextUrl.pathname.startsWith("/auth")) {
//     return NextResponse.redirect(new URL("/auth/signin", request.url))
//   }
  
//   // If the user is logged in and trying to access auth routes
//   if (session && request.nextUrl.pathname.startsWith("/auth")) {
//     return NextResponse.redirect(new URL("/dashboard", request.url))
//   }
//   */
  
//   return NextResponse.next()
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     // Match all request paths except for the ones starting with:
//     // - api (API routes)
//     // - _next/static (static files)
//     // - _next/image (image optimization files)
//     // - favicon.ico (favicon file)
//     // - public folder
//     "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icons|images).*)",
//   ],
// }

