"use client";

import GuidelinePage from "./GuidelinePage";

export default function Page11() {
  return (
    <GuidelinePage>
      {/* HEADER */}

      <header
        className="
          absolute

          left-[70px]
          right-[70px]
          top-[54px]
        "
      >
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.18em]

            text-white/25
          "
        >
          11 / Guideline
        </p>

        <h1
          className="
            mt-[13px]

            text-[50px]
            leading-none
            tracking-[-0.045em]

            text-white

            oook-semibold
          "
        >
          Page 11
        </h1>

        <p
          className="
            mt-[12px]

            max-w-[700px]

            text-[14px]
            leading-[1.4]

            text-white/38
          "
        >
          Content to be defined.
        </p>
      </header>

      {/* PLACEHOLDER */}

      <div
        className="
          absolute

          left-[70px]
          right-[70px]
          top-[190px]
          bottom-[70px]

          flex
          items-center
          justify-center

          rounded-[24px]

          border
          border-dashed
          border-white/[0.08]

          bg-white/[0.01]
        "
      >
        <div
          className="
            text-center
          "
        >
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.18em]

              text-white/18
            "
          >
            Page 11
          </p>

          <p
            className="
              mt-[8px]

              text-[20px]

              text-white/30
            "
          >
            Content pending
          </p>
        </div>
      </div>
    </GuidelinePage>
  );
}