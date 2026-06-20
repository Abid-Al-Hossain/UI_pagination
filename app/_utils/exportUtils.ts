import type { PaginationState } from "../types";
import { ensureReadable, solidBg } from "@/components/shared/color/wcag";

export type ExportPayload = { fileName: string; mimeType: "text/plain;charset=utf-8"; content: string };

export function buildExportPayload(state: PaginationState, fileName = "pagination") : ExportPayload {
  return { fileName: `${fileName || "pagination"}.jsx`, mimeType: "text/plain;charset=utf-8", content: buildReactCode(state) };
}

// Keep the exported colors WCAG-readable, matching the live preview's enforcement.
function enforceContrast(s: PaginationState): PaginationState {
  return {
    ...s,
    inactiveText: ensureReadable(s.inactiveText, solidBg(s.inactiveBg, s.background)),
    activeText: ensureReadable(s.activeText, solidBg(s.activeBg, s.background)),
    hoverText: ensureReadable(s.hoverText, solidBg(s.hoverBg, s.background)),
    navIconColor: ensureReadable(s.navIconColor, solidBg(s.inactiveBg, s.background)),
    navIconHoverColor: ensureReadable(s.navIconHoverColor, solidBg(s.hoverBg, s.background)),
  };
}

export function buildReactCode(stateInput: PaginationState) {
  const state = enforceContrast(stateInput);
  const pageRadius = state.pageShape === "pill" ? 999 : state.pageShape === "square" ? 4 : Math.max(state.radius - 8, 8);
  return [
    "import * as React from \"react\";",
    "",
    "const state = " + JSON.stringify(state, null, 2) + ";",
    "",
    "function resolveFont(s) { return s.fontBucket === \"google\" ? '\"' + s.googleFontFamily + '\", sans-serif' : \"inherit\"; }",
    "function buildShadow(s) { if (!s.shadowEnabled) return \"none\"; var hex = Math.round(s.shadowOpacity * 255).toString(16).padStart(2, \"0\"); return s.shadowX + \"px \" + s.shadowY + \"px \" + s.shadowBlur + \"px \" + s.shadowSpread + \"px \" + s.shadowColor + hex; }",
    "",
    "function clampPage() {",
    "  return Math.min(Math.max(state.currentPage, 1), Math.max(state.pageCount, 1));",
    "}",
    "",
    "function pageRange(start, end) {",
    "  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);",
    "}",
    "",
    "function visiblePages() {",
    "  const total = Math.max(state.pageCount, 1);",
    "  const current = clampPage();",
    "  const boundary = Math.max(state.boundaryCount, 0);",
    "  const siblings = Math.max(state.siblingCount, 0);",
    "  const fullWindow = boundary * 2 + siblings * 2 + 3;",
    "  if (total <= fullWindow) return pageRange(1, total);",
    "  const pages = new Set();",
    "  pageRange(1, boundary).forEach((page) => pages.add(page));",
    "  pageRange(total - boundary + 1, total).forEach((page) => pages.add(page));",
    "  pageRange(current - siblings, current + siblings).forEach((page) => {",
    "    if (page >= 1 && page <= total) pages.add(page);",
    "  });",
    "  const sorted = Array.from(pages).sort((a, b) => a - b);",
    "  return sorted.flatMap((page, index) => {",
    "    const previous = sorted[index - 1];",
    "    if (!previous || page - previous === 1) return [page];",
    "    return [page - previous === 2 ? previous + 1 : index === 1 ? \"ellipsis-left\" : \"ellipsis-right\", page];",
    "  });",
    "}",
    "",
    "export default function PaginationComponent() {",
    "  const currentPage = clampPage();",
    "  const totalPages = Math.max(state.pageCount, 1);",
    "  const isPreviousDisabled = state.disabled || currentPage <= 1;",
    "  const isNextDisabled = state.disabled || currentPage >= totalPages;",
    "  const [hoverKey, setHoverKey] = React.useState(\"\");",
    `  const panel = { width: state.width, minHeight: state.height, padding: state.padding, gap: state.gap, borderRadius: state.radius, border: state.borderWidth + "px " + state.borderStyle + " " + (state.disabled && state.disabledUseCustomColors ? state.disabledBorder : state.border), boxShadow: buildShadow(state), background: state.disabled && state.disabledUseCustomColors ? state.disabledBg : state.background, color: state.foreground, fontFamily: resolveFont(state), opacity: state.disabled ? (state.disabledOpacity ?? 0.5) : 1 };`,
    `  const buttonStyle = (selected = false, disabled = false, hovered = false) => ({ minWidth: state.pageSize, height: state.pageSize, padding: "0 12px", borderRadius: ${pageRadius}, border: state.borderWidth + "px " + state.borderStyle + " " + (selected ? state.activeBorder : hovered ? state.hoverBorder : state.inactiveBorder), background: selected ? state.activeBg : hovered ? state.hoverBg : state.inactiveBg, color: selected ? state.activeText : hovered ? state.hoverText : state.inactiveText, fontWeight: selected ? 800 : state.fontWeight, opacity: disabled ? 0.45 : 1, transition: state.transitionDuration > 0 ? "background 0.2s ease, color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease" : "none" });`,
    `  const navStyle = (disabled, hovered) => ({ minWidth: state.pageSize, height: state.pageSize, padding: "0 12px", borderRadius: ${pageRadius}, border: state.borderWidth + "px " + state.borderStyle + " " + (hovered && !disabled ? state.hoverBorder : state.inactiveBorder), background: hovered && !disabled ? state.hoverBg : state.inactiveBg, color: disabled ? state.navIconDisabledColor : hovered ? state.navIconHoverColor : state.navIconColor, fontWeight: state.fontWeight, opacity: disabled ? 0.45 : 1, transition: state.transitionDuration > 0 ? "background 0.2s ease, color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease" : "none" });`,
    "  return (",
    "    <nav id={state.id} aria-label={state.ariaLabel} tabIndex={state.tabIndex} style={panel} data-component=\"pagination\" data-preview-state={state.previewState}>",
    "      <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>",
    "      <p style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>",
    "      <div style={{ display: \"flex\", flexWrap: \"wrap\", alignItems: \"center\", gap: state.pageGap, marginTop: 20 }} aria-label={`${state.label}: page ${currentPage} of ${totalPages}`}>",
    "        {state.showFirstLast && <button type=\"button\" aria-label=\"Go to first page\" disabled={isPreviousDisabled} onMouseEnter={() => setHoverKey(\"first\")} onMouseLeave={() => setHoverKey(\"\")} style={navStyle(isPreviousDisabled, hoverKey === \"first\")}>First</button>}",
    "        {state.showPrevNext && <button type=\"button\" aria-label=\"Go to previous page\" disabled={isPreviousDisabled} onMouseEnter={() => setHoverKey(\"prev\")} onMouseLeave={() => setHoverKey(\"\")} style={navStyle(isPreviousDisabled, hoverKey === \"prev\")}>Previous</button>}",
    "        {visiblePages().map((page) => typeof page === \"number\" ? (",
    "          <button key={page} type=\"button\" aria-label={`Go to page ${page}`} aria-current={page === currentPage ? \"page\" : undefined} disabled={state.disabled} onMouseEnter={() => setHoverKey(\"p\" + page)} onMouseLeave={() => setHoverKey(\"\")} style={buttonStyle(page === currentPage, state.disabled, hoverKey === \"p\" + page && page !== currentPage)}>{page}</button>",
    "        ) : (",
    `          <span key={page} aria-hidden="true" style={{ color: state.ellipsisColor }}>...</span>`,
    "        ))}",
    "        {state.showPrevNext && <button type=\"button\" aria-label=\"Go to next page\" disabled={isNextDisabled} onMouseEnter={() => setHoverKey(\"next\")} onMouseLeave={() => setHoverKey(\"\")} style={navStyle(isNextDisabled, hoverKey === \"next\")}>Next</button>}",
    "        {state.showFirstLast && <button type=\"button\" aria-label=\"Go to last page\" disabled={isNextDisabled} onMouseEnter={() => setHoverKey(\"last\")} onMouseLeave={() => setHoverKey(\"\")} style={navStyle(isNextDisabled, hoverKey === \"last\")}>Last</button>}",
    "      </div>",
    "      {(state.jumpToEnabled || state.perPageEnabled) && (",
    "        <div style={{ display: \"flex\", flexWrap: \"wrap\", alignItems: \"center\", gap: 16, marginTop: 16, fontSize: 14 }}>",
    "          {state.jumpToEnabled && <label style={{ display: \"flex\", alignItems: \"center\", gap: 8, color: state.muted }}>{state.jumpToLabel}<input type=\"number\" min={1} max={totalPages} defaultValue={currentPage} disabled={state.disabled} style={{ width: 64, height: 36, borderRadius: 10, padding: \"0 8px\", background: state.jumpToBg, border: \"1px solid \" + state.jumpToBorder, color: state.foreground }} /></label>}",
    "          {state.perPageEnabled && <label style={{ display: \"flex\", alignItems: \"center\", gap: 8, color: state.muted }}>Per page<select disabled={state.disabled} style={{ height: 36, borderRadius: 10, padding: \"0 8px\", background: state.jumpToBg, border: \"1px solid \" + state.jumpToBorder, color: state.foreground }}>{state.perPageOptions.split(\",\").map((opt) => <option key={opt.trim()} value={opt.trim()}>{opt.trim()}</option>)}</select></label>}",
    "        </div>",
    "      )}",
    "      <p style={{ color: state.totalColor, fontSize: 12, marginTop: 16 }}>{state.totalText.replace(\"{page}\", String(currentPage)).replace(\"{total}\", String(totalPages))}</p>",
    "    </nav>",
    "  );",
    "}",
    "",
  ].join("\n");
}
