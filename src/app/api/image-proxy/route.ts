import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
        return NextResponse.json(
            { error: "missingUrl", message: "url is required" },
            { status: 400 }
        );
    }

    try {
        if (!imageUrl.startsWith("https://")) {
            return NextResponse.json(
                { error: "Invalid URL format" },
                { status: 400 }
            );
        }

        const imageResponse = await fetch(imageUrl);

        if (!imageResponse.ok) {
            throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
        }

        const imageStream = imageResponse.body;

        if (!imageStream) {
            throw new Error("Image stream is not available");
        }

        const headers = new Headers();
        const contentType = imageResponse.headers.get("Content-Type");
        if (contentType) {
            headers.set("Content-Type", contentType);
        }

        // Set caching headers so the proxy response is cached by the browser
        headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=43200");

        return new NextResponse(imageStream, {
            status: 200,
            headers: headers,
        });
    } catch (error: any) {
        console.error("Image proxy error:", error);
        return NextResponse.json(
            { error: "serverError", message: error.message },
            { status: 500 }
        );
    }
}
