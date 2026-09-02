"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";
import RasterGradient from "./RasterGradient";

import {
  brandCharacterTraits,
  BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

interface GraphicProfile {
  roundness:
    number;

  energy:
    number;

  grid:
    number;

  particles:
    number;

  glow:
    number;

  texture:
    number;

  organic:
    number;

  precision:
    number;

  expressiveTilt:
    number;
}

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function clamp(
  value: number
) {
  return Math.min(
    1,
    Math.max(
      0,
      value
    )
  );
}

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

function getTraits(
  brand: unknown
) {
  const value =
    brand as {
      characterTraits?:
        BrandCharacterTraitId[];
    };

  return Array.isArray(
    value.characterTraits
  )
    ? value.characterTraits
    : [];
}

function hexToRgb(
  colour: string
) {
  const value =
    parseInt(
      colour.replace(
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
      value &
      255,
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
  } =
    hexToRgb(
      colour
    );

  return `rgba(${r},${g},${b},${opacity})`;
}

/* ================================================= */
/* CHARACTER PROFILE                                 */
/* ================================================= */

function buildProfile(
  traits:
    BrandCharacterTraitId[]
): GraphicProfile {
  const p:
    GraphicProfile = {
    roundness:
      0.42,

    energy:
      0.3,

    grid:
      0.45,

    particles:
      0.24,

    glow:
      0.2,

    texture:
      0.14,

    organic:
      0.18,

    precision:
      0.58,

    expressiveTilt:
      0,
  };

  traits.forEach(
    (trait) => {
      switch (trait) {
        case "classic":
          p.precision +=
            0.2;
          p.grid +=
            0.1;
          p.energy -=
            0.08;
          break;

        case "elegant":
          p.roundness +=
            0.05;
          p.energy -=
            0.1;
          p.glow +=
            0.04;
          break;

        case "premium":
          p.glow +=
            0.1;
          p.texture +=
            0.08;
          p.energy -=
            0.08;
          break;

        case "minimal":
          p.particles -=
            0.2;
          p.texture -=
            0.12;
          p.energy -=
            0.1;
          break;

        case "editorial":
          p.grid +=
            0.28;
          p.precision +=
            0.15;
          break;

        case "technical":
          p.grid +=
            0.3;
          p.precision +=
            0.28;
          p.glow +=
            0.06;
          break;

        case "precise":
          p.precision +=
            0.34;
          p.organic -=
            0.16;
          break;

        case "futuristic":
          p.glow +=
            0.32;
          p.grid +=
            0.12;
          p.particles +=
            0.12;
          break;

        case "bold":
          p.energy +=
            0.18;
          break;

        case "dynamic":
          p.energy +=
            0.3;
          p.particles +=
            0.08;
          break;

        case "energetic":
          p.energy +=
            0.4;
          p.particles +=
            0.25;
          break;

        case "sporty":
          p.energy +=
            0.38;
          p.grid +=
            0.1;
          break;

        case "friendly":
          p.roundness +=
            0.3;
          p.organic +=
            0.12;
          break;

        case "organic":
          p.organic +=
            0.5;
          p.roundness +=
            0.18;
          p.texture +=
            0.18;
          p.grid -=
            0.14;
          break;

        case "immersive":
          p.glow +=
            0.16;
          p.particles +=
            0.12;
          break;

        case "cinematic":
          p.glow +=
            0.12;
          p.texture +=
            0.18;
          break;

        case "youthful":
          p.energy +=
            0.2;
          p.roundness +=
            0.1;
          break;

        case "playful":
          p.energy +=
            0.15;
          p.roundness +=
            0.3;
          p.organic +=
            0.2;
          p.expressiveTilt +=
            0.8;
          break;

        case "experimental":
          p.energy +=
            0.14;
          p.organic +=
            0.2;
          p.expressiveTilt +=
            0.7;
          break;

        case "disruptive":
          p.energy +=
            0.28;
          p.expressiveTilt +=
            0.55;
          break;
      }
    }
  );

  Object.keys(
    p
  ).forEach(
    (key) => {
      const k =
        key as keyof GraphicProfile;

      p[k] =
        clamp(
          p[k]
        );
    }
  );

  return p;
}

function blend(
  a: GraphicProfile,
  b: GraphicProfile,
  weight: number
): GraphicProfile {
  const inverse =
    1 -
    weight;

  return {
    roundness:
      a.roundness *
        weight +
      b.roundness *
        inverse,

    energy:
      a.energy *
        weight +
      b.energy *
        inverse,

    grid:
      a.grid *
        weight +
      b.grid *
        inverse,

    particles:
      a.particles *
        weight +
      b.particles *
        inverse,

    glow:
      a.glow *
        weight +
      b.glow *
        inverse,

    texture:
      a.texture *
        weight +
      b.texture *
        inverse,

    organic:
      a.organic *
        weight +
      b.organic *
        inverse,

    precision:
      a.precision *
        weight +
      b.precision *
        inverse,

    expressiveTilt:
      a.expressiveTilt *
        weight +
      b.expressiveTilt *
        inverse,
  };
}

function getSharedProfile(
  model:
    PartnershipModelId,

  a:
    GraphicProfile,

  b:
    GraphicProfile
) {
  switch (model) {
    case "axb":
      return blend(
        a,
        b,
        0.5
      );

    case "aandb":
      return blend(
        a,
        b,
        0.7
      );

    case "poweredByA":
      return blend(
        b,
        a,
        0.9
      );

    case "presentsB":
    default:
      return a;
  }
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page10() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } =
    useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

  const aTraits =
    getTraits(
      brandA
    );

  const bTraits =
    getTraits(
      brandB
    );

  const aProfile =
    buildProfile(
      aTraits
    );

  const bProfile =
    buildProfile(
      bTraits
    );

  const profile =
    getSharedProfile(
      model,
      aProfile,
      bProfile
    );

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

  const leadPrimary =
    model ===
    "poweredByA"
      ? bPrimary
      : aPrimary;

  const leadSecondary =
    model ===
    "poweredByA"
      ? bSecondary
      : aSecondary;

  const supportPrimary =
    model ===
    "poweredByA"
      ? aPrimary
      : bPrimary;

  const supportSecondary =
    model ===
    "poweredByA"
      ? aSecondary
      : bSecondary;

  return (
    <GuidelinePage>
      {/* HEADER */}

      <header className="absolute left-[70px] right-[70px] top-[46px] flex items-start justify-between">
        <div>
          <p className="text-[13px] uppercase tracking-[0.17em] text-white/30">
            10 / Shared visual territory
          </p>

          <h1 className="mt-[12px] text-[52px] leading-none tracking-[-0.045em] text-white oook-semibold">
            Shared visual territory — graphic language
          </h1>

          <p className="mt-[13px] max-w-[850px] text-[16px] leading-[1.38] text-white/45">
            Brand character controls geometry, density, rhythm and expression while partnership hierarchy decides who leads the system.
          </p>
        </div>

        <PartnershipLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
        />
      </header>

      {/* CHARACTER */}

      <aside className="absolute left-[70px] top-[190px] w-[300px]">
        <Card className="p-[16px]">
          <SectionLabel>
            Character input
          </SectionLabel>

          <CharacterGroup
            label="Brand A"
            traits={
              aTraits
            }
            primary={
              aPrimary
            }
            secondary={
              aSecondary
            }
          />

          <CharacterGroup
            label="Brand B"
            traits={
              bTraits
            }
            primary={
              bPrimary
            }
            secondary={
              bSecondary
            }
          />
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Resulting behaviour
          </SectionLabel>

          <div className="mt-[13px] grid grid-cols-2 gap-x-[14px] gap-y-[11px]">
            <Metric
              label="Geometry"
              value={
                profile.organic
              }
              left="Rigid"
              right="Organic"
            />

            <Metric
              label="Energy"
              value={
                profile.energy
              }
              left="Calm"
              right="Active"
            />

            <Metric
              label="Grid"
              value={
                profile.grid
              }
              left="Free"
              right="Strict"
            />

            <Metric
              label="Glow"
              value={
                profile.glow
              }
              left="Flat"
              right="Luminous"
            />

            <Metric
              label="Texture"
              value={
                profile.texture
              }
              left="Clean"
              right="Rich"
            />

            <Metric
              label="Particles"
              value={
                profile.particles
              }
              left="Quiet"
              right="Dense"
            />
          </div>
        </Card>
      </aside>

      {/* DO / DON'T */}

      <section className="absolute left-[395px] right-[70px] top-[190px] grid grid-cols-2 gap-[12px]">
        <Comparison
          good
          title="DO"
          description="Create one visual grammar from both personalities and the partnership hierarchy."
        >
          <GeneratedSystem
            profile={
              profile
            }
            primary={
              leadPrimary
            }
            secondary={
              leadSecondary
            }
            support={
              supportPrimary
            }
            supportSecondary={
              supportSecondary
            }
          />
        </Comparison>

        <Comparison
          title="DON'T"
          description="Do not place two independent branded visual systems side by side."
        >
          <SplitSystem
            aPrimary={
              aPrimary
            }
            aSecondary={
              aSecondary
            }
            bPrimary={
              bPrimary
            }
            bSecondary={
              bSecondary
            }
          />
        </Comparison>
      </section>

      {/* CHARACTER IMPLICATIONS */}

      <section className="absolute left-[395px] right-[70px] top-[610px] grid grid-cols-2 gap-[12px]">
        <TraitCard
          label="Brand A character"
          traits={
            aTraits
          }
          primary={
            aPrimary
          }
          secondary={
            aSecondary
          }
        />

        <TraitCard
          label="Brand B character"
          traits={
            bTraits
          }
          primary={
            bPrimary
          }
          secondary={
            bSecondary
          }
        />
      </section>

      {/* TOOLKIT */}

      <section className="absolute bottom-[26px] left-[70px] right-[70px]">
        <div className="flex justify-between">
          <div>
            <SectionLabel>
              Generated graphic toolkit
            </SectionLabel>

            <p className="mt-[3px] text-[9px] text-white/27">
              Secondary colours support depth, layering and micro-expression.
            </p>
          </div>

          <p className="text-[8px] uppercase tracking-[0.12em] text-white/18">
            Character × hierarchy
          </p>
        </div>

        <div className="mt-[8px] grid grid-cols-13 gap-[5px]">
          {[
            "Shapes",
            "Lines",
            "Masks",
            "Frames",
            "Particles",
            "Grids",
            "UI",
            "Gradients",
            "Glow",
            "Textures",
            "3D",
            "Visualizers",
            "Data",
          ].map(
            (
              label,
              index
            ) => (
              <ToolkitItem
                key={
                  label
                }
                label={
                  label
                }
                index={
                  index
                }
                primary={
                  index %
                    4 ===
                  0
                    ? supportPrimary
                    : leadPrimary
                }
                secondary={
                  index %
                    3 ===
                  0
                    ? supportSecondary
                    : leadSecondary
                }
              />
            )
          )}
        </div>
      </section>
    </GuidelinePage>
  );
}

/* ================================================= */
/* UI                                                */
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
    <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 oook-medium">
      {children}
    </p>
  );
}

function CharacterGroup({
  label,
  traits,
  primary,
  secondary,
}: {
  label:
    string;

  traits:
    BrandCharacterTraitId[];

  primary:
    string;

  secondary:
    string;
}) {
  return (
    <div className="mt-[13px]">
      <div className="flex items-center gap-[6px]">
        <div
          className="h-[4px] w-[22px] rounded-full"
          style={{
            backgroundColor:
              primary,
          }}
        />

        <div
          className="h-[4px] w-[10px] rounded-full"
          style={{
            backgroundColor:
              secondary,
          }}
        />

        <span className="text-[10px] text-white/55">
          {label}
        </span>
      </div>

      <div className="mt-[7px] flex flex-wrap gap-[4px]">
        {traits.length >
        0 ? (
          traits.map(
            (id) => {
              const trait =
                brandCharacterTraits.find(
                  (
                    item
                  ) =>
                    item.id ===
                    id
                );

              return (
                <span
                  key={
                    id
                  }
                  className="rounded-full border border-white/[0.07] px-[6px] py-[3px] text-[8px] text-white/38"
                >
                  {trait?.label ??
                    id}
                </span>
              );
            }
          )
        ) : (
          <span className="text-[9px] text-white/22">
            Neutral
          </span>
        )}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  left,
  right,
}: {
  label:
    string;

  value:
    number;

  left:
    string;

  right:
    string;
}) {
  return (
    <div>
      <p className="text-[8px] uppercase tracking-[0.1em] text-white/26">
        {label}
      </p>

      <div className="mt-[5px] h-[4px] overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-white/50"
          style={{
            width:
              `${Math.round(
                value *
                  100
              )}%`,
          }}
        />
      </div>

      <div className="mt-[4px] flex justify-between text-[7px] text-white/18">
        <span>
          {left}
        </span>

        <span>
          {right}
        </span>
      </div>
    </div>
  );
}

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
    <Card className="p-[13px]">
      <div className="flex min-h-[38px] items-start justify-between gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <span
            className={`
              flex
              h-[24px]
              w-[24px]
              items-center
              justify-center
              rounded-full
              text-[11px]

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
          </span>

          <span className="text-[14px] text-white/74 oook-medium">
            {title}
          </span>
        </div>

        <p className="max-w-[300px] text-right text-[10px] leading-[1.35] text-white/35">
          {description}
        </p>
      </div>

      <div className="relative mt-[9px] h-[340px] overflow-hidden rounded-[13px] border border-white/[0.06] bg-[#050506]">
        {children}
      </div>
    </Card>
  );
}

/* ================================================= */
/* GRID                                              */
/* ================================================= */

function GridField({
  density,
}: {
  density:
    number;
}) {
  const columns =
    Math.round(
      7 +
        density *
          8
    );

  const rows =
    Math.round(
      5 +
        density *
          6
    );

  return (
    <div className="pointer-events-none absolute inset-0 opacity-30">
      {Array.from({
        length:
          columns,
      }).map(
        (
          _,
          index
        ) => (
          <div
            key={`v-${index}`}
            className="absolute bottom-0 top-0 w-px bg-white/[0.08]"
            style={{
              left:
                `${
                  (index +
                    1) /
                  (columns +
                    1) *
                  100
                }%`,
            }}
          />
        )
      )}

      {Array.from({
        length:
          rows,
      }).map(
        (
          _,
          index
        ) => (
          <div
            key={`h-${index}`}
            className="absolute left-0 right-0 h-px bg-white/[0.08]"
            style={{
              top:
                `${
                  (index +
                    1) /
                  (rows +
                    1) *
                  100
                }%`,
            }}
          />
        )
      )}
    </div>
  );
}

/* ================================================= */
/* GENERATED SYSTEM                                  */
/* ================================================= */

function GeneratedSystem({
  profile,
  primary,
  secondary,
  support,
  supportSecondary,
}: {
  profile:
    GraphicProfile;

  primary:
    string;

  secondary:
    string;

  support:
    string;

  supportSecondary:
    string;
}) {
  const radius =
    10 +
    profile.roundness *
      65;

  const rotate =
    profile.expressiveTilt >
    0.45
      ? (
          profile.expressiveTilt -
          0.45
        ) *
        8
      : 0;

  const particleCount =
    Math.round(
      4 +
        profile.particles *
          14
    );

  return (
    <>
      <GridField
        density={
          profile.grid
        }
      />

      <div
        className="absolute left-[16%] top-[14%] h-[170px] w-[195px] overflow-hidden border"
        style={{
          borderRadius:
            radius,

          borderColor:
            alpha(
              primary,
              0.7
            ),

          transform:
            rotate
              ? `rotate(${rotate}deg)`
              : undefined,
        }}
      >
        <RasterGlow
          color={
            secondary
          }
          secondaryColor={
            primary
          }
          opacity={
            0.12 +
            profile.glow *
              0.24
          }
          secondaryOpacity={
            0.04 +
            profile.glow *
              0.08
          }
          centerX={28}
          centerY={24}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div
        className="absolute right-[17%] top-[27%] h-[105px] w-[125px] overflow-hidden border"
        style={{
          borderRadius:
            radius *
            0.7,

          borderColor:
            alpha(
              support,
              0.45
            ),
        }}
      >
        <RasterGradient
          direction="diagonal"
          className="absolute inset-0 h-full w-full"
          stops={[
            {
              color:
                supportSecondary,
              offset: 0,
              opacity: 0.18,
            },
            {
              color:
                supportSecondary,
              offset: 55,
              opacity: 0.05,
            },
            {
              color:
                supportSecondary,
              offset:
                100,
              opacity: 0,
            },
          ]}
        />
      </div>

      <div className="absolute right-[8%] top-[16%] flex w-[38%] flex-col gap-[10px]">
        {[
          80,
          55,
          95,
          42,
        ].map(
          (
            width,
            index
          ) => (
            <div
              key={
                index
              }
              className="h-[2px] rounded-full"
              style={{
                width:
                  `${width}%`,

                marginLeft:
                  "auto",

                backgroundColor:
                  index %
                    2
                    ? alpha(
                        secondary,
                        0.55
                      )
                    : alpha(
                        primary,
                        0.65
                      ),
              }}
            />
          )
        )}
      </div>

      {Array.from({
        length:
          particleCount,
      }).map(
        (
          _,
          index
        ) => (
          <div
            key={
              index
            }
            className="absolute rounded-full"
            style={{
              left:
                `${
                  8 +
                  ((index *
                    37) %
                    85)
                }%`,

              top:
                `${
                  10 +
                  ((index *
                    29) %
                    72)
                }%`,

              width:
                2 +
                (index %
                  3),

              height:
                2 +
                (index %
                  3),

              backgroundColor:
                index %
                  3 ===
                0
                  ? supportSecondary
                  : primary,

              opacity:
                0.2 +
                profile.energy *
                  0.5,
            }}
          />
        )
      )}

      <div className="absolute bottom-[16px] left-[16px] right-[16px] rounded-[10px] border border-white/[0.07] bg-black/50 px-[11px] py-[9px]">
        <p className="text-[9px] text-white/55">
          One shared graphic system
        </p>
      </div>
    </>
  );
}

/* ================================================= */
/* DON'T                                             */
/* ================================================= */

function SplitSystem({
  aPrimary,
  aSecondary,
  bPrimary,
  bSecondary,
}: {
  aPrimary:
    string;

  aSecondary:
    string;

  bPrimary:
    string;

  bSecondary:
    string;
}) {
  return (
    <>
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
        <RasterGradient
          direction="diagonal"
          className="h-full w-full"
          stops={[
            {
              color:
                aPrimary,
              offset: 0,
              opacity: 0.34,
            },
            {
              color:
                aSecondary,
              offset:
                100,
              opacity: 0.12,
            },
          ]}
        />
      </div>

      <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <RasterGradient
          direction="diagonal"
          className="h-full w-full"
          stops={[
            {
              color:
                bPrimary,
              offset: 0,
              opacity: 0.34,
            },
            {
              color:
                bSecondary,
              offset:
                100,
              opacity: 0.12,
            },
          ]}
        />
      </div>

      <div className="absolute left-[12%] top-[24%] h-[145px] w-[145px] rounded-[30px] border border-white/35" />

      <div className="absolute right-[12%] top-[24%] h-[145px] w-[145px] rounded-full border border-white/35" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black/70 text-[20px] text-white">
          ×
        </span>
      </div>
    </>
  );
}

/* ================================================= */
/* TRAIT CARD                                        */
/* ================================================= */

function TraitCard({
  label,
  traits,
  primary,
  secondary,
}: {
  label:
    string;

  traits:
    BrandCharacterTraitId[];

  primary:
    string;

  secondary:
    string;
}) {
  return (
    <Card className="min-h-[122px] p-[13px]">
      <div className="flex items-center gap-[5px]">
        <span
          className="h-[4px] w-[24px] rounded-full"
          style={{
            backgroundColor:
              primary,
          }}
        />

        <span
          className="h-[4px] w-[12px] rounded-full"
          style={{
            backgroundColor:
              secondary,
          }}
        />

        <p className="ml-[4px] text-[9px] uppercase tracking-[0.11em] text-white/32">
          {label}
        </p>
      </div>

      <div className="mt-[10px] grid grid-cols-2 gap-[6px]">
        {traits
          .slice(
            0,
            4
          )
          .map(
            (id) => {
              const trait =
                brandCharacterTraits.find(
                  (
                    item
                  ) =>
                    item.id ===
                    id
                );

              return (
                <div
                  key={
                    id
                  }
                  className="rounded-[8px] border border-white/[0.05] px-[8px] py-[6px]"
                >
                  <p className="text-[9px] text-white/55">
                    {trait?.label ??
                      id}
                  </p>

                  <p className="mt-[2px] text-[8px] text-white/24">
                    Influences visual behaviour.
                  </p>
                </div>
              );
            }
          )}
      </div>
    </Card>
  );
}

/* ================================================= */
/* TOOLKIT                                           */
/* ================================================= */

function ToolkitItem({
  label,
  index,
  primary,
  secondary,
}: {
  label:
    string;

  index:
    number;

  primary:
    string;

  secondary:
    string;
}) {
  return (
    <div className="rounded-[9px] border border-white/[0.06] bg-white/[0.015] p-[6px]">
      <div className="relative flex h-[28px] items-center justify-center overflow-hidden">
        {index %
          3 ===
        0 ? (
          <div
            className="relative h-[18px] w-[28px] overflow-hidden rounded-[7px] border"
            style={{
              borderColor:
                primary,
            }}
          >
            <RasterGradient
              direction="diagonal"
              className="absolute inset-0 h-full w-full"
              stops={[
                {
                  color:
                    secondary,
                  offset:
                    0,
                  opacity:
                    0.25,
                },
                {
                  color:
                    secondary,
                  offset:
                    100,
                  opacity:
                    0,
                },
              ]}
            />
          </div>
        ) : index %
            3 ===
          1 ? (
          <div className="flex w-full flex-col gap-[4px]">
            <div
              className="h-[2px] w-full"
              style={{
                backgroundColor:
                  primary,
              }}
            />

            <div
              className="h-[2px] w-[65%]"
              style={{
                backgroundColor:
                  secondary,
              }}
            />
          </div>
        ) : (
          <div className="relative h-[24px] w-[24px]">
            <RasterGlow
              color={
                primary
              }
              secondaryColor={
                secondary
              }
              opacity={0.48}
              secondaryOpacity={0.12}
              className="absolute inset-0 h-full w-full"
            />

            <div
              className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                backgroundColor:
                  primary,
              }}
            />
          </div>
        )}
      </div>

      <p className="mt-[4px] truncate text-[8px] text-white/45">
        {label}
      </p>
    </div>
  );
}