import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: "https://instasaver-azmra.vercel.app/sitemap.xml",
        host: "https://instasaver-azmra.vercel.app",
    };
}
