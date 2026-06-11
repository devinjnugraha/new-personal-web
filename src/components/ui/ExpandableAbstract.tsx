"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ExpandableAbstractProps {
    abstract: string;
}

export function ExpandableAbstract({ abstract }: ExpandableAbstractProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <button
                onClick={() => setExpanded(!expanded)}
                className={`text-accent text-xs font-mono hover:underline inline-block mt-3 ${expanded ? "" : "mr-4"}`}
            >
                {expanded ? "hide abstract ↑" : "read abstract ↓"}
            </button>
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="text-ink-muted text-sm my-3 leading-relaxed overflow-hidden"
                    >
                        {abstract}
                    </motion.p>
                )}
            </AnimatePresence>
        </>
    );
}
