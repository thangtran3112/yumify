import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    const { sessionClaims } = await auth();
    const userRole =
        (sessionClaims?.metadata as { userType: "student" | "teacher" })
            ?.userType || "student";

    if (isStudentRoute(req)) {
        if (userRole !== "student") {
            const url = new URL("/teacher/recipes", req.url);
            return NextResponse.redirect(url);
        }
    }

    if (isTeacherRoute(req)) {
        if (userRole !== "teacher") {
            const url = new URL("/user/recipes", req.url);
            return NextResponse.redirect(url);
        }
    }
});

// https://dashboard.clerk.com/apps/app_2ueEwhv5zX5y7myoENR2cSVorRn/instances/ins_2ueEwj3wIv09EZJTN62YWJ1WUA0
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};