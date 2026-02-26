import React from "react";

export const metadata = {
    title: "Disclaimer | Insta Saver",
    description: "Important disclaimer for Insta Saver.",
};

export default function DisclaimerPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
                Important Legal Notice and Service Disclaimer
            </h1>

            <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="lead text-xl text-muted-foreground mb-8">
                    Please read this disclaimer carefully to understand our relationship with Instagram, Meta Platforms, and your responsibilities when using our service.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">No Affiliation with Instagram or Meta</h2>
                <p className="mb-4">
                    Insta Saver is an independent third-party service that provides tools for downloading publicly accessible Instagram content. We want to be absolutely clear about our relationship—or lack thereof—with Instagram and its parent company, Meta Platforms, Inc. (formerly Facebook, Inc.).
                </p>
                <p className="mb-4 font-semibold text-red-500 dark:text-red-400">
                    Insta Saver is NOT owned, operated, endorsed, or approved by Instagram, Meta Platforms, Inc., or Facebook, Inc.
                </p>
                <p className="mb-4">
                    We are NOT an official Instagram partner and have no formal business relationship with Meta Platforms or any of its subsidiaries. Instagram, Meta, Facebook, and all related logos, trademarks, and service marks are the property of their respective owners. We use these names solely for descriptive purposes.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">User Responsibility and Acceptable Use</h2>
                <p className="mb-4">
                    By using Insta Saver, you acknowledge and agree that you are solely responsible for how you use our service and any content you download. We provide the tools, but you must use them responsibly and legally.
                </p>
                <p className="mb-4">
                    You must respect content ownership, comply with Instagram&apos;s terms of service, and adhere to copyright and fair use guidelines. Insta Saver assumes no responsibility for any misuse of the content downloaded utilizing our services.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Service Limitations</h2>
                <p className="mb-4">
                    We do not guarantee the perpetual availability of our service, nor do we guarantee the availability, accuracy, or quality of the content you may download. Changes to the Instagram platform or its API may affect the functionality of our service without prior notice.
                </p>

                <p className="mt-8 text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>
        </div>
    );
}
