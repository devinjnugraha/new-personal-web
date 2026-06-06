"use client";

import { useState, useEffect } from "react";
import { Pointer } from "lucide-react";

export function TldrFab() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const hero = document.getElementById("hero");
        const threshold = hero ? hero.offsetHeight : 300;

        const onScroll = () => {
            const pastHero = window.scrollY > threshold;

            const chat = document.getElementById("chat");
            let inChatView = false;
            if (chat) {
                const rect = chat.getBoundingClientRect();
                inChatView = rect.top < window.innerHeight && rect.bottom > 0;
            }

            setVisible(pastHero && !inChatView);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = () => {
        document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <button
            onClick={handleClick}
            className={`
        fixed bottom-6 right-6 z-40
        inline-flex items-center gap-1.5
        font-mono text-xs uppercase tracking-wide font-medium
        bg-accent text-[#0D0D0D] rounded-full px-4 py-2
        hover:opacity-90 transition-all duration-200
        pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] animate-bounce
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
            aria-label="Jump to TL;DR"
        >
            <span>TL;DR</span>
            <Pointer className="w-3 h-3 rotate-180" />
        </button>
    );
}
