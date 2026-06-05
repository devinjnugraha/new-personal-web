'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 80,
  delay = 100,
  className,
}: TypewriterTextProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (charCount >= text.length) return;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCharCount((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [charCount, text.length, speed, delay]);

  return (
    <h1 className={className}>
      {text.slice(0, charCount)}
      <span className="animate-blink text-accent" aria-hidden="true">
        _
      </span>
    </h1>
  );
}
