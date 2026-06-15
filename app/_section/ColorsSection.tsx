"use client";
import { SectionCard } from "@/components/shared/layout/SectionCard";
import ColorControl from "@/components/shared/color/ColorControl";
import type { PaginationState } from "../types";

type Props = { state: PaginationState; update: <K extends keyof PaginationState>(key: K, value: PaginationState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Shell" subtitle="Outer container colors.">
        <ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} />
        <ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} />
        <ColorControl label="Muted" value={state.muted} onChange={(v) => update("muted", v)} />
        <ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} />
      </SectionCard>
      <SectionCard title="Active Page" subtitle="Currently selected page button colors.">
        <ColorControl label="Background" value={state.activeBg} onChange={(v) => update("activeBg", v)} />
        <ColorControl label="Text" value={state.activeText} onChange={(v) => update("activeText", v)} />
        <ColorControl label="Border" value={state.activeBorder} onChange={(v) => update("activeBorder", v)} />
      </SectionCard>
      <SectionCard title="Inactive Pages" subtitle="Non-selected page button colors.">
        <ColorControl label="Background" value={state.inactiveBg} onChange={(v) => update("inactiveBg", v)} />
        <ColorControl label="Text" value={state.inactiveText} onChange={(v) => update("inactiveText", v)} />
        <ColorControl label="Border" value={state.inactiveBorder} onChange={(v) => update("inactiveBorder", v)} />
      </SectionCard>
      <SectionCard title="Ellipsis" subtitle="Gap indicator color.">
        <ColorControl label="Color" value={state.ellipsisColor} onChange={(v) => update("ellipsisColor", v)} />
      </SectionCard>
      <SectionCard title="Hover & nav" subtitle="Page hover and prev/next button colors.">
        <ColorControl label="Hover background" value={state.hoverBg} onChange={(v) => update("hoverBg", v)} />
        <ColorControl label="Hover text" value={state.hoverText} onChange={(v) => update("hoverText", v)} />
        <ColorControl label="Hover border" value={state.hoverBorder} onChange={(v) => update("hoverBorder", v)} />
        <ColorControl label="Nav color" value={state.navIconColor} onChange={(v) => update("navIconColor", v)} />
        <ColorControl label="Nav hover" value={state.navIconHoverColor} onChange={(v) => update("navIconHoverColor", v)} />
        <ColorControl label="Nav disabled" value={state.navIconDisabledColor} onChange={(v) => update("navIconDisabledColor", v)} />
      </SectionCard>
      <SectionCard title="Jump-to & total" subtitle="Jump input and summary text colors.">
        <ColorControl label="Jump-to background" value={state.jumpToBg} onChange={(v) => update("jumpToBg", v)} />
        <ColorControl label="Jump-to border" value={state.jumpToBorder} onChange={(v) => update("jumpToBorder", v)} />
        <ColorControl label="Total text" value={state.totalColor} onChange={(v) => update("totalColor", v)} />
      </SectionCard>
    </div>
  );
}
