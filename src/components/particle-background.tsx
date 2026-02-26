"use client";

import React, { useEffect, useRef } from "react";
import { ParticleBackground as ParticleBackgroundEngine } from "@/lib/particle-background-class";

/**
 * ParticleBackground Component
 * Renders a full-screen interactive particle system as a background element.
 * Uses a canvas-based engine for high performance.
 */
export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<ParticleBackgroundEngine | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Defer particle init until after page is fully interactive
        // This keeps the animation loop off the critical main thread window
        const timer = setTimeout(() => {
            engineRef.current = new ParticleBackgroundEngine(canvas);
        }, 2000);

        // Cleanup on unmount
        return () => {
            clearTimeout(timer);
            if (engineRef.current) {
                engineRef.current.destroy();
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[50] bg-transparent"
        />
    );
}
