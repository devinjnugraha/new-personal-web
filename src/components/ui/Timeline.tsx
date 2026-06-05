// SPEC: docs/specs/SPEC-006-experience.md
// Type: Server Component — pure presentational

import type { Experience } from "@/types";
import { formatDateRange } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface TimelineProps {
    items: Experience[];
}

export function Timeline({ items }: TimelineProps) {
    // TODO: Full implementation per SPEC-006 (see docs/iterations/FEAT-006-experience.md)
    // Requirements:
    //   - Vertical line on left with dot at each entry
    //   - Role (bold), org (accent), date range (mono muted)
    //   - Bullet highlights as list
    //   - Skill tags at bottom of each entry
    //   - Last entry dot is hollow (no border-accent fill) to signal end
    return (
        <div className="relative space-y-8">
            {/* Vertical line */}
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border" aria-hidden="true" />

            {items.map((item) => (
                <div key={item.id} className="relative pl-8">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-accent bg-background" aria-hidden="true" />

                    <div>
                        <div className="flex items-start justify-between flex-wrap gap-2">
                            <div>
                                <p className="text-ink font-medium text-sm">{item.role}</p>
                                <p className="text-accent font-mono text-xs mt-0.5">{item.organization}</p>
                            </div>
                            <p className="font-mono text-xs text-ink-muted shrink-0">{formatDateRange(item.startDate, item.endDate)}</p>
                        </div>

                        <ul className="mt-3 space-y-1">
                            {item.highlights.map((h) => (
                                <li key={h} className="flex gap-2 items-baseline text-sm text-ink-muted">
                                    <span className="text-accent shrink-0" aria-hidden="true">
                                        ›
                                    </span>
                                    {h}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {item.skills.map((skill) => (
                                <Badge key={skill}>{skill}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
