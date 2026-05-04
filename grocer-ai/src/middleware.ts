import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// middleware runs before request reaches the route
export async function middleware(req: NextRequest): Promise<NextResponse> {

  const pathname: string = req.nextUrl.pathname;

  // public routes (no authentication required)
  const publicRoute = ["/login", "/register", "/api/auth"];

  if (publicRoute.some((path: string) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // get JWT token from request (cookies)
  const token = await getToken({ req,secret: process.env.AUTH_SECRET as string,
  });

  // if no token → redirect to login
  if (!token) {
    const loginUrl: URL = new URL("/login", req.url);

    // by the callbackUrl, after login the user goes back
    // to the same page from where they were redirected
    loginUrl.searchParams.set("callbackUrl", req.url);

    return NextResponse.redirect(loginUrl);
  }

  // if token exists → allow request
  return NextResponse.next();
}

// it defines the routes where the middleware will work
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};