'use client'

// SPEC: docs/specs/SPEC-009-chat-interface.md
// Type: Client Component — requires useChat hook

import { useChat } from 'ai/react'
import { track } from '@vercel/analytics'
import { useRef, useEffect } from 'react'

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    onFinish: () => {
      // Track successful chat interactions
      track('chat_message_sent', { messageCount: messages.length })
    },
    onError: () => {
      track('chat_error')
    },
  })

  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // TODO: Full implementation per SPEC-009
  // Requirements:
  //   - Inline section, NOT a modal/popup widget
  //   - "Ask Devin" heading with disclaimer text below
  //   - Message bubbles: user right-aligned, assistant left-aligned
  //   - Typing indicator (animated dots) while isLoading
  //   - Input field + send button at bottom
  //   - Rate limit error displayed gracefully
  //   - Starter prompts (suggested questions) when messages is empty
  //   - Max height ~480px with internal scroll for message list

  const starterPrompts = [
    'Tell me about your ML research',
    'What tech stack do you work with?',
    'What are you currently working on?',
    'Tell me about your glaucoma detection paper',
  ]

  return (
    <section id="chat" className="py-section border-t border-border">
      <p className="section-label mb-2">06 / ask devin</p>
      <p className="text-ink-muted text-sm mb-6">
        Powered by an LLM trained on my background.{' '}
        <span className="text-ink-faint">Answers may be imperfect.</span>
      </p>

      <div className="border border-border rounded-lg bg-background-surface overflow-hidden">
        {/* Message list */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    // TODO: Pre-fill input or submit directly
                  }}
                  className="text-xs font-mono text-ink-muted border border-border px-3 py-1.5 rounded hover:border-accent hover:text-accent transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] text-sm rounded-lg px-4 py-2 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-accent text-[#0D0D0D] font-medium'
                    : 'bg-background-elevated text-ink border border-border'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-background-elevated border border-border rounded-lg px-4 py-2">
                {/* TODO: Animated typing indicator dots */}
                <span className="text-ink-muted text-sm font-mono">thinking...</span>
              </div>
            </div>
          )}
          {error && (
            <p className="text-xs font-mono text-red-400 text-center">
              {error.message.includes('429')
                ? 'Rate limit reached — try again in an hour.'
                : 'Something went wrong. Please try again.'}
            </p>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-border flex gap-0"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything about my background..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-4 py-3 text-sm text-ink placeholder-ink-faint outline-none font-mono disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-3 font-mono text-sm text-accent hover:text-ink transition-colors disabled:opacity-30 border-l border-border"
          >
            send →
          </button>
        </form>
      </div>
    </section>
  )
}
