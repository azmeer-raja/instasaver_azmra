import React from "react";

export const metadata = {
    title: "Terms of Service | Insta Saver",
    description: "Terms of Service for using Insta Saver's Instagram downloading tools.",
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
                Terms of Service
            </h1>

            <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="lead text-xl text-muted-foreground mb-8">
                    Welcome to Insta Saver. These Terms of Service ("Terms") govern your access to and use of our website and applications.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
                <p className="mb-4">
                    By accessing or using our Service, you agree to be bound by these Terms and all applicable laws and regulations. If you disagree with any part of these Terms, you may not use our Service.
                </p>
                <p className="mb-4">
                    We reserve the right to modify these Terms at any time. We will provide notice of any significant modifications by updating the date at the bottom of this page. Your continued use of the Service after such modifications signifies your acceptance of the new Terms.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. Acceptable Use and User Responsibilities</h2>
                <p className="mb-4">
                    <strong>2.1 Personal and Non-Commercial Use Only:</strong> Our Service is intended for personal, non-commercial use. You may only download content for your own private viewing or storage.
                </p>
                <p className="mb-4">
                    <strong>2.2 Respect Intellectual Property Rights:</strong> You may not use our Service to infringe upon the intellectual property rights of others. You must have authorization or legal rights to download and use the content you request through our Service. You remain solely responsible for your actions.
                </p>
                <p className="mb-4">
                    <strong>2.3 Compliance with Laws:</strong> Your use of the Service must comply with all applicable local, national, and international laws, including but not limited to privacy laws and copyright regulations.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Prohibited Actions</h2>
                <p className="mb-4">
                    You agree not to engage in any automated access or bulk downloading, reselling or commercial distribution of the Service, reverse engineering or circumventing our security protocols, or any harmful, illegal, or abusive conduct using our platform.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Disclaimers and Limitation of Liability</h2>
                <p className="mb-4">
                    Our Service is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties, express or implied. Insta Saver does not warrant that the Service will be uninterrupted, error-free, or fully secure. We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of the Service.
                </p>

                <p className="mt-8 text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>
        </div>
    );
}
