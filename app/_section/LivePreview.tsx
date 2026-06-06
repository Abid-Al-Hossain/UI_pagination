"use client";

import type { CSSProperties } from "react";
import type { PaginationState } from "../types";

function shell(state: PaginationState): CSSProperties {
  return {
    width: state.width,
    minHeight: state.height,
    padding: state.padding,
    borderRadius: state.radius,
    border: `${state.borderWidth}px solid ${state.border}`,
    boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`,
    background: state.background,
    color: state.foreground,
    fontFamily: state.fontFamily,
    opacity: state.disabled ? 0.6 : 1,
  };
}

function clampPage(state: PaginationState) {
  return Math.min(Math.max(state.currentPage, 1), Math.max(state.pageCount, 1));
}

function pageRange(start: number, end: number) {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);
}

function visiblePages(state: PaginationState): Array<number | "ellipsis-left" | "ellipsis-right"> {
  const total = Math.max(state.pageCount, 1);
  const current = clampPage(state);
  const boundary = Math.max(state.boundaryCount, 0);
  const siblings = Math.max(state.siblingCount, 0);
  const fullWindow = boundary * 2 + siblings * 2 + 3;

  if (total <= fullWindow) {
    return pageRange(1, total);
  }

  const pages = new Set<number>();
  pageRange(1, boundary).forEach((page) => pages.add(page));
  pageRange(total - boundary + 1, total).forEach((page) => pages.add(page));
  pageRange(current - siblings, current + siblings).forEach((page) => {
    if (page >= 1 && page <= total) pages.add(page);
  });

  const sorted = Array.from(pages).sort((a, b) => a - b);
  return sorted.flatMap((page, index) => {
    const previous = sorted[index - 1];
    if (!previous || page - previous === 1) return [page];
    return [page - previous === 2 ? previous + 1 : index === 1 ? "ellipsis-left" : "ellipsis-right", page];
  });
}

export default function LivePreview({ state }: { state: PaginationState }) {
  const currentPage = clampPage(state);
  const totalPages = Math.max(state.pageCount, 1);
  const isPreviousDisabled = state.disabled || currentPage <= 1;
  const isNextDisabled = state.disabled || currentPage >= totalPages;
  const panel = shell(state);

  const buttonStyle = (selected = false, disabled = false): CSSProperties => ({
    minWidth: 40,
    height: 40,
    padding: "0 12px",
    borderRadius: Math.max(state.radius - 8, 8),
    border: `${state.borderWidth}px solid ${selected ? state.accent : state.border}`,
    background: selected ? state.accent : "transparent",
    color: selected ? state.background : state.foreground,
    fontWeight: selected ? 800 : state.fontWeight,
    opacity: disabled ? 0.45 : 1,
  });

  return (
    <nav
      id={state.id}
      aria-label={state.ariaLabel}
      tabIndex={state.tabIndex}
      style={panel}
      className="grid content-center"
      data-component="pagination"
      data-preview-state={state.previewState}
    >
      <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
      <p style={{ color: state.muted, fontSize: state.bodySize }}>{state.description}</p>
      <div className="mt-5 flex flex-wrap items-center" style={{ gap: state.gap }} aria-label={`${state.label}: page ${currentPage} of ${totalPages}`}>
        {state.showFirstLast && (
          <button type="button" aria-label="Go to first page" disabled={isPreviousDisabled} style={buttonStyle(false, isPreviousDisabled)}>
            First
          </button>
        )}
        {state.showPrevNext && (
          <button type="button" aria-label="Go to previous page" disabled={isPreviousDisabled} style={buttonStyle(false, isPreviousDisabled)}>
            Previous
          </button>
        )}
        {visiblePages(state).map((page) =>
          typeof page === "number" ? (
            <button key={page} type="button" aria-label={`Go to page ${page}`} aria-current={page === currentPage ? "page" : undefined} disabled={state.disabled} style={buttonStyle(page === currentPage, state.disabled)}>
              {page}
            </button>
          ) : (
            <span key={page} aria-hidden="true" style={{ color: state.muted }}>
              ...
            </span>
          ),
        )}
        {state.showPrevNext && (
          <button type="button" aria-label="Go to next page" disabled={isNextDisabled} style={buttonStyle(false, isNextDisabled)}>
            Next
          </button>
        )}
        {state.showFirstLast && (
          <button type="button" aria-label="Go to last page" disabled={isNextDisabled} style={buttonStyle(false, isNextDisabled)}>
            Last
          </button>
        )}
      </div>
      <p className="mt-4 text-xs" style={{ color: state.muted }}>
        {state.helper} Page {currentPage} of {totalPages}.
      </p>
    </nav>
  );
}
