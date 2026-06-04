"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import Select from "@/components/shared/input/Select";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function StatesSection({ state, update }: Props) {
  return <SectionCard title="State Preview" subtitle="State Preview controls for native pagination generation."><Select label="Preview state" value={state.previewState} options={[
  "default",
  "hover",
  "focus",
  "active",
  "open",
  "closed",
  "selected",
  "loading",
  "empty",
  "error",
  "success"
]} onChange={(value) => update("previewState", value)} />
<Slider label="Current page" value={state.currentPage} min={1} max={40} step={1} onChange={(value) => update("currentPage", value)} /></SectionCard>;
}
