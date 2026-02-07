import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    if (isOnDashboard) {
        if (isLoggedIn) return; // Allow access
        return Response.redirect(new URL("/auth/login", req.nextUrl)); // Redirect unauthenticated
    }

    // Optional: Redirect logged-in users away from login page
    // if (isLoggedIn && req.nextUrl.pathname.startsWith("/auth")) {
    //   return Response.redirect(new URL("/dashboard", req.nextUrl)); 
    // }
});

export const config = {
    // Matcher ignoring internal Next.js paths and static files
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
