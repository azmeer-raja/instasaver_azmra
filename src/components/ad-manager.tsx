"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// Cool down period before showing ads again (e.g., 1 minute)
const AD_COOLDOWN_MS = 60 * 1000;

export function AdManager() {
    const [shouldLoadAds, setShouldLoadAds] = useState(false);

    useEffect(() => {
        const lastAdTime = localStorage.getItem("lastAdLoadTime");
        const currentTime = Date.now();

        // If ads haven't been shown yet, or the cooldown period has passed
        if (!lastAdTime || currentTime - parseInt(lastAdTime) > AD_COOLDOWN_MS) {
            setShouldLoadAds(true);
            localStorage.setItem("lastAdLoadTime", currentTime.toString());
        }
    }, []);

    return (
        <>
            {/* Google AdSense - ALWAYS loads (Required for ad units to render on subsequent navigations) */}
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1213830257600237"
                crossOrigin="anonymous"
                strategy="lazyOnload"
            />

            {shouldLoadAds && (
                <>
                    {/* Monetag Ad Tag — zone 214518 */}
                    <Script
                        src="https://quge5.com/88/tag.min.js"
                        data-zone="214518"
                        data-cfasync="false"
                        strategy="lazyOnload"
                    />
                    {/* Monetag Push Notifications — sw.js at root handles zone 10655560 */}
                    <Script
                        src="https://3nbf4.com/tag.min.js?r=sw"
                        data-zone="10655560"
                        strategy="lazyOnload"
                    />
                </>
            )}
        </>
    );
}
