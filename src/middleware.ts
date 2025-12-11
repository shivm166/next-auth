import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({req: request});
    const url = request.nextUrl;

    // Jo user login hoi to Login, Signup ke Forgot Password page par na jai shake
    if(token && 
        (
            url.pathname.startsWith("/login") ||
            url.pathname.startsWith("/signup") ||
            url.pathname.startsWith("/forgot-password")
        )
    ){
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Jo user login na hoi to Dashboard par na jai shake
    if(!token && 
        (
            url.pathname.startsWith("/dashboard")
        )
    ){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/dashboard",
        "/forgot-password"
    ]
}