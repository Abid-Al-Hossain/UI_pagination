"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native pagination generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No separate native controls are needed for this section in this component.</div></SectionCard>;
}
