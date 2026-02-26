"use client";

import dynamic from "next/dynamic";

/**
 * Client-component wrapper that lazy-loads ParticleBackground after hydration.
 * Using next/dynamic with ssr:false here keeps the canvas engine out of the
 * critical server-rendered JS chunk and prevents any SSR canvas errors.
 */
const ParticleBackground = dynamic(
    () =>
        import("@/components/particle-background").then(
            (mod) => mod.ParticleBackground
        ),
    { ssr: false }
);

export function ParticleBackgroundLazy() {
    return <ParticleBackground />;
}
