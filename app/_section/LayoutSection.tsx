"use client";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return (
    <SectionCard title="Layout" subtitle="Page button shape and layout options.">
      <div>
        <div className="text-sm font-medium mb-2" style={{ color: "var(--text)" }}>Page shape</div>
        <div className="grid grid-cols-3 gap-2">
          {(["rounded", "pill", "square"] as const).map((shape) => (
            <button key={shape} type="button" onClick={() => update("pageShape", shape)}
              className="rounded-lg border px-2 py-1.5 text-xs font-medium capitalize transition uf-clickable"
              style={{ borderColor: "var(--border)", background: state.pageShape === shape ? "var(--primary)" : "color-mix(in oklab, var(--surface) 65%, transparent)", color: state.pageShape === shape ? "white" : "var(--text)" }}>
              {shape}
            </button>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
