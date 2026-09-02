"use client";

import type {
  ReactNode,
} from "react";

import {
  create,
} from "zustand";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

export type GuidelineTheme =
  | "dark"
  | "light";

interface GuidelineThemeStore {
  theme:
    GuidelineTheme;

  setTheme: (
    theme:
      GuidelineTheme
  ) => void;

  toggleTheme:
    () => void;

  resetTheme:
    () => void;
}

interface GuidelinePageProps {
  children:
    ReactNode;

  className?:
    string;
}


/* ================================================= */
/* THEME STORE                                       */
/* ================================================= */

/*
  Shared store used by:

  - Sidebar
  - GuidelinePage
  - individual guideline pages
  - export renderer

  Dark is always the default document appearance.
*/

export const useGuidelineThemeStore =
  create<GuidelineThemeStore>(
    (set) => ({
      theme:
        "dark",

      setTheme: (
        theme
      ) => {
        set({
          theme,
        });
      },

      toggleTheme:
        () => {
          set(
            (state) => ({
              theme:
                state.theme ===
                "dark"
                  ? "light"
                  : "dark",
            })
          );
        },

      resetTheme:
        () => {
          set({
            theme:
              "dark",
          });
        },
    })
  );


/* ================================================= */
/* GUIDELINE PAGE                                    */
/* ================================================= */

export default function GuidelinePage({
  children,
  className = "",
}: GuidelinePageProps) {
  const theme =
    useGuidelineThemeStore(
      (state) =>
        state.theme
    );

  return (
    <div
      data-guideline-page="true"

      data-guideline-theme={
        theme
      }

      className={`
        guideline-page
        guideline-theme-${theme}

        relative

        h-[900px]
        w-[1600px]

        shrink-0

        overflow-hidden

        bg-black
        text-white

        ${className}
      `}
    >
      {children}
    </div>
  );
}