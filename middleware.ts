import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const user = req.auth?.user;

    if (isOnDashboard) {
        if (!isLoggedIn) return Response.redirect(new URL("/auth/login", req.nextUrl));

        if (user?.role !== "ADMIN") {
            return Response.redirect(new URL("/", req.nextUrl));
        }

        return; // Allow access
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
