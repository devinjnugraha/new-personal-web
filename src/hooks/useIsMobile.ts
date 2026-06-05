"use client";

import { useState, useEffect } from "react";

const DEFAULT_BREAKPOINT = 768;

export function useIsMobile(breakpoint: number = DEFAULT_BREAKPOINT): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
}
