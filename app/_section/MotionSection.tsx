"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function MotionSection({ state, update }: Props) {
  return <SectionCard title="Motion" subtitle="Motion controls for native pagination generation."><Switch label="Motion safe" checked={state.motion} onChange={(value) => update("motion", value)} /></SectionCard>;
}
