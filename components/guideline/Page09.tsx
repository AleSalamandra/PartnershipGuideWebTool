"use client";

import type {
  ReactNode,
} from "react";

import BrandLogo from "./BrandLogo";
import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import type {
  AdditionalRelationshipMode,
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

type TypographyOwner =
  | "A"
  | "B"
  | "X"
  | "common";

interface TypographyConfig {
  headlineOwner:
    TypographyOwner;

  contentOwner:
    TypographyOwner;

  uiOwner:
    TypographyOwner;

  description:
    string;

  rules:
    string[];
}

interface ColourPair {
  primary:
    string;

  secondary:
    string;
}

/* ================================================= */
/* CONSTANTS                                         */
/* ================================================= */

const COMMON_FONT =
  '"oook-variable", sans-serif';

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function safeColour(
  value:
    unknown,

  fallback:
    string
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
  value:
    string
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

/* ================================================= */
/* BASE MODEL CONFIG                                 */
/* ================================================= */

function getBaseConfig(
  model:
    PartnershipModelId
): TypographyConfig {
  switch (
    model
  ) {
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
/* ADDITIONAL RELATIONSHIP                           */
/* ================================================= */

function applyAdditionalRelationship(
  base:
    TypographyConfig,

  mode:
    AdditionalRelationshipMode,

  propertyName:
    string
): TypographyConfig {
  if (
    mode ===
    "presenting"
  ) {
    return {
      headlineOwner:
        "X",

      contentOwner:
        "X",

      /*
        The presented property owns authored content,
        but the underlying partnership still owns
        functional navigation / platform UI.
      */

      uiOwner:
        base.uiOwner,

      description:
        `${propertyName} becomes the principal editorial voice inside the featured content. The underlying Brand A / Brand B system remains responsible for platform UI, navigation and presenting signatures.`,

      rules: [
        `${propertyName} leads hero and content typography`,
        "Partnership typography remains visible in UI and presenter layers",
        "Never combine A, B and X fonts inside one sentence",
        "Metadata may remain neutral when ownership is unclear",
      ],
    };
  }

  if (
    mode ===
    "sponsored"
  ) {
    return {
      ...base,

      description:
        `${base.description} Sponsor typography does not enter the shared typographic system.`,

      rules: [
        ...base.rules,
        `${propertyName} typography is restricted to approved sponsor artwork only`,
      ],
    };
  }

  return base;
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page09() {
  const {
    partnershipModel,
    additionalRelationship,

    brandA,
    brandB,
    propertyX,
  } =
    useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

  const propertyName =
    propertyX.name.trim() ||
    "X";

  const presenting =
    additionalRelationship ===
    "presenting";

  const sponsored =
    additionalRelationship ===
    "sponsored";

  /* ------------------------------------------------ */
  /* FONTS                                            */
  /* ------------------------------------------------ */

  const aFont =
    brandA.fontFamily ||
    COMMON_FONT;

  const bFont =
    brandB.fontFamily ||
    COMMON_FONT;

  const xFont =
    propertyX.fontFamily ||
    COMMON_FONT;

  /* ------------------------------------------------ */
  /* COLOURS                                          */
  /* ------------------------------------------------ */

  const aColours:
    ColourPair = {
    primary:
      safeColour(
        brandA.primaryColor,
        "#FF453A"
      ),

    secondary:
      safeColour(
        brandA.secondaryColor,
        "#FF8A80"
      ),
  };

  const bColours:
    ColourPair = {
    primary:
      safeColour(
        brandB.primaryColor,
        "#3478F6"
      ),

    secondary:
      safeColour(
        brandB.secondaryColor,
        "#64D2FF"
      ),
  };

  const xColours:
    ColourPair = {
    primary:
      safeColour(
        propertyX.primaryColor,
        "#8A8A8A"
      ),

    secondary:
      safeColour(
        propertyX.secondaryColor,
        "#B9B9B9"
      ),
  };

  const commonColours:
    ColourPair = {
    primary:
      "#8A8A8A",

    secondary:
      "#B9B9B9",
  };

  /* ------------------------------------------------ */
  /* CONFIG                                           */
  /* ------------------------------------------------ */

  const baseConfig =
    getBaseConfig(
      model
    );

  const config =
    applyAdditionalRelationship(
      baseConfig,
      additionalRelationship,
      propertyName
    );

  /* ------------------------------------------------ */
  /* RESOLVERS                                        */
  /* ------------------------------------------------ */

  const getFont = (
    owner:
      TypographyOwner
  ) => {
    if (
      owner === "A"
    ) {
      return aFont;
    }

    if (
      owner === "B"
    ) {
      return bFont;
    }

    if (
      owner === "X"
    ) {
      return xFont;
    }

    return COMMON_FONT;
  };

  const getColours = (
    owner:
      TypographyOwner
  ): ColourPair => {
    if (
      owner === "A"
    ) {
      return aColours;
    }

    if (
      owner === "B"
    ) {
      return bColours;
    }

    if (
      owner === "X"
    ) {
      return xColours;
    }

    return commonColours;
  };

  const headlineColours =
    getColours(
      config.headlineOwner
    );

  const contentColours =
    getColours(
      config.contentOwner
    );

  const uiColours =
    getColours(
      config.uiOwner
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

              max-w-[900px]

              text-[16px]
              leading-[1.38]

              text-white/45
            "
          >
            {presenting
              ? `${propertyName} becomes the principal editorial voice of the presented content, while the partnership retains its functional and presenting typography.`
              : sponsored
                ? `The partnership typography remains unchanged. ${propertyName} does not introduce an additional typographic voice into the system.`
                : "Typography establishes who is speaking, what belongs to the platform and what belongs to the featured content."}
          </p>
        </div>

        <div
          className="
            flex
            flex-col
            items-end

            gap-[10px]
          "
        >
          <PartnershipLockup
            model={model}
            brandA={brandA}
            brandB={brandB}
          />

          {presenting && (
            <XSignature
              label="Presenting"
              name={
                propertyName
              }
              logoUrl={
                propertyX.logoUrl
              }
              large
            />
          )}

          {sponsored && (
            <XSignature
              label="Sponsored by"
              name={
                propertyName
              }
              logoUrl={
                propertyX.logoUrl
              }
            />
          )}
        </div>
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
              aColours.primary
            }
            secondary={
              aColours.secondary
            }
          />

          <FontRow
            label="Brand B"
            family={
              bFont
            }
            colour={
              bColours.primary
            }
            secondary={
              bColours.secondary
            }
          />

          {presenting && (
            <FontRow
              label={
                propertyName
              }
              family={
                xFont
              }
              colour={
                xColours.primary
              }
              secondary={
                xColours.secondary
              }
              featured
            />
          )}

          <FontRow
            label="Common"
            family={
              COMMON_FONT
            }
            colour={
              commonColours.primary
            }
            secondary={
              commonColours.secondary
            }
          />
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Typographic logic
          </SectionLabel>

          <p
            className="
              mt-[10px]

              text-[11px]
              leading-[1.45]

              text-white/42
            "
          >
            {config.description}
          </p>

          <div
            className="
              mt-[13px]

              space-y-[8px]
            "
          >
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
                    {index + 1}
                  </span>

                  <span
                    className="
                      text-[10px]
                      leading-[1.3]

                      text-white/52
                    "
                  >
                    {rule}
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
            propertyName={
              propertyName
            }
          />

          <OwnershipRow
            label="Content"
            value={
              config.contentOwner
            }
            propertyName={
              propertyName
            }
          />

          <OwnershipRow
            label="UI"
            value={
              config.uiOwner
            }
            propertyName={
              propertyName
            }
          />

          {sponsored && (
            <div
              className="
                mt-[13px]

                border-t
                border-white/[0.06]

                pt-[10px]
              "
            >
              <p
                className="
                  text-[8px]
                  leading-[1.4]

                  text-white/25
                "
              >
                Sponsor typography has no ownership role.
              </p>
            </div>
          )}
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
          <RasterGlow
            color={
              headlineColours.secondary
            }
            secondaryColor={
              headlineColours.primary
            }
            opacity={
              0.18
            }
            secondaryOpacity={
              0.055
            }
            centerX={
              72
            }
            centerY={
              22
            }
            radius={
              70
            }
            className="
              absolute

              -right-[80px]
              -top-[90px]

              h-[300px]
              w-[340px]
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
            {presenting
              ? `${propertyName} headline system`
              : "Shared headline system"}
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
                  headlineColours.primary,
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
                  headlineColours.secondary,
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
            contentColours.primary
          }
          secondary={
            contentColours.secondary
          }
          copy={
            presenting
              ? `${propertyName} content`
              : "Every angle matters."
          }
        />

        <TypeApplication
          number="02"
          title="Lower third"
          family={
            getFont(
              config.contentOwner
            )
          }
          primary={
            contentColours.primary
          }
          secondary={
            contentColours.secondary
          }
          copy={
            presenting
              ? `${propertyName} live`
              : "Every angle matters."
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
            uiColours.primary
          }
          secondary={
            uiColours.secondary
          }
          copy="Explore experience"
        />
      </section>

      {/* ======================================== */}
      {/* RULES                                    */}
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
          text={
            presenting
              ? `Use ${propertyName} typography for authored content and the partnership system for functional layers.`
              : "Use one typographic voice per communication layer."
          }
        />

        <RuleCard
          title="DON'T"
          text={
            presenting
              ? "Mix Brand A, Brand B and X typefaces inside the same communication layer."
              : sponsored
                ? "Adopt sponsor typography as part of the core visual system."
                : "Mix both brand typefaces inside the same sentence or UI component."
          }
        />
      </section>
    </GuidelinePage>
  );
}

/* ================================================= */
/* COMPONENTS                                        */
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
      {children}
    </div>
  );
}

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
      {children}
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
  featured = false,
}: {
  label:
    string;

  family:
    string;

  colour:
    string;

  secondary:
    string;

  featured?:
    boolean;
}) {
  return (
    <div
      className={`
        mt-[13px]

        grid
        grid-cols-[58px_1fr]

        items-center
        gap-[10px]

        ${
          featured
            ? `
                rounded-[10px]

                border
                border-white/[0.07]

                p-[7px]
              `
            : ""
        }
      `}
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

      <div className="min-w-0">
        <p
          className={
            featured
              ? "truncate text-[9px] text-white/72"
              : "truncate text-[9px] text-white/55"
          }
        >
          {label}
        </p>

        <p
          className="
            mt-[2px]

            truncate

            text-[8px]

            text-white/25
          "
        >
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
  propertyName,
}: {
  label:
    string;

  value:
    TypographyOwner;

  propertyName:
    string;
}) {
  const display =
    value === "A"
      ? "Brand A"
      : value === "B"
        ? "Brand B"
        : value === "X"
          ? propertyName
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

      <span
        className="
          max-w-[170px]

          truncate

          text-[10px]

          text-white/58
        "
      >
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
  copy,
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

  copy:
    string;
}) {
  return (
    <Card className="h-[190px] p-[14px]">
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
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

          max-w-[290px]

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
        {copy}
      </p>

      <div
        className="
          mt-[15px]

          flex
          gap-[4px]
        "
      >
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

          shrink-0

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

        <p
          className="
            mt-[2px]

            text-[9px]
            leading-[1.35]

            text-white/30
          "
        >
          {text}
        </p>
      </div>
    </Card>
  );
}

/* ================================================= */
/* X SIGNATURE                                       */
/* ================================================= */

function XSignature({
  label,
  name,
  logoUrl,
  large = false,
}: {
  label:
    string;

  name:
    string;

  logoUrl:
    string | null;

  large?:
    boolean;
}) {
  return (
    <div className="flex items-center gap-[8px]">
      <span
        className="
          text-[7px]
          uppercase
          tracking-[0.13em]

          text-white/22
        "
      >
        {label}
      </span>

      <div
        className={
          large
            ? "h-[32px] w-[108px]"
            : "h-[21px] w-[70px]"
        }
      >
        <BrandLogo
          logoUrl={
            logoUrl
          }
          fallback={
            name
          }
        />
      </div>
    </div>
  );
}