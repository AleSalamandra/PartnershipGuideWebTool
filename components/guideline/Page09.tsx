"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

type TypeOwner =
  | "A"
  | "B"
  | "common";

interface TypographyConfig {
  headlineOwner:
    TypeOwner;

  contentOwner:
    TypeOwner;

  uiOwner:
    TypeOwner;

  description:
    string;

  rules: [
    string,
    string,
    string,
  ];
}

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

const COMMON_FONT =
  '"oook-variable", sans-serif';

function safeColour(
  value: unknown,
  fallback: string
) {
  return (
    typeof value ===
      "string" &&
    /^#[0-9A-Fa-f]{6}$/.test(
      value
    )
  )
    ? value
    : fallback;
}

function cleanFontName(
  value: string
) {
  return value
    .replace(
      /["']/g,
      ""
    )
    .split(
      ","
    )[0]
    .trim();
}

function getConfig(
  model:
    PartnershipModelId
): TypographyConfig {
  switch (model) {
    case "axb":
      return {
        headlineOwner:
          "common",

        contentOwner:
          "common",

        uiOwner:
          "common",

        description:
          "The common typeface creates one shared editorial voice. Brand fonts may appear in signatures or authored brand moments.",

        rules: [
          "Common typeface leads shared communication",
          "Brand fonts have equal secondary status",
          "Never split a single headline between two fonts",
        ],
      };

    case "aandb":
      return {
        headlineOwner:
          "A",

        contentOwner:
          "A",

        uiOwner:
          "common",

        description:
          "Brand A owns the principal typographic expression. Brand B typography is limited to supporting authored moments.",

        rules: [
          "Brand A leads headlines",
          "Common font handles functional UI",
          "Brand B font remains secondary",
        ],
      };

    case "poweredByA":
      return {
        headlineOwner:
          "B",

        contentOwner:
          "B",

        uiOwner:
          "B",

        description:
          "Brand B owns all consumer-facing typography. Brand A appears only inside endorsement or technical-credit signatures.",

        rules: [
          "Brand B typeface owns the experience",
          "Brand A typography stays inside endorsement",
          "No shared hybrid headline style",
        ],
      };

    case "presentsB":
    default:
      return {
        headlineOwner:
          "B",

        contentOwner:
          "B",

        uiOwner:
          "A",

        description:
          "Brand A owns platform typography while Brand B may preserve its own typographic identity inside featured content.",

        rules: [
          "Brand A = navigation and platform UI",
          "Brand B = content headlines",
          "Common font = neutral metadata",
        ],
      };
  }
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page09() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } =
    useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

  const config =
    getConfig(
      model
    );

  const aFont =
    brandA.fontFamily ||
    COMMON_FONT;

  const bFont =
    brandB.fontFamily ||
    COMMON_FONT;

  const aPrimary =
    safeColour(
      brandA.primaryColor,
      "#FF453A"
    );

  const aSecondary =
    safeColour(
      brandA.secondaryColor,
      "#FF8A80"
    );

  const bPrimary =
    safeColour(
      brandB.primaryColor,
      "#3478F6"
    );

  const bSecondary =
    safeColour(
      brandB.secondaryColor,
      "#64D2FF"
    );

  const getFont = (
    owner:
      TypeOwner
  ) => {
    if (
      owner ===
      "A"
    ) {
      return aFont;
    }

    if (
      owner ===
      "B"
    ) {
      return bFont;
    }

    return COMMON_FONT;
  };

  const getPrimary = (
    owner:
      TypeOwner
  ) => {
    if (
      owner ===
      "A"
    ) {
      return aPrimary;
    }

    if (
      owner ===
      "B"
    ) {
      return bPrimary;
    }

    return "#8A8A8A";
  };

  const getSecondary = (
    owner:
      TypeOwner
  ) => {
    if (
      owner ===
      "A"
    ) {
      return aSecondary;
    }

    if (
      owner ===
      "B"
    ) {
      return bSecondary;
    }

    return "#B9B9B9";
  };

  const headlinePrimary =
    getPrimary(
      config.headlineOwner
    );

  const headlineSecondary =
    getSecondary(
      config.headlineOwner
    );

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header
        className="
          absolute
          left-[70px]
          right-[70px]
          top-[46px]

          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[13px]
              uppercase
              tracking-[0.17em]

              text-white/30
            "
          >
            09 / Shared visual territory
          </p>

          <h1
            className="
              mt-[12px]

              text-[52px]
              leading-none
              tracking-[-0.045em]

              text-white

              oook-semibold
            "
          >
            Shared visual territory — typography
          </h1>

          <p
            className="
              mt-[13px]

              max-w-[870px]

              text-[16px]
              leading-[1.38]

              text-white/45
            "
          >
            Typography establishes who is speaking, what belongs to the platform and what belongs to the featured content.
          </p>
        </div>

        <PartnershipLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
        />
      </header>

      {/* ======================================== */}
      {/* LEFT                                     */}
      {/* ======================================== */}

      <aside
        className="
          absolute
          left-[70px]
          top-[190px]

          w-[315px]
        "
      >
        <Card className="p-[16px]">
          <SectionLabel>
            Typeface system
          </SectionLabel>

          <FontRow
            label="Brand A"
            family={
              aFont
            }
            colour={
              aPrimary
            }
            secondary={
              aSecondary
            }
          />

          <FontRow
            label="Brand B"
            family={
              bFont
            }
            colour={
              bPrimary
            }
            secondary={
              bSecondary
            }
          />

          <FontRow
            label="Common"
            family={
              COMMON_FONT
            }
            colour="#8A8A8A"
            secondary="#B9B9B9"
          />
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Partnership logic
          </SectionLabel>

          <p
            className="
              mt-[10px]

              text-[11px]
              leading-[1.45]

              text-white/42
            "
          >
            {
              config.description
            }
          </p>

          <div className="mt-[13px] space-y-[8px]">
            {config.rules.map(
              (
                rule,
                index
              ) => (
                <div
                  key={
                    rule
                  }
                  className="
                    grid
                    grid-cols-[22px_1fr]
                    gap-[7px]
                  "
                >
                  <span className="text-[9px] text-white/20">
                    0
                    {index +
                      1}
                  </span>

                  <span
                    className="
                      text-[10px]
                      leading-[1.3]

                      text-white/52
                    "
                  >
                    {
                      rule
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Ownership
          </SectionLabel>

          <OwnershipRow
            label="Headline"
            value={
              config.headlineOwner
            }
          />

          <OwnershipRow
            label="Content"
            value={
              config.contentOwner
            }
          />

          <OwnershipRow
            label="UI"
            value={
              config.uiOwner
            }
          />
        </Card>
      </aside>

      {/* ======================================== */}
      {/* HERO TYPE                                */}
      {/* ======================================== */}

      <section
        className="
          absolute

          left-[410px]
          right-[70px]
          top-[190px]
        "
      >
        <Card
          className="
            relative

            h-[315px]

            overflow-hidden

            p-[22px]
          "
        >
          {/*
            Safe glow.
            This is an SVG image rather than a
            CSS blurred circle.
          */}

          <RasterGlow
            color={
              headlineSecondary
            }
            secondaryColor={
              headlinePrimary
            }
            opacity={
              0.18
            }
            secondaryOpacity={
              0.055
            }
            centerX={
              70
            }
            centerY={
              24
            }
            radius={
              72
            }
            className="
              absolute

              -right-[90px]
              -top-[100px]

              h-[320px]
              w-[360px]
            "
          />

          <p
            className="
              relative
              z-10

              text-[9px]
              uppercase
              tracking-[0.14em]

              text-white/25
            "
          >
            Shared headline system
          </p>

          <h2
            className="
              relative
              z-10

              mt-[38px]

              max-w-[900px]

              text-[66px]
              leading-[0.9]
              tracking-[-0.05em]

              text-white
            "
            style={{
              fontFamily:
                getFont(
                  config.headlineOwner
                ),
            }}
          >
            Experience the moment
            <br />
            from inside.
          </h2>

          <div
            className="
              relative
              z-10

              mt-[22px]

              flex
              gap-[5px]
            "
          >
            <div
              className="
                h-[5px]
                w-[92px]

                rounded-full
              "
              style={{
                backgroundColor:
                  headlinePrimary,
              }}
            />

            <div
              className="
                h-[5px]
                w-[40px]

                rounded-full
              "
              style={{
                backgroundColor:
                  headlineSecondary,
              }}
            />
          </div>

          <p
            className="
              absolute

              bottom-[18px]
              right-[20px]

              z-10

              text-[9px]

              text-white/24
            "
          >
            {cleanFontName(
              getFont(
                config.headlineOwner
              )
            )}
          </p>
        </Card>
      </section>

      {/* ======================================== */}
      {/* APPLICATIONS                             */}
      {/* ======================================== */}

      <section
        className="
          absolute

          left-[410px]
          right-[70px]
          top-[525px]

          grid
          grid-cols-3

          gap-[10px]
        "
      >
        <TypeApplication
          number="01"
          title="Editorial"
          family={
            getFont(
              config.contentOwner
            )
          }
          primary={
            getPrimary(
              config.contentOwner
            )
          }
          secondary={
            getSecondary(
              config.contentOwner
            )
          }
        />

        <TypeApplication
          number="02"
          title="Lower third"
          family={
            getFont(
              config.uiOwner
            )
          }
          primary={
            getPrimary(
              config.uiOwner
            )
          }
          secondary={
            getSecondary(
              config.uiOwner
            )
          }
        />

        <TypeApplication
          number="03"
          title="CTA / UI"
          family={
            getFont(
              config.uiOwner
            )
          }
          primary={
            getPrimary(
              config.uiOwner
            )
          }
          secondary={
            getSecondary(
              config.uiOwner
            )
          }
        />
      </section>

      {/* ======================================== */}
      {/* DO / DON'T                               */}
      {/* ======================================== */}

      <section
        className="
          absolute

          bottom-[30px]
          left-[410px]
          right-[70px]

          grid
          grid-cols-2

          gap-[10px]
        "
      >
        <RuleCard
          good
          title="DO"
          text="Use one typographic voice per communication layer."
        />

        <RuleCard
          title="DON'T"
          text="Mix both brand typefaces inside the same sentence or UI component."
        />
      </section>
    </GuidelinePage>
  );
}

/* ================================================= */
/* CARD                                              */
/* ================================================= */

function Card({
  children,
  className = "",
}: {
  children:
    ReactNode;

  className?:
    string;
}) {
  return (
    <div
      className={`
        rounded-[18px]

        border
        border-white/[0.07]

        bg-white/[0.018]

        ${className}
      `}
    >
      {
        children
      }
    </div>
  );
}

/* ================================================= */
/* SECTION LABEL                                     */
/* ================================================= */

function SectionLabel({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <p
      className="
        text-[10px]
        uppercase
        tracking-[0.14em]

        text-white/30

        oook-medium
      "
    >
      {
        children
      }
    </p>
  );
}

/* ================================================= */
/* FONT ROW                                          */
/* ================================================= */

function FontRow({
  label,
  family,
  colour,
  secondary,
}: {
  label:
    string;

  family:
    string;

  colour:
    string;

  secondary:
    string;
}) {
  return (
    <div
      className="
        mt-[13px]

        grid
        grid-cols-[58px_1fr]

        items-center
        gap-[10px]
      "
    >
      <div
        className="
          flex

          h-[48px]

          items-center
          justify-center

          rounded-[9px]

          border
          border-white/[0.06]

          text-[25px]
        "
        style={{
          fontFamily:
            family,
        }}
      >
        Aa
      </div>

      <div>
        <p className="text-[9px] text-white/55">
          {label}
        </p>

        <p className="mt-[2px] truncate text-[8px] text-white/25">
          {cleanFontName(
            family
          )}
        </p>

        <div className="mt-[6px] flex gap-[3px]">
          <span
            className="
              h-[3px]
              w-[28px]

              rounded-full
            "
            style={{
              backgroundColor:
                colour,
            }}
          />

          <span
            className="
              h-[3px]
              w-[15px]

              rounded-full
            "
            style={{
              backgroundColor:
                secondary,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* OWNERSHIP                                         */
/* ================================================= */

function OwnershipRow({
  label,
  value,
}: {
  label:
    string;

  value:
    TypeOwner;
}) {
  const display =
    value ===
    "A"
      ? "Brand A"
      : value ===
          "B"
        ? "Brand B"
        : "Common";

  return (
    <div
      className="
        mt-[10px]

        flex
        justify-between
        gap-[10px]
      "
    >
      <span className="text-[9px] text-white/27">
        {label}
      </span>

      <span className="text-[10px] text-white/58">
        {display}
      </span>
    </div>
  );
}

/* ================================================= */
/* APPLICATION                                       */
/* ================================================= */

function TypeApplication({
  number,
  title,
  family,
  primary,
  secondary,
}: {
  number:
    string;

  title:
    string;

  family:
    string;

  primary:
    string;

  secondary:
    string;
}) {
  return (
    <Card className="h-[190px] p-[14px]">
      <div className="flex items-center justify-between">
        <p className="text-[9px] text-white/24">
          {number}
        </p>

        <p className="text-[10px] text-white/50">
          {title}
        </p>
      </div>

      <p
        className="
          mt-[35px]

          text-[28px]
          leading-[0.95]
          tracking-[-0.04em]

          text-white/85
        "
        style={{
          fontFamily:
            family,
        }}
      >
        Every angle
        <br />
        matters.
      </p>

      <div className="mt-[15px] flex gap-[4px]">
        <div
          className="
            h-[4px]
            w-[60px]

            rounded-full
          "
          style={{
            backgroundColor:
              primary,
          }}
        />

        <div
          className="
            h-[4px]
            w-[25px]

            rounded-full
          "
          style={{
            backgroundColor:
              secondary,
          }}
        />
      </div>
    </Card>
  );
}

/* ================================================= */
/* RULE                                              */
/* ================================================= */

function RuleCard({
  good = false,
  title,
  text,
}: {
  good?:
    boolean;

  title:
    string;

  text:
    string;
}) {
  return (
    <Card
      className="
        flex
        min-h-[72px]

        items-center
        gap-[12px]

        px-[14px]
      "
    >
      <div
        className={`
          flex

          h-[25px]
          w-[25px]

          items-center
          justify-center

          rounded-full

          ${
            good
              ? "bg-white text-black"
              : "border border-white/12 text-white/40"
          }
        `}
      >
        {good
          ? "✓"
          : "×"}
      </div>

      <div>
        <p className="text-[10px] text-white/66 oook-medium">
          {title}
        </p>

        <p className="mt-[2px] text-[9px] text-white/30">
          {text}
        </p>
      </div>
    </Card>
  );
}