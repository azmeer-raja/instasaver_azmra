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

        // Initialize the particle engine
        engineRef.current = new ParticleBackgroundEngine(canvas);

        // Cleanup on unmount
        return () => {
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
