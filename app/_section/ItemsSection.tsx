"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import Input from "@/components/shared/input/Input";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Items controls for native pagination generation.">
      <div className="space-y-4">
        <Slider label="Pages" value={state.pageCount} min={1} max={40} step={1} onChange={(value) => update("pageCount", value)} />
        <Slider label="Button size" value={state.pageSize} min={28} max={56} step={1} onChange={(value) => update("pageSize", value)} />
        <Slider label="Button gap" value={state.pageGap} min={0} max={20} step={1} onChange={(value) => update("pageGap", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Jump-to & per-page" subtitle="Optional jump input and per-page selector.">
      <div className="space-y-4">
        <Switch label="Jump to page" checked={state.jumpToEnabled} onChange={(value) => update("jumpToEnabled", value)} />
        <Input label="Jump-to label" value={state.jumpToLabel} onChange={(value: string) => update("jumpToLabel", value)} placeholder="Go to page" />
        <Switch label="Per-page selector" checked={state.perPageEnabled} onChange={(value) => update("perPageEnabled", value)} />
        <Input label="Per-page options (CSV)" value={state.perPageOptions} onChange={(value: string) => update("perPageOptions", value)} placeholder="10,25,50,100" />
        <Input label="Total text ({page}/{total})" value={state.totalText} onChange={(value: string) => update("totalText", value)} placeholder="Showing page {page} of {total}" />
      </div>
    </SectionCard>
    </div>
  );
}
