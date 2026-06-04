"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return <SectionCard title="Behavior" subtitle="Behavior controls for native pagination generation."><Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} /></SectionCard>;
}
