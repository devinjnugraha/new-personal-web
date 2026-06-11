"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCarouselProps {
    projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const goTo = useCallback(
        (dir: 1 | -1) => {
            setDirection(dir);
            setCurrentIndex((prev) => (prev + dir + projects.length) % projects.length);
        },
        [projects.length],
    );

    const current = projects[currentIndex];

    return (
        <div className="relative flex items-center gap-2 md:gap-4">
            {/* Left arrow */}
            <button
                onClick={() => goTo(1)}
                className="shrink-0 text-ink-faint hover:text-ink transition-colors"
                aria-label="Previous project"
            >
                <ChevronLeft size={24} className="md:w-7 md:h-7" />
            </button>

            {/* Carousel viewport */}
            <div className="flex-1 overflow-x-clip" style={{ touchAction: "pan-y" }}>
                <div className="aspect-[5/3] relative">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            className="absolute inset-0"
                            initial={{ x: -direction * 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction * 300, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(_, info) => {
                                if (Math.abs(info.offset.x) > 50) {
                                    goTo(info.offset.x > 0 ? 1 : -1);
                                }
                            }}
                        >
                            <a href={current.url} target="_blank" rel="noopener noreferrer" className="group block">
                                <div className="aspect-[5/3] relative overflow-hidden rounded-lg border border-border group-hover:border-accent/50 transition-colors duration-300">
                                    <Image
                                        src={current.image}
                                        alt={current.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        unoptimized={current.image.endsWith(".svg")}
                                    />
                                </div>
                                <p className="mt-3 font-serif text-lg md:text-xl text-center text-ink group-hover:text-accent transition-colors">
                                    {current.title}
                                </p>
                            </a>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Right arrow */}
            <button onClick={() => goTo(-1)} className="shrink-0 text-ink-faint hover:text-ink transition-colors" aria-label="Next project">
                <ChevronRight size={24} className="md:w-7 md:h-7" />
            </button>
        </div>
    );
}
