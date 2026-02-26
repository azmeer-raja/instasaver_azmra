import { NextResponse } from "next/server";

export function middleware() {
    return NextResponse.next();
}

// Only run middleware on actual page routes, not on sitemap/robots/api/static files
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|json|woff|woff2|ttf|otf)$).*)",
    ],
};
