"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native pagination generation."><Input label="Accessible label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} /></SectionCard>;
}
