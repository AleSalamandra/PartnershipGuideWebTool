"use client";

import {
  useThemeStore,
  type GuidelineTheme,
} from "@/store/themeStore";

/* ------------------------------------------------ */
/* OPTIONS                                          */
/* ------------------------------------------------ */

const THEMES: {
  id: GuidelineTheme;
  label: string;
}[] = [
  {
    id: "dark",
    label: "Dark",
  },

  {
    id: "light",
    label: "Light",
  },
];

/* ------------------------------------------------ */
/* COMPONENT                                        */
/* ------------------------------------------------ */

export default function ThemeToggle() {
  const theme =
    useThemeStore(
      (state) =>
        state.theme
    );

  const setTheme =
    useThemeStore(
      (state) =>
        state.setTheme
    );

  return (
    <div
      className="
        shrink-0

        border-b
        border-white/[0.07]

        bg-[#0b0b0c]

        px-[24px]
        py-[14px]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.12em]

              text-white/48

              oook-medium
            "
          >
            Document appearance
          </p>

          <p
            className="
              mt-[3px]

              text-[8px]

              text-white/20
            "
          >
            Guideline theme
          </p>
        </div>

        {/* ====================================== */}
        {/* SEGMENTED CONTROL                      */}
        {/* ====================================== */}

        <div
          className="
            flex

            rounded-full

            border
            border-white/[0.08]

            bg-white/[0.025]

            p-[3px]
          "
        >
          {THEMES.map(
            (option) => {
              const active =
                option.id ===
                theme;

              return (
                <button
                  key={
                    option.id
                  }

                  type="button"

                  onClick={() =>
                    setTheme(
                      option.id
                    )
                  }

                  className={`
                    flex
                    h-[29px]

                    min-w-[54px]

                    items-center
                    justify-center

                    rounded-full

                    px-[11px]

                    text-[8px]

                    transition-all
                    duration-150

                    ${
                      active
                        ? `
                            bg-white
                            text-black
                          `
                        : `
                            text-white/32

                            hover:bg-white/[0.04]
                            hover:text-white/65
                          `
                    }
                  `}
                >
                  {option.label}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}