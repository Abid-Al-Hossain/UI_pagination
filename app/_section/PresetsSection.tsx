"use client";

import { useMemo, useState } from "react";
import Input from "@/components/shared/input/Input";
import Select from "@/components/shared/input/Select";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import { PAGINATION_PRESETS } from "../_data/PaginationPresets";
import type { StudioPreset } from "../types";

export default function PresetsSection({ activePresetId, onApply }: { activePresetId: string | null; onApply: (preset: StudioPreset) => void }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [size, setSize] = useState("all");
  const families = useMemo(() => ["all", ...Array.from(new Set(PAGINATION_PRESETS.map((preset) => preset.family)))], []);
  const sizes = useMemo(() => ["all", ...Array.from(new Set(PAGINATION_PRESETS.map((preset) => preset.size)))], []);
  const filtered = PAGINATION_PRESETS.filter((preset) => [preset.family, preset.archetype, preset.variant, preset.size, ...preset.tags].join(" ").toLowerCase().includes(query.toLowerCase()) && (family === "all" || preset.family === family) && (size === "all" || preset.size === size));
  const source = filtered.length ? filtered : PAGINATION_PRESETS;
  const hasFilters = query !== "" || family !== "all" || size !== "all";
  const resetFilters = () => {
    setQuery("");
    setFamily("all");
    setSize("all");
  };

  return (
    <SectionCard title="Presets" subtitle="48 structured full-state presets.">
      <div data-testid="preset-browser" data-active-preset-id={activePresetId ?? ""} className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <Input label="Search presets" value={query} onChange={setQuery} />
          <Select label="Family" value={family} options={families} onChange={setFamily} />
          <Select label="Size" value={size} options={sizes} onChange={setSize} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p data-testid="preset-result-count" className="text-sm" style={{ color: "var(--muted)" }}>
            Showing {filtered.length} of {PAGINATION_PRESETS.length} presets
          </p>
          <button type="button" onClick={resetFilters} disabled={!hasFilters} data-testid="preset-reset-filters" className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            Reset filters
          </button>
        </div>
        <button type="button" onClick={() => onApply(source[Math.floor(Math.random() * source.length)])} data-testid="preset-surprise-button" className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
          Surprise me
        </button>
        <div className="grid gap-3">
          {filtered.map((preset) => {
            const isApplied = activePresetId === preset.id;
            return (
              <button key={preset.id} type="button" onClick={() => onApply(preset)} data-testid="preset-apply-button" data-preset-id={preset.id} data-applied={isApplied} aria-pressed={isApplied} className="rounded-2xl border p-4 text-left" style={{ borderColor: isApplied ? "var(--primary)" : "var(--border)", background: isApplied ? "color-mix(in oklab, var(--primary) 20%, transparent)" : "color-mix(in oklab, var(--card) 65%, transparent)", color: "var(--text)" }}>
                <strong>{preset.archetype}</strong>
                <span className="ml-2 text-xs uppercase tracking-[0.16em]" style={{ color: "var(--muted)" }}>{preset.variant} / {preset.size}</span>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>{preset.tags.join(", ")}</p>
              </button>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}
