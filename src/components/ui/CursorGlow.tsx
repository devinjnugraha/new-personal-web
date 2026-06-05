"use client";

import { useEffect, useRef } from "react";

interface Dot {
    nx: number;
    ny: number;
    opacity: number;
    vx: number;
    vy: number;
    phase: number;
}

const DOT_COUNT = 3500;
const DOT_RADIUS = 1.5;
const BASE_OPACITY = 0.08;
const MAX_OPACITY = 0.5;
const ILLUMINATION_RADIUS = 250;
const LERP_FACTOR = 0.1;
const DRIFT_SPEED = 0.00005;
const PULSE_SPEED = 1.5;
const PULSE_RADIUS_AMP = 0.4;
const PULSE_OPACITY_AMP = 0.015;

export function CursorGlow() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const cursorRef = useRef({ x: -9999, y: -9999, active: false });
    const rafRef = useRef<number>(0);
    const sizeRef = useRef({ w: 0, h: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dots: Dot[] = Array.from({ length: DOT_COUNT }, () => ({
            nx: Math.random(),
            ny: Math.random(),
            opacity: BASE_OPACITY,
            vx: (Math.random() - 0.5) * DRIFT_SPEED * 2,
            vy: (Math.random() - 0.5) * DRIFT_SPEED * 2,
            phase: Math.random() * Math.PI * 2,
        }));
        dotsRef.current = dots;

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            sizeRef.current = { w, h };
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const draw = () => {
            const { w, h } = sizeRef.current;
            const { x, y, active } = cursorRef.current;
            const scrollY = window.scrollY;
            const pageH = document.documentElement.scrollHeight;
            const cursorPageY = y + scrollY;
            const time = performance.now() / 1000;

            ctx.clearRect(0, 0, w, h);

            for (const dot of dots) {
                dot.nx += dot.vx;
                dot.ny += dot.vy;
                if (dot.nx < 0) dot.nx += 1;
                if (dot.nx > 1) dot.nx -= 1;
                if (dot.ny < 0) dot.ny += 1;
                if (dot.ny > 1) dot.ny -= 1;

                const dotX = dot.nx * w;
                const dotPageY = dot.ny * pageH;
                const dotScreenY = dotPageY - scrollY;

                if (dotScreenY < -ILLUMINATION_RADIUS || dotScreenY > h + ILLUMINATION_RADIUS) {
                    continue;
                }

                const pulse = Math.sin(time * PULSE_SPEED + dot.phase);
                const radius = DOT_RADIUS + pulse * PULSE_RADIUS_AMP;

                const dx = dotX - x;
                const dy = dotPageY - cursorPageY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let target = BASE_OPACITY;
                if (active && dist < ILLUMINATION_RADIUS) {
                    const t = 1 - dist / ILLUMINATION_RADIUS;
                    target = BASE_OPACITY + (MAX_OPACITY - BASE_OPACITY) * t * t;
                }

                dot.opacity += (target - dot.opacity) * LERP_FACTOR;
                const finalOpacity = Math.min(1, Math.max(0, dot.opacity + pulse * PULSE_OPACITY_AMP));

                if (finalOpacity < 0.03) continue;

                ctx.beginPath();
                ctx.arc(dotX, dotScreenY, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(29, 158, 117, ${finalOpacity})`;
                ctx.fill();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        const onMouseMove = (e: MouseEvent) => {
            cursorRef.current = { x: e.clientX, y: e.clientY, active: true };
        };

        const onMouseLeave = () => {
            cursorRef.current.active = false;
        };

        const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            cursorRef.current = { x: touch.clientX, y: touch.clientY, active: true };
        };

        const onTouchEnd = () => {
            cursorRef.current.active = false;
        };

        window.addEventListener("mousemove", onMouseMove);
        document.documentElement.addEventListener("mouseleave", onMouseLeave);
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("mousemove", onMouseMove);
            document.documentElement.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1]"
            style={{ mixBlendMode: "screen" }}
            aria-hidden="true"
        />
    );
}
