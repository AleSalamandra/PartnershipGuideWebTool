"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";

import {
  brandCharacterTraits,
  type BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import {
  buildGraphicLanguageSystem,
  type DepthStyle,
  type GlowStyle,
  type GraphicLanguageSystem,
  type GridStyle,
  type LanguageBrand,
  type LineStyle,
  type MaskStyle,
  type ShapeStyle,
  type TextureStyle,
  type UIStyle,
} from "@/utils/graphicLanguageSystem";

import type {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* CONSTANTS                                         */
/* ================================================= */

const DEFAULT_FONT =
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

function getTraits(
  brand:
    unknown
): BrandCharacterTraitId[] {
  const value =
    brand as {
      characterTraits?:
        string[];
    };

  if (
    !Array.isArray(
      value.characterTraits
    )
  ) {
    return [];
  }

  return value.characterTraits
    .filter(
      (
        id
      ) =>
        brandCharacterTraits.some(
          (
            trait
          ) =>
            trait.id ===
            id
        )
    )
    .slice(
      0,
      2
    ) as BrandCharacterTraitId[];
}

function getBrand(
  brand:
    unknown,

  fallbackName:
    string,

  fallbackPrimary:
    string,

  fallbackSecondary:
    string
): LanguageBrand {
  const value =
    brand as {
      name?:
        string;

      logoUrl?:
        string | null;

      primaryColor?:
        string;

      secondaryColor?:
        string;

      fontFamily?:
        string;

      characterTraits?:
        string[];
    };

  return {
    name:
      value.name?.trim() ||
      fallbackName,

    logoUrl:
      value.logoUrl ??
      null,

    primaryColor:
      safeColour(
        value.primaryColor,
        fallbackPrimary
      ),

    secondaryColor:
      safeColour(
        value.secondaryColor,
        fallbackSecondary
      ),

    fontFamily:
      value.fontFamily ||
      DEFAULT_FONT,

    characterTraits:
      getTraits(
        brand
      ),
  };
}

function alpha(
  colour:
    string,

  opacity:
    number
) {
  const hex =
    safeColour(
      colour,
      "#FFFFFF"
    ).replace(
      "#",
      ""
    );

  const number =
    parseInt(
      hex,
      16
    );

  const r =
    (
      number >>
      16
    ) &
    255;

  const g =
    (
      number >>
      8
    ) &
    255;

  const b =
    number &
    255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page10() {
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

  const a =
    getBrand(
      brandA,

      "Brand A",

      "#FF453A",
      "#FF8A80"
    );

  const b =
    getBrand(
      brandB,

      "Brand B",

      "#3478F6",
      "#64D2FF"
    );

  const x =
    getBrand(
      propertyX,

      "Property X",

      "#8A8A8A",
      "#B8B8B8"
    );

  const relationship =
    (
      additionalRelationship ??
      "none"
    ) as
      | "none"
      | "presenting"
      | "sponsored";

  const language =
    buildGraphicLanguageSystem({
      model,

      additionalRelationship:
        relationship,

      brandA:
        a,

      brandB:
        b,

      propertyX:
        x,
    });

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
            10 / Shared visual territory
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
            Shared visual territory — graphic language
          </h1>

          <p
            className="
              mt-[13px]

              max-w-[930px]

              text-[15px]
              leading-[1.4]

              text-white/43
            "
          >
            {language.summary}
          </p>
        </div>

        <PartnershipLockup
          model={
            model
          }
          brandA={
            brandA
          }
          brandB={
            brandB
          }
        />
      </header>

      {/* ======================================== */}
      {/* CHARACTER INPUT                          */}
      {/* ======================================== */}

      <aside
        className="
          absolute

          left-[70px]
          top-[190px]

          w-[300px]
        "
      >
        <Card className="p-[15px]">
          <SectionLabel>
            Character input
          </SectionLabel>

          <CharacterSource
            label="Structure"
            name={
              language.structureName
            }
            traits={
              language.structureTraits
            }
            colour={
              language.supportColor
            }
          />

          <CharacterSource
            label="Expression"
            name={
              language.expressionName
            }
            traits={
              language.expressionTraits
            }
            colour={
              language.primaryColor
            }
            featured={
              relationship ===
              "presenting"
            }
          />

          {relationship ===
            "sponsored" && (
            <p
              className="
                mt-[11px]

                border-t
                border-white/[0.06]

                pt-[9px]

                text-[7px]
                leading-[1.4]

                text-white/19
              "
            >
              {x.name} remains sponsorship attribution and is excluded from the shared visual language.
            </p>
          )}
        </Card>

        {/* ====================================== */}
        {/* RESULTING DIRECTION                    */}
        {/* ====================================== */}

        <Card className="mt-[10px] p-[15px]">
          <SectionLabel>
            Resulting direction
          </SectionLabel>

          <div
            className="
              mt-[12px]

              grid
              grid-cols-2

              gap-x-[12px]
              gap-y-[12px]
            "
          >
            <DirectionValue
              label="Geometry"
              value={
                language.shapes.label
              }
            />

            <DirectionValue
              label="Lines"
              value={
                language.lines.label
              }
            />

            <DirectionValue
              label="Framing"
              value={
                language.masks.label
              }
            />

            <DirectionValue
              label="Layout"
              value={
                language.grid.label
              }
            />

            <DirectionValue
              label="Surface"
              value={
                language.texture.label
              }
            />

            <DirectionValue
              label="Depth"
              value={
                language.depth.label
              }
            />
          </div>
        </Card>
      </aside>

      {/* ======================================== */}
      {/* DO / DON'T                               */}
      {/* ======================================== */}

      <section
        className="
          absolute

          left-[395px]
          right-[70px]
          top-[190px]

          grid
          grid-cols-2

          gap-[12px]
        "
      >
        <Comparison
          good
          title="DO"
          description="Translate all selected characters into one coherent visual system."
        >
          <SharedSystemPreview
            language={
              language
            }
          />
        </Comparison>

        <Comparison
          title="DON'T"
          description="Do not stack independent brand languages or let every asset behave differently."
        >
          <SplitSystemPreview
            a={
              a
            }
            b={
              b
            }
            x={
              relationship ===
              "presenting"
                ? x
                : null
            }
          />
        </Comparison>
      </section>

      {/* ======================================== */}
      {/* TOOLKIT                                  */}
      {/* ======================================== */}

      <section
        className="
          absolute

          left-[70px]
          right-[70px]
          top-[535px]
        "
      >
        <div
          className="
            flex
            items-end
            justify-between
          "
        >
          <div>
            <SectionLabel>
              Generated graphic toolkit
            </SectionLabel>

            <p
              className="
                mt-[4px]

                text-[8px]

                text-white/22
              "
            >
              Each category interprets the same character combination differently.
            </p>
          </div>

          <p
            className="
              text-[7px]
              uppercase
              tracking-[0.12em]

              text-white/16
            "
          >
            Character × hierarchy × application
          </p>
        </div>

        <div
          className="
            mt-[10px]

            grid
            grid-cols-4

            gap-[8px]
          "
        >
          <ToolkitCard
            label="Shapes"
            title={
              language.shapes.label
            }
            description={
              language.shapes.description
            }
          >
            <ShapePreview
              style={
                language.shapes.style
              }
              primary={
                language.primaryColor
              }
              secondary={
                language.secondaryColor
              }
            />
          </ToolkitCard>

          <ToolkitCard
            label="Lines"
            title={
              language.lines.label
            }
            description={
              language.lines.description
            }
          >
            <LinePreview
              style={
                language.lines.style
              }
              primary={
                language.primaryColor
              }
              secondary={
                language.secondaryColor
              }
            />
          </ToolkitCard>

          <ToolkitCard
            label="Masks & frames"
            title={
              language.masks.label
            }
            description={
              language.masks.description
            }
          >
            <MaskPreview
              style={
                language.masks.style
              }
              primary={
                language.primaryColor
              }
              secondary={
                language.secondaryColor
              }
            />
          </ToolkitCard>

          <ToolkitCard
            label="Grid & layout"
            title={
              language.grid.label
            }
            description={
              language.grid.description
            }
          >
            <GridPreview
              style={
                language.grid.style
              }
              colour={
                language.supportColor
              }
            />
          </ToolkitCard>

          <ToolkitCard
            label="UI & data"
            title={
              language.ui.label
            }
            description={
              language.ui.description
            }
          >
            <UIPreview
              style={
                language.ui.style
              }
              primary={
                language.primaryColor
              }
              secondary={
                language.secondaryColor
              }
            />
          </ToolkitCard>

          <ToolkitCard
            label="Texture"
            title={
              language.texture.label
            }
            description={
              language.texture.description
            }
          >
            <TexturePreview
              style={
                language.texture.style
              }
              primary={
                language.primaryColor
              }
            />
          </ToolkitCard>

          <ToolkitCard
            label="Glow"
            title={
              language.glow.label
            }
            description={
              language.glow.description
            }
          >
            <GlowPreview
              style={
                language.glow.style
              }
              primary={
                language.primaryColor
              }
              secondary={
                language.secondaryColor
              }
            />
          </ToolkitCard>

          <ToolkitCard
            label="Depth / 3D"
            title={
              language.depth.label
            }
            description={
              language.depth.description
            }
          >
            <DepthPreview
              style={
                language.depth.style
              }
              primary={
                language.primaryColor
              }
              secondary={
                language.secondaryColor
              }
            />
          </ToolkitCard>
        </div>
      </section>

      {/* ======================================== */}
      {/* FOOTER                                   */}
      {/* ======================================== */}

      <footer
        className="
          absolute

          bottom-[20px]
          left-[70px]
          right-[70px]

          flex
          justify-between

          border-t
          border-white/[0.06]

          pt-[8px]

          text-[7px]

          text-white/16
        "
      >
        <span>
          Structure: {
            language.structureName
          }
        </span>

        <span>
          Expression: {
            language.expressionName
          }
        </span>
      </footer>
    </GuidelinePage>
  );
}

/* ================================================= */
/* GENERIC UI                                        */
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
        text-[9px]
        uppercase
        tracking-[0.14em]

        text-white/28

        oook-medium
      "
    >
      {children}
    </p>
  );
}

/* ================================================= */
/* CHARACTER                                         */
/* ================================================= */

function CharacterSource({
  label,
  name,
  traits,
  colour,
  featured = false,
}: {
  label:
    string;

  name:
    string;

  traits:
    BrandCharacterTraitId[];

  colour:
    string;

  featured?:
    boolean;
}) {
  return (
    <div
      className={`
        mt-[11px]

        rounded-[11px]

        border

        px-[10px]
        py-[9px]

        ${
          featured
            ? `
                border-white/[0.12]
                bg-white/[0.025]
              `
            : `
                border-white/[0.05]
              `
        }
      `}
    >
      <div
        className="
          flex
          items-center
          justify-between

          gap-[10px]
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-[6px]
              uppercase
              tracking-[0.11em]

              text-white/17
            "
          >
            {label}
          </p>

          <p
            className="
              mt-[2px]

              truncate

              text-[9px]

              text-white/52
            "
          >
            {name}
          </p>
        </div>

        <span
          className="
            h-[4px]
            w-[25px]

            shrink-0

            rounded-full
          "
          style={{
            backgroundColor:
              colour,
          }}
        />
      </div>

      <div
        className="
          mt-[7px]

          space-y-[6px]
        "
      >
        {traits.length ? (
          traits
            .slice(
              0,
              4
            )
            .map(
              (
                id
              ) => {
                const trait =
                  brandCharacterTraits.find(
                    (
                      item
                    ) =>
                      item.id ===
                      id
                  );

                if (
                  !trait
                ) {
                  return null;
                }

                return (
                  <div
                    key={
                      id
                    }
                  >
                    <p
                      className="
                        text-[7px]

                        text-white/44

                        oook-medium
                      "
                    >
                      {
                        trait.label
                      }
                    </p>

                    <p
                      className="
                        mt-[2px]

                        line-clamp-2

                        text-[6px]
                        leading-[1.35]

                        text-white/18
                      "
                    >
                      {
                        trait.description
                      }
                    </p>
                  </div>
                );
              }
            )
        ) : (
          <span
            className="
              text-[7px]

              text-white/17
            "
          >
            Neutral character
          </span>
        )}
      </div>
    </div>
  );
}

/* ================================================= */
/* DIRECTION                                         */
/* ================================================= */

function DirectionValue({
  label,
  value,
}: {
  label:
    string;

  value:
    string;
}) {
  return (
    <div>
      <p
        className="
          text-[6px]
          uppercase
          tracking-[0.1em]

          text-white/16
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[3px]

          text-[8px]
          leading-[1.25]

          text-white/43
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ================================================= */
/* COMPARISON                                        */
/* ================================================= */

function Comparison({
  good = false,
  title,
  description,
  children,
}: {
  good?:
    boolean;

  title:
    string;

  description:
    string;

  children:
    ReactNode;
}) {
  return (
    <Card className="p-[12px]">
      <div
        className="
          flex
          h-[38px]

          items-start
          justify-between

          gap-[12px]
        "
      >
        <div
          className="
            flex
            items-center

            gap-[8px]
          "
        >
          <span
            className={`
              flex

              h-[23px]
              w-[23px]

              items-center
              justify-center

              rounded-full

              text-[10px]

              ${
                good
                  ? `
                      bg-white
                      text-black
                    `
                  : `
                      border
                      border-white/12

                      text-white/36
                    `
              }
            `}
          >
            {good
              ? "✓"
              : "×"}
          </span>

          <span
            className="
              text-[13px]

              text-white/67

              oook-medium
            "
          >
            {title}
          </span>
        </div>

        <p
          className="
            max-w-[260px]

            text-right
            text-[8px]
            leading-[1.35]

            text-white/26
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          relative

          mt-[7px]
          h-[245px]

          overflow-hidden

          rounded-[12px]

          border
          border-white/[0.055]

          bg-[#050506]
        "
      >
        {children}
      </div>
    </Card>
  );
}

/* ================================================= */
/* GOOD SYSTEM                                       */
/* ================================================= */

function SharedSystemPreview({
  language,
}: {
  language:
    GraphicLanguageSystem;
}) {
  return (
    <>
      <div
        className="
          absolute
          inset-0

          opacity-[0.23]
        "
      >
        <GridPreview
          style={
            language.grid.style
          }
          colour={
            language.supportColor
          }
          large
        />
      </div>

      {language.glow.style !==
        "none" && (
        <GlowField
          style={
            language.glow.style
          }
          primary={
            language.primaryColor
          }
          secondary={
            language.secondaryColor
          }
        />
      )}

      <div
        className="
          absolute

          right-[18px]
          top-[17px]

          h-[140px]
          w-[250px]
        "
      >
        <ShapePreview
          style={
            language.shapes.style
          }
          primary={
            language.primaryColor
          }
          secondary={
            language.secondaryColor
          }
          large
        />
      </div>

      <div
        className="
          absolute

          bottom-[47px]
          left-[17px]

          h-[85px]
          w-[190px]
        "
      >
        <LinePreview
          style={
            language.lines.style
          }
          primary={
            language.primaryColor
          }
          secondary={
            language.secondaryColor
          }
          large
        />
      </div>

      <div
        className="
          absolute

          bottom-[14px]
          right-[14px]

          h-[66px]
          w-[210px]
        "
      >
        <UIPreview
          style={
            language.ui.style
          }
          primary={
            language.primaryColor
          }
          secondary={
            language.secondaryColor
          }
          large
        />
      </div>

      <div
        className="
          absolute

          left-[16px]
          top-[15px]
        "
      >
        <p
          className="
            text-[6px]
            uppercase
            tracking-[0.13em]

            text-white/16
          "
        >
          Shared visual system
        </p>

        <p
          className="
            mt-[4px]

            max-w-[185px]

            text-[9px]
            leading-[1.35]

            text-white/42
          "
        >
          {
            language.expressionName
          }
        </p>
      </div>
    </>
  );
}

/* ================================================= */
/* BAD SYSTEM                                        */
/* ================================================= */

function SplitSystemPreview({
  a,
  b,
  x,
}: {
  a:
    LanguageBrand;

  b:
    LanguageBrand;

  x:
    LanguageBrand | null;
}) {
  const brands =
    x
      ? [
          a,
          b,
          x,
        ]
      : [
          a,
          b,
        ];

  return (
    <div
      className="
        absolute
        inset-0

        flex
      "
    >
      {brands.map(
        (
          brand,
          index
        ) => (
          <div
            key={
              `${brand.name}-${index}`
            }
            className="
              relative

              flex-1

              overflow-hidden

              border-r
              border-white/[0.06]

              last:border-r-0
            "
            style={{
              backgroundColor:
                alpha(
                  brand.primaryColor,
                  0.08
                ),
            }}
          >
            {index %
              3 ===
            0 ? (
              <div
                className="
                  absolute

                  left-1/2
                  top-1/2

                  h-[110px]
                  w-[110px]

                  -translate-x-1/2
                  -translate-y-1/2

                  rounded-[32px]

                  border
                "
                style={{
                  borderColor:
                    brand.primaryColor,
                }}
              />
            ) : index %
                3 ===
              1 ? (
              <svg
                viewBox="0 0 140 140"
                className="
                  absolute

                  left-1/2
                  top-1/2

                  h-[130px]
                  w-[130px]

                  -translate-x-1/2
                  -translate-y-1/2
                "
              >
                <polygon
                  points="22,38 101,22 124,61 104,118 32,109 14,68"
                  fill="none"
                  stroke={
                    brand.primaryColor
                  }
                  strokeWidth="2"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 140 140"
                className="
                  absolute

                  left-1/2
                  top-1/2

                  h-[130px]
                  w-[130px]

                  -translate-x-1/2
                  -translate-y-1/2
                "
              >
                <path
                  d="M22 83 C17 34 65 15 93 38 C132 39 137 84 104 107 C74 132 32 119 22 83 Z"
                  fill="none"
                  stroke={
                    brand.primaryColor
                  }
                  strokeWidth="2"
                />
              </svg>
            )}

            <p
              className="
                absolute

                bottom-[13px]
                left-[12px]
                right-[12px]

                truncate

                text-center
                text-[7px]

                text-white/25
              "
            >
              {brand.name}
            </p>
          </div>
        )
      )}

      <div
        className="
          absolute
          inset-0

          flex
          items-center
          justify-center
        "
      >
        <span
          className="
            flex
            h-[36px]
            w-[36px]

            items-center
            justify-center

            rounded-full

            border
            border-white/10

            bg-black/75

            text-[17px]

            text-white/55
          "
        >
          ×
        </span>
      </div>
    </div>
  );
}

/* ================================================= */
/* TOOLKIT CARD                                      */
/* ================================================= */

function ToolkitCard({
  label,
  title,
  description,
  children,
}: {
  label:
    string;

  title:
    string;

  description:
    string;

  children:
    ReactNode;
}) {
  return (
    <div
      className="
        relative

        h-[132px]

        overflow-hidden

        rounded-[13px]

        border
        border-white/[0.06]

        bg-white/[0.014]

        p-[10px]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between

          gap-[8px]
        "
      >
        <div>
          <p
            className="
              text-[6px]
              uppercase
              tracking-[0.12em]

              text-white/17
            "
          >
            {label}
          </p>

          <p
            className="
              mt-[3px]

              text-[9px]

              text-white/54

              oook-medium
            "
          >
            {title}
          </p>
        </div>
      </div>

      <div
        className="
          absolute

          bottom-[9px]
          left-[9px]

          h-[70px]
          w-[118px]
        "
      >
        {children}
      </div>

      <p
        className="
          absolute

          bottom-[10px]
          left-[137px]
          right-[9px]

          text-[6px]
          leading-[1.4]

          text-white/18
        "
      >
        {description}
      </p>
    </div>
  );
}

/* ================================================= */
/* SHAPES                                            */
/* ================================================= */

function ShapePreview({
  style,
  primary,
  secondary,
  large = false,
}: {
  style:
    ShapeStyle;

  primary:
    string;

  secondary:
    string;

  large?:
    boolean;
}) {
  return (
    <svg
      viewBox="0 0 160 90"
      preserveAspectRatio="xMidYMid meet"
      className="
        h-full
        w-full
      "
    >
      {style ===
        "restrained" && (
        <>
          <rect
            x="23"
            y="19"
            width="94"
            height="51"
            rx="4"
            fill="none"
            stroke={
              primary
            }
            strokeWidth={
              large
                ? 1.4
                : 1.1
            }
          />

          <rect
            x="104"
            y="31"
            width="31"
            height="25"
            rx="2"
            fill="none"
            stroke={
              secondary
            }
            strokeWidth="1"
            opacity="0.55"
          />
        </>
      )}

      {style ===
        "rounded" && (
        <>
          <rect
            x="18"
            y="20"
            width="105"
            height="50"
            rx="25"
            fill="none"
            stroke={
              primary
            }
            strokeWidth="1.5"
          />

          <circle
            cx="126"
            cy="34"
            r="18"
            fill="none"
            stroke={
              secondary
            }
            strokeWidth="1"
            opacity="0.55"
          />
        </>
      )}

      {style ===
        "angular" && (
        <>
          <polygon
            points="27,18 115,18 137,38 121,71 31,71 15,49"
            fill="none"
            stroke={
              primary
            }
            strokeWidth="1.5"
          />

          <polyline
            points="91,28 118,28 128,39"
            fill="none"
            stroke={
              secondary
            }
            strokeWidth="1"
            opacity="0.6"
          />
        </>
      )}

      {style ===
        "organic" && (
        <>
          <path
            d="M20 51 C16 24 45 12 68 25 C91 7 132 20 136 45 C140 70 108 80 83 69 C58 83 25 75 20 51 Z"
            fill="none"
            stroke={
              primary
            }
            strokeWidth="1.5"
          />

          <path
            d="M50 59 C47 38 69 26 86 36 C105 27 120 39 117 55"
            fill="none"
            stroke={
              secondary
            }
            strokeWidth="1"
            opacity="0.55"
          />
        </>
      )}

      {style ===
        "editorial" && (
        <>
          <rect
            x="15"
            y="18"
            width="100"
            height="58"
            fill="none"
            stroke={
              primary
            }
            strokeWidth="1.2"
          />

          <rect
            x="51"
            y="29"
            width="92"
            height="36"
            fill="none"
            stroke={
              secondary
            }
            strokeWidth="1"
            opacity="0.5"
          />

          <line
            x1="27"
            y1="30"
            x2="86"
            y2="30"
            stroke={
              primary
            }
            strokeWidth="1"
            opacity="0.6"
          />
        </>
      )}

      {style ===
        "bold" && (
        <>
          <rect
            x="19"
            y="20"
            width="97"
            height="51"
            rx="8"
            fill={
              primary
            }
            opacity="0.7"
          />

          <rect
            x="95"
            y="31"
            width="46"
            height="31"
            rx="4"
            fill={
              secondary
            }
            opacity="0.5"
          />
        </>
      )}
    </svg>
  );
}

/* ================================================= */
/* LINES                                             */
/* ================================================= */

function LinePreview({
  style,
  primary,
  secondary,
  large = false,
}: {
  style:
    LineStyle;

  primary:
    string;

  secondary:
    string;

  large?:
    boolean;
}) {
  const thin =
    large
      ? 1.4
      : 1;

  return (
    <svg
      viewBox="0 0 160 90"
      className="
        h-full
        w-full
      "
    >
      {style ===
        "hairline" && (
        <>
          <line
            x1="13"
            y1="28"
            x2="142"
            y2="28"
            stroke={
              primary
            }
            strokeWidth={
              thin
            }
          />

          <line
            x1="39"
            y1="45"
            x2="119"
            y2="45"
            stroke={
              secondary
            }
            strokeWidth={
              thin
            }
            opacity="0.65"
          />

          <line
            x1="20"
            y1="62"
            x2="93"
            y2="62"
            stroke={
              primary
            }
            strokeWidth={
              thin
            }
            opacity="0.4"
          />
        </>
      )}

      {style ===
        "measured" && (
        <>
          {[0, 1, 2, 3].map(
            (
              index
            ) => (
              <line
                key={
                  index
                }
                x1="24"
                y1={
                  24 +
                  index *
                    14
                }
                x2={
                  133 -
                  index *
                    12
                }
                y2={
                  24 +
                  index *
                    14
                }
                stroke={
                  index %
                    2
                    ? secondary
                    : primary
                }
                strokeWidth="2"
                opacity={
                  0.85 -
                  index *
                    0.13
                }
              />
            )
          )}
        </>
      )}

      {style ===
        "directional" && (
        <>
          {[0, 1, 2].map(
            (
              index
            ) => (
              <line
                key={
                  index
                }
                x1={
                  17 +
                  index *
                    20
                }
                y1="67"
                x2={
                  93 +
                  index *
                    20
                }
                y2="21"
                stroke={
                  index ===
                  1
                    ? secondary
                    : primary
                }
                strokeWidth={
                  2.4
                }
                opacity={
                  0.8 -
                  index *
                    0.18
                }
              />
            )
          )}
        </>
      )}

      {style ===
        "expressive" && (
        <>
          <path
            d="M12 62 C44 11 83 73 145 25"
            fill="none"
            stroke={
              primary
            }
            strokeWidth="1.8"
          />

          <path
            d="M28 69 C59 37 91 62 128 44"
            fill="none"
            stroke={
              secondary
            }
            strokeWidth="1.2"
            opacity="0.6"
          />
        </>
      )}
    </svg>
  );
}

/* ================================================= */
/* MASKS                                             */
/* ================================================= */

function MaskPreview({
  style,
  primary,
  secondary,
}: {
  style:
    MaskStyle;

  primary:
    string;

  secondary:
    string;
}) {
  return (
    <svg
      viewBox="0 0 160 90"
      className="
        h-full
        w-full
      "
    >
      {style ===
        "clean" && (
        <>
          <rect
            x="18"
            y="17"
            width="124"
            height="59"
            rx="3"
            fill={
              alpha(
                primary,
                0.07
              )
            }
            stroke={
              primary
            }
            strokeWidth="1.1"
          />

          <rect
            x="31"
            y="28"
            width="98"
            height="37"
            fill="none"
            stroke={
              secondary
            }
            opacity="0.35"
          />
        </>
      )}

      {style ===
        "soft" && (
        <>
          <rect
            x="15"
            y="16"
            width="130"
            height="61"
            rx="24"
            fill={
              alpha(
                primary,
                0.06
              )
            }
            stroke={
              primary
            }
          />

          <rect
            x="34"
            y="27"
            width="92"
            height="39"
            rx="16"
            fill="none"
            stroke={
              secondary
            }
            opacity="0.42"
          />
        </>
      )}

      {style ===
        "cropped" && (
        <>
          <rect
            x="-18"
            y="12"
            width="124"
            height="68"
            fill={
              alpha(
                primary,
                0.05
              )
            }
            stroke={
              primary
            }
          />

          <rect
            x="79"
            y="25"
            width="105"
            height="45"
            fill="none"
            stroke={
              secondary
            }
            opacity="0.5"
          />
        </>
      )}

      {style ===
        "angular" && (
        <>
          <polygon
            points="21,16 125,16 145,35 132,75 28,75 13,56"
            fill={
              alpha(
                primary,
                0.05
              )
            }
            stroke={
              primary
            }
          />

          <polyline
            points="39,28 116,28 130,40"
            fill="none"
            stroke={
              secondary
            }
            opacity="0.45"
          />
        </>
      )}

      {style ===
        "layered" && (
        <>
          {[0, 1, 2].map(
            (
              index
            ) => (
              <rect
                key={
                  index
                }
                x={
                  18 +
                  index *
                    13
                }
                y={
                  17 +
                  index *
                    7
                }
                width="104"
                height="54"
                rx="8"
                fill={
                  alpha(
                    index ===
                    2
                      ? primary
                      : secondary,
                    0.025
                  )
                }
                stroke={
                  index ===
                  2
                    ? primary
                    : secondary
                }
                opacity={
                  0.28 +
                  index *
                    0.22
                }
              />
            )
          )}
        </>
      )}
    </svg>
  );
}

/* ================================================= */
/* GRID                                              */
/* ================================================= */

function GridPreview({
  style,
  colour,
  large = false,
}: {
  style:
    GridStyle;

  colour:
    string;

  large?:
    boolean;
}) {
  const opacity =
    large
      ? 0.25
      : 0.48;

  if (
    style ===
    "strict"
  ) {
    return (
      <svg
        viewBox="0 0 160 90"
        className="h-full w-full"
      >
        {[30, 60, 90, 120].map(
          (
            x
          ) => (
            <line
              key={
                `v${x}`
              }
              x1={
                x
              }
              y1="10"
              x2={
                x
              }
              y2="80"
              stroke={
                colour
              }
              opacity={
                opacity
              }
            />
          )
        )}

        {[23, 45, 67].map(
          (
            y
          ) => (
            <line
              key={
                `h${y}`
              }
              x1="14"
              y1={
                y
              }
              x2="145"
              y2={
                y
              }
              stroke={
                colour
              }
              opacity={
                opacity
              }
            />
          )
        )}
      </svg>
    );
  }

  if (
    style ===
    "editorial"
  ) {
    return (
      <svg
        viewBox="0 0 160 90"
        className="h-full w-full"
      >
        <line
          x1="24"
          y1="9"
          x2="24"
          y2="80"
          stroke={
            colour
          }
          opacity={
            opacity
          }
        />

        <line
          x1="106"
          y1="9"
          x2="106"
          y2="80"
          stroke={
            colour
          }
          opacity={
            opacity *
            0.7
          }
        />

        <line
          x1="14"
          y1="28"
          x2="145"
          y2="28"
          stroke={
            colour
          }
          opacity={
            opacity
          }
        />

        <line
          x1="48"
          y1="63"
          x2="145"
          y2="63"
          stroke={
            colour
          }
          opacity={
            opacity *
            0.55
          }
        />
      </svg>
    );
  }

  if (
    style ===
    "open"
  ) {
    return (
      <svg
        viewBox="0 0 160 90"
        className="h-full w-full"
      >
        <line
          x1="20"
          y1="20"
          x2="20"
          y2="72"
          stroke={
            colour
          }
          opacity={
            opacity
          }
        />

        <line
          x1="20"
          y1="72"
          x2="127"
          y2="72"
          stroke={
            colour
          }
          opacity={
            opacity *
            0.6
          }
        />
      </svg>
    );
  }

  if (
    style ===
    "offset"
  ) {
    return (
      <svg
        viewBox="0 0 160 90"
        className="h-full w-full"
      >
        <line
          x1="19"
          y1="21"
          x2="111"
          y2="21"
          stroke={
            colour
          }
          opacity={
            opacity
          }
        />

        <line
          x1="47"
          y1="43"
          x2="143"
          y2="43"
          stroke={
            colour
          }
          opacity={
            opacity *
            0.8
          }
        />

        <line
          x1="29"
          y1="68"
          x2="96"
          y2="68"
          stroke={
            colour
          }
          opacity={
            opacity *
            0.6
          }
        />

        <line
          x1="47"
          y1="10"
          x2="47"
          y2="79"
          stroke={
            colour
          }
          opacity={
            opacity *
            0.45
          }
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 160 90"
      className="h-full w-full"
    >
      {Array.from({
        length:
          7,
      }).map(
        (
          _,
          index
        ) => (
          <line
            key={
              index
            }
            x1="15"
            y1={
              14 +
              index *
                10
            }
            x2="145"
            y2={
              14 +
              index *
                10
            }
            stroke={
              colour
            }
            opacity={
              opacity *
              (
                0.45 +
                index *
                  0.06
              )
            }
          />
        )
      )}

      {[31, 62, 93, 124].map(
        (
          x
        ) => (
          <line
            key={
              x
            }
            x1={
              x
            }
            y1="10"
            x2={
              x
            }
            y2="79"
            stroke={
              colour
            }
            opacity={
              opacity *
              0.5
            }
          />
        )
      )}
    </svg>
  );
}

/* ================================================= */
/* UI                                                */
/* ================================================= */

function UIPreview({
  style,
  primary,
  secondary,
  large = false,
}: {
  style:
    UIStyle;

  primary:
    string;

  secondary:
    string;

  large?:
    boolean;
}) {
  const scale =
    large
      ? 1
      : 0.92;

  return (
    <div
      className="
        relative

        h-full
        w-full
      "
      style={{
        transform:
          `scale(${scale})`,
      }}
    >
      {style ===
        "minimal" && (
        <>
          <div
            className="
              absolute

              left-[8%]
              top-[23%]

              h-[28%]
              w-[55%]

              rounded-full

              border
              border-white/[0.11]
            "
          />

          <span
            className="
              absolute

              left-[16%]
              top-[33%]

              h-[3px]
              w-[23%]

              rounded-full
            "
            style={{
              backgroundColor:
                primary,
            }}
          />

          <span
            className="
              absolute

              bottom-[23%]
              right-[12%]

              h-[5px]
              w-[13%]

              rounded-full
            "
            style={{
              backgroundColor:
                secondary,
            }}
          />
        </>
      )}

      {style ===
        "soft" && (
        <>
          <div
            className="
              absolute

              left-[7%]
              top-[18%]

              h-[31%]
              w-[50%]

              rounded-full
            "
            style={{
              backgroundColor:
                alpha(
                  primary,
                  0.22
                ),
            }}
          />

          <div
            className="
              absolute

              bottom-[16%]
              right-[8%]

              h-[34%]
              w-[34%]

              rounded-[16px]
            "
            style={{
              backgroundColor:
                alpha(
                  secondary,
                  0.16
                ),
            }}
          />
        </>
      )}

      {style ===
        "modular" && (
        <div
          className="
            absolute

            inset-[11%]

            grid
            grid-cols-3

            gap-[5px]
          "
        >
          {Array.from({
            length:
              6,
          }).map(
            (
              _,
              index
            ) => (
              <div
                key={
                  index
                }
                className="
                  rounded-[4px]

                  border
                  border-white/[0.08]
                "
                style={{
                  backgroundColor:
                    index ===
                    1
                      ? alpha(
                          primary,
                          0.2
                        )
                      : "rgba(255,255,255,.025)",
                }}
              />
            )
          )}
        </div>
      )}

      {style ===
        "data" && (
        <>
          <p
            className="
              absolute

              left-[10%]
              top-[15%]

              font-mono

              text-[17px]

              text-white/60
            "
          >
            01:24
          </p>

          <div
            className="
              absolute

              bottom-[20%]
              left-[10%]

              flex
              items-end

              gap-[5px]
            "
          >
            {[17, 31, 23, 44, 35].map(
              (
                height,
                index
              ) => (
                <span
                  key={
                    index
                  }
                  className="
                    block
                    w-[7px]

                    rounded-[2px]
                  "
                  style={{
                    height,

                    backgroundColor:
                      index ===
                      3
                        ? secondary
                        : primary,

                    opacity:
                      0.4 +
                      index *
                        0.1,
                  }}
                />
              )
            )}
          </div>
        </>
      )}

      {style ===
        "bold" && (
        <>
          <div
            className="
              absolute

              left-[8%]
              top-[18%]

              h-[42%]
              w-[66%]

              rounded-[7px]
            "
            style={{
              backgroundColor:
                primary,
            }}
          />

          <div
            className="
              absolute

              bottom-[18%]
              right-[8%]

              h-[23%]
              w-[34%]

              rounded-[5px]
            "
            style={{
              backgroundColor:
                secondary,
            }}
          />
        </>
      )}
    </div>
  );
}

/* ================================================= */
/* TEXTURE                                           */
/* ================================================= */

function TexturePreview({
  style,
  primary,
}: {
  style:
    TextureStyle;

  primary:
    string;
}) {
  if (
    style ===
    "clean"
  ) {
    return (
      <div
        className="
          absolute

          inset-[14%]

          rounded-[7px]

          border
          border-white/[0.06]
        "
      />
    );
  }

  return (
    <svg
      viewBox="0 0 160 90"
      className="h-full w-full"
    >
      {style ===
        "grain" &&
        Array.from({
          length:
            34,
        }).map(
          (
            _,
            index
          ) => (
            <circle
              key={
                index
              }
              cx={
                10 +
                (
                  index *
                  37
                ) %
                  143
              }
              cy={
                9 +
                (
                  index *
                  29
                ) %
                  72
              }
              r={
                index %
                5 ===
                0
                  ? 1.3
                  : 0.7
              }
              fill={
                primary
              }
              opacity={
                0.15 +
                (
                  index %
                  4
                ) *
                  0.08
              }
            />
          )
        )}

      {style ===
        "atmospheric" && (
        <>
          <circle
            cx="52"
            cy="44"
            r="31"
            fill={
              primary
            }
            opacity="0.09"
          />

          <circle
            cx="104"
            cy="38"
            r="39"
            fill={
              primary
            }
            opacity="0.045"
          />

          <circle
            cx="126"
            cy="65"
            r="21"
            fill={
              primary
            }
            opacity="0.065"
          />
        </>
      )}

      {style ===
        "digital" &&
        Array.from({
          length:
            28,
        }).map(
          (
            _,
            index
          ) => (
            <rect
              key={
                index
              }
              x={
                12 +
                (
                  index *
                  23
                ) %
                  137
              }
              y={
                12 +
                (
                  index *
                  17
                ) %
                  66
              }
              width={
                index %
                3 ===
                0
                  ? 6
                  : 3
              }
              height={
                index %
                4 ===
                0
                  ? 2
                  : 1
              }
              fill={
                primary
              }
              opacity={
                0.18 +
                (
                  index %
                  3
                ) *
                  0.1
              }
            />
          )
        )}

      {style ===
        "tactile" && (
        <>
          {[0, 1, 2, 3].map(
            (
              index
            ) => (
              <path
                key={
                  index
                }
                d={`M 9 ${
                  23 +
                  index *
                    14
                } C 43 ${
                  6 +
                  index *
                    18
                }, 86 ${
                  39 +
                  index *
                    7
                }, 151 ${
                  17 +
                  index *
                    16
                }`}
                fill="none"
                stroke={
                  primary
                }
                strokeWidth="1"
                opacity={
                  0.18 +
                  index *
                    0.09
                }
              />
            )
          )}
        </>
      )}
    </svg>
  );
}

/* ================================================= */
/* GLOW                                              */
/* ================================================= */

function GlowPreview({
  style,
  primary,
  secondary,
}: {
  style:
    GlowStyle;

  primary:
    string;

  secondary:
    string;
}) {
  return (
    <div
      className="
        relative

        h-full
        w-full

        overflow-hidden
      "
    >
      {style ===
      "none" ? (
        <div
          className="
            absolute

            left-1/2
            top-1/2

            h-[34px]
            w-[34px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            border
            border-white/[0.09]
          "
        />
      ) : (
        <GlowField
          style={
            style
          }
          primary={
            primary
          }
          secondary={
            secondary
          }
        />
      )}

      <span
        className="
          absolute

          left-1/2
          top-1/2

          h-[6px]
          w-[6px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full
        "
        style={{
          backgroundColor:
            primary,
        }}
      />
    </div>
  );
}

function GlowField({
  style,
  primary,
  secondary,
}: {
  style:
    Exclude<
      GlowStyle,
      "none"
    >;

  primary:
    string;

  secondary:
    string;
}) {
  const config =
    style ===
    "soft"
      ? {
          opacity:
            0.18,

          secondaryOpacity:
            0.04,

          size:
            "h-[150px] w-[210px]",
        }
      : style ===
          "focused"
        ? {
            opacity:
              0.3,

            secondaryOpacity:
              0.035,

            size:
              "h-[100px] w-[100px]",
          }
        : {
            opacity:
              0.38,

            secondaryOpacity:
              0.1,

            size:
              "h-[170px] w-[220px]",
          };

  return (
    <RasterGlow
      color={
        primary
      }
      secondaryColor={
        secondary
      }
      opacity={
        config.opacity
      }
      secondaryOpacity={
        config.secondaryOpacity
      }
      centerX={
        50
      }
      centerY={
        50
      }
      className={`
        absolute

        left-1/2
        top-1/2

        -translate-x-1/2
        -translate-y-1/2

        ${config.size}
      `}
    />
  );
}

/* ================================================= */
/* DEPTH                                             */
/* ================================================= */

function DepthPreview({
  style,
  primary,
  secondary,
}: {
  style:
    DepthStyle;

  primary:
    string;

  secondary:
    string;
}) {
  const count =
    style ===
    "flat"
      ? 1
      : style ===
          "subtle"
        ? 2
        : style ===
            "layered"
          ? 3
          : 4;

  const offset =
    style ===
    "immersive"
      ? 13
      : 8;

  return (
    <div
      className="
        absolute

        inset-[10px]
      "
    >
      {Array.from({
        length:
          count,
      }).map(
        (
          _,
          index
        ) => (
          <div
            key={
              index
            }
            className="
              absolute

              h-[42px]
              w-[72px]

              rounded-[7px]

              border
            "
            style={{
              left:
                8 +
                index *
                  offset,

              top:
                8 +
                index *
                  (
                    offset *
                    0.55
                  ),

              borderColor:
                index ===
                count -
                  1
                  ? primary
                  : secondary,

              backgroundColor:
                alpha(
                  index ===
                  count -
                    1
                    ? primary
                    : secondary,
                  0.025 +
                    index *
                      0.02
                ),

              opacity:
                0.28 +
                index *
                  0.18,
            }}
          />
        )
      )}
    </div>
  );
}