"use client";

import {
  useLayoutEffect,
  useRef,
} from "react";

import BrandLogo from "./BrandLogo";
import GuidelinePage from "./GuidelinePage";

import { useGuidelineStore } from "@/store/guidelineStore";

export default function PartnershipPrinciple() {
  const {
    brandA,
    brandB,
    partnershipModel,
  } = useGuidelineStore();

  const brandAName =
    brandA.name.trim() || "Brand A";

  const brandBName =
    brandB.name.trim() || "Brand B";

  const relationships = [
    {
      id: "axb",

      label:
        `${brandAName} × ${brandBName}`,

      title:
        "Equal collaboration",

      description:
        `${brandAName} and ${brandBName} share visibility and contribute equally to the experience.`,
    },

    {
      id: "aandb",

      label:
        `${brandAName} with ${brandBName}`,

      title:
        `${brandAName}-led collaboration`,

      description:
        `${brandAName} leads the experience while ${brandBName} participates with meaningful visibility.`,
    },

    {
      id: "poweredByA",

      label:
        `${brandBName} powered by ${brandAName}`,

      title:
        `${brandAName}-enabled experience`,

      description:
        `${brandBName} owns the consumer-facing experience while ${brandAName} provides the technology and production layer.`,
    },

    {
      id: "presentsB",

      label:
        `${brandAName} presents ${brandBName}`,

      title:
        `${brandAName}-owned experience`,

      description:
        `${brandAName} owns and presents the experience while ${brandBName} provides the featured content or IP.`,
    },
  ];

  const active =
    relationships.find(
      (item) =>
        item.id === partnershipModel
    ) ?? relationships[0];

  return (
    <GuidelinePage>
      {/* ----------------------------------------- */}
      {/* HEADER                                    */}
      {/* ----------------------------------------- */}

      <header
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[65px]
          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[15px]
              uppercase
              tracking-[0.15em]
              text-white/35
            "
          >
            01 / Partnership
          </p>

          <h1
            className="
              mt-[18px]
              text-[74px]
              leading-[0.95]
              tracking-[-0.055em]
            "
          >
            <span className="oook-semibold">
              Partnership
            </span>{" "}

            <span className="oook-light">
              Principle
            </span>
          </h1>
        </div>

        <LogoRelationship
          brandALogo={brandA.logoUrl}
          brandBLogo={brandB.logoUrl}
          brandAName={brandAName}
          brandBName={brandBName}
        />
      </header>

      {/* ----------------------------------------- */}
      {/* SECTION TITLE                             */}
      {/* ----------------------------------------- */}

      <div
        className="
          absolute
          left-[90px]
          top-[230px]
        "
      >
        <p
          className="
            text-[22px]
            uppercase
            tracking-[0.09em]
            text-white/45
          "
        >
          Brand relation nature
        </p>
      </div>

      {/* ----------------------------------------- */}
      {/* FLEXIBLE RELATIONSHIP TABLE               */}
      {/* ----------------------------------------- */}

      <section
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[300px]
        "
      >
        {relationships.map(
          (item) => {
            const selected =
              item.id ===
              partnershipModel;

            return (
              <div
                key={item.id}
                className={`
                  grid
                  min-h-[86px]

                  grid-cols-[minmax(280px,520px)_minmax(0,1fr)]

                  items-center
                  gap-x-[58px]

                  border-t
                  px-[4px]

                  ${
                    selected
                      ? "border-white/50"
                      : "border-white/10"
                  }
                `}
              >
                {/* MODEL */}

                <div
                  className="
                    min-w-0
                    py-[15px]
                  "
                >
                  <p
                    className={`
                      max-w-[500px]

                      text-[19px]
                      leading-[1.24]

                      [overflow-wrap:anywhere]

                      ${
                        selected
                          ? "text-white"
                          : "text-white/40"
                      }
                    `}
                  >
                    {item.label}
                  </p>
                </div>

                {/* DESCRIPTION */}

                <div
                  className="
                    min-w-0
                    py-[15px]
                  "
                >
                  <p
                    className={`
                      max-w-[720px]

                      text-[19px]
                      leading-[1.2]

                      [overflow-wrap:anywhere]

                      oook-medium

                      ${
                        selected
                          ? "text-white"
                          : "text-white/55"
                      }
                    `}
                  >
                    {item.title}
                  </p>

                  <p
                    className={`
                      mt-[5px]
                      max-w-[760px]

                      text-[15px]
                      leading-[1.35]

                      [overflow-wrap:anywhere]

                      ${
                        selected
                          ? "text-white/50"
                          : "text-white/25"
                      }
                    `}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          }
        )}

        <div className="border-t border-white/10" />
      </section>

      {/* ----------------------------------------- */}
      {/* SELECTED PRINCIPLE                        */}
      {/* ----------------------------------------- */}

      <aside
        className="
          absolute
          bottom-[58px]
          left-[90px]
          right-[90px]

          h-[128px]

          rounded-[26px]
          border
          border-white/10

          bg-white/[0.035]

          px-[36px]
        "
      >
        <div
          className="
            grid
            h-full

            grid-cols-[240px_minmax(0,1fr)]

            items-center
            gap-[36px]
          "
        >
          {/* LABEL */}

          <p
            className="
              text-[13px]
              uppercase
              tracking-[0.16em]
              text-white/30
            "
          >
            Selected principle
          </p>

          {/* CONTENT */}

          <div className="min-w-0">
            <FitSingleLineText
              text={active.label}
              maxSize={20}
              minSize={12}
              weight="medium"
              opacity="high"
            />

            <div className="mt-[13px]">
              <FitSingleLineText
                text={
                  active.description
                }
                maxSize={26}
                minSize={12}
                weight="light"
                opacity="medium"
              />
            </div>
          </div>
        </div>
      </aside>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* AUTO-FIT SINGLE LINE                             */
/* ------------------------------------------------ */

interface FitSingleLineTextProps {
  text: string;

  maxSize?: number;
  minSize?: number;

  weight?:
    | "light"
    | "regular"
    | "medium";

  opacity?:
    | "high"
    | "medium"
    | "low";
}

function FitSingleLineText({
  text,

  maxSize = 26,
  minSize = 12,

  weight = "light",
  opacity = "medium",
}: FitSingleLineTextProps) {
  const textRef =
    useRef<HTMLParagraphElement>(
      null
    );

  useLayoutEffect(() => {
    const element =
      textRef.current;

    if (!element) return;

    let cancelled = false;

    const fitText = () => {
      if (cancelled) return;

      let min = minSize;
      let max = maxSize;

      for (
        let i = 0;
        i < 14;
        i++
      ) {
        const middle =
          (min + max) / 2;

        element.style.fontSize =
          `${middle}px`;

        if (
          element.scrollWidth <=
          element.clientWidth
        ) {
          min = middle;
        } else {
          max = middle;
        }
      }

      element.style.fontSize =
        `${Math.floor(min * 10) / 10}px`;
    };

    fitText();

    const observer =
      new ResizeObserver(
        fitText
      );

    observer.observe(element);

    document.fonts?.ready.then(
      fitText
    );

    return () => {
      cancelled = true;

      observer.disconnect();
    };
  }, [
    text,
    maxSize,
    minSize,
  ]);

  const weightClass =
    weight === "medium"
      ? "oook-medium"
      : weight === "regular"
        ? "oook-regular"
        : "oook-light";

  const opacityClass =
    opacity === "high"
      ? "text-white/85"
      : opacity === "low"
        ? "text-white/35"
        : "text-white/65";

  return (
    <p
      ref={textRef}
      className={`
        w-full
        overflow-hidden
        whitespace-nowrap

        leading-[1.15]
        tracking-[-0.025em]

        ${weightClass}
        ${opacityClass}
      `}
    >
      {text}
    </p>
  );
}

/* ------------------------------------------------ */
/* LOGO RELATIONSHIP                                */
/* ------------------------------------------------ */

interface LogoRelationshipProps {
  brandALogo: string | null;
  brandBLogo: string | null;

  brandAName: string;
  brandBName: string;
}

function LogoRelationship({
  brandALogo,
  brandBLogo,

  brandAName,
  brandBName,
}: LogoRelationshipProps) {
  return (
    <div
      className="
        flex
        max-w-[480px]
        items-center
        justify-end
        gap-[22px]
      "
    >
      <div
        className="
          h-[52px]
          min-w-0
          w-[170px]
        "
      >
        <BrandLogo
          logoUrl={brandALogo}
          fallback={brandAName}
        />
      </div>

      <span
        className="
          shrink-0
          text-[25px]
          text-white/25
        "
      >
        ×
      </span>

      <div
        className="
          h-[52px]
          min-w-0
          w-[170px]
        "
      >
        <BrandLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
        />
      </div>
    </div>
  );
}