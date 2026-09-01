"use client";

import type {
  CSSProperties,
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

type Primitive =
  | "shapes"
  | "lines"
  | "masks"
  | "frames"
  | "particles"
  | "grids"
  | "ui"
  | "gradients"
  | "glow"
  | "textures"
  | "3d"
  | "visualizers"
  | "data";

type PrimitiveRole =
  | "shared"
  | "brandA"
  | "brandB"
  | "common"
  | "content"
  | "restrained";

interface PrimitiveDefinition {
  id: Primitive;
  label: string;
}

interface GraphicConfig {
  eyebrow: string;
  intro: string;

  systemOwner: string;
  expressiveOwner: string;

  doLabel: string;
  dontLabel: string;

  rules: [
    string,
    string,
    string
  ];

  roles: Record<
    Primitive,
    PrimitiveRole
  >;
}

/* ------------------------------------------------ */
/* PRIMITIVES                                       */
/* ------------------------------------------------ */

const PRIMITIVES: PrimitiveDefinition[] = [
  {
    id: "shapes",
    label: "Shapes",
  },
  {
    id: "lines",
    label: "Lines",
  },
  {
    id: "masks",
    label: "Masks",
  },
  {
    id: "frames",
    label: "Frames",
  },
  {
    id: "particles",
    label: "Particles",
  },
  {
    id: "grids",
    label: "Grids",
  },
  {
    id: "ui",
    label: "UI",
  },
  {
    id: "gradients",
    label: "Gradients",
  },
  {
    id: "glow",
    label: "Glow",
  },
  {
    id: "textures",
    label: "Textures",
  },
  {
    id: "3d",
    label: "3D",
  },
  {
    id: "visualizers",
    label: "Visualizers",
  },
  {
    id: "data",
    label: "Data",
  },
];

/* ------------------------------------------------ */
/* COLOUR HELPERS                                   */
/* ------------------------------------------------ */

function normalizeHex(
  value: unknown,
  fallback: string
) {
  if (
    typeof value !== "string"
  ) {
    return fallback;
  }

  const trimmed =
    value.trim();

  if (
    /^#[0-9A-Fa-f]{6}$/.test(
      trimmed
    )
  ) {
    return trimmed;
  }

  if (
    /^[0-9A-Fa-f]{6}$/.test(
      trimmed
    )
  ) {
    return `#${trimmed}`;
  }

  return fallback;
}

function getBrandColour(
  brand: unknown,
  fallback: string
) {
  const value =
    brand as {
      primaryColor?: unknown;
      color?: unknown;

      colors?: unknown[];

      primaryColour?: unknown;
    };

  return normalizeHex(
    value.primaryColor ??
      value.primaryColour ??
      value.color ??
      value.colors?.[0],
    fallback
  );
}

function hexToRgb(
  hex: string
) {
  const value =
    parseInt(
      hex.replace("#", ""),
      16
    );

  return {
    r:
      (value >> 16) & 255,

    g:
      (value >> 8) & 255,

    b:
      value & 255,
  };
}

function alpha(
  colour: string,
  opacity: number
) {
  const {
    r,
    g,
    b,
  } = hexToRgb(
    normalizeHex(
      colour,
      "#FFFFFF"
    )
  );

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/* ------------------------------------------------ */
/* MODEL CONFIG                                     */
/* ------------------------------------------------ */

function getGraphicConfig(
  model: PartnershipModelId,
  brandAName: string,
  brandBName: string
): GraphicConfig {
  switch (model) {
    /* ================================================= */
    /* A × B                                             */
    /* ================================================= */

    case "axb":
      return {
        eyebrow:
          "Shared graphic system",

        intro:
          "Build one neutral visual world. Both brands may contribute accents, but the composition must still read as a single system.",

        systemOwner:
          "Shared / neutral",

        expressiveOwner:
          `${brandAName} + ${brandBName}`,

        doLabel:
          "One shared system. Two controlled accents.",

        dontLabel:
          "Two complete visual worlds fighting for attention.",

        rules: [
          "Neutral geometry first",
          "One dominant accent per moment",
          "Equivalent brand opportunity",
        ],

        roles: {
          shapes: "shared",
          lines: "shared",
          masks: "shared",
          frames: "shared",

          particles:
            "restrained",

          grids: "common",
          ui: "common",

          gradients: "shared",
          glow: "shared",

          textures:
            "restrained",

          "3d": "shared",

          visualizers:
            "shared",

          data: "common",
        },
      };

    /* ================================================= */
    /* A WITH B                                          */
    /* ================================================= */

    case "aandb":
      return {
        eyebrow:
          `${brandAName}-led graphic system`,

        intro:
          `${brandAName} defines the visual grammar. ${brandBName} appears as a recognisable but secondary graphic accent.`,

        systemOwner:
          brandAName,

        expressiveOwner:
          brandAName,

        doLabel:
          `${brandAName} leads. ${brandBName} punctuates.`,

        dontLabel:
          `${brandBName} becoming the dominant visual environment.`,

        rules: [
          `${brandAName} owns structure`,
          `${brandBName} stays local`,
          "Common UI remains neutral",
        ],

        roles: {
          shapes: "brandA",
          lines: "brandA",

          masks: "brandA",
          frames: "brandA",

          particles:
            "restrained",

          grids: "common",
          ui: "common",

          gradients:
            "brandA",

          glow: "brandA",

          textures:
            "restrained",

          "3d": "brandA",

          visualizers:
            "brandA",

          data: "common",
        },
      };

    /* ================================================= */
    /* B POWERED BY A                                    */
    /* ================================================= */

    case "poweredByA":
      return {
        eyebrow:
          `${brandBName}-owned graphic system`,

        intro:
          `${brandBName} owns all consumer-facing visual language. ${brandAName} is limited to technology, production or endorsement moments.`,

        systemOwner:
          brandBName,

        expressiveOwner:
          brandBName,

        doLabel:
          `${brandBName} owns the experience. ${brandAName} endorses.`,

        dontLabel:
          `${brandAName} creating a second branded visual system.`,

        rules: [
          `${brandBName} owns all expressive graphics`,
          `${brandAName} appears as endorsement`,
          "No competing visual language",
        ],

        roles: {
          shapes: "brandB",
          lines: "brandB",
          masks: "brandB",
          frames: "brandB",
          particles: "brandB",

          grids: "common",

          ui: "brandB",

          gradients: "brandB",
          glow: "brandB",
          textures: "brandB",
          "3d": "brandB",

          visualizers:
            "brandB",

          data: "common",
        },
      };

    /* ================================================= */
    /* A PRESENTS B                                      */
    /* ================================================= */

    case "presentsB":
    default:
      return {
        eyebrow:
          `${brandAName} container / ${brandBName} content`,

        intro:
          `${brandAName} owns the frame, grid and interface. ${brandBName} may introduce a richer graphic language inside the content area.`,

        systemOwner:
          brandAName,

        expressiveOwner:
          brandBName,

        doLabel:
          `${brandAName} frames. ${brandBName} lives inside.`,

        dontLabel:
          `${brandBName} escaping the content layer and taking over the platform.`,

        rules: [
          `${brandAName} owns chrome + UI`,
          `${brandBName} owns content expression`,
          "Keep the boundary visible",
        ],

        roles: {
          shapes: "brandA",
          lines: "brandA",

          masks: "content",

          frames: "brandA",

          particles:
            "content",

          grids: "common",
          ui: "brandA",

          gradients:
            "content",

          glow: "content",

          textures:
            "content",

          "3d": "content",

          visualizers:
            "content",

          data: "common",
        },
      };
  }
}

/* ------------------------------------------------ */
/* GENERIC CARD                                     */
/* ------------------------------------------------ */

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        rounded-[20px]

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

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page10() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } = useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

  const brandAName =
    brandA.name.trim() ||
    "Brand A";

  const brandBName =
    brandB.name.trim() ||
    "Brand B";

  const brandAColor =
    getBrandColour(
      brandA,
      "#FF453A"
    );

  const brandBColor =
    getBrandColour(
      brandB,
      "#3478F6"
    );

  const config =
    getGraphicConfig(
      model,
      brandAName,
      brandBName
    );

  return (
    <GuidelinePage>
      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

      <header
        className="
          absolute

          left-[70px]
          right-[70px]
          top-[52px]

          flex
          items-start
          justify-between
        "
      >
        <div
          className="
            max-w-[1010px]
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
            10 / Shared visual territory
          </p>

          <h1
            className="
              mt-[13px]

              whitespace-nowrap

              text-[50px]
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
              mt-[12px]

              max-w-[800px]

              text-[14px]
              leading-[1.4]

              text-white/38
            "
          >
            {config.intro}
          </p>
        </div>

        <div
          className="
            max-w-[260px]

            text-right
          "
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.16em]

              text-white/20
            "
          >
            Graphic model
          </p>

          <p
            className="
              mt-[5px]

              text-[15px]

              text-white/48

              oook-medium
            "
          >
            {config.eyebrow}
          </p>
        </div>
      </header>

      {/* ================================================= */}
      {/* MODEL SUMMARY                                     */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[70px]
          top-[185px]

          w-[280px]
        "
      >
        <Card
          className="
            p-[17px]
          "
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.17em]

              text-white/22
            "
          >
            Ownership
          </p>

          <div
            className="
              mt-[14px]

              space-y-[12px]
            "
          >
            <OwnershipRow
              label="System"
              value={
                config.systemOwner
              }
            />

            <OwnershipRow
              label="Expression"
              value={
                config.expressiveOwner
              }
            />
          </div>

          <div
            className="
              my-[14px]

              h-px

              bg-white/[0.06]
            "
          />

          <div
            className="
              space-y-[9px]
            "
          >
            {config.rules.map(
              (
                rule,
                index
              ) => (
                <div
                  key={rule}
                  className="
                    flex
                    items-start

                    gap-[8px]
                  "
                >
                  <span
                    className="
                      mt-[1px]

                      text-[8px]

                      text-white/20
                    "
                  >
                    0{index + 1}
                  </span>

                  <p
                    className="
                      text-[10px]
                      leading-[1.3]

                      text-white/48
                    "
                  >
                    {rule}
                  </p>
                </div>
              )
            )}
          </div>
        </Card>

        {/* GRAPHIC KEY */}

        <Card
          className="
            mt-[12px]

            p-[17px]
          "
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.17em]

              text-white/22
            "
          >
            Graphic key
          </p>

          <div
            className="
              mt-[13px]

              space-y-[9px]
            "
          >
            <KeyRow
              colour="rgba(255,255,255,0.28)"
              label="Common / neutral"
            />

            <KeyRow
              colour={brandAColor}
              label={brandAName}
            />

            <KeyRow
              colour={brandBColor}
              label={brandBName}
            />
          </div>
        </Card>
      </section>

      {/* ================================================= */}
      {/* DO / DON'T                                        */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[374px]
          right-[70px]
          top-[185px]

          grid
          grid-cols-2

          gap-[14px]
        "
      >
        {/* DO */}

        <ComparisonCard
          type="do"
          title="DO"
          description={
            config.doLabel
          }
        >
          <DoComposition
            model={model}
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
            brandAColor={
              brandAColor
            }
            brandBColor={
              brandBColor
            }
          />
        </ComparisonCard>

        {/* DON'T */}

        <ComparisonCard
          type="dont"
          title="DON'T"
          description={
            config.dontLabel
          }
        >
          <DontComposition
            model={model}
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
            brandAColor={
              brandAColor
            }
            brandBColor={
              brandBColor
            }
          />
        </ComparisonCard>
      </section>

      {/* ================================================= */}
      {/* TOOLKIT                                           */}
      {/* ================================================= */}

      <section
        className="
          absolute

          bottom-[43px]
          left-[70px]
          right-[70px]
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
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.17em]

                text-white/22
              "
            >
              Graphic toolkit
            </p>

            <p
              className="
                mt-[4px]

                text-[10px]

                text-white/30
              "
            >
              Role of each visual primitive
              within this partnership model.
            </p>
          </div>

          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.14em]

              text-white/17
            "
          >
            Structure → expression → information
          </p>
        </div>

        <div
          className="
            mt-[10px]

            grid
            grid-cols-13

            gap-[6px]
          "
        >
          {PRIMITIVES.map(
            (primitive) => (
              <PrimitiveCard
                key={
                  primitive.id
                }
                primitive={
                  primitive
                }
                role={
                  config.roles[
                    primitive.id
                  ]
                }
                brandAColor={
                  brandAColor
                }
                brandBColor={
                  brandBColor
                }
              />
            )
          )}
        </div>
      </section>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* OWNERSHIP                                        */
/* ------------------------------------------------ */

function OwnershipRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between

        gap-[8px]
      "
    >
      <p
        className="
          text-[8px]
          uppercase
          tracking-[0.13em]

          text-white/22
        "
      >
        {label}
      </p>

      <p
        className="
          max-w-[165px]

          truncate

          text-right
          text-[10px]

          text-white/58
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* KEY                                              */
/* ------------------------------------------------ */

function KeyRow({
  colour,
  label,
}: {
  colour: string;
  label: string;
}) {
  return (
    <div
      className="
        flex
        items-center

        gap-[9px]
      "
    >
      <div
        className="
          h-[7px]
          w-[22px]

          rounded-full
        "
        style={{
          backgroundColor:
            colour,
        }}
      />

      <p
        className="
          truncate

          text-[9px]

          text-white/40
        "
      >
        {label}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* COMPARISON CARD                                  */
/* ------------------------------------------------ */

function ComparisonCard({
  type,
  title,
  description,
  children,
}: {
  type:
    | "do"
    | "dont";

  title: string;
  description: string;

  children:
    ReactNode;
}) {
  return (
    <Card
      className="
        overflow-hidden

        p-[13px]
      "
    >
      <div
        className="
          flex
          items-start
          justify-between

          gap-[18px]
        "
      >
        <div
          className="
            flex
            items-center

            gap-[8px]
          "
        >
          <div
            className={`
              flex

              h-[23px]
              w-[23px]

              items-center
              justify-center

              rounded-full

              border

              ${
                type === "do"
                  ? `
                      border-white/18
                      bg-white
                      text-black
                    `
                  : `
                      border-white/12
                      bg-white/[0.03]
                      text-white/42
                    `
              }

              text-[10px]
              oook-medium
            `}
          >
            {type === "do"
              ? "✓"
              : "×"}
          </div>

          <p
            className="
              text-[14px]

              text-white/78

              oook-medium
            "
          >
            {title}
          </p>
        </div>

        <p
          className="
            max-w-[280px]

            text-right
            text-[9px]
            leading-[1.3]

            text-white/30
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          relative

          mt-[11px]

          h-[370px]

          overflow-hidden

          rounded-[15px]

          border
          border-white/[0.07]

          bg-[#060607]
        "
      >
        {children}
      </div>
    </Card>
  );
}

/* ------------------------------------------------ */
/* COMMON CANVAS EFFECTS                            */
/* ------------------------------------------------ */

function CanvasGrid() {
  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        opacity-[0.30]

        [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]

        [background-size:42px_42px]
      "
    />
  );
}

function Noise() {
  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        opacity-[0.08]

        mix-blend-screen

        [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_3px)]
      "
    />
  );
}

/* ------------------------------------------------ */
/* DO COMPOSITION                                   */
/* ------------------------------------------------ */

function DoComposition({
  model,

  brandAName,
  brandBName,

  brandAColor,
  brandBColor,
}: {
  model:
    PartnershipModelId;

  brandAName: string;
  brandBName: string;

  brandAColor: string;
  brandBColor: string;
}) {
  if (
    model === "axb"
  ) {
    return (
      <>
        <CanvasGrid />

        {/* NEUTRAL 3D OBJECT */}

        <div
          className="
            absolute

            left-[31%]
            top-[15%]

            h-[190px]
            w-[190px]

            rounded-[42%]

            border
            border-white/[0.13]

            bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.25),rgba(255,255,255,0.04)_30%,rgba(0,0,0,0.4)_70%)]

            shadow-[0_35px_80px_rgba(0,0,0,0.5)]

            rotate-[11deg]
          "
        />

        {/* MASK */}

        <div
          className="
            absolute

            left-[11%]
            top-[11%]

            h-[62%]
            w-[64%]

            rounded-[100px]

            border
            border-white/[0.08]
          "
        />

        {/* BRAND A LINE */}

        <div
          className="
            absolute

            left-[8%]
            top-[22%]

            h-[3px]
            w-[26%]

            rounded-full
          "
          style={{
            backgroundColor:
              brandAColor,
          }}
        />

        {/* BRAND B LINE */}

        <div
          className="
            absolute

            bottom-[18%]
            right-[8%]

            h-[3px]
            w-[26%]

            rounded-full
          "
          style={{
            backgroundColor:
              brandBColor,
          }}
        />

        <ParticleField
          colour={
            brandAColor
          }
          side="left"
        />

        <ParticleField
          colour={
            brandBColor
          }
          side="right"
        />

        <NeutralInterface
          title="Shared experience"
          subtitle={`${brandAName} × ${brandBName}`}
        />
      </>
    );
  }

  if (
    model === "aandb"
  ) {
    return (
      <>
        <CanvasGrid />

        {/* A GLOW */}

        <div
          className="
            absolute

            -right-[12%]
            -top-[14%]

            h-[330px]
            w-[330px]

            rounded-full

            blur-[75px]
          "
          style={{
            backgroundColor:
              alpha(
                brandAColor,
                0.28
              ),
          }}
        />

        {/* A FRAME */}

        <div
          className="
            absolute

            left-[9%]
            right-[9%]
            top-[10%]

            h-[64%]

            rounded-[28px]

            border-[2px]
          "
          style={{
            borderColor:
              alpha(
                brandAColor,
                0.48
              ),
          }}
        >
          <div
            className="
              absolute

              left-[18px]
              top-[18px]

              h-[60px]
              w-[60px]

              rounded-full

              border
            "
            style={{
              borderColor:
                alpha(
                  brandAColor,
                  0.35
                ),
            }}
          />
        </div>

        {/* B LOCAL MARKER */}

        <div
          className="
            absolute

            right-[13%]
            top-[18%]

            h-[8px]
            w-[46px]

            rounded-full
          "
          style={{
            backgroundColor:
              brandBColor,
          }}
        />

        <Visualizer
          colour={
            brandAColor
          }
        />

        <NeutralInterface
          title={brandAName}
          subtitle={`with ${brandBName}`}
        />
      </>
    );
  }

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <>
        <CanvasGrid />

        {/* B BACKGROUND GLOW */}

        <div
          className="
            absolute

            -left-[15%]
            -top-[20%]

            h-[420px]
            w-[420px]

            rounded-full

            blur-[85px]
          "
          style={{
            backgroundColor:
              alpha(
                brandBColor,
                0.30
              ),
          }}
        />

        {/* B SHAPE */}

        <div
          className="
            absolute

            left-[19%]
            top-[13%]

            h-[215px]
            w-[215px]

            rounded-[34%]

            border

            rotate-[-12deg]
          "
          style={{
            borderColor:
              alpha(
                brandBColor,
                0.46
              ),

            background:
              `linear-gradient(
                145deg,
                ${alpha(
                  brandBColor,
                  0.22
                )},
                rgba(255,255,255,0.015)
              )`,
          }}
        />

        <Visualizer
          colour={
            brandBColor
          }
        />

        <NeutralInterface
          title={brandBName}
          subtitle="Immersive experience"
        />

        {/* A ENDORSEMENT */}

        <div
          className="
            absolute

            bottom-[12px]
            right-[14px]

            flex
            items-center

            gap-[5px]

            text-[5px]
            uppercase
            tracking-[0.12em]

            text-white/24
          "
        >
          Powered by

          <div
            className="
              h-[4px]
              w-[18px]

              rounded-full
            "
            style={{
              backgroundColor:
                brandAColor,
            }}
          />
        </div>
      </>
    );
  }

  /* PRESENTS */

  return (
    <>
      <CanvasGrid />

      {/* A PLATFORM FRAME */}

      <div
        className="
          absolute

          inset-[24px]

          overflow-hidden

          rounded-[22px]

          border
          border-white/[0.09]

          bg-black/38
        "
      >
        {/* A UI */}

        <div
          className="
            flex
            h-[35px]
            items-center

            border-b
            border-white/[0.07]

            px-[12px]
          "
        >
          <div
            className="
              h-[4px]
              w-[28px]

              rounded-full
            "
            style={{
              backgroundColor:
                brandAColor,
            }}
          />

          <p
            className="
              ml-auto

              text-[5px]
              uppercase
              tracking-[0.12em]

              text-white/23
            "
          >
            {brandAName} platform
          </p>
        </div>

        {/* B CONTENT MASK */}

        <div
          className="
            absolute

            bottom-[13px]
            left-[13px]
            right-[13px]
            top-[48px]

            overflow-hidden

            rounded-[16px]

            border
            border-white/[0.06]
          "
        >
          <div
            className="
              absolute

              -right-[14%]
              -top-[35%]

              h-[300px]
              w-[300px]

              rounded-full

              blur-[70px]
            "
            style={{
              backgroundColor:
                alpha(
                  brandBColor,
                  0.42
                ),
            }}
          />

          <div
            className="
              absolute

              left-[16%]
              top-[18%]

              h-[150px]
              w-[150px]

              rounded-full

              border
            "
            style={{
              borderColor:
                alpha(
                  brandBColor,
                  0.55
                ),
            }}
          />

          <ParticleField
            colour={
              brandBColor
            }
            side="right"
          />

          <p
            className="
              absolute

              bottom-[16px]
              left-[16px]

              text-[15px]

              text-white/72
            "
          >
            {brandBName}
          </p>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* DON'T COMPOSITION                                */
/* ------------------------------------------------ */

function DontComposition({
  model,

  brandAName,
  brandBName,

  brandAColor,
  brandBColor,
}: {
  model:
    PartnershipModelId;

  brandAName: string;
  brandBName: string;

  brandAColor: string;
  brandBColor: string;
}) {
  if (
    model === "axb"
  ) {
    return (
      <>
        {/* SPLIT BRAND WORLDS */}

        <div
          className="
            absolute
            inset-y-0
            left-0

            w-1/2
          "
          style={{
            background:
              `radial-gradient(
                circle at 30% 30%,
                ${brandAColor},
                ${alpha(
                  brandAColor,
                  0.35
                )}
              )`,
          }}
        />

        <div
          className="
            absolute
            inset-y-0
            right-0

            w-1/2
          "
          style={{
            background:
              `radial-gradient(
                circle at 70% 60%,
                ${brandBColor},
                ${alpha(
                  brandBColor,
                  0.35
                )}
              )`,
          }}
        />

        <ConflictingGrid />

        <HugeLabel
          text={`${brandAName} / ${brandBName}`}
        />

        <BigCross />
      </>
    );
  }

  if (
    model === "aandb"
  ) {
    return (
      <>
        {/* B DOMINATES */}

        <div
          className="
            absolute
            inset-0
          "
          style={{
            background:
              `radial-gradient(
                circle at 50% 40%,
                ${alpha(
                  brandBColor,
                  0.86
                )},
                ${alpha(
                  brandBColor,
                  0.35
                )}
              )`,
          }}
        />

        <div
          className="
            absolute

            left-[10%]
            top-[12%]

            h-[235px]
            w-[235px]

            rounded-full

            border-[3px]
          "
          style={{
            borderColor:
              brandBColor,
          }}
        />

        <ParticleField
          colour={
            brandBColor
          }
          side="right"
        />

        <HugeLabel
          text={brandBName}
        />

        <div
          className="
            absolute

            bottom-[20px]
            right-[18px]

            text-[7px]

            text-white/35
          "
        >
          tiny {brandAName}
        </div>

        <BigCross />
      </>
    );
  }

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <>
        {/* A BECOMES THE EXPERIENCE */}

        <div
          className="
            absolute
            inset-0
          "
          style={{
            background:
              `linear-gradient(
                135deg,
                ${alpha(
                  brandAColor,
                  0.74
                )},
                #060607
              )`,
          }}
        />

        <div
          className="
            absolute

            -left-[5%]
            top-[8%]

            h-[280px]
            w-[280px]

            rounded-[30%]

            border-[3px]

            rotate-[16deg]
          "
          style={{
            borderColor:
              brandAColor,
          }}
        />

        <Visualizer
          colour={
            brandAColor
          }
        />

        <HugeLabel
          text={brandAName}
        />

        <div
          className="
            absolute

            right-[18px]
            top-[18px]

            h-[7px]
            w-[25px]

            rounded-full
          "
          style={{
            backgroundColor:
              brandBColor,
          }}
        />

        <BigCross />
      </>
    );
  }

  /* PRESENTS */

  return (
    <>
      {/* B TAKES OVER CHROME */}

      <div
        className="
          absolute
          inset-0

          bg-[#09090a]
        "
      />

      {/* B NAV */}

      <div
        className="
          absolute

          inset-x-0
          top-0

          h-[52px]
        "
        style={{
          backgroundColor:
            brandBColor,
        }}
      />

      {/* B SIDEBAR */}

      <div
        className="
          absolute

          bottom-0
          left-0
          top-[52px]

          w-[23%]
        "
        style={{
          backgroundColor:
            alpha(
              brandBColor,
              0.74
            ),
        }}
      />

      {/* CONTENT */}

      <div
        className="
          absolute

          bottom-[28px]
          left-[28%]
          right-[24px]
          top-[78px]

          rounded-[18px]

          border
          border-white/[0.08]

          bg-white/[0.04]
        "
      >
        <ParticleField
          colour={
            brandBColor
          }
          side="right"
        />
      </div>

      <HugeLabel
        text={brandBName}
      />

      <div
        className="
          absolute

          bottom-[16px]
          right-[18px]

          h-[5px]
          w-[24px]

          rounded-full
        "
        style={{
          backgroundColor:
            brandAColor,
        }}
      />

      <BigCross />
    </>
  );
}

/* ------------------------------------------------ */
/* VISUAL HELPERS                                   */
/* ------------------------------------------------ */

function NeutralInterface({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="
        absolute

        bottom-[15px]
        left-[15px]
        right-[15px]

        flex
        items-center

        rounded-[12px]

        border
        border-white/[0.08]

        bg-black/46

        px-[11px]
        py-[9px]

        backdrop-blur-[12px]
      "
    >
      <div>
        <p
          className="
            text-[8px]

            text-white/70
          "
        >
          {title}
        </p>

        <p
          className="
            mt-[2px]

            text-[5px]

            text-white/24
          "
        >
          {subtitle}
        </p>
      </div>

      <div
        className="
          ml-auto

          flex
          gap-[4px]
        "
      >
        <div
          className="
            h-[4px]
            w-[4px]

            rounded-full

            bg-white/30
          "
        />

        <div
          className="
            h-[4px]
            w-[4px]

            rounded-full

            bg-white/15
          "
        />

        <div
          className="
            h-[4px]
            w-[4px]

            rounded-full

            bg-white/10
          "
        />
      </div>
    </div>
  );
}

function ParticleField({
  colour,
  side,
}: {
  colour: string;

  side:
    | "left"
    | "right";
}) {
  const particles = [
    [8, 14, 4],
    [16, 34, 3],
    [25, 18, 5],
    [33, 45, 3],
    [47, 29, 4],
    [58, 58, 2],
    [67, 20, 3],
    [77, 48, 4],
    [87, 32, 2],
  ];

  return (
    <div
      className={`
        absolute

        top-[12%]

        h-[58%]
        w-[36%]

        ${
          side === "left"
            ? "left-[5%]"
            : "right-[5%]"
        }
      `}
    >
      {particles.map(
        (
          [
            left,
            top,
            size,
          ],
          index
        ) => (
          <div
            key={index}
            className="
              absolute

              rounded-full
            "
            style={{
              left:
                `${left}%`,

              top:
                `${top}%`,

              width: size,
              height: size,

              backgroundColor:
                alpha(
                  colour,
                  0.68
                ),

              boxShadow:
                `0 0 ${size * 3}px ${alpha(
                  colour,
                  0.38
                )}`,
            }}
          />
        )
      )}
    </div>
  );
}

function Visualizer({
  colour,
}: {
  colour: string;
}) {
  const heights = [
    22,
    46,
    29,
    70,
    42,
    83,
    52,
    34,
    61,
    26,
  ];

  return (
    <div
      className="
        absolute

        bottom-[78px]
        left-[14%]
        right-[14%]

        flex
        h-[90px]

        items-end
        justify-center

        gap-[5px]
      "
    >
      {heights.map(
        (
          height,
          index
        ) => (
          <div
            key={index}
            className="
              w-[5px]

              rounded-full
            "
            style={{
              height,

              backgroundColor:
                index % 3 === 0
                  ? colour
                  : alpha(
                      colour,
                      0.34
                    ),
            }}
          />
        )
      )}
    </div>
  );
}

function ConflictingGrid() {
  return (
    <>
      <div
        className="
          absolute
          inset-0

          opacity-[0.20]

          [background-image:linear-gradient(rgba(255,255,255,0.18)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.18)_2px,transparent_2px)]

          [background-size:38px_38px]

          rotate-[7deg]
          scale-[1.2]
        "
      />

      <div
        className="
          absolute
          inset-0

          opacity-[0.12]

          [background-image:linear-gradient(45deg,rgba(255,255,255,0.35)_1px,transparent_1px)]

          [background-size:24px_24px]

          rotate-[-12deg]
        "
      />
    </>
  );
}

function HugeLabel({
  text,
}: {
  text: string;
}) {
  return (
    <p
      className="
        absolute

        left-1/2
        top-1/2

        max-w-[78%]

        -translate-x-1/2
        -translate-y-1/2

        truncate

        text-[32px]
        tracking-[-0.04em]

        text-white/76

        oook-semibold
      "
    >
      {text}
    </p>
  );
}

function BigCross() {
  return (
    <div
      className="
        absolute

        right-[15px]
        top-[15px]

        flex

        h-[34px]
        w-[34px]

        items-center
        justify-center

        rounded-full

        border
        border-white/14

        bg-black/28

        text-[18px]

        text-white/65

        backdrop-blur-[10px]
      "
    >
      ×
    </div>
  );
}

/* ------------------------------------------------ */
/* TOOLKIT                                          */
/* ------------------------------------------------ */

function PrimitiveCard({
  primitive,
  role,

  brandAColor,
  brandBColor,
}: {
  primitive:
    PrimitiveDefinition;

  role:
    PrimitiveRole;

  brandAColor: string;
  brandBColor: string;
}) {
  const colour =
    getRoleColour(
      role,
      brandAColor,
      brandBColor
    );

  return (
    <div
      className="
        min-w-0

        rounded-[11px]

        border
        border-white/[0.06]

        bg-white/[0.018]

        p-[7px]
      "
    >
      <PrimitiveIcon
        id={primitive.id}
        colour={colour}
        role={role}
      />

      <p
        className="
          mt-[6px]

          truncate

          text-[7px]

          text-white/48
        "
      >
        {primitive.label}
      </p>

      <p
        className="
          mt-[2px]

          truncate

          text-[5px]
          uppercase
          tracking-[0.10em]

          text-white/18
        "
      >
        {roleLabel(role)}
      </p>
    </div>
  );
}

function getRoleColour(
  role: PrimitiveRole,
  brandAColor: string,
  brandBColor: string
) {
  if (
    role === "brandA"
  ) {
    return brandAColor;
  }

  if (
    role === "brandB" ||
    role === "content"
  ) {
    return brandBColor;
  }

  return "rgba(255,255,255,0.48)";
}

function roleLabel(
  role: PrimitiveRole
) {
  switch (role) {
    case "brandA":
      return "Brand A";

    case "brandB":
      return "Brand B";

    case "content":
      return "Content";

    case "common":
      return "Common";

    case "restrained":
      return "Restrained";

    case "shared":
    default:
      return "Shared";
  }
}

/* ------------------------------------------------ */
/* PRIMITIVE ICON                                   */
/* ------------------------------------------------ */

function PrimitiveIcon({
  id,
  colour,
  role,
}: {
  id: Primitive;
  colour: string;
  role: PrimitiveRole;
}) {
  const baseStyle:
    CSSProperties = {
    borderColor:
      colour,
  };

  if (
    id === "shapes"
  ) {
    return (
      <div
        className="
          relative

          h-[30px]
        "
      >
        <div
          className="
            absolute

            left-[5px]
            top-[4px]

            h-[20px]
            w-[20px]

            rounded-[7px]

            border
          "
          style={baseStyle}
        />

        <div
          className="
            absolute

            right-[5px]
            top-[8px]

            h-[15px]
            w-[15px]

            rounded-full

            border

            opacity-50
          "
          style={baseStyle}
        />
      </div>
    );
  }

  if (
    id === "lines"
  ) {
    return (
      <div
        className="
          flex
          h-[30px]

          flex-col
          justify-center

          gap-[5px]
        "
      >
        <div
          className="
            h-px
            w-full
          "
          style={{
            backgroundColor:
              colour,
          }}
        />

        <div
          className="
            h-px
            w-[65%]
          "
          style={{
            backgroundColor:
              alpha(
                normalizeHex(
                  colour,
                  "#FFFFFF"
                ),
                0.35
              ),
          }}
        />
      </div>
    );
  }

  if (
    id === "masks"
  ) {
    return (
      <div
        className="
          flex
          h-[30px]

          items-center
          justify-center
        "
      >
        <div
          className="
            h-[24px]
            w-[36px]

            overflow-hidden

            rounded-full

            border
            border-white/8
          "
        >
          <div
            className="
              h-full
              w-1/2
            "
            style={{
              backgroundColor:
                colour,
            }}
          />
        </div>
      </div>
    );
  }

  if (
    id === "frames"
  ) {
    return (
      <div
        className="
          flex
          h-[30px]

          items-center
          justify-center
        "
      >
        <div
          className="
            h-[23px]
            w-[39px]

            rounded-[6px]

            border
          "
          style={baseStyle}
        />
      </div>
    );
  }

  if (
    id === "particles"
  ) {
    return (
      <div
        className="
          relative

          h-[30px]
        "
      >
        {[5, 13, 21, 29, 37].map(
          (
            left,
            index
          ) => (
            <div
              key={left}
              className="
                absolute

                h-[3px]
                w-[3px]

                rounded-full
              "
              style={{
                left,

                top:
                  7 +
                  ((index * 7) %
                    16),

                backgroundColor:
                  colour,

                opacity:
                  role ===
                  "restrained"
                    ? 0.35
                    : 0.8,
              }}
            />
          )
        )}
      </div>
    );
  }

  if (
    id === "grids"
  ) {
    return (
      <div
        className="
          h-[30px]

          opacity-50

          [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)]

          [background-size:9px_9px]
        "
      />
    );
  }

  if (
    id === "ui"
  ) {
    return (
      <div
        className="
          relative

          h-[30px]

          rounded-[5px]

          border
          border-white/10
        "
      >
        <div
          className="
            absolute

            left-[4px]
            right-[4px]
            top-[5px]

            h-[2px]

            rounded-full
          "
          style={{
            backgroundColor:
              colour,
          }}
        />

        <div
          className="
            absolute

            bottom-[5px]
            left-[4px]

            h-[8px]
            w-[18px]

            rounded-[3px]

            bg-white/8
          "
        />
      </div>
    );
  }

  if (
    id === "gradients"
  ) {
    return (
      <div
        className="
          h-[30px]

          rounded-[5px]
        "
        style={{
          background:
            `linear-gradient(
              90deg,
              transparent,
              ${colour}
            )`,
        }}
      />
    );
  }

  if (
    id === "glow"
  ) {
    return (
      <div
        className="
          flex
          h-[30px]

          items-center
          justify-center
        "
      >
        <div
          className="
            h-[12px]
            w-[12px]

            rounded-full
          "
          style={{
            backgroundColor:
              colour,

            boxShadow:
              `0 0 18px ${colour}`,
          }}
        />
      </div>
    );
  }

  if (
    id === "textures"
  ) {
    return (
      <div
        className="
          h-[30px]

          rounded-[5px]

          opacity-60

          [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.18)_0px,rgba(255,255,255,0.18)_1px,transparent_1px,transparent_4px)]
        "
      />
    );
  }

  if (
    id === "3d"
  ) {
    return (
      <div
        className="
          flex
          h-[30px]

          items-center
          justify-center
        "
      >
        <div
          className="
            h-[20px]
            w-[20px]

            rotate-[28deg]

            rounded-[5px]

            border
          "
          style={{
            borderColor:
              colour,

            background:
              `linear-gradient(
                135deg,
                ${alpha(
                  normalizeHex(
                    colour,
                    "#FFFFFF"
                  ),
                  0.28
                )},
                transparent
              )`,
          }}
        />
      </div>
    );
  }

  if (
    id === "visualizers"
  ) {
    return (
      <div
        className="
          flex
          h-[30px]

          items-end
          justify-center

          gap-[2px]
        "
      >
        {[8, 20, 13, 25, 16].map(
          (
            height,
            index
          ) => (
            <div
              key={index}
              className="
                w-[3px]

                rounded-full
              "
              style={{
                height,

                backgroundColor:
                  colour,

                opacity:
                  0.35 +
                  index * 0.12,
              }}
            />
          )
        )}
      </div>
    );
  }

  /* DATA */

  return (
    <div
      className="
        flex
        h-[30px]

        items-end
        justify-center

        gap-[3px]
      "
    >
      {[14, 22, 10, 26].map(
        (
          height,
          index
        ) => (
          <div
            key={index}
            className="
              w-[6px]

              rounded-t-[2px]
            "
            style={{
              height,

              backgroundColor:
                index === 3
                  ? colour
                  : "rgba(255,255,255,0.12)",
            }}
          />
        )
      )}
    </div>
  );
}