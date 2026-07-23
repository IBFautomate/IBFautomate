"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="ibfautomate-theme-v2"
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
