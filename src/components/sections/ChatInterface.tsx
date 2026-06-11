"use client";

// SPEC: docs/specs/SPEC-009-chat-interface.md
// Type: Client Component — requires useChat hook

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { track } from "@vercel/analytics";
import { useRef, useEffect, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

const CHAT_ID_KEY = "portfolio-chat-id";

function generateFingerprint(): string {
    const components = [
        navigator.userAgent,
        String(screen.width),
        String(screen.height),
        Intl.DateTimeFormat().resolvedOptions().timeZone,
    ];
    const raw = components.join("|");
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
        const char = raw.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

function getOrCreateChatId(): string {
    try {
        const existing = localStorage.getItem(CHAT_ID_KEY);
        if (existing) return existing;
    } catch { /* localStorage unavailable */ }
    const id = crypto.randomUUID();
    try {
        localStorage.setItem(CHAT_ID_KEY, id);
    } catch { /* ignore */ }
    return id;
}

// Auto-link bare URLs in markdown text so ReactMarkdown renders them as <a>
function autolinkMarkdown(text: string): string {
    return text.replace(/(?<!\()(https?:\/\/[^\s)\]>]+)/g, "[$1]($1)");
}

function getMessageText(message: UIMessage): string {
    return message.parts
        .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
        .map((p) => p.text)
        .join("");
}

// Custom fetch that intercepts injection refusals from the server
// and converts them into a valid UI message stream so useChat renders them
// Singleton transport — must be stable across renders so useChat
// maintains correct message history in multi-turn conversations.
const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

export function ChatInterface() {
    const [fingerprint, setFingerprint] = useState("");
    const [chatId, setChatId] = useState("");

    // Generate fingerprint and chatId after mount (browser-only APIs)
    useEffect(() => {
        setFingerprint(generateFingerprint());
        setChatId(getOrCreateChatId());
    }, []);

    const { messages, sendMessage, status, error } = useChat({
        transport: chatTransport,
        onFinish: () => {
            track("chat_message_sent", { messageCount: messages.length });
        },
        onError: () => {
            track("chat_error");
        },
    });

    const [input, setInput] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [animateOverlay, setAnimateOverlay] = useState(false);
    const isMobile = useIsMobile();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const desktopScrollRef = useRef<HTMLDivElement>(null);
    const overlayScrollRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const isLoading = status === "submitted" || status === "streaming";

    // Track chat_opened once on mount
    useEffect(() => {
        track("chat_opened");
    }, []);

    // Lock body scroll when expanded overlay is open
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isExpanded]);

    // Focus the overlay input after it mounts so the keyboard opens
    useEffect(() => {
        if (isExpanded) {
            inputRef.current?.focus();
        }
    }, [isExpanded]);

    // Enable CSS transition only after the overlay has mounted at its
    // full size — prevents animating the initial appear / final disappear.
    useEffect(() => {
        if (isExpanded) {
            setAnimateOverlay(false);
            // Two rAF frames: first paints the overlay, second enables transition
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimateOverlay(true);
                });
            });
        } else {
            setAnimateOverlay(false);
        }
    }, [isExpanded]);

    // Sync overlay dimensions to visualViewport so it shrinks
    // when the keyboard opens instead of being pushed off-screen
    useEffect(() => {
        if (!isExpanded) return;
        const vv = window.visualViewport;
        if (!vv) return;

        const sync = () => {
            requestAnimationFrame(() => {
                const el = overlayRef.current;
                if (!el) return;
                el.style.height = `${vv.height}px`;
                el.style.top = `${vv.offsetTop}px`;
            });
        };

        vv.addEventListener("resize", sync);
        vv.addEventListener("scroll", sync);
        sync();

        return () => {
            vv.removeEventListener("resize", sync);
            vv.removeEventListener("scroll", sync);
        };
    }, [isExpanded]);

    // Auto-scroll to bottom when messages change (skip initial mount to prevent page jump)
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        const scrollToBottom = (el: HTMLDivElement | null) => {
            if (!el) return;
            el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        };
        scrollToBottom(desktopScrollRef.current);
        scrollToBottom(overlayScrollRef.current);
    }, [messages]);

    const starterPrompts = [
        "What makes Devin different from other devs?",
        "Tell me about the glaucoma paper",
        "What's Devin's tech stack?",
        "Is Devin certified?",
    ];

    const MAX_INPUT_LENGTH = 500;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || isLoading) return;
        if (text.length > MAX_INPUT_LENGTH) return;
        sendMessage({ text }, { body: { chatId, fingerprint } });
        setInput("");
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
        }
        if (isMobile) {
            inputRef.current?.blur();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleStarterClick = (prompt: string) => {
        if (isLoading) return;
        if (isMobile) {
            setIsExpanded(true);
        }
        sendMessage({ text: prompt }, { body: { chatId, fingerprint } });
    };

    const handleInputFocus = useCallback(() => {
        if (isMobile) {
            setIsExpanded(true);
        }
    }, [isMobile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        // Auto-resize: shrink first then grow to content
        const ta = e.target;
        ta.style.height = "auto";
        ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    };

    const handleClose = () => {
        setIsExpanded(false);
        inputRef.current?.blur();
    };

    // Shared message list content
    const renderMessages = (padTop = false) => (
        <>
            {messages.length === 0 && (
                <div className={`flex flex-wrap gap-2 ${padTop ? "pt-8" : ""}`}>
                    {starterPrompts.map((prompt) => (
                        <button
                            key={prompt}
                            onClick={() => handleStarterClick(prompt)}
                            className="text-xs font-mono text-ink-muted border border-border px-3 py-1.5 rounded hover:border-accent hover:text-accent transition-colors"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            )}
            {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                        className={`max-w-[80%] text-sm rounded-lg px-4 py-2 leading-relaxed ${
                            m.role === "user"
                                ? "bg-accent text-[#0D0D0D] font-medium"
                                : "bg-background-elevated text-ink border border-border prose-invert"
                        }`}
                    >
                        {m.role === "user" ? (
                            getMessageText(m)
                        ) : (
                            <ReactMarkdown
                                components={{
                                    a: ({ children, ...props }) => (
                                        <a
                                            {...props}
                                            className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {children}
                                        </a>
                                    ),
                                }}
                            >
                                {autolinkMarkdown(getMessageText(m))}
                            </ReactMarkdown>
                        )}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-background-elevated border border-border rounded-lg px-4 py-2">
                        <span className="text-ink-muted text-sm font-mono">thinking...</span>
                    </div>
                </div>
            )}
            {error && <p className="text-xs font-mono text-red-400 text-center">{error.message}</p>}
        </>
    );

    // Shared input form for the overlay
    const renderInputForm = () => (
        <form onSubmit={handleSubmit} className="border-t border-border flex items-end">
            <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                placeholder="Ask anything about Devin..."
                disabled={input.length > MAX_INPUT_LENGTH}
                maxLength={MAX_INPUT_LENGTH}
                rows={1}
                className="flex-1 bg-transparent px-4 py-3 text-base text-ink placeholder-ink-faint outline-none font-mono placeholder:text-sm disabled:opacity-50 resize-none"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
            />
            <button
                type="submit"
                disabled={isLoading || !input.trim() || input.length > MAX_INPUT_LENGTH}
                className="px-4 py-3 font-mono text-base text-accent hover:text-ink transition-colors disabled:opacity-30 border-l border-border"
            >
                send &rarr;
            </button>
        </form>
    );

    return (
        <>
            {/* Normal section view (desktop + mobile collapsed) */}
            <section id="chat" className={`py-section border-t border-border${isExpanded ? " invisible" : ""}`}>
                <p className="section-label mb-2">04 / still reading?</p>
                <p className="text-ink-muted text-sm mb-2">
                  You could&apos;ve just asked. This is Devin&apos;s AI assistant — it knows everything on this page and a bit more.
                </p>
                <p className="text-ink-faint text-xs mb-6">
                  Ask about skills, experience, research, certifications, or anything else.
                </p>

                <div className="border border-border rounded-lg bg-background-surface overflow-hidden">
                    <div ref={desktopScrollRef} className="h-96 overflow-y-auto p-4 space-y-4">
                        {renderMessages(false)}
                    </div>
                    <form onSubmit={handleSubmit} className="border-t border-border flex items-end gap-0">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onFocus={handleInputFocus}
                            placeholder="Ask anything about Devin..."
                            disabled={input.length > MAX_INPUT_LENGTH}
                            maxLength={MAX_INPUT_LENGTH}
                            rows={1}
                            className="flex-1 bg-transparent px-4 py-3 text-base md:text-sm text-ink placeholder-ink-faint outline-none font-mono placeholder:text-sm disabled:opacity-50 resize-none"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim() || input.length > MAX_INPUT_LENGTH}
                            className="px-4 py-3 font-mono text-base md:text-sm text-accent hover:text-ink transition-colors disabled:opacity-30 border-l border-border"
                        >
                            send &rarr;
                        </button>
                    </form>
                </div>
            </section>

            {/* Full-screen mobile overlay when typing */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        ref={overlayRef}
                        className="fixed left-0 top-0 z-50 flex flex-col bg-[#0D0D0D] w-full"
                        style={{
                            height: "100dvh",
                            top: 0,
                            transition: animateOverlay ? "height 100ms ease-out, top 100ms ease-out" : "none",
                        }}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                            <div>
                                <p className="section-label mb-0">tl;dr</p>
                                <p className="text-ink-faint text-xs mt-0.5">AI assistant</p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="font-mono text-xs text-ink-muted hover:text-ink transition-colors px-3 py-1.5 border border-border rounded"
                            >
                                close &times;
                            </button>
                        </div>

                        {/* Messages — flex-1 fills space between header and input */}
                        <div ref={overlayScrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                            {renderMessages(true)}
                        </div>

                        {/* Input pinned to bottom (above keyboard) */}
                        <div className="shrink-0" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
                            {renderInputForm()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
