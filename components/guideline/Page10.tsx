"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

import {
  brandCharacterTraits,
  BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

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

interface VisualProfile {
  roundness: number;
  organic: number;
  precision: number;
  minimalism: number;

  grid: number;
  particles: number;
  glow: number;
  texture: number;
  depth: number;

  diagonal: number;
  asymmetry: number;
  energy: number;
  distortion: number;

  lineWeight: number;
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
    label: "Visualizer",
  },
  {
    id: "data",
    label: "Data",
  },
];

/* ------------------------------------------------ */
/* BASIC HELPERS                                    */
/* ------------------------------------------------ */

function clamp(
  value: number,
  min = 0,
  max = 1
) {
  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );
}

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
      primaryColour?: unknown;
      color?: unknown;
      colors?: unknown[];
    };

  return normalizeHex(
    value.primaryColor ??
      value.primaryColour ??
      value.color ??
      value.colors?.[0],
    fallback
  );
}

function getCharacterTraits(
  brand: unknown
): BrandCharacterTraitId[] {
  const value =
    brand as {
      characterTraits?:
        BrandCharacterTraitId[];
    };

  if (
    !Array.isArray(
      value.characterTraits
    )
  ) {
    return [];
  }

  return value.characterTraits;
}

function hexToRgb(
  colour: string
) {
  const normalized =
    normalizeHex(
      colour,
      "#FFFFFF"
    );

  const value =
    parseInt(
      normalized.replace(
        "#",
        ""
      ),
      16
    );

  return {
    r:
      (value >> 16) &
      255,

    g:
      (value >> 8) &
      255,

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
    colour
  );

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/* ------------------------------------------------ */
/* CHARACTER → VISUAL PROFILE                       */
/* ------------------------------------------------ */

function getBaseProfile(): VisualProfile {
  return {
    roundness: 0.45,
    organic: 0.2,
    precision: 0.55,
    minimalism: 0.55,

    grid: 0.4,
    particles: 0.25,
    glow: 0.3,
    texture: 0.2,
    depth: 0.35,

    diagonal: 0.15,
    asymmetry: 0.25,
    energy: 0.3,
    distortion: 0.05,

    lineWeight: 0.45,
  };
}

function buildVisualProfile(
  traits: BrandCharacterTraitId[]
): VisualProfile {
  const profile =
    getBaseProfile();

  traits.forEach(
    (trait) => {
      switch (trait) {
        case "classic":
          profile.precision += 0.18;
          profile.grid += 0.12;
          profile.asymmetry -= 0.16;
          profile.distortion -= 0.12;
          profile.energy -= 0.1;
          break;

        case "elegant":
          profile.minimalism += 0.18;
          profile.lineWeight -= 0.16;
          profile.energy -= 0.12;
          profile.glow += 0.05;
          profile.texture -= 0.06;
          break;

        case "premium":
          profile.minimalism += 0.2;
          profile.depth += 0.12;
          profile.glow += 0.08;
          profile.particles -= 0.1;
          profile.lineWeight -= 0.12;
          break;

        case "minimal":
          profile.minimalism += 0.32;
          profile.particles -= 0.22;
          profile.texture -= 0.18;
          profile.distortion -= 0.12;
          profile.grid -= 0.05;
          break;

        case "editorial":
          profile.grid += 0.28;
          profile.precision += 0.18;
          profile.asymmetry += 0.05;
          profile.particles -= 0.12;
          break;

        case "technical":
          profile.grid += 0.34;
          profile.precision += 0.28;
          profile.lineWeight -= 0.08;
          profile.particles += 0.08;
          profile.depth += 0.08;
          break;

        case "precise":
          profile.precision += 0.34;
          profile.grid += 0.16;
          profile.asymmetry -= 0.2;
          profile.organic -= 0.22;
          profile.distortion -= 0.2;
          break;

        case "futuristic":
          profile.glow += 0.3;
          profile.depth += 0.25;
          profile.grid += 0.14;
          profile.particles += 0.12;
          profile.texture += 0.06;
          break;

        case "experimental":
          profile.distortion += 0.4;
          profile.asymmetry += 0.25;
          profile.organic += 0.12;
          profile.grid -= 0.1;
          profile.depth += 0.08;
          break;

        case "disruptive":
          profile.diagonal += 0.4;
          profile.asymmetry += 0.32;
          profile.energy += 0.24;
          profile.distortion += 0.24;
          profile.lineWeight += 0.12;
          break;

        case "bold":
          profile.lineWeight += 0.3;
          profile.minimalism -= 0.08;
          profile.energy += 0.12;
          profile.depth += 0.08;
          break;

        case "dynamic":
          profile.diagonal += 0.34;
          profile.energy += 0.32;
          profile.asymmetry += 0.16;
          profile.particles += 0.08;
          break;

        case "energetic":
          profile.energy += 0.42;
          profile.particles += 0.32;
          profile.glow += 0.14;
          profile.lineWeight += 0.08;
          break;

        case "playful":
          profile.roundness += 0.34;
          profile.organic += 0.18;
          profile.asymmetry += 0.16;
          profile.energy += 0.16;
          profile.particles += 0.15;
          break;

        case "youthful":
          profile.energy += 0.24;
          profile.asymmetry += 0.12;
          profile.roundness += 0.12;
          profile.particles += 0.12;
          break;

        case "friendly":
          profile.roundness += 0.32;
          profile.organic += 0.12;
          profile.lineWeight -= 0.05;
          profile.diagonal -= 0.08;
          break;

        case "organic":
          profile.organic += 0.5;
          profile.roundness += 0.2;
          profile.asymmetry += 0.2;
          profile.grid -= 0.18;
          profile.distortion += 0.12;
          break;

        case "immersive":
          profile.depth += 0.42;
          profile.glow += 0.18;
          profile.particles += 0.12;
          profile.texture += 0.08;
          break;

        case "cinematic":
          profile.depth += 0.3;
          profile.glow += 0.14;
          profile.texture += 0.15;
          profile.minimalism += 0.05;
          break;

        case "sporty":
          profile.diagonal += 0.4;
          profile.energy += 0.38;
          profile.grid += 0.12;
          profile.particles += 0.15;
          profile.lineWeight += 0.1;
          break;
      }
    }
  );

  return normalizeProfile(
    profile
  );
}

function normalizeProfile(
  profile: VisualProfile
): VisualProfile {
  return {
    roundness:
      clamp(
        profile.roundness
      ),

    organic:
      clamp(
        profile.organic
      ),

    precision:
      clamp(
        profile.precision
      ),

    minimalism:
      clamp(
        profile.minimalism
      ),

    grid:
      clamp(
        profile.grid
      ),

    particles:
      clamp(
        profile.particles
      ),

    glow:
      clamp(
        profile.glow
      ),

    texture:
      clamp(
        profile.texture
      ),

    depth:
      clamp(
        profile.depth
      ),

    diagonal:
      clamp(
        profile.diagonal
      ),

    asymmetry:
      clamp(
        profile.asymmetry
      ),

    energy:
      clamp(
        profile.energy
      ),

    distortion:
      clamp(
        profile.distortion
      ),

    lineWeight:
      clamp(
        profile.lineWeight
      ),
  };
}

/* ------------------------------------------------ */
/* PROFILE BLENDING                                 */
/* ------------------------------------------------ */

function blendProfiles(
  a: VisualProfile,
  b: VisualProfile,
  aWeight: number
): VisualProfile {
  const bWeight =
    1 - aWeight;

  return {
    roundness:
      a.roundness *
        aWeight +
      b.roundness *
        bWeight,

    organic:
      a.organic *
        aWeight +
      b.organic *
        bWeight,

    precision:
      a.precision *
        aWeight +
      b.precision *
        bWeight,

    minimalism:
      a.minimalism *
        aWeight +
      b.minimalism *
        bWeight,

    grid:
      a.grid *
        aWeight +
      b.grid *
        bWeight,

    particles:
      a.particles *
        aWeight +
      b.particles *
        bWeight,

    glow:
      a.glow *
        aWeight +
      b.glow *
        bWeight,

    texture:
      a.texture *
        aWeight +
      b.texture *
        bWeight,

    depth:
      a.depth *
        aWeight +
      b.depth *
        bWeight,

    diagonal:
      a.diagonal *
        aWeight +
      b.diagonal *
        bWeight,

    asymmetry:
      a.asymmetry *
        aWeight +
      b.asymmetry *
        bWeight,

    energy:
      a.energy *
        aWeight +
      b.energy *
        bWeight,

    distortion:
      a.distortion *
        aWeight +
      b.distortion *
        bWeight,

    lineWeight:
      a.lineWeight *
        aWeight +
      b.lineWeight *
        bWeight,
  };
}

/* ------------------------------------------------ */
/* PARTNERSHIP PROFILE                              */
/* ------------------------------------------------ */

function getPartnershipProfile(
  model: PartnershipModelId,
  brandAProfile: VisualProfile,
  brandBProfile: VisualProfile
) {
  switch (model) {
    case "axb":
      return blendProfiles(
        brandAProfile,
        brandBProfile,
        0.5
      );

    case "aandb":
      return blendProfiles(
        brandAProfile,
        brandBProfile,
        0.72
      );

    case "poweredByA":
      return blendProfiles(
        brandBProfile,
        brandAProfile,
        0.88
      );

    case "presentsB":
    default:
      return brandAProfile;
  }
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
    case "axb":
      return {
        eyebrow:
          "Shared graphic system",

        intro:
          "The collaboration combines both personalities into one visual grammar. Neither brand should generate a separate competing universe.",

        systemOwner:
          "Shared",

        expressiveOwner:
          `${brandAName} + ${brandBName}`,

        doLabel:
          "Blend both personalities into one coherent system.",

        dontLabel:
          "Do not build two independent brand worlds inside one composition.",

        rules: [
          "Character is blended 50 / 50",
          "One shared visual grammar",
          "Brand accents remain controlled",
        ],

        roles: {
          shapes: "shared",
          lines: "shared",
          masks: "shared",
          frames: "shared",
          particles: "shared",
          grids: "common",
          ui: "common",
          gradients: "shared",
          glow: "shared",
          textures: "shared",
          "3d": "shared",
          visualizers: "shared",
          data: "common",
        },
      };

    case "aandb":
      return {
        eyebrow:
          `${brandAName}-led graphic system`,

        intro:
          `${brandAName}'s personality defines the core visual grammar. ${brandBName} can influence secondary details without changing the overall character.`,

        systemOwner:
          brandAName,

        expressiveOwner:
          brandAName,

        doLabel:
          `${brandAName}'s character defines the system; ${brandBName} modifies details.`,

        dontLabel:
          `${brandBName}'s personality should not become visually dominant.`,

        rules: [
          "≈ 70% Brand A character",
          "≈ 30% Brand B influence",
          "One coherent system",
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
          gradients: "brandA",
          glow: "brandA",
          textures:
            "restrained",
          "3d": "brandA",
          visualizers:
            "brandA",
          data: "common",
        },
      };

    case "poweredByA":
      return {
        eyebrow:
          `${brandBName}-owned graphic system`,

        intro:
          `${brandBName}'s character determines almost the entire consumer-facing graphic language. ${brandAName} should not introduce a recognisable second visual style.`,

        systemOwner:
          brandBName,

        expressiveOwner:
          brandBName,

        doLabel:
          `${brandBName}'s personality owns the experience.`,

        dontLabel:
          `${brandAName}'s character should not leak into the consumer-facing system.`,

        rules: [
          "≈ 85–90% Brand B character",
          "Brand A only endorses",
          "No second visual grammar",
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

    case "presentsB":
    default:
      return {
        eyebrow:
          `${brandAName} container / ${brandBName} content`,

        intro:
          `The two personalities remain intentionally separated: ${brandAName} defines the container, grid and UI; ${brandBName} expresses itself inside the featured content area.`,

        systemOwner:
          brandAName,

        expressiveOwner:
          brandBName,

        doLabel:
          "Different personalities, separated by a clear container / content boundary.",

        dontLabel:
          `${brandBName}'s visual character should not take over the platform itself.`,

        rules: [
          "Brand A = platform character",
          "Brand B = content character",
          "Keep the boundary visible",
        ],

        roles: {
          shapes: "brandA",
          lines: "brandA",
          masks: "content",
          frames: "brandA",
          particles: "content",
          grids: "common",
          ui: "brandA",
          gradients: "content",
          glow: "content",
          textures: "content",
          "3d": "content",
          visualizers: "content",
          data: "common",
        },
      };
  }
}

/* ------------------------------------------------ */
/* PROFILE STYLE HELPERS                            */
/* ------------------------------------------------ */

function getRadius(
  profile: VisualProfile,
  min = 4,
  max = 70
) {
  return (
    min +
    profile.roundness *
      (max - min)
  );
}

function getRotation(
  profile: VisualProfile,
  multiplier = 1
) {
  return (
    profile.diagonal *
      13 *
      multiplier +
    profile.asymmetry *
      5 *
      multiplier
  );
}

function getShapeClip(
  profile: VisualProfile
) {
  if (
    profile.organic >
    0.68
  ) {
    return "polygon(12% 4%, 71% 0%, 100% 27%, 89% 75%, 61% 100%, 18% 89%, 0% 48%)";
  }

  if (
    profile.distortion >
    0.62
  ) {
    return "polygon(7% 17%, 86% 0%, 100% 68%, 72% 100%, 13% 85%, 0% 41%)";
  }

  return undefined;
}

function getGridSize(
  profile: VisualProfile
) {
  return Math.round(
    72 -
      profile.grid *
        42
  );
}

function getParticleCount(
  profile: VisualProfile
) {
  return Math.round(
    3 +
      profile.particles *
        15
  );
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

  /* ---------------------------------------------- */
  /* CHARACTER                                      */
  /* ---------------------------------------------- */

  const brandATraits =
    getCharacterTraits(
      brandA
    );

  const brandBTraits =
    getCharacterTraits(
      brandB
    );

  const brandAProfile =
    buildVisualProfile(
      brandATraits
    );

  const brandBProfile =
    buildVisualProfile(
      brandBTraits
    );

  const sharedProfile =
    getPartnershipProfile(
      model,
      brandAProfile,
      brandBProfile
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
          top-[46px]

          flex
          items-start
          justify-between
        "
      >
        <div
          className="
            max-w-[1040px]
          "
        >
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

              whitespace-nowrap

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

              max-w-[880px]

              text-[16px]
              leading-[1.38]

              text-white/45
            "
          >
            {config.intro}
          </p>
        </div>

        <div
          className="
            max-w-[270px]

            text-right
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.16em]

              text-white/24
            "
          >
            Graphic model
          </p>

          <p
            className="
              mt-[6px]

              text-[17px]
              leading-[1.15]

              text-white/58

              oook-medium
            "
          >
            {config.eyebrow}
          </p>
        </div>
      </header>

      {/* ================================================= */}
      {/* LEFT COLUMN                                       */}
      {/* ================================================= */}

      <aside
        className="
          absolute

          left-[70px]
          top-[188px]

          w-[292px]
        "
      >
        {/* ---------------------------------------------- */}
        {/* CHARACTER INPUT                                */}
        {/* ---------------------------------------------- */}

        <Card
          className="
            p-[15px]
          "
        >
          <SectionLabel>
            Character input
          </SectionLabel>

          <CharacterBlock
            label={
              brandAName
            }
            traits={
              brandATraits
            }
            colour={
              brandAColor
            }
          />

          <div
            className="
              my-[12px]

              h-px

              bg-white/[0.06]
            "
          />

          <CharacterBlock
            label={
              brandBName
            }
            traits={
              brandBTraits
            }
            colour={
              brandBColor
            }
          />
        </Card>

        {/* ---------------------------------------------- */}
        {/* RESULTING BEHAVIOUR                            */}
        {/* ---------------------------------------------- */}

        <Card
          className="
            mt-[11px]

            p-[15px]
          "
        >
          <SectionLabel>
            Resulting behaviour
          </SectionLabel>

          <div
            className="
              mt-[13px]

              grid
              grid-cols-2

              gap-x-[13px]
              gap-y-[11px]
            "
          >
            <ProfileMetric
              label="Geometry"
              value={
                sharedProfile.organic
              }
              left="Rigid"
              right="Organic"
            />

            <ProfileMetric
              label="Density"
              value={
                1 -
                sharedProfile.minimalism
              }
              left="Quiet"
              right="Dense"
            />

            <ProfileMetric
              label="Grid"
              value={
                sharedProfile.grid
              }
              left="Free"
              right="Strict"
            />

            <ProfileMetric
              label="Energy"
              value={
                sharedProfile.energy
              }
              left="Calm"
              right="Fast"
            />

            <ProfileMetric
              label="Depth"
              value={
                sharedProfile.depth
              }
              left="Flat"
              right="Spatial"
            />

            <ProfileMetric
              label="Texture"
              value={
                sharedProfile.texture
              }
              left="Clean"
              right="Rich"
            />
          </div>
        </Card>

        {/* ---------------------------------------------- */}
        {/* PARTNERSHIP LOGIC                              */}
        {/* ---------------------------------------------- */}

        <Card
          className="
            mt-[11px]

            p-[15px]
          "
        >
          <SectionLabel>
            Partnership logic
          </SectionLabel>

          <div
            className="
              mt-[12px]

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
                    grid
                    grid-cols-[20px_minmax(0,1fr)]

                    items-start
                    gap-[6px]
                  "
                >
                  <span
                    className="
                      text-[9px]

                      text-white/22
                    "
                  >
                    0{index + 1}
                  </span>

                  <p
                    className="
                      text-[11px]
                      leading-[1.3]

                      text-white/52
                    "
                  >
                    {rule}
                  </p>
                </div>
              )
            )}
          </div>
        </Card>
      </aside>

      {/* ================================================= */}
      {/* DO / DON'T                                        */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[385px]
          right-[70px]
          top-[188px]

          grid
          grid-cols-2

          gap-[13px]
        "
      >
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

            brandAProfile={
              brandAProfile
            }

            brandBProfile={
              brandBProfile
            }

            sharedProfile={
              sharedProfile
            }
          />
        </ComparisonCard>

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

            brandAProfile={
              brandAProfile
            }

            brandBProfile={
              brandBProfile
            }
          />
        </ComparisonCard>
      </section>

      {/* ================================================= */}
      {/* CHARACTER → VISUAL LANGUAGE                       */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[385px]
          right-[70px]
          top-[636px]

          grid
          grid-cols-2

          gap-[13px]
        "
      >
        <CharacterImplicationCard
          brandLabel="Brand A character"
          brandName={
            brandAName
          }
          colour={
            brandAColor
          }
          traits={
            brandATraits
          }
        />

        <CharacterImplicationCard
          brandLabel="Brand B character"
          brandName={
            brandBName
          }
          colour={
            brandBColor
          }
          traits={
            brandBTraits
          }
        />
      </section>

      {/* ================================================= */}
      {/* TOOLKIT                                           */}
      {/* ================================================= */}

      <section
        className="
          absolute

          bottom-[25px]
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
                text-[9px]
                uppercase
                tracking-[0.16em]

                text-white/27
              "
            >
              Generated graphic toolkit
            </p>

            <p
              className="
                mt-[3px]

                text-[10px]

                text-white/32
              "
            >
              Character controls the behaviour of each visual primitive.
            </p>
          </div>

          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.14em]

              text-white/20
            "
          >
            Character × hierarchy
          </p>
        </div>

        <div
          className="
            mt-[8px]

            grid
            grid-cols-[repeat(13,minmax(0,1fr))]

            gap-[5px]
          "
        >
          {PRIMITIVES.map(
            (
              primitive
            ) => {
              const role =
                config.roles[
                  primitive.id
                ];

              const profile =
                getProfileForRole(
                  role,
                  brandAProfile,
                  brandBProfile,
                  sharedProfile
                );

              return (
                <PrimitiveCard
                  key={
                    primitive.id
                  }

                  primitive={
                    primitive
                  }

                  role={role}

                  profile={
                    profile
                  }

                  brandAColor={
                    brandAColor
                  }

                  brandBColor={
                    brandBColor
                  }
                />
              );
            }
          )}
        </div>
      </section>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* SECTION LABEL                                    */
/* ------------------------------------------------ */

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
        tracking-[0.15em]

        text-white/31

        oook-medium
      "
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------ */
/* CHARACTER BLOCK                                  */
/* ------------------------------------------------ */

function CharacterBlock({
  label,
  traits,
  colour,
}: {
  label: string;

  traits:
    BrandCharacterTraitId[];

  colour: string;
}) {
  const labels =
    traits
      .map(
        (traitId) =>
          brandCharacterTraits.find(
            (trait) =>
              trait.id ===
              traitId
          )?.label
      )
      .filter(Boolean);

  return (
    <div
      className="
        mt-[12px]
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
          className="
            h-[5px]
            w-[20px]

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

            text-[11px]

            text-white/66

            oook-medium
          "
        >
          {label}
        </p>
      </div>

      <div
        className="
          mt-[8px]

          flex
          flex-wrap

          gap-[4px]
        "
      >
        {labels.length >
        0 ? (
          labels.map(
            (trait) => (
              <span
                key={trait}
                className="
                  rounded-full

                  border
                  border-white/[0.075]

                  bg-white/[0.025]

                  px-[7px]
                  py-[3px]

                  text-[8px]

                  text-white/45
                "
              >
                {trait}
              </span>
            )
          )
        ) : (
          <span
            className="
              text-[9px]

              text-white/24
            "
          >
            Neutral character
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* PROFILE METRIC                                   */
/* ------------------------------------------------ */

function ProfileMetric({
  label,
  value,
  left,
  right,
}: {
  label: string;
  value: number;

  left: string;
  right: string;
}) {
  return (
    <div>
      <p
        className="
          text-[8px]
          uppercase
          tracking-[0.11em]

          text-white/27
        "
      >
        {label}
      </p>

      <div
        className="
          mt-[5px]

          h-[4px]

          overflow-hidden

          rounded-full

          bg-white/[0.07]
        "
      >
        <div
          className="
            h-full

            rounded-full

            bg-white/48
          "
          style={{
            width:
              `${Math.round(
                clamp(value) *
                  100
              )}%`,
          }}
        />
      </div>

      <div
        className="
          mt-[4px]

          flex
          justify-between

          text-[7px]

          text-white/20
        "
      >
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* CHARACTER IMPLICATIONS                           */
/* ------------------------------------------------ */

function CharacterImplicationCard({
  brandLabel,
  brandName,
  colour,
  traits,
}: {
  brandLabel: string;
  brandName: string;

  colour: string;

  traits:
    BrandCharacterTraitId[];
}) {
  const selectedTraits =
    traits.flatMap(
      (traitId) => {
        const trait =
          brandCharacterTraits.find(
            (item) =>
              item.id ===
              traitId
          );

        return trait
          ? [trait]
          : [];
      }
    );

  return (
    <Card
      className="
        min-h-[124px]

        px-[15px]
        py-[12px]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between

          gap-[12px]
        "
      >
        <div
          className="
            flex
            min-w-0
            items-center

            gap-[8px]
          "
        >
          <div
            className="
              h-[5px]
              w-[22px]

              shrink-0

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
              uppercase
              tracking-[0.13em]

              text-white/36

              oook-medium
            "
          >
            {brandLabel}
          </p>
        </div>

        <p
          className="
            max-w-[190px]

            truncate

            text-[9px]

            text-white/30
          "
        >
          {brandName}
        </p>
      </div>

      {selectedTraits.length >
      0 ? (
        <div
          className="
            mt-[10px]

            grid
            grid-cols-1

            gap-[5px]
          "
        >
          {selectedTraits.map(
            (trait) => (
              <TraitImplicationRow
                key={
                  trait.id
                }
                label={
                  trait.label
                }
                implication={
                  trait.graphicImplication
                }
              />
            )
          )}
        </div>
      ) : (
        <div
          className="
            mt-[10px]

            rounded-[9px]

            border
            border-white/[0.05]

            bg-white/[0.012]

            px-[10px]
            py-[9px]
          "
        >
          <p
            className="
              text-[9px]
              leading-[1.35]

              text-white/27
            "
          >
            No character traits selected. The system uses a neutral geometric profile.
          </p>
        </div>
      )}
    </Card>
  );
}

/* ------------------------------------------------ */
/* TRAIT IMPLICATION ROW                            */
/* ------------------------------------------------ */

function TraitImplicationRow({
  label,
  implication,
}: {
  label: string;
  implication: string;
}) {
  return (
    <div
      className="
        grid

        grid-cols-[82px_minmax(0,1fr)]

        items-baseline

        gap-[9px]
      "
    >
      <p
        className="
          truncate

          text-[9px]

          text-white/68

          oook-medium
        "
      >
        {label}
      </p>

      <p
        className="
          truncate

          text-[8px]
          leading-[1.3]

          text-white/35
        "
        title={
          implication
        }
      >
        {implication}
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
          min-h-[36px]

          items-start
          justify-between

          gap-[14px]
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

              h-[24px]
              w-[24px]

              shrink-0

              items-center
              justify-center

              rounded-full

              border

              text-[11px]

              ${
                type ===
                "do"
                  ? `
                      border-white
                      bg-white
                      text-black
                    `
                  : `
                      border-white/14
                      bg-white/[0.025]
                      text-white/48
                    `
              }
            `}
          >
            {type === "do"
              ? "✓"
              : "×"}
          </div>

          <p
            className="
              text-[15px]

              text-white/84

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
            text-[10px]
            leading-[1.35]

            text-white/38
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          relative

          mt-[10px]

          h-[360px]

          overflow-hidden

          rounded-[14px]

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
/* GENERATED GRID                                   */
/* ------------------------------------------------ */

function GeneratedGrid({
  profile,
}: {
  profile:
    VisualProfile;
}) {
  if (
    profile.grid <
    0.18
  ) {
    return null;
  }

  const size =
    getGridSize(
      profile
    );

  const opacity =
    0.08 +
    profile.grid *
      0.18;

  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0
      "
      style={{
        opacity,

        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",

        backgroundSize:
          `${size}px ${size}px`,

        transform:
          `rotate(${
            profile.diagonal *
            4
          }deg) scale(1.08)`,
      }}
    />
  );
}

/* ------------------------------------------------ */
/* GENERATED TEXTURE                                */
/* ------------------------------------------------ */

function GeneratedTexture({
  profile,
}: {
  profile:
    VisualProfile;
}) {
  if (
    profile.texture <
    0.18
  ) {
    return null;
  }

  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        mix-blend-screen
      "
      style={{
        opacity:
          profile.texture *
          0.14,

        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 5px)",
      }}
    />
  );
}

/* ------------------------------------------------ */
/* GENERATED SHAPE                                  */
/* ------------------------------------------------ */

function GeneratedShape({
  profile,
  colour,
  className = "",
  scale = 1,
}: {
  profile:
    VisualProfile;

  colour: string;

  className?: string;

  scale?: number;
}) {
  const radius =
    getRadius(
      profile,
      5,
      95
    );

  const rotation =
    getRotation(
      profile
    );

  const clipPath =
    getShapeClip(
      profile
    );

  return (
    <div
      className={`
        absolute
        border
        ${className}
      `}
      style={{
        borderRadius:
          `${radius}px`,

        borderWidth:
          `${Math.max(
            1,
            Math.round(
              1 +
                profile.lineWeight *
                  2
            )
          )}px`,

        borderColor:
          alpha(
            colour,
            0.22 +
              profile.precision *
                0.28
          ),

        background:
          `radial-gradient(
            circle at 28% 24%,
            ${alpha(
              colour,
              0.12 +
                profile.glow *
                  0.2
            )},
            ${alpha(
              colour,
              0.025
            )} 45%,
            rgba(0,0,0,0.18) 100%
          )`,

        boxShadow:
          profile.glow >
          0.3
            ? `0 0 ${
                35 +
                profile.glow *
                  65
              }px ${alpha(
                colour,
                profile.glow *
                  0.22
              )}`
            : undefined,

        transform:
          `rotate(${rotation}deg) scale(${scale})`,

        clipPath,
      }}
    />
  );
}

/* ------------------------------------------------ */
/* GENERATED PARTICLES                              */
/* ------------------------------------------------ */

function GeneratedParticles({
  profile,
  colour,
  side = "right",
}: {
  profile:
    VisualProfile;

  colour: string;

  side?:
    | "left"
    | "right";
}) {
  const count =
    getParticleCount(
      profile
    );

  return (
    <div
      className={`
        absolute

        top-[8%]

        h-[70%]
        w-[44%]

        ${
          side === "left"
            ? "left-[3%]"
            : "right-[3%]"
        }
      `}
    >
      {Array.from({
        length:
          count,
      }).map(
        (
          _,
          index
        ) => {
          const left =
            (index * 31 +
              7) %
            92;

          const top =
            (index * 47 +
              13) %
            88;

          const size =
            2 +
            ((index *
              3) %
              5) *
              (0.5 +
                profile.energy *
                  0.5);

          return (
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
                    0.3 +
                      profile.energy *
                        0.45
                  ),

                boxShadow:
                  profile.glow >
                  0.3
                    ? `0 0 ${
                        6 +
                        profile.glow *
                          14
                      }px ${alpha(
                        colour,
                        0.4
                      )}`
                    : undefined,
              }}
            />
          );
        }
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* GENERATED LINES                                  */
/* ------------------------------------------------ */

function GeneratedLines({
  profile,
  colour,
  align = "right",
}: {
  profile:
    VisualProfile;

  colour: string;

  align?:
    | "left"
    | "right";
}) {
  const count =
    Math.round(
      2 +
        profile.grid *
          5
    );

  return (
    <div
      className={`
        absolute

        top-[15%]

        flex
        w-[42%]

        flex-col

        gap-[10px]

        ${
          align === "left"
            ? "left-[7%]"
            : "right-[7%]"
        }
      `}
      style={{
        transform:
          `rotate(${
            profile.diagonal *
            10
          }deg)`,
      }}
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
            key={index}
            className="
              rounded-full
            "
            style={{
              height:
                Math.max(
                  1,
                  profile.lineWeight *
                    3
                ),

              width:
                `${
                  45 +
                  ((index *
                    17) %
                    50)
                }%`,

              marginLeft:
                align ===
                "right"
                  ? "auto"
                  : undefined,

              backgroundColor:
                alpha(
                  colour,
                  0.18 +
                    profile.precision *
                      0.32
                ),
            }}
          />
        )
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* GENERATED VISUALIZER                             */
/* ------------------------------------------------ */

function GeneratedVisualizer({
  profile,
  colour,
}: {
  profile:
    VisualProfile;

  colour: string;
}) {
  const count =
    Math.round(
      6 +
        profile.energy *
          8
    );

  return (
    <div
      className="
        absolute

        bottom-[78px]
        left-[13%]
        right-[13%]

        flex
        h-[82px]

        items-end
        justify-center

        gap-[4px]
      "
    >
      {Array.from({
        length:
          count,
      }).map(
        (
          _,
          index
        ) => {
          const height =
            16 +
            ((index *
              29) %
              60) *
              (0.45 +
                profile.energy *
                  0.7);

          return (
            <div
              key={index}
              className="
                rounded-full
              "
              style={{
                width:
                  2 +
                  profile.lineWeight *
                    4,

                height,

                backgroundColor:
                  index % 4 ===
                  0
                    ? colour
                    : alpha(
                        colour,
                        0.24 +
                          profile.energy *
                            0.22
                      ),
              }}
            />
          );
        }
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* DO                                               */
/* ------------------------------------------------ */

function DoComposition({
  model,

  brandAName,
  brandBName,

  brandAColor,
  brandBColor,

  brandAProfile,
  brandBProfile,
  sharedProfile,
}: {
  model:
    PartnershipModelId;

  brandAName: string;
  brandBName: string;

  brandAColor: string;
  brandBColor: string;

  brandAProfile:
    VisualProfile;

  brandBProfile:
    VisualProfile;

  sharedProfile:
    VisualProfile;
}) {
  if (
    model === "axb"
  ) {
    return (
      <>
        <GeneratedGrid
          profile={
            sharedProfile
          }
        />

        <GeneratedTexture
          profile={
            sharedProfile
          }
        />

        <GeneratedShape
          profile={
            sharedProfile
          }
          colour={
            brandAColor
          }
          className="
            left-[23%]
            top-[14%]

            h-[190px]
            w-[190px]
          "
        />

        <GeneratedShape
          profile={
            sharedProfile
          }
          colour={
            brandBColor
          }
          className="
            right-[18%]
            top-[23%]

            h-[125px]
            w-[125px]

            opacity-55
          "
          scale={0.92}
        />

        <GeneratedParticles
          profile={
            sharedProfile
          }
          colour={
            brandAColor
          }
          side="left"
        />

        <GeneratedParticles
          profile={{
            ...sharedProfile,

            particles:
              sharedProfile.particles *
              0.65,
          }}
          colour={
            brandBColor
          }
          side="right"
        />

        <GeneratedLines
          profile={
            sharedProfile
          }
          colour={
            brandBColor
          }
        />

        <GeneratedVisualizer
          profile={
            sharedProfile
          }
          colour={
            brandAColor
          }
        />

        <InterfaceStrip
          title="Shared experience"
          subtitle={`${brandAName} × ${brandBName}`}
          profile={
            sharedProfile
          }
        />
      </>
    );
  }

  if (
    model === "aandb"
  ) {
    return (
      <>
        <GeneratedGrid
          profile={
            sharedProfile
          }
        />

        <GeneratedTexture
          profile={
            sharedProfile
          }
        />

        <GeneratedShape
          profile={
            brandAProfile
          }
          colour={
            brandAColor
          }
          className="
            left-[18%]
            top-[12%]

            h-[205px]
            w-[225px]
          "
        />

        <GeneratedLines
          profile={
            brandAProfile
          }
          colour={
            brandAColor
          }
        />

        <GeneratedParticles
          profile={{
            ...brandAProfile,

            particles:
              brandAProfile.particles *
              0.75,
          }}
          colour={
            brandAColor
          }
        />

        <GeneratedVisualizer
          profile={
            brandAProfile
          }
          colour={
            brandAColor
          }
        />

        <div
          className="
            absolute

            right-[10%]
            top-[15%]

            h-[7px]
            w-[42px]

            rounded-full
          "
          style={{
            backgroundColor:
              brandBColor,

            transform:
              `rotate(${
                brandBProfile.diagonal *
                12
              }deg)`,

            borderRadius:
              `${getRadius(
                brandBProfile,
                2,
                20
              )}px`,
          }}
        />

        <InterfaceStrip
          title={
            brandAName
          }
          subtitle={`with ${brandBName}`}
          profile={
            brandAProfile
          }
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
        <GeneratedGrid
          profile={
            brandBProfile
          }
        />

        <GeneratedTexture
          profile={
            brandBProfile
          }
        />

        <GeneratedShape
          profile={
            brandBProfile
          }
          colour={
            brandBColor
          }
          className="
            left-[19%]
            top-[12%]

            h-[215px]
            w-[215px]
          "
        />

        <GeneratedParticles
          profile={
            brandBProfile
          }
          colour={
            brandBColor
          }
          side="right"
        />

        <GeneratedLines
          profile={
            brandBProfile
          }
          colour={
            brandBColor
          }
        />

        <GeneratedVisualizer
          profile={
            brandBProfile
          }
          colour={
            brandBColor
          }
        />

        <InterfaceStrip
          title={
            brandBName
          }
          subtitle="Consumer-facing experience"
          profile={
            brandBProfile
          }
        />

        <div
          className="
            absolute

            bottom-[14px]
            right-[16px]

            flex
            items-center

            gap-[6px]

            text-[8px]
            uppercase
            tracking-[0.11em]

            text-white/30
          "
        >
          Powered by

          <div
            className="
              h-[5px]
              w-[22px]

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

  /* ---------------------------------------------- */
  /* A PRESENTS B                                   */
  /* ---------------------------------------------- */

  return (
    <>
      <GeneratedGrid
        profile={
          brandAProfile
        }
      />

      <div
        className="
          absolute

          inset-[23px]

          overflow-hidden

          border
          border-white/[0.08]

          bg-black/35
        "
        style={{
          borderRadius:
            `${getRadius(
              brandAProfile,
              7,
              30
            )}px`,
        }}
      >
        <div
          className="
            flex
            h-[38px]

            items-center

            border-b
            border-white/[0.07]

            px-[12px]
          "
        >
          <div
            className="
              h-[5px]
              w-[30px]

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

              text-[8px]
              uppercase
              tracking-[0.11em]

              text-white/30
            "
          >
            {brandAName} platform
          </p>
        </div>

        <div
          className="
            absolute

            bottom-[12px]
            left-[12px]
            right-[12px]
            top-[50px]

            overflow-hidden

            border
            border-white/[0.055]
          "
          style={{
            borderRadius:
              `${getRadius(
                brandBProfile,
                6,
                70
              )}px`,
          }}
        >
          <GeneratedTexture
            profile={
              brandBProfile
            }
          />

          <GeneratedShape
            profile={
              brandBProfile
            }
            colour={
              brandBColor
            }
            className="
              left-[18%]
              top-[12%]

              h-[140px]
              w-[155px]
            "
          />

          <GeneratedParticles
            profile={
              brandBProfile
            }
            colour={
              brandBColor
            }
          />

          <GeneratedLines
            profile={
              brandBProfile
            }
            colour={
              brandBColor
            }
          />

          <GeneratedVisualizer
            profile={{
              ...brandBProfile,

              energy:
                brandBProfile.energy *
                0.75,
            }}
            colour={
              brandBColor
            }
          />

          <p
            className="
              absolute

              bottom-[15px]
              left-[16px]

              text-[16px]

              text-white/75

              oook-medium
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
/* DON'T                                            */
/* ------------------------------------------------ */

function DontComposition({
  model,

  brandAName,
  brandBName,

  brandAColor,
  brandBColor,

  brandAProfile,
  brandBProfile,
}: {
  model:
    PartnershipModelId;

  brandAName: string;
  brandBName: string;

  brandAColor: string;
  brandBColor: string;

  brandAProfile:
    VisualProfile;

  brandBProfile:
    VisualProfile;
}) {
  if (
    model === "axb"
  ) {
    return (
      <>
        <div
          className="
            absolute

            inset-y-0
            left-0

            w-1/2

            overflow-hidden

            border-r
            border-black/30
          "
          style={{
            backgroundColor:
              alpha(
                brandAColor,
                0.16
              ),
          }}
        >
          <GeneratedGrid
            profile={
              brandAProfile
            }
          />

          <GeneratedShape
            profile={
              brandAProfile
            }
            colour={
              brandAColor
            }
            className="
              left-[15%]
              top-[18%]

              h-[160px]
              w-[160px]
            "
          />

          <GeneratedParticles
            profile={
              brandAProfile
            }
            colour={
              brandAColor
            }
          />
        </div>

        <div
          className="
            absolute

            inset-y-0
            right-0

            w-1/2

            overflow-hidden
          "
          style={{
            backgroundColor:
              alpha(
                brandBColor,
                0.16
              ),
          }}
        >
          <GeneratedGrid
            profile={
              brandBProfile
            }
          />

          <GeneratedShape
            profile={
              brandBProfile
            }
            colour={
              brandBColor
            }
            className="
              right-[15%]
              top-[18%]

              h-[160px]
              w-[160px]
            "
          />

          <GeneratedParticles
            profile={
              brandBProfile
            }
            colour={
              brandBColor
            }
          />
        </div>

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
        <GeneratedGrid
          profile={
            brandBProfile
          }
        />

        <GeneratedTexture
          profile={
            brandBProfile
          }
        />

        <GeneratedShape
          profile={
            brandBProfile
          }
          colour={
            brandBColor
          }
          className="
            left-[17%]
            top-[12%]

            h-[220px]
            w-[235px]
          "
        />

        <GeneratedParticles
          profile={
            brandBProfile
          }
          colour={
            brandBColor
          }
        />

        <GeneratedVisualizer
          profile={
            brandBProfile
          }
          colour={
            brandBColor
          }
        />

        <HugeLabel
          text={
            brandBName
          }
        />

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
        <GeneratedGrid
          profile={
            brandAProfile
          }
        />

        <GeneratedTexture
          profile={
            brandAProfile
          }
        />

        <GeneratedShape
          profile={
            brandAProfile
          }
          colour={
            brandAColor
          }
          className="
            left-[17%]
            top-[12%]

            h-[220px]
            w-[235px]
          "
        />

        <GeneratedParticles
          profile={
            brandAProfile
          }
          colour={
            brandAColor
          }
        />

        <GeneratedVisualizer
          profile={
            brandAProfile
          }
          colour={
            brandAColor
          }
        />

        <HugeLabel
          text={
            brandAName
          }
        />

        <BigCross />
      </>
    );
  }

  return (
    <>
      <GeneratedGrid
        profile={
          brandBProfile
        }
      />

      <GeneratedTexture
        profile={
          brandBProfile
        }
      />

      <div
        className="
          absolute

          inset-x-0
          top-0

          h-[48px]
        "
        style={{
          backgroundColor:
            alpha(
              brandBColor,
              0.72
            ),
        }}
      />

      <div
        className="
          absolute

          bottom-0
          left-0
          top-[48px]

          w-[23%]
        "
        style={{
          backgroundColor:
            alpha(
              brandBColor,
              0.45
            ),
        }}
      />

      <GeneratedShape
        profile={
          brandBProfile
        }
        colour={
          brandBColor
        }
        className="
          right-[12%]
          top-[18%]

          h-[190px]
          w-[200px]
        "
      />

      <GeneratedParticles
        profile={
          brandBProfile
        }
        colour={
          brandBColor
        }
      />

      <HugeLabel
        text={
          brandBName
        }
      />

      <BigCross />
    </>
  );
}

/* ------------------------------------------------ */
/* INTERFACE STRIP                                  */
/* ------------------------------------------------ */

function InterfaceStrip({
  title,
  subtitle,
  profile,
}: {
  title: string;
  subtitle: string;

  profile:
    VisualProfile;
}) {
  return (
    <div
      className="
        absolute

        bottom-[14px]
        left-[14px]
        right-[14px]

        flex
        items-center

        border
        border-white/[0.07]

        bg-black/44

        px-[12px]
        py-[10px]

        backdrop-blur-[12px]
      "
      style={{
        borderRadius:
          `${getRadius(
            profile,
            4,
            18
          )}px`,
      }}
    >
      <div>
        <p
          className="
            text-[10px]

            text-white/75

            oook-medium
          "
        >
          {title}
        </p>

        <p
          className="
            mt-[3px]

            text-[8px]

            text-white/32
          "
        >
          {subtitle}
        </p>
      </div>

      <div
        className="
          ml-auto

          flex
          gap-[5px]
        "
      >
        {Array.from({
          length:
            profile.minimalism >
            0.6
              ? 2
              : 4,
        }).map(
          (
            _,
            index
          ) => (
            <div
              key={index}
              className="
                h-[4px]
                w-[4px]

                rounded-full

                bg-white/24
              "
            />
          )
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* LARGE LABEL                                      */
/* ------------------------------------------------ */

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

        max-w-[74%]

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

/* ------------------------------------------------ */
/* CROSS                                            */
/* ------------------------------------------------ */

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

        bg-black/32

        text-[19px]

        text-white/68

        backdrop-blur-[10px]
      "
    >
      ×
    </div>
  );
}

/* ------------------------------------------------ */
/* TOOLKIT PROFILE                                  */
/* ------------------------------------------------ */

function getProfileForRole(
  role: PrimitiveRole,

  brandAProfile: VisualProfile,
  brandBProfile: VisualProfile,
  sharedProfile: VisualProfile
) {
  if (
    role === "brandA"
  ) {
    return brandAProfile;
  }

  if (
    role === "brandB" ||
    role === "content"
  ) {
    return brandBProfile;
  }

  if (
    role === "restrained"
  ) {
    return {
      ...sharedProfile,

      particles:
        sharedProfile.particles *
        0.35,

      glow:
        sharedProfile.glow *
        0.35,

      texture:
        sharedProfile.texture *
        0.35,

      energy:
        sharedProfile.energy *
        0.4,
    };
  }

  return sharedProfile;
}

/* ------------------------------------------------ */
/* PRIMITIVE CARD                                   */
/* ------------------------------------------------ */

function PrimitiveCard({
  primitive,
  role,
  profile,

  brandAColor,
  brandBColor,
}: {
  primitive:
    PrimitiveDefinition;

  role:
    PrimitiveRole;

  profile:
    VisualProfile;

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

        rounded-[10px]

        border
        border-white/[0.06]

        bg-white/[0.015]

        p-[6px]
      "
    >
      <PrimitiveIcon
        id={
          primitive.id
        }
        colour={
          colour
        }
        profile={
          profile
        }
      />

      <p
        className="
          mt-[5px]

          truncate

          text-[8px]

          text-white/55

          oook-medium
        "
      >
        {primitive.label}
      </p>

      <p
        className="
          mt-[2px]

          truncate

          text-[6px]
          uppercase
          tracking-[0.08em]

          text-white/22
        "
      >
        {roleLabel(
          role
        )}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* ROLE HELPERS                                     */
/* ------------------------------------------------ */

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

  return "#FFFFFF";
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
  profile,
}: {
  id: Primitive;

  colour: string;

  profile:
    VisualProfile;
}) {
  const radius =
    getRadius(
      profile,
      2,
      14
    );

  /* SHAPES */

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

            left-[4px]
            top-[4px]

            h-[20px]
            w-[22px]

            border
          "
          style={{
            borderColor:
              alpha(
                colour,
                0.65
              ),

            borderRadius:
              radius,

            transform:
              `rotate(${
                getRotation(
                  profile,
                  0.7
                )
              }deg)`,

            clipPath:
              getShapeClip(
                profile
              ),
          }}
        />

        <div
          className="
            absolute

            right-[4px]
            top-[9px]

            h-[14px]
            w-[14px]

            border

            opacity-45
          "
          style={{
            borderColor:
              colour,

            borderRadius:
              radius,
          }}
        />
      </div>
    );
  }

  /* LINES */

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
        style={{
          transform:
            `rotate(${
              profile.diagonal *
              7
            }deg)`,
        }}
      >
        <div
          style={{
            height:
              1 +
              profile.lineWeight *
                2,

            width:
              "100%",

            backgroundColor:
              alpha(
                colour,
                0.7
              ),
          }}
        />

        <div
          style={{
            height:
              Math.max(
                1,
                profile.lineWeight *
                  2
              ),

            width:
              `${45 +
              profile.asymmetry *
                40}%`,

            backgroundColor:
              alpha(
                colour,
                0.3
              ),
          }}
        />
      </div>
    );
  }

  /* MASKS */

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
            h-[22px]
            w-[38px]

            overflow-hidden

            border
            border-white/[0.08]
          "
          style={{
            borderRadius:
              radius,

            clipPath:
              getShapeClip(
                profile
              ),
          }}
        >
          <div
            className="
              h-full
              w-[58%]
            "
            style={{
              backgroundColor:
                alpha(
                  colour,
                  0.62
                ),
            }}
          />
        </div>
      </div>
    );
  }

  /* FRAMES */

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
            h-[22px]
            w-[39px]

            border
          "
          style={{
            borderRadius:
              radius,

            borderColor:
              alpha(
                colour,
                0.62
              ),

            borderWidth:
              1 +
              profile.lineWeight *
                1.5,
          }}
        />
      </div>
    );
  }

  /* PARTICLES */

  if (
    id ===
    "particles"
  ) {
    return (
      <div
        className="
          relative
          h-[30px]
        "
      >
        {Array.from({
          length:
            Math.round(
              3 +
                profile.particles *
                  8
            ),
        }).map(
          (
            _,
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
                  `${
                    (index *
                      19) %
                    90
                  }%`,

                top:
                  `${
                    4 +
                    ((index *
                      11) %
                      20)
                  }px`,

                width:
                  2 +
                  (index %
                    3),

                height:
                  2 +
                  (index %
                    3),

                backgroundColor:
                  alpha(
                    colour,
                    0.35 +
                      profile.energy *
                        0.4
                  ),
              }}
            />
          )
        )}
      </div>
    );
  }

  /* GRID */

  if (
    id === "grids"
  ) {
    const gridSize =
      Math.round(
        11 -
          profile.grid *
            5
      );

    return (
      <div
        className="
          h-[30px]
          opacity-45
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.32) 1px, transparent 1px)",

          backgroundSize:
            `${gridSize}px ${gridSize}px`,

          transform:
            `rotate(${
              profile.diagonal *
              4
            }deg)`,
        }}
      />
    );
  }

  /* UI */

  if (
    id === "ui"
  ) {
    return (
      <div
        className="
          relative
          h-[30px]

          border
          border-white/[0.09]
        "
        style={{
          borderRadius:
            radius,
        }}
      >
        <div
          className="
            absolute

            left-[4px]
            right-[4px]
            top-[4px]
          "
          style={{
            height:
              Math.max(
                1,
                profile.lineWeight *
                  2
              ),

            backgroundColor:
              alpha(
                colour,
                0.55
              ),
          }}
        />

        <div
          className="
            absolute

            bottom-[5px]
            left-[4px]

            h-[7px]
            w-[18px]

            bg-white/[0.07]
          "
          style={{
            borderRadius:
              radius *
              0.5,
          }}
        />
      </div>
    );
  }

  /* GRADIENTS */

  if (
    id ===
    "gradients"
  ) {
    return (
      <div
        className="
          h-[30px]
        "
        style={{
          borderRadius:
            radius,

          background:
            `linear-gradient(
              ${
                90 +
                profile.diagonal *
                  40
              }deg,
              transparent,
              ${alpha(
                colour,
                0.65
              )}
            )`,
        }}
      />
    );
  }

  /* GLOW */

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
            rounded-full
          "
          style={{
            width:
              7 +
              profile.glow *
                8,

            height:
              7 +
              profile.glow *
                8,

            backgroundColor:
              colour,

            boxShadow:
              `0 0 ${
                5 +
                profile.glow *
                  22
              }px ${alpha(
                colour,
                0.7
              )}`,
          }}
        />
      </div>
    );
  }

  /* TEXTURES */

  if (
    id === "textures"
  ) {
    return (
      <div
        className="
          h-[30px]
        "
        style={{
          borderRadius:
            radius,

          opacity:
            0.2 +
            profile.texture *
              0.65,

          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.28) 1px, transparent 1px, transparent 4px)",
        }}
      />
    );
  }

  /* 3D */

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

            border
          "
          style={{
            borderColor:
              alpha(
                colour,
                0.7
              ),

            borderRadius:
              radius,

            transform:
              `rotate(${
                18 +
                profile.diagonal *
                  25
              }deg)`,

            background:
              `linear-gradient(
                135deg,
                ${alpha(
                  colour,
                  0.1 +
                    profile.depth *
                      0.26
                )},
                transparent
              )`,

            boxShadow:
              `6px 6px ${
                4 +
                profile.depth *
                  8
              }px rgba(0,0,0,0.45)`,
          }}
        />
      </div>
    );
  }

  /* VISUALIZER */

  if (
    id ===
    "visualizers"
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
        {Array.from({
          length:
            Math.round(
              4 +
                profile.energy *
                  4
            ),
        }).map(
          (
            _,
            index
          ) => (
            <div
              key={index}
              className="
                rounded-full
              "
              style={{
                width:
                  2 +
                  profile.lineWeight,

                height:
                  `${
                    6 +
                    ((index *
                      9) %
                      19) *
                      (0.5 +
                        profile.energy *
                          0.6)
                  }px`,

                backgroundColor:
                  alpha(
                    colour,
                    0.28 +
                      index *
                        0.08
                  ),
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
      {[12, 20, 9, 24].map(
        (
          height,
          index
        ) => (
          <div
            key={index}
            style={{
              width:
                5 +
                profile.lineWeight *
                  2,

              height,

              borderRadius:
                `${Math.min(
                  radius,
                  4
                )}px ${Math.min(
                  radius,
                  4
                )}px 0 0`,

              backgroundColor:
                index === 3
                  ? alpha(
                      colour,
                      0.62
                    )
                  : "rgba(255,255,255,0.11)",
            }}
          />
        )
      )}
    </div>
  );
}