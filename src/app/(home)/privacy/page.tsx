import React from "react";

export const metadata = {
    title: "Privacy Policy | Insta Saver",
    description: "Privacy policy for Insta Saver outlining our data collection and protection practices.",
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
                Privacy Policy
            </h1>

            <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="lead text-xl text-muted-foreground mb-8">
                    This Privacy Policy explains how Insta Saver (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your information when you use our website and services.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                    <strong>1.1 No Personal Profiles Required:</strong> We do not require you to create an account, register, or provide personal information such as your name, email address, or phone number to use our basic downloading services.
                </p>
                <p className="mb-4">
                    <strong>1.2 Technical and Usage Data:</strong> Automatically, we collect certain technical information when you visit our website. This may include your IP address, browser type, device type, operating system, and pages visited.
                </p>
                <p className="mb-4">
                    <strong>1.3 Download Request Information:</strong> We temporarily process the Instagram URLs you submit to facilitate the download process, but we do not store a permanent historical record of these links attached to your identity.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">
                    We use the information we collect to provide and maintain the service, improve user experience, ensure security, and prevent abuse. We do not sell or rent your personal data to third parties.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies and Tracking Technologies</h2>
                <p className="mb-4">
                    We use essential cookies to make our website work optimally. We may also use analytics cookies (e.g., Google Analytics) to understand how visitors interact with our website, and advertising cookies to display relevant ads. You can manage your cookie preferences through your browser settings.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
                <p className="mb-4">
                    We employ industry-standard security measures to protect your data from unauthorized access, loss, or misuse. However, no absolute security exists on the internet, and we cannot guarantee 100% security.
                </p>

                <p className="mt-8 text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>
        </div>
    );
}
