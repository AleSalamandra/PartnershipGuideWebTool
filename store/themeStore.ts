"use client";

import { create } from "zustand";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

export type GuidelineTheme =
  | "dark"
  | "light";

interface ThemeStore {
  theme: GuidelineTheme;

  setTheme: (
    theme: GuidelineTheme
  ) => void;

  toggleTheme: () => void;
}

/* ------------------------------------------------ */
/* STORE                                            */
/* ------------------------------------------------ */

export const useThemeStore =
  create<ThemeStore>(
    (set) => ({
      theme: "dark",

      setTheme: (
        theme
      ) =>
        set({
          theme,
        }),

      toggleTheme:
        () =>
          set(
            (state) => ({
              theme:
                state.theme ===
                "dark"
                  ? "light"
                  : "dark",
            })
          ),
    })
  );