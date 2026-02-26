"use client";

import { useEffect } from "react";

interface GoogleAdProps {
    adSlot: string;
    adFormat?: string;
    fullWidthResponsive?: boolean;
    className?: string;
}

export function GoogleAd({
    adSlot,
    adFormat = "auto",
    fullWidthResponsive = true,
    className = "",
}: GoogleAdProps) {
    useEffect(() => {
        try {
            // @ts-expect-error: adsbygoogle is not defined on window
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    return (
        <div className={`flex justify-center my-8 ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-1213830257600237"
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive.toString()}
            />
        </div>
    );
}
