import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI Foundry Pagination Studio",
  description: "Standalone Pagination component generator.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen flex-col overflow-hidden bg-[var(--bg)] text-[var(--text)]">{children}</body>
    </html>
  );
}
