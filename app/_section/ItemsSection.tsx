"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Slider from "@/components/shared/input/Slider";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return <SectionCard title="Items" subtitle="Items controls for native pagination generation."><Slider label="Pages" value={state.pageCount} min={1} max={40} step={1} onChange={(value) => update("pageCount", value)} /></SectionCard>;
}
