import React from "react";

export const metadata = {
    title: "DMCA Policy | Insta Saver",
    description: "DMCA Policy for reporting copyright infringement on Insta Saver.",
};

export default function DMCAPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
                Digital Millennium Copyright Act Compliance
            </h1>

            <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="lead text-xl text-muted-foreground mb-8">
                    Insta Saver respects the intellectual property rights of others and expects its users to do the same. This outlines our firm commitment to copyright protection and our compliance with the Digital Millennium Copyright Act (DMCA).
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment to Copyright Protection</h2>
                <p className="mb-4">
                    It is our policy to respond promptly to clear notices of alleged copyright infringement that comply with the DMCA. As a service that only parses public URLs and does not host content on our own servers, our ability to control or remove content is limited, but we act swiftly within our operational capacity.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Filing a DMCA Takedown Notice</h2>
                <p className="mb-4">
                    If you are a copyright owner or an agent thereof and believe that any content accessed through our service infringes upon your copyrights, you may submit a notification under the DMCA by providing our Designated Agent with the following information in writing:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>1. Identification of Copyrighted Work:</strong> A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                    <li><strong>2. Location of Infringing Material:</strong> Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit our service provider to locate the material (the specific URL).</li>
                    <li><strong>3. Your Contact Information:</strong> Information reasonably sufficient to permit our service provider to contact the complaining party, such as an address, telephone number, and email address.</li>
                    <li><strong>4. Good Faith Statement:</strong> A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                    <li><strong>5. Accuracy Statement and Signature:</strong> A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Counter-Notice</h2>
                <p className="mb-4">
                    If you believe that your material that was reported is not infringing, or that you have authorization from the copyright owner, the copyright owner&apos;s agent, or pursuant to the law, to post and use the material, you may send a counter-notice containing your identification, contact information, good faith statement, and consent to jurisdiction.
                </p>

                <p className="mt-8 text-sm text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>
        </div>
    );
}
