# Certifications Two-Tier Layout — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split certifications into featured spotlight cards and non-featured horizontal rows using the existing `Certification.featured` field.

**Architecture:** Filter the certifications array by `featured` boolean. Render featured certs with the existing 4-column grid card layout. Render non-featured certs as full-width horizontal flex rows with border-bottom dividers.

**Tech Stack:** React (Server Component), Next.js Image, Tailwind CSS

---

### Task 1: Split certifications into two-tier layout

**Files:**
- Modify: `src/components/sections/Certifications.tsx:42-73`

- [ ] **Step 1: Split the certifications array and render both tiers**

Replace lines 42–73 in `src/components/sections/Certifications.tsx` with:

```tsx
            {/* Certifications */}
            <p className="section-label mb-4">certifications</p>
            {(() => {
                const featured = certifications.filter((c) => c.featured);
                const others = certifications.filter((c) => !c.featured);
                return (
                    <>
                        {featured.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                                {featured.map((cert) => (
                                    <div key={cert.id} className="rounded-lg border border-border p-4 hover:border-accent/50 transition-colors">
                                        {cert.badgeUrl && (
                                            <Image
                                                src={cert.badgeUrl}
                                                alt={cert.name}
                                                width={40}
                                                height={40}
                                                unoptimized
                                                className="h-10 w-auto object-contain mb-2"
                                            />
                                        )}
                                        <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
                                        <p className="text-ink-muted text-xs font-mono mt-0.5">
                                            {cert.issuer} · {cert.year}
                                        </p>
                                        {cert.credentialUrl && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-accent text-xs font-mono hover:underline mt-2 inline-block"
                                            >
                                                verify ↗
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {others.length > 0 && (
                            <div className="space-y-0 mb-12">
                                {others.map((cert, i) => (
                                    <div
                                        key={cert.id}
                                        className={`flex items-center gap-4 ${i < others.length - 1 ? 'border-b border-border pb-4 mb-4' : ''}`}
                                    >
                                        {cert.badgeUrl && (
                                            <Image
                                                src={cert.badgeUrl}
                                                alt={cert.name}
                                                width={32}
                                                height={32}
                                                unoptimized
                                                className="h-8 w-auto object-contain shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-ink font-medium text-sm leading-snug">{cert.name}</p>
                                            <p className="text-ink-muted text-xs font-mono mt-0.5">
                                                {cert.issuer} · {cert.year}
                                            </p>
                                        </div>
                                        {cert.credentialUrl && (
                                            <a
                                                href={cert.credentialUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-accent text-xs font-mono hover:underline shrink-0"
                                            >
                                                verify ↗
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );
            })()}
```

- [ ] **Step 2: Run type-check**

Run: `npm run type-check`
Expected: PASS, no errors

- [ ] **Step 3: Visual verification**

Run: `npm run dev` and navigate to the Proof section. Verify:
- Featured certs (AWS, TensorFlow, Google Data Analytics) render as 4-column grid cards
- Non-featured certs (Google IT Automation ×2) render as horizontal rows with border-bottom dividers
- Verify links appear in both layouts
- Layout is consistent on mobile and desktop

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Certifications.tsx
git commit -m "feat: two-tier certifications layout (featured cards + horizontal rows)"
```
