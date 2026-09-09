"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";

import {
  BrandCharacterTraitId,
  brandCharacterTraits,
} from "@/data/brandCharacterTraits";

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

interface ColourSystem {
  leadPrimary:
    string;

  leadSecondary:
    string;

  supportPrimary:
    string;

  supportSecondary:
    string;
}

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function clamp(
  value:
    number
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
        BrandCharacterTraitId[];
    };

  return Array.isArray(
    value.characterTraits
  )
    ? value.characterTraits
    : [];
}

function hexToRgb(
  colour:
    string
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
      (
        value >>
        16
      ) &
      255,

    g:
      (
        value >>
        8
      ) &
      255,

    b:
      value &
      255,
  };
}

function alpha(
  colour:
    string,

  opacity:
    number
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
  const profile:
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
    (
      trait
    ) => {
      switch (
        trait
      ) {
        case "classic":
          profile.precision +=
            0.2;

          profile.grid +=
            0.1;

          profile.energy -=
            0.08;
          break;

        case "elegant":
          profile.roundness +=
            0.05;

          profile.energy -=
            0.1;

          profile.glow +=
            0.04;
          break;

        case "premium":
          profile.glow +=
            0.1;

          profile.texture +=
            0.08;

          profile.energy -=
            0.08;
          break;

        case "minimal":
          profile.particles -=
            0.2;

          profile.texture -=
            0.12;

          profile.energy -=
            0.1;
          break;

        case "editorial":
          profile.grid +=
            0.28;

          profile.precision +=
            0.15;
          break;

        case "technical":
          profile.grid +=
            0.3;

          profile.precision +=
            0.28;

          profile.glow +=
            0.06;
          break;

        case "precise":
          profile.precision +=
            0.34;

          profile.organic -=
            0.16;
          break;

        case "futuristic":
          profile.glow +=
            0.32;

          profile.grid +=
            0.12;

          profile.particles +=
            0.12;
          break;

        case "bold":
          profile.energy +=
            0.18;
          break;

        case "dynamic":
          profile.energy +=
            0.3;

          profile.particles +=
            0.08;
          break;

        case "energetic":
          profile.energy +=
            0.4;

          profile.particles +=
            0.25;
          break;

        case "sporty":
          profile.energy +=
            0.38;

          profile.grid +=
            0.1;
          break;

        case "friendly":
          profile.roundness +=
            0.3;

          profile.organic +=
            0.12;
          break;

        case "organic":
          profile.organic +=
            0.5;

          profile.roundness +=
            0.18;

          profile.texture +=
            0.18;

          profile.grid -=
            0.14;
          break;

        case "immersive":
          profile.glow +=
            0.16;

          profile.particles +=
            0.12;
          break;

        case "cinematic":
          profile.glow +=
            0.12;

          profile.texture +=
            0.18;
          break;

        case "youthful":
          profile.energy +=
            0.2;

          profile.roundness +=
            0.1;
          break;

        case "playful":
          profile.energy +=
            0.15;

          profile.roundness +=
            0.3;

          profile.organic +=
            0.2;

          profile.expressiveTilt +=
            0.8;
          break;

        case "experimental":
          profile.energy +=
            0.14;

          profile.organic +=
            0.2;

          profile.expressiveTilt +=
            0.7;
          break;

        case "disruptive":
          profile.energy +=
            0.28;

          profile.expressiveTilt +=
            0.55;
          break;
      }
    }
  );

  Object.keys(
    profile
  ).forEach(
    (
      key
    ) => {
      const property =
        key as keyof GraphicProfile;

      profile[
        property
      ] =
        clamp(
          profile[
            property
          ]
        );
    }
  );

  return profile;
}

/* ================================================= */
/* BLENDING                                          */
/* ================================================= */

function blend(
  a:
    GraphicProfile,

  b:
    GraphicProfile,

  weight:
    number
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

function getBaseProfile(
  model:
    PartnershipModelId,

  a:
    GraphicProfile,

  b:
    GraphicProfile
) {
  switch (
    model
  ) {
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

function applyXProfile(
  base:
    GraphicProfile,

  x:
    GraphicProfile,

  mode:
    AdditionalRelationshipMode
) {
  if (
    mode ===
    "presenting"
  ) {
    /*
      55% underlying partnership
      45% presented property.
    */

    return blend(
      base,
      x,
      0.55
    );
  }

  return base;
}

/* ================================================= */
/* COLOUR SYSTEM                                     */
/* ================================================= */

function getBaseColours(
  model:
    PartnershipModelId,

  aPrimary:
    string,

  aSecondary:
    string,

  bPrimary:
    string,

  bSecondary:
    string
): ColourSystem {
  if (
    model ===
    "poweredByA"
  ) {
    return {
      leadPrimary:
        bPrimary,

      leadSecondary:
        bSecondary,

      supportPrimary:
        aPrimary,

      supportSecondary:
        aSecondary,
    };
  }

  return {
    leadPrimary:
      aPrimary,

    leadSecondary:
      aSecondary,

    supportPrimary:
      bPrimary,

    supportSecondary:
      bSecondary,
  };
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

  const presenting =
    additionalRelationship ===
    "presenting";

  const sponsored =
    additionalRelationship ===
    "sponsored";

  const propertyName =
    propertyX.name.trim() ||
    "X";

  /* ------------------------------------------------ */
  /* TRAITS                                           */
  /* ------------------------------------------------ */

  const aTraits =
    getTraits(
      brandA
    );

  const bTraits =
    getTraits(
      brandB
    );

  const xTraits =
    getTraits(
      propertyX
    );

  /* ------------------------------------------------ */
  /* PROFILES                                         */
  /* ------------------------------------------------ */

  const aProfile =
    buildProfile(
      aTraits
    );

  const bProfile =
    buildProfile(
      bTraits
    );

  const xProfile =
    buildProfile(
      xTraits
    );

  const baseProfile =
    getBaseProfile(
      model,
      aProfile,
      bProfile
    );

  const profile =
    applyXProfile(
      baseProfile,
      xProfile,
      additionalRelationship
    );

  /* ------------------------------------------------ */
  /* COLOURS                                          */
  /* ------------------------------------------------ */

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

  const xPrimary =
    safeColour(
      propertyX.primaryColor,
      "#8A8A8A"
    );

  const xSecondary =
    safeColour(
      propertyX.secondaryColor,
      "#B9B9B9"
    );

  const baseColours =
    getBaseColours(
      model,

      aPrimary,
      aSecondary,

      bPrimary,
      bSecondary
    );

  const colours:
    ColourSystem =
    presenting
      ? {
          leadPrimary:
            xPrimary,

          leadSecondary:
            xSecondary,

          supportPrimary:
            baseColours.leadPrimary,

          supportSecondary:
            baseColours.supportPrimary,
        }
      : baseColours;

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

              max-w-[890px]

              text-[16px]
              leading-[1.38]

              text-white/45
            "
          >
            {presenting
              ? `${propertyName} contributes directly to geometry, density, rhythm and expression. Its character is blended with the existing A / B partnership rather than added as a separate graphic system.`
              : sponsored
                ? `${propertyName} does not influence the graphic language. The system continues to be generated exclusively from Brand A, Brand B and their partnership hierarchy.`
                : "Brand character controls geometry, density, rhythm and expression while partnership hierarchy decides who leads the system."}
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

          {additionalRelationship !==
            "none" && (
            <RelationshipLabel
              mode={
                additionalRelationship
              }
              propertyName={
                propertyName
              }
            />
          )}
        </div>
      </header>

      {/* ======================================== */}
      {/* CHARACTER                                */}
      {/* ======================================== */}

      <aside
        className="
          absolute

          left-[70px]
          top-[190px]

          w-[300px]
        "
      >
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

          {presenting && (
            <CharacterGroup
              label={
                propertyName
              }
              traits={
                xTraits
              }
              primary={
                xPrimary
              }
              secondary={
                xSecondary
              }
              featured
            />
          )}

          {sponsored && (
            <p
              className="
                mt-[13px]

                border-t
                border-white/[0.06]

                pt-[10px]

                text-[8px]
                leading-[1.4]

                text-white/24
              "
            >
              Sponsor character is intentionally excluded from the resulting profile.
            </p>
          )}
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Resulting behaviour
          </SectionLabel>

          <div
            className="
              mt-[13px]

              grid
              grid-cols-2

              gap-x-[14px]
              gap-y-[11px]
            "
          >
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

          {presenting && (
            <p
              className="
                mt-[13px]

                text-[8px]
                leading-[1.4]

                text-white/24
              "
            >
              Result = 55% partnership character + 45% {propertyName}.
            </p>
          )}
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
          description={
            presenting
              ? `Create one visual grammar in which ${propertyName} visibly influences the shared system.`
              : "Create one visual grammar from both personalities and the partnership hierarchy."
          }
        >
          <GeneratedSystem
            profile={
              profile
            }
            primary={
              colours.leadPrimary
            }
            secondary={
              colours.leadSecondary
            }
            support={
              colours.supportPrimary
            }
            supportSecondary={
              colours.supportSecondary
            }
          />
        </Comparison>

        <Comparison
          title="DON'T"
          description={
            presenting
              ? "Do not create three independent branded visual systems competing inside the same experience."
              : sponsored
                ? "Do not allow sponsor aesthetics to alter the collaboration system."
                : "Do not place two independent branded visual systems side by side."
          }
        >
          <SplitSystem
            mode={
              additionalRelationship
            }
            aPrimary={
              aPrimary
            }
            bPrimary={
              bPrimary
            }
            xPrimary={
              xPrimary
            }
          />
        </Comparison>
      </section>

      {/* ======================================== */}
      {/* TRAIT IMPLICATIONS                       */}
      {/* ======================================== */}

      <section
        className={`
          absolute

          left-[395px]
          right-[70px]
          top-[585px]

          grid

          gap-[10px]

          ${
            presenting
              ? "grid-cols-3"
              : "grid-cols-2"
          }
        `}
      >
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

        {presenting && (
          <TraitCard
            label={`${propertyName} character`}
            traits={
              xTraits
            }
            primary={
              xPrimary
            }
            secondary={
              xSecondary
            }
            featured
          />
        )}
      </section>

      {/* ======================================== */}
      {/* TOOLKIT                                  */}
      {/* ======================================== */}

      <section
        className="
          absolute

          bottom-[26px]
          left-[70px]
          right-[70px]
        "
      >
        <div
          className="
            flex
            justify-between
          "
        >
          <div>
            <SectionLabel>
              Generated graphic toolkit
            </SectionLabel>

            <p
              className="
                mt-[3px]

                text-[9px]

                text-white/27
              "
            >
              {presenting
                ? `${propertyName} leads content expression while partnership colours support structure and authorship.`
                : "Secondary colours support depth, layering and micro-expression."}
            </p>
          </div>

          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.12em]

              text-white/18
            "
          >
            {presenting
              ? "A/B character × X character × hierarchy"
              : "Character × hierarchy"}
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
                    ? colours.supportPrimary
                    : colours.leadPrimary
                }
                secondary={
                  index %
                      3 ===
                    0
                    ? colours.supportSecondary
                    : colours.leadSecondary
                }
                roundness={
                  profile.roundness
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
/* CHARACTER                                         */
/* ================================================= */

function CharacterGroup({
  label,
  traits,
  primary,
  secondary,
  featured = false,
}: {
  label:
    string;

  traits:
    BrandCharacterTraitId[];

  primary:
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

        ${
          featured
            ? `
                rounded-[10px]

                border
                border-white/[0.07]

                p-[8px]
              `
            : ""
        }
      `}
    >
      <div
        className="
          flex
          items-center
          gap-[6px]
        "
      >
        <div
          className="
            h-[4px]
            w-[22px]

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
            w-[10px]

            rounded-full
          "
          style={{
            backgroundColor:
              secondary,
          }}
        />

        <span
          className={
            featured
              ? "truncate text-[10px] text-white/72"
              : "truncate text-[10px] text-white/55"
          }
        >
          {label}
        </span>
      </div>

      <div
        className="
          mt-[7px]

          flex
          flex-wrap

          gap-[4px]
        "
      >
        {traits.length >
        0 ? (
          traits.map(
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

              return (
                <span
                  key={
                    id
                  }
                  className="
                    rounded-full

                    border
                    border-white/[0.07]

                    px-[6px]
                    py-[3px]

                    text-[8px]

                    text-white/38
                  "
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

/* ================================================= */
/* METRIC                                            */
/* ================================================= */

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
      <p
        className="
          text-[8px]
          uppercase
          tracking-[0.1em]

          text-white/26
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

            bg-white/50
          "
          style={{
            width:
              `${Math.round(
                value *
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

          text-white/18
        "
      >
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
    <Card className="p-[13px]">
      <div
        className="
          flex
          min-h-[38px]

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

          <span
            className="
              text-[14px]

              text-white/74

              oook-medium
            "
          >
            {title}
          </span>
        </div>

        <p
          className="
            max-w-[300px]

            text-right

            text-[10px]
            leading-[1.35]

            text-white/35
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          relative

          mt-[9px]

          h-[315px]

          overflow-hidden

          rounded-[13px]

          border
          border-white/[0.06]

          bg-[#050506]
        "
      >
        {children}
      </div>
    </Card>
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
      60;

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
        12
    );

  const gridCount =
    Math.max(
      4,
      Math.round(
        4 +
        profile.grid *
          7
      )
    );

  return (
    <>
      {/* GRID */}

      {Array.from({
        length:
          gridCount,
      }).map(
        (
          _,
          index
        ) => (
          <div
            key={`v-${index}`}
            className="
              absolute
              bottom-0
              top-0

              w-px

              bg-white/[0.035]
            "
            style={{
              left:
                `${
                  (
                    index +
                    1
                  ) /
                  (
                    gridCount +
                    1
                  ) *
                  100
                }%`,
            }}
          />
        )
      )}

      {Array.from({
        length:
          gridCount -
          1,
      }).map(
        (
          _,
          index
        ) => (
          <div
            key={`h-${index}`}
            className="
              absolute
              left-0
              right-0

              h-px

              bg-white/[0.035]
            "
            style={{
              top:
                `${
                  (
                    index +
                    1
                  ) /
                  gridCount *
                  100
                }%`,
            }}
          />
        )
      )}

      {/* SAFE RASTER GLOW */}

      {profile.glow >
        0.15 && (
        <RasterGlow
          color={
            secondary
          }
          secondaryColor={
            primary
          }
          opacity={
            0.08 +
            profile.glow *
              0.18
          }
          secondaryOpacity={
            0.03
          }
          centerX={
            35
          }
          centerY={
            35
          }
          radius={
            62
          }
          className="
            absolute

            left-[8%]
            top-[5%]

            h-[250px]
            w-[280px]
          "
        />
      )}

      {/* PRIMARY SHAPE */}

      <div
        className="
          absolute

          left-[16%]
          top-[14%]

          h-[155px]
          w-[190px]

          border
        "
        style={{
          borderRadius:
            radius,

          borderColor:
            alpha(
              primary,
              0.72
            ),

          backgroundColor:
            alpha(
              secondary,
              0.13
            ),

          transform:
            rotate
              ? `rotate(${rotate}deg)`
              : undefined,
        }}
      />

      {/* SUPPORT SHAPE */}

      <div
        className="
          absolute

          right-[17%]
          top-[27%]

          h-[100px]
          w-[128px]

          border
        "
        style={{
          borderRadius:
            radius *
            0.7,

          borderColor:
            alpha(
              support,
              0.52
            ),

          backgroundColor:
            alpha(
              supportSecondary,
              0.1
            ),
        }}
      />

      {/* RHYTHM LINES */}

      <div
        className="
          absolute

          bottom-[72px]
          right-[8%]

          flex
          w-[42%]

          flex-col
          items-end

          gap-[7px]
        "
      >
        {[
          94,
          78,
          62,
          86,
          54,
        ].map(
          (
            width,
            index
          ) => (
            <div
              key={
                index
              }
              className="
                h-[2px]

                rounded-full
              "
              style={{
                width:
                  `${width}%`,

                backgroundColor:
                  index %
                      2 ===
                    0
                    ? alpha(
                        primary,
                        0.65
                      )
                    : alpha(
                        supportSecondary,
                        0.5
                      ),
              }}
            />
          )
        )}
      </div>

      {/* PARTICLES */}

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
            className="
              absolute

              rounded-full
            "
            style={{
              left:
                `${
                  8 +
                  (
                    index *
                    37
                  ) %
                    85
                }%`,

              top:
                `${
                  10 +
                  (
                    index *
                    29
                  ) %
                    70
                }%`,

              width:
                2 +
                index %
                  3,

              height:
                2 +
                index %
                  3,

              backgroundColor:
                index %
                    3 ===
                  0
                  ? supportSecondary
                  : primary,

              opacity:
                0.18 +
                profile.energy *
                  0.5,
            }}
          />
        )
      )}

      <div
        className="
          absolute

          bottom-[14px]
          left-[14px]
          right-[14px]

          rounded-[10px]

          border
          border-white/[0.07]

          bg-black/55

          px-[11px]
          py-[9px]
        "
      >
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
  mode,
  aPrimary,
  bPrimary,
  xPrimary,
}: {
  mode:
    AdditionalRelationshipMode;

  aPrimary:
    string;

  bPrimary:
    string;

  xPrimary:
    string;
}) {
  const presenting =
    mode ===
    "presenting";

  return (
    <>
      <div
        className={
          presenting
            ? "absolute inset-y-0 left-0 w-1/3"
            : "absolute inset-y-0 left-0 w-1/2"
        }
        style={{
          backgroundColor:
            alpha(
              aPrimary,
              0.28
            ),
        }}
      />

      <div
        className={
          presenting
            ? "absolute inset-y-0 left-1/3 w-1/3"
            : "absolute inset-y-0 right-0 w-1/2"
        }
        style={{
          backgroundColor:
            alpha(
              bPrimary,
              0.28
            ),
        }}
      />

      {presenting && (
        <div
          className="
            absolute
            inset-y-0
            right-0

            w-1/3
          "
          style={{
            backgroundColor:
              alpha(
                xPrimary,
                0.32
              ),
          }}
        />
      )}

      <div
        className="
          absolute

          left-[8%]
          top-[25%]

          h-[128px]
          w-[25%]

          rounded-[24px]

          border
          border-white/25
        "
      />

      <div
        className="
          absolute

          left-[39%]
          top-[30%]

          h-[110px]
          w-[22%]

          rounded-full

          border
          border-white/25
        "
      />

      {presenting && (
        <div
          className="
            absolute

            right-[7%]
            top-[21%]

            h-[145px]
            w-[23%]

            border
            border-white/25
          "
        />
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

            h-[40px]
            w-[40px]

            items-center
            justify-center

            rounded-full

            bg-black/70

            text-[20px]
            text-white
          "
        >
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
  featured = false,
}: {
  label:
    string;

  traits:
    BrandCharacterTraitId[];

  primary:
    string;

  secondary:
    string;

  featured?:
    boolean;
}) {
  return (
    <Card
      className={`
        min-h-[92px]

        p-[12px]

        ${
          featured
            ? "border-white/[0.11]"
            : ""
        }
      `}
    >
      <div
        className="
          flex
          items-center
          gap-[6px]
        "
      >
        <span
          className="
            h-[4px]
            w-[25px]

            rounded-full
          "
          style={{
            backgroundColor:
              primary,
          }}
        />

        <span
          className="
            h-[4px]
            w-[11px]

            rounded-full
          "
          style={{
            backgroundColor:
              secondary,
          }}
        />

        <p className="text-[9px] text-white/48">
          {label}
        </p>
      </div>

      <div
        className="
          mt-[9px]

          flex
          flex-wrap

          gap-[4px]
        "
      >
        {traits.length >
        0 ? (
          traits.map(
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

              return (
                <span
                  key={
                    id
                  }
                  className="
                    rounded-full

                    border
                    border-white/[0.07]

                    px-[6px]
                    py-[3px]

                    text-[7px]

                    text-white/32
                  "
                >
                  {trait?.label ??
                    id}
                </span>
              );
            }
          )
        ) : (
          <span className="text-[8px] text-white/20">
            Neutral
          </span>
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
  roundness,
}: {
  label:
    string;

  index:
    number;

  primary:
    string;

  secondary:
    string;

  roundness:
    number;
}) {
  const radius =
    3 +
    roundness *
      12;

  return (
    <div
      className="
        flex
        h-[66px]

        flex-col

        justify-between

        rounded-[9px]

        border
        border-white/[0.06]

        bg-white/[0.015]

        p-[7px]
      "
    >
      <div
        className="
          relative

          h-[29px]

          overflow-hidden
        "
      >
        <div
          className="
            absolute

            left-[2px]
            top-[3px]

            h-[20px]
            w-[25px]

            border
          "
          style={{
            borderRadius:
              radius,

            borderColor:
              alpha(
                primary,
                0.7
              ),

            backgroundColor:
              alpha(
                secondary,
                0.1
              ),
          }}
        />

        <div
          className="
            absolute

            bottom-[4px]
            right-[2px]

            h-[3px]
            w-[24px]

            rounded-full
          "
          style={{
            backgroundColor:
              index %
                  2 ===
                0
                ? primary
                : secondary,
          }}
        />
      </div>

      <p
        className="
          truncate

          text-[7px]

          text-white/28
        "
      >
        {label}
      </p>
    </div>
  );
}

/* ================================================= */
/* RELATIONSHIP LABEL                                */
/* ================================================= */

function RelationshipLabel({
  mode,
  propertyName,
}: {
  mode:
    AdditionalRelationshipMode;

  propertyName:
    string;
}) {
  return (
    <span
      className="
        rounded-full

        border
        border-white/[0.07]

        px-[10px]
        py-[6px]

        text-[8px]
        uppercase
        tracking-[0.12em]

        text-white/30
      "
    >
      {mode ===
      "presenting"
        ? `Presenting ${propertyName}`
        : `Sponsored by ${propertyName}`}
    </span>
  );
}