"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";

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

interface MotionProfile {
  pace:
    number;

  energy:
    number;

  elasticity:
    number;

  continuity:
    number;

  depth:
    number;

  precision:
    number;

  amplitude:
    number;
}

interface MotionSpec {
  duration:
    number;

  stagger:
    number;

  easing:
    string;

  transition:
    string;

  depth:
    string;
}

interface MotionColours {
  primary:
    string;

  secondary:
    string;

  support:
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

/* ================================================= */
/* MOTION PROFILE                                    */
/* ================================================= */

function buildProfile(
  traits:
    BrandCharacterTraitId[]
): MotionProfile {
  const profile:
    MotionProfile = {
    pace:
      0.46,

    energy:
      0.34,

    elasticity:
      0.18,

    continuity:
      0.56,

    depth:
      0.38,

    precision:
      0.62,

    amplitude:
      0.32,
  };

  traits.forEach(
    (
      trait
    ) => {
      switch (
        trait
      ) {
        case "classic":
          profile.pace -=
            0.08;

          profile.precision +=
            0.2;

          profile.elasticity -=
            0.08;
          break;

        case "elegant":
          profile.pace -=
            0.12;

          profile.continuity +=
            0.2;

          profile.amplitude -=
            0.08;
          break;

        case "premium":
          profile.pace -=
            0.08;

          profile.depth +=
            0.16;

          profile.continuity +=
            0.12;
          break;

        case "minimal":
          profile.energy -=
            0.16;

          profile.amplitude -=
            0.18;

          profile.precision +=
            0.16;
          break;

        case "editorial":
          profile.precision +=
            0.12;

          profile.continuity +=
            0.08;
          break;

        case "technical":
          profile.precision +=
            0.3;

          profile.elasticity -=
            0.12;

          profile.depth +=
            0.08;
          break;

        case "precise":
          profile.precision +=
            0.34;

          profile.elasticity -=
            0.14;

          profile.amplitude -=
            0.1;
          break;

        case "futuristic":
          profile.depth +=
            0.3;

          profile.continuity +=
            0.16;

          profile.pace +=
            0.08;
          break;

        case "bold":
          profile.energy +=
            0.2;

          profile.amplitude +=
            0.14;
          break;

        case "dynamic":
          profile.pace +=
            0.25;

          profile.energy +=
            0.3;

          profile.amplitude +=
            0.12;
          break;

        case "energetic":
          profile.pace +=
            0.34;

          profile.energy +=
            0.42;

          profile.amplitude +=
            0.2;
          break;

        case "sporty":
          profile.pace +=
            0.3;

          profile.energy +=
            0.34;

          profile.precision +=
            0.08;
          break;

        case "friendly":
          profile.elasticity +=
            0.18;

          profile.continuity +=
            0.1;
          break;

        case "organic":
          profile.elasticity +=
            0.26;

          profile.continuity +=
            0.2;

          profile.precision -=
            0.12;
          break;

        case "immersive":
          profile.depth +=
            0.36;

          profile.continuity +=
            0.18;
          break;

        case "cinematic":
          profile.depth +=
            0.3;

          profile.pace -=
            0.08;

          profile.continuity +=
            0.18;
          break;

        case "youthful":
          profile.pace +=
            0.18;

          profile.energy +=
            0.16;

          profile.elasticity +=
            0.12;
          break;

        case "playful":
          profile.elasticity +=
            0.42;

          profile.energy +=
            0.18;

          profile.amplitude +=
            0.28;
          break;

        case "experimental":
          profile.elasticity +=
            0.2;

          profile.depth +=
            0.16;

          profile.amplitude +=
            0.3;

          profile.precision -=
            0.12;
          break;

        case "disruptive":
          profile.pace +=
            0.26;

          profile.energy +=
            0.28;

          profile.amplitude +=
            0.34;

          profile.continuity -=
            0.18;
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
        key as keyof MotionProfile;

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
/* BLEND                                             */
/* ================================================= */

function blend(
  a:
    MotionProfile,

  b:
    MotionProfile,

  weight:
    number
): MotionProfile {
  const inverse =
    1 -
    weight;

  return {
    pace:
      a.pace *
        weight +
      b.pace *
        inverse,

    energy:
      a.energy *
        weight +
      b.energy *
        inverse,

    elasticity:
      a.elasticity *
        weight +
      b.elasticity *
        inverse,

    continuity:
      a.continuity *
        weight +
      b.continuity *
        inverse,

    depth:
      a.depth *
        weight +
      b.depth *
        inverse,

    precision:
      a.precision *
        weight +
      b.precision *
        inverse,

    amplitude:
      a.amplitude *
        weight +
      b.amplitude *
        inverse,
  };
}

function getBaseProfile(
  model:
    PartnershipModelId,

  a:
    MotionProfile,

  b:
    MotionProfile
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
    MotionProfile,

  x:
    MotionProfile,

  mode:
    AdditionalRelationshipMode
) {
  if (
    mode ===
    "presenting"
  ) {
    return blend(
      base,
      x,
      0.55
    );
  }

  return base;
}

/* ================================================= */
/* MOTION SPEC                                       */
/* ================================================= */

function getMotionSpec(
  profile:
    MotionProfile
): MotionSpec {
  const duration =
    Math.round(
      720 -
      profile.pace *
        410
    );

  const stagger =
    Math.round(
      125 -
      profile.energy *
        75
    );

  const easing =
    profile.elasticity >
    0.65
      ? "Spring / expressive"
      : profile.precision >
          0.72
        ? "Sharp ease-out"
        : profile.continuity >
            0.66
          ? "Smooth ease-in-out"
          : "Balanced ease-out";

  const transition =
    profile.continuity >
    0.68
      ? "Continuous"
      : profile.energy >
          0.7
        ? "Fast cut + resolve"
        : "Structured";

  const depth =
    profile.depth >
    0.7
      ? "Strong spatial depth"
      : profile.depth >
          0.45
        ? "Layered depth"
        : "Mostly planar";

  return {
    duration,
    stagger,
    easing,
    transition,
    depth,
  };
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page11() {
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

  const spec =
    getMotionSpec(
      profile
    );

  /* ------------------------------------------------ */
  /* COLOURS                                          */
  /* ------------------------------------------------ */

  const aPrimary =
    safeColour(
      brandA.primaryColor,
      "#FF453A"
    );

  const bPrimary =
    safeColour(
      brandB.primaryColor,
      "#3478F6"
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

  const partnershipLead =
    model ===
    "poweredByA"
      ? bPrimary
      : aPrimary;

  const partnershipSupport =
    model ===
    "poweredByA"
      ? aPrimary
      : bPrimary;

  const colours:
    MotionColours =
    presenting
      ? {
          primary:
            xPrimary,

          secondary:
            xSecondary,

          support:
            partnershipLead,
        }
      : {
          primary:
            partnershipLead,

          secondary:
            partnershipSupport,

          support:
            "#8A8A8A",
        };

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
            11 / Shared visual territory
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
            Shared visual territory — motion language
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
              ? `${propertyName} actively influences pace, easing, spatial behaviour and expressive movement while the partnership continues to define hierarchy and authorship.`
              : sponsored
                ? `${propertyName} does not influence motion behaviour. Sponsor appearances use restrained, functional transitions only.`
                : "Motion translates brand character into timing, easing, spatial behaviour and transition rhythm across the experience."}
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
      {/* LEFT                                     */}
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
            Motion character
          </SectionLabel>

          <CharacterGroup
            label="Brand A"
            traits={
              aTraits
            }
            colour={
              aPrimary
            }
          />

          <CharacterGroup
            label="Brand B"
            traits={
              bTraits
            }
            colour={
              bPrimary
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
              colour={
                xPrimary
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
              Sponsor personality is excluded from motion generation.
            </p>
          )}
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Resulting motion
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
              label="Pace"
              value={
                profile.pace
              }
              left="Slow"
              right="Fast"
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
              label="Easing"
              value={
                profile.elasticity
              }
              left="Direct"
              right="Elastic"
            />

            <Metric
              label="Continuity"
              value={
                profile.continuity
              }
              left="Cut"
              right="Fluid"
            />

            <Metric
              label="Depth"
              value={
                profile.depth
              }
              left="Flat"
              right="Spatial"
            />

            <Metric
              label="Amplitude"
              value={
                profile.amplitude
              }
              left="Subtle"
              right="Expressive"
            />
          </div>
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Base specification
          </SectionLabel>

          <SpecRow
            label="Duration"
            value={`${spec.duration} ms`}
          />

          <SpecRow
            label="Stagger"
            value={`${spec.stagger} ms`}
          />

          <SpecRow
            label="Easing"
            value={
              spec.easing
            }
          />

          <SpecRow
            label="Transitions"
            value={
              spec.transition
            }
          />

          <SpecRow
            label="Depth"
            value={
              spec.depth
            }
          />

          {presenting && (
            <p
              className="
                mt-[11px]

                border-t
                border-white/[0.06]

                pt-[9px]

                text-[8px]
                leading-[1.4]

                text-white/23
              "
            >
              55% partnership motion + 45% {propertyName}.
            </p>
          )}
        </Card>
      </aside>

      {/* ======================================== */}
      {/* MOTION APPLICATIONS                      */}
      {/* ======================================== */}

      <section
        className="
          absolute

          bottom-[66px]
          left-[395px]
          right-[70px]
          top-[190px]

          grid
          grid-cols-2
          grid-rows-2

          gap-[12px]
        "
      >
        <MotionCard
          number="01"
          title="Identity entrance"
          description={
            presenting
              ? `${propertyName} establishes the content world before the presenting signature resolves.`
              : "Primary identity enters according to the partnership hierarchy."
          }
        >
          <MotionDiagram
            type="entrance"
            profile={
              profile
            }
            primary={
              colours.primary
            }
            secondary={
              colours.secondary
            }
            support={
              colours.support
            }
          />
        </MotionCard>

        <MotionCard
          number="02"
          title="Content transition"
          description={
            presenting
              ? `${propertyName} character may drive spatial and expressive transitions.`
              : "Transitions connect branded and content states without decorative motion."
          }
        >
          <MotionDiagram
            type="transition"
            profile={
              profile
            }
            primary={
              colours.primary
            }
            secondary={
              colours.secondary
            }
            support={
              colours.support
            }
          />
        </MotionCard>

        <MotionCard
          number="03"
          title="UI response"
          description={
            presenting
              ? "Functional UI remains controlled even when X has an expressive content language."
              : "UI feedback is faster and quieter than narrative motion."
          }
        >
          <MotionDiagram
            type="ui"
            profile={{
              ...profile,

              amplitude:
                Math.min(
                  profile.amplitude,
                  0.38
                ),

              energy:
                Math.min(
                  profile.energy,
                  0.5
                ),
            }}
            primary={
              colours.primary
            }
            secondary={
              colours.secondary
            }
            support={
              colours.support
            }
          />
        </MotionCard>

        <MotionCard
          number="04"
          title="Closing"
          description={
            presenting
              ? `${propertyName} receives the content payoff before the presenter relationship settles.`
              : sponsored
                ? "Core identity closes first; sponsor credit follows with a simple fade."
                : "Motion resolves into a stable final signature."
          }
        >
          <ClosingDiagram
            profile={
              profile
            }
            primary={
              colours.primary
            }
            secondary={
              colours.secondary
            }
            support={
              colours.support
            }
            sponsored={
              sponsored
            }
          />
        </MotionCard>
      </section>

      {/* ======================================== */}
      {/* FOOTER                                   */}
      {/* ======================================== */}

      <footer
        className="
          absolute

          bottom-[27px]
          left-[70px]
          right-[70px]

          flex
          items-center
          justify-between

          border-t
          border-white/[0.06]

          pt-[9px]
        "
      >
        <p className="text-[9px] text-white/23">
          Motion should communicate hierarchy and continuity before decoration.
        </p>

        <p className="text-[9px] text-white/23">
          Pace · Easing · Stagger · Depth · Continuity · Response
        </p>
      </footer>
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
  colour,
  featured = false,
}: {
  label:
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
          gap-[7px]
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
              colour,
          }}
        />

        <p
          className={
            featured
              ? "truncate text-[10px] text-white/70"
              : "truncate text-[10px] text-white/52"
          }
        >
          {label}
        </p>
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

                    text-[7px]

                    text-white/34
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
/* SPEC                                              */
/* ================================================= */

function SpecRow({
  label,
  value,
}: {
  label:
    string;

  value:
    string;
}) {
  return (
    <div
      className="
        mt-[9px]

        flex
        items-start
        justify-between

        gap-[12px]
      "
    >
      <span className="text-[8px] text-white/24">
        {label}
      </span>

      <span
        className="
          max-w-[170px]

          text-right

          text-[9px]
          leading-[1.3]

          text-white/55
        "
      >
        {value}
      </span>
    </div>
  );
}

/* ================================================= */
/* MOTION CARD                                       */
/* ================================================= */

function MotionCard({
  number,
  title,
  description,
  children,
}: {
  number:
    string;

  title:
    string;

  description:
    string;

  children:
    ReactNode;
}) {
  return (
    <Card
      className="
        grid
        min-h-0

        grid-cols-[105px_minmax(0,1fr)]

        gap-[12px]

        p-[12px]
      "
    >
      <div
        className="
          flex
          flex-col
          justify-center
        "
      >
        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.14em]

            text-white/20
          "
        >
          {number}
        </p>

        <h3
          className="
            mt-[7px]

            text-[15px]
            leading-[1.05]

            text-white/68

            oook-medium
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-[9px]

            h-px
            w-[36px]

            bg-white/[0.12]
          "
        />

        <p
          className="
            mt-[8px]

            text-[8px]
            leading-[1.35]

            text-white/27
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          relative

          min-h-0

          overflow-hidden

          rounded-[12px]

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
/* MOTION DIAGRAM                                    */
/* ================================================= */

function MotionDiagram({
  type,
  profile,
  primary,
  secondary,
  support,
}: {
  type:
    "entrance" |
    "transition" |
    "ui";

  profile:
    MotionProfile;

  primary:
    string;

  secondary:
    string;

  support:
    string;
}) {
  const displacement =
    30 +
    profile.amplitude *
      75;

  const curve =
    20 +
    profile.elasticity *
      60;

  const dotSize =
    type ===
    "ui"
      ? 24
      : 36;

  return (
    <>
      {/* TRACK */}

      <div
        className="
          absolute

          left-[12%]
          right-[12%]
          top-1/2

          h-px

          -translate-y-1/2

          bg-white/[0.08]
        "
      />

      {/* START */}

      <div
        className="
          absolute

          top-1/2

          -translate-y-1/2

          rounded-full

          border
        "
        style={{
          left:
            "12%",

          width:
            dotSize,

          height:
            dotSize,

          borderColor:
            primary,

          opacity:
            0.25,
        }}
      />

      {/* INTERMEDIATE GHOSTS */}

      <div
        className="
          absolute

          top-1/2

          -translate-y-1/2

          rounded-full

          border
        "
        style={{
          left:
            `${30 +
            profile.continuity *
              8}%`,

          width:
            dotSize,

          height:
            dotSize,

          borderColor:
            secondary,

          opacity:
            0.34,
        }}
      />

      <div
        className="
          absolute

          top-1/2

          -translate-y-1/2

          rounded-full

          border
        "
        style={{
          left:
            `${51 +
            profile.continuity *
              8}%`,

          width:
            dotSize,

          height:
            dotSize,

          borderColor:
            support,

          opacity:
            0.5,
        }}
      />

      {/* END */}

      <div
        className="
          absolute

          right-[12%]
          top-1/2

          -translate-y-1/2

          border
        "
        style={{
          width:
            dotSize +
            profile.energy *
              12,

          height:
            dotSize +
            profile.energy *
              12,

          borderRadius:
            curve,

          borderColor:
            primary,

          backgroundColor:
            primary,

          opacity:
            0.82,

          transform:
            `translateY(-50%) translateX(${
              type ===
              "transition"
                ? displacement *
                  0.08
                : 0
            }px)`,
        }}
      />

      {/* SPATIAL INDICATOR */}

      {profile.depth >
        0.45 && (
        <>
          <div
            className="
              absolute

              left-[43%]
              top-[25%]

              h-[34px]
              w-[34px]

              rounded-full

              border
            "
            style={{
              borderColor:
                secondary,

              opacity:
                0.2,
            }}
          />

          <div
            className="
              absolute

              left-[47%]
              top-[31%]

              h-[22px]
              w-[22px]

              rounded-full

              border
            "
            style={{
              borderColor:
                secondary,

              opacity:
                0.42,
            }}
          />
        </>
      )}

      {/* LABELS */}

      <p
        className="
          absolute

          bottom-[13px]
          left-[12%]

          text-[7px]
          uppercase
          tracking-[0.12em]

          text-white/18
        "
      >
        start
      </p>

      <p
        className="
          absolute

          bottom-[13px]
          right-[12%]

          text-[7px]
          uppercase
          tracking-[0.12em]

          text-white/18
        "
      >
        resolve
      </p>
    </>
  );
}

/* ================================================= */
/* CLOSING DIAGRAM                                   */
/* ================================================= */

function ClosingDiagram({
  profile,
  primary,
  secondary,
  support,
  sponsored,
}: {
  profile:
    MotionProfile;

  primary:
    string;

  secondary:
    string;

  support:
    string;

  sponsored:
    boolean;
}) {
  return (
    <>
      <div
        className="
          absolute

          left-[13%]
          top-1/2

          h-[48px]
          w-[120px]

          -translate-y-1/2

          rounded-[12px]

          border
        "
        style={{
          borderColor:
            secondary,

          opacity:
            0.32,
        }}
      />

      <div
        className="
          absolute

          left-1/2
          top-1/2

          h-[62px]
          w-[180px]

          -translate-x-1/2
          -translate-y-1/2

          border
        "
        style={{
          borderRadius:
            8 +
            profile.elasticity *
              24,

          borderColor:
            primary,

          backgroundColor:
            primary,

          opacity:
            0.72,
        }}
      />

      <div
        className="
          absolute

          right-[13%]
          top-1/2

          h-[34px]
          w-[78px]

          -translate-y-1/2

          rounded-[9px]

          border
        "
        style={{
          borderColor:
            support,

          opacity:
            0.4,
        }}
      />

      <div
        className="
          absolute

          left-[20%]
          right-[20%]
          top-[73%]

          h-px

          bg-white/[0.06]
        "
      />

      {sponsored && (
        <div
          className="
            absolute

            bottom-[13px]
            right-[13px]

            flex
            items-center
            gap-[6px]
          "
        >
          <span
            className="
              text-[6px]
              uppercase
              tracking-[0.12em]

              text-white/17
            "
          >
            then
          </span>

          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.12em]

              text-white/32
            "
          >
            sponsor fade
          </span>
        </div>
      )}
    </>
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