"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Page Range" subtitle="Sibling and boundary page counts.">
      <div className="space-y-4">
        <Slider label="Sibling count" value={state.siblingCount} min={0} max={3} step={1} onChange={(value) => update("siblingCount", value)} />
        <Slider label="Boundary count" value={state.boundaryCount} min={0} max={3} step={1} onChange={(value) => update("boundaryCount", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Controls" subtitle="First/last and prev/next navigation buttons.">
      <div className="space-y-4">
        <Switch label="Show first / last" checked={state.showFirstLast} onChange={(value) => update("showFirstLast", value)} />
        <Switch label="Show prev / next" checked={state.showPrevNext} onChange={(value) => update("showPrevNext", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
