"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function RadiusSection({ state, update }: Props) {
  return <SectionCard title="Radius" subtitle="Radius controls for native pagination generation."><Slider label="Radius" value={state.radius} min={0} max={56} step={1} onChange={(value) => update("radius", value)} /></SectionCard>;
}
