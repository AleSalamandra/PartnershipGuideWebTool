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

interface MotionProfile {
  tempo: number;
  expression: number;
  softness: number;
  spatiality: number;
  sequencing: number;
  continuity: number;
  amplitude: number;
  precision: number;
}

interface MotionConfig {
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
}

interface MotionRecipe {
  label: string;
  purpose: string;
  duration: string;
  easing: string;
  properties: string;
}

interface TraitMotionDefinition {
  id: BrandCharacterTraitId;
  implication: string;
}

/* ------------------------------------------------ */
/* TRAIT → MOTION LANGUAGE                          */
/* ------------------------------------------------ */

const MOTION_TRAITS: TraitMotionDefinition[] = [
  {
    id: "classic",
    implication:
      "Measured timing, symmetrical paths and restrained transitions.",
  },

  {
    id: "elegant",
    implication:
      "Slow settle, subtle fades and smooth deceleration.",
  },

  {
    id: "premium",
    implication:
      "Low-frequency motion, refined pacing and minimal amplitude.",
  },

  {
    id: "minimal",
    implication:
      "Short transitions, few moving elements and almost no secondary motion.",
  },

  {
    id: "editorial",
    implication:
      "Structured sequencing, panel reveals and deliberate stagger.",
  },

  {
    id: "technical",
    implication:
      "Fast precise transitions, grid-aligned movement and functional feedback.",
  },

  {
    id: "precise",
    implication:
      "Consistent duration, exact paths and controlled arrival points.",
  },

  {
    id: "futuristic",
    implication:
      "Spatial depth, scale transitions, layered fades and digital flow.",
  },

  {
    id: "experimental",
    implication:
      "Unexpected reveal logic, asymmetric timing and selective distortion.",
  },

  {
    id: "disruptive",
    implication:
      "Decisive direction changes, contrast in timing and stronger amplitude.",
  },

  {
    id: "bold",
    implication:
      "Large confident movement, strong entrances and clear focal shifts.",
  },

  {
    id: "dynamic",
    implication:
      "Directional transitions, faster tempo and continuous momentum.",
  },

  {
    id: "energetic",
    implication:
      "Quick sequences, active stagger and more frequent expressive moments.",
  },

  {
    id: "playful",
    implication:
      "Soft overshoot, varied sequencing and responsive scale changes.",
  },

  {
    id: "youthful",
    implication:
      "Quick pacing, lightweight movement and spontaneous transitions.",
  },

  {
    id: "friendly",
    implication:
      "Gentle acceleration, soft arrival and approachable microinteractions.",
  },

  {
    id: "organic",
    implication:
      "Curved paths, flowing continuity and naturally staggered movement.",
  },

  {
    id: "immersive",
    implication:
      "Depth, parallax, layered entrances and stronger spatial continuity.",
  },

  {
    id: "cinematic",
    implication:
      "Longer atmospheric transitions, staged reveals and controlled fades.",
  },

  {
    id: "sporty",
    implication:
      "Fast directional motion, tracking movement and decisive transitions.",
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

function roundTo10(
  value: number
) {
  return (
    Math.round(
      value / 10
    ) * 10
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
  const safe =
    normalizeHex(
      colour,
      "#FFFFFF"
    );

  const value =
    parseInt(
      safe.replace("#", ""),
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
    colour
  );

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/* ------------------------------------------------ */
/* BASE MOTION PROFILE                              */
/* ------------------------------------------------ */

function getBaseMotionProfile(): MotionProfile {
  return {
    tempo: 0.5,
    expression: 0.35,
    softness: 0.55,
    spatiality: 0.35,
    sequencing: 0.45,
    continuity: 0.55,
    amplitude: 0.35,
    precision: 0.6,
  };
}

/* ------------------------------------------------ */
/* BUILD MOTION PROFILE                             */
/* ------------------------------------------------ */

function buildMotionProfile(
  traits: BrandCharacterTraitId[]
): MotionProfile {
  const profile =
    getBaseMotionProfile();

  traits.forEach(
    (trait) => {
      switch (trait) {
        case "classic":
          profile.tempo -= 0.08;
          profile.expression -= 0.1;
          profile.precision += 0.2;
          profile.continuity += 0.08;
          profile.amplitude -= 0.08;
          break;

        case "elegant":
          profile.tempo -= 0.12;
          profile.softness += 0.24;
          profile.expression -= 0.06;
          profile.amplitude -= 0.12;
          profile.continuity += 0.12;
          break;

        case "premium":
          profile.tempo -= 0.1;
          profile.expression -= 0.08;
          profile.softness += 0.14;
          profile.amplitude -= 0.16;
          profile.sequencing += 0.08;
          break;

        case "minimal":
          profile.tempo += 0.08;
          profile.expression -= 0.26;
          profile.amplitude -= 0.22;
          profile.sequencing -= 0.08;
          profile.precision += 0.12;
          break;

        case "editorial":
          profile.sequencing += 0.3;
          profile.precision += 0.14;
          profile.tempo -= 0.02;
          profile.continuity += 0.08;
          break;

        case "technical":
          profile.tempo += 0.18;
          profile.expression -= 0.12;
          profile.precision += 0.3;
          profile.spatiality += 0.08;
          profile.softness -= 0.08;
          break;

        case "precise":
          profile.precision += 0.34;
          profile.amplitude -= 0.13;
          profile.expression -= 0.08;
          profile.sequencing += 0.08;
          break;

        case "futuristic":
          profile.spatiality += 0.32;
          profile.expression += 0.12;
          profile.softness += 0.08;
          profile.continuity += 0.14;
          break;

        case "experimental":
          profile.expression += 0.34;
          profile.sequencing += 0.12;
          profile.amplitude += 0.14;
          profile.precision -= 0.14;
          break;

        case "disruptive":
          profile.tempo += 0.18;
          profile.expression += 0.28;
          profile.amplitude += 0.3;
          profile.softness -= 0.14;
          profile.continuity -= 0.08;
          break;

        case "bold":
          profile.expression += 0.2;
          profile.amplitude += 0.24;
          profile.precision += 0.04;
          break;

        case "dynamic":
          profile.tempo += 0.3;
          profile.amplitude += 0.17;
          profile.continuity += 0.12;
          profile.spatiality += 0.08;
          break;

        case "energetic":
          profile.tempo += 0.36;
          profile.expression += 0.28;
          profile.sequencing += 0.22;
          profile.amplitude += 0.18;
          break;

        case "playful":
          profile.expression += 0.24;
          profile.softness += 0.24;
          profile.sequencing += 0.12;
          profile.amplitude += 0.1;
          break;

        case "youthful":
          profile.tempo += 0.24;
          profile.expression += 0.18;
          profile.sequencing += 0.08;
          break;

        case "friendly":
          profile.softness += 0.3;
          profile.expression += 0.05;
          profile.amplitude -= 0.06;
          profile.continuity += 0.12;
          break;

        case "organic":
          profile.softness += 0.3;
          profile.continuity += 0.28;
          profile.spatiality += 0.1;
          profile.precision -= 0.08;
          break;

        case "immersive":
          profile.spatiality += 0.42;
          profile.continuity += 0.22;
          profile.expression += 0.13;
          profile.sequencing += 0.12;
          break;

        case "cinematic":
          profile.tempo -= 0.18;
          profile.expression += 0.16;
          profile.spatiality += 0.24;
          profile.sequencing += 0.18;
          profile.softness += 0.14;
          break;

        case "sporty":
          profile.tempo += 0.4;
          profile.amplitude += 0.22;
          profile.precision += 0.08;
          profile.continuity += 0.08;
          break;
      }
    }
  );

  return normalizeMotionProfile(
    profile
  );
}

function normalizeMotionProfile(
  profile: MotionProfile
): MotionProfile {
  return {
    tempo:
      clamp(profile.tempo),

    expression:
      clamp(
        profile.expression
      ),

    softness:
      clamp(
        profile.softness
      ),

    spatiality:
      clamp(
        profile.spatiality
      ),

    sequencing:
      clamp(
        profile.sequencing
      ),

    continuity:
      clamp(
        profile.continuity
      ),

    amplitude:
      clamp(
        profile.amplitude
      ),

    precision:
      clamp(
        profile.precision
      ),
  };
}

/* ------------------------------------------------ */
/* BLEND PROFILES                                   */
/* ------------------------------------------------ */

function blendMotionProfiles(
  a: MotionProfile,
  b: MotionProfile,
  aWeight: number
): MotionProfile {
  const bWeight =
    1 - aWeight;

  return {
    tempo:
      a.tempo *
        aWeight +
      b.tempo *
        bWeight,

    expression:
      a.expression *
        aWeight +
      b.expression *
        bWeight,

    softness:
      a.softness *
        aWeight +
      b.softness *
        bWeight,

    spatiality:
      a.spatiality *
        aWeight +
      b.spatiality *
        bWeight,

    sequencing:
      a.sequencing *
        aWeight +
      b.sequencing *
        bWeight,

    continuity:
      a.continuity *
        aWeight +
      b.continuity *
        bWeight,

    amplitude:
      a.amplitude *
        aWeight +
      b.amplitude *
        bWeight,

    precision:
      a.precision *
        aWeight +
      b.precision *
        bWeight,
  };
}

/* ------------------------------------------------ */
/* PARTNERSHIP MOTION PROFILE                       */
/* ------------------------------------------------ */

function getPartnershipMotionProfile(
  model: PartnershipModelId,
  brandA: MotionProfile,
  brandB: MotionProfile
) {
  switch (model) {
    case "axb":
      return blendMotionProfiles(
        brandA,
        brandB,
        0.5
      );

    case "aandb":
      return blendMotionProfiles(
        brandA,
        brandB,
        0.72
      );

    case "poweredByA":
      return blendMotionProfiles(
        brandB,
        brandA,
        0.9
      );

    case "presentsB":
    default:
      return brandA;
  }
}

/* ------------------------------------------------ */
/* PARTNERSHIP CONFIG                               */
/* ------------------------------------------------ */

function getMotionConfig(
  model: PartnershipModelId,
  brandAName: string,
  brandBName: string
): MotionConfig {
  switch (model) {
    case "axb":
      return {
        eyebrow:
          "Shared motion system",

        intro:
          "Both brand personalities are translated into one choreography. Motion should feel jointly authored rather than alternating between two unrelated behaviours.",

        systemOwner:
          "Shared",

        expressiveOwner:
          `${brandAName} + ${brandBName}`,

        doLabel:
          "One choreography, shared timing and one clear focal point.",

        dontLabel:
          "Two independent motion systems competing simultaneously.",

        rules: [
          "Motion personality blends 50 / 50",
          "Shared timing + easing logic",
          "Either brand may lead individual moments",
        ],
      };

    case "aandb":
      return {
        eyebrow:
          `${brandAName}-led motion`,

        intro:
          `${brandAName}'s movement defines the rhythm and choreography. ${brandBName} can add secondary movement but should follow the established tempo and easing system.`,

        systemOwner:
          brandAName,

        expressiveOwner:
          brandAName,

        doLabel:
          `${brandAName} initiates the motion; ${brandBName} follows or responds.`,

        dontLabel:
          `${brandBName} introducing a competing rhythm or larger motion event.`,

        rules: [
          "≈ 70% Brand A motion character",
          "Brand B follows the lead",
          "One timing system",
        ],
      };

    case "poweredByA":
      return {
        eyebrow:
          `${brandBName}-owned motion`,

        intro:
          `${brandBName} owns all consumer-facing movement. ${brandAName} should remain almost motionless except for small endorsement or technology-credit moments.`,

        systemOwner:
          brandBName,

        expressiveOwner:
          brandBName,

        doLabel:
          `${brandBName} owns choreography; ${brandAName} enters quietly as endorsement.`,

        dontLabel:
          `${brandAName} creating a second expressive motion language.`,

        rules: [
          "≈ 90% Brand B motion character",
          "Brand A motion stays functional",
          "No competing expressive choreography",
        ],
      };

    case "presentsB":
    default:
      return {
        eyebrow:
          `${brandAName} platform / ${brandBName} content`,

        intro:
          `${brandAName} controls navigation, transitions and spatial continuity. ${brandBName} may use its own expressive motion inside the featured content layer.`,

        systemOwner:
          brandAName,

        expressiveOwner:
          brandBName,

        doLabel:
          `${brandAName} establishes the container first; ${brandBName} animates inside it.`,

        dontLabel:
          `${brandBName}'s motion escaping into navigation and platform chrome.`,

        rules: [
          "Brand A = platform choreography",
          "Brand B = content expression",
          "Animate container before content",
        ],
      };
  }
}

/* ------------------------------------------------ */
/* MOTION PERSONALITY                               */
/* ------------------------------------------------ */

function getMotionPersonality(
  profile: MotionProfile
) {
  const tempo =
    profile.tempo > 0.72
      ? "Fast"
      : profile.tempo < 0.36
        ? "Measured"
        : "Responsive";

  const behaviour =
    profile.softness > 0.7
      ? "Fluid"
      : profile.precision > 0.72
        ? "Precise"
        : profile.expression > 0.68
          ? "Expressive"
          : "Controlled";

  const space =
    profile.spatiality > 0.65
      ? "Spatial"
      : profile.amplitude > 0.68
        ? "Directional"
        : "Subtle";

  return `${tempo} · ${behaviour} · ${space}`;
}

function getMotionDefinition(
  profile: MotionProfile
) {
  const speed =
    profile.tempo > 0.7
      ? "quick, immediate"
      : profile.tempo < 0.38
        ? "measured, deliberate"
        : "responsive, controlled";

  const path =
    profile.softness > 0.7
      ? "soft and continuous"
      : profile.precision > 0.72
        ? "precise and tightly resolved"
        : "clear and directional";

  const expression =
    profile.expression > 0.65
      ? "Expressive movement is visible in key brand moments"
      : "Expression remains restrained outside key moments";

  return `Movement feels ${speed}, with ${path} arrivals. ${expression}.`;
}

/* ------------------------------------------------ */
/* RECIPES                                          */
/* ------------------------------------------------ */

function buildRecipes(
  profile: MotionProfile
): MotionRecipe[] {
  const interaction =
    roundTo10(
      145 -
        profile.tempo *
          65
    );

  const transition =
    roundTo10(
      360 -
        profile.tempo *
          120 +
        profile.spatiality *
          30
    );

  const expressive =
    roundTo10(
      520 -
        profile.tempo *
          100 +
        profile.expression *
          120 +
        profile.spatiality *
          40
    );

  return [
    {
      label:
        "Interaction",

      purpose:
        "Hover, press, toggle and immediate feedback.",

      duration:
        `${interaction} ms`,

      easing:
        getInteractionEasing(
          profile
        ),

      properties:
        "Opacity / colour",
    },

    {
      label:
        "Transition",

      purpose:
        "Panels, cards, navigation and state changes.",

      duration:
        `${transition} ms`,

      easing:
        getTransitionEasing(
          profile
        ),

      properties:
        profile.spatiality >
        0.58
          ? "Transform + opacity"
          : "Translate + opacity",
    },

    {
      label:
        "Brand moment",

      purpose:
        "Opening, closing, hero reveals and milestones.",

      duration:
        `${expressive} ms`,

      easing:
        getBrandEasing(
          profile
        ),

      properties:
        profile.spatiality >
        0.62
          ? "Scale + opacity"
          : "Transform + opacity",
    },
  ];
}

function getInteractionEasing(
  profile: MotionProfile
) {
  if (
    profile.precision >
    0.7
  ) {
    return "Crisp ease-out";
  }

  if (
    profile.softness >
    0.72
  ) {
    return "Soft ease-out";
  }

  return "Practical ease-out";
}

function getTransitionEasing(
  profile: MotionProfile
) {
  if (
    profile.softness >
    0.72
  ) {
    return "Smooth in-out";
  }

  if (
    profile.tempo >
    0.72
  ) {
    return "Fast ease-out";
  }

  return "Controlled ease-out";
}

function getBrandEasing(
  profile: MotionProfile
) {
  if (
    profile.expression >
      0.68 &&
    profile.softness >
      0.58
  ) {
    return "Expressive settle";
  }

  if (
    profile.expression >
    0.68
  ) {
    return "Bold ease-out";
  }

  return "Smooth in-out";
}

/* ------------------------------------------------ */
/* CARD                                             */
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

export default function Page11() {
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
    buildMotionProfile(
      brandATraits
    );

  const brandBProfile =
    buildMotionProfile(
      brandBTraits
    );

  const sharedProfile =
    getPartnershipMotionProfile(
      model,
      brandAProfile,
      brandBProfile
    );

  const config =
    getMotionConfig(
      model,
      brandAName,
      brandBName
    );

  const recipes =
    buildRecipes(
      sharedProfile
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
            max-w-[1030px]
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
            11 / Shared visual territory
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
            Motion translates brand character into
            tempo, easing, spatial behaviour and
            choreography while preserving the hierarchy
            of the partnership.
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
              text-[9px]
              uppercase
              tracking-[0.16em]

              text-white/24
            "
          >
            Motion model
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

          w-[300px]
        "
      >
        {/* ---------------------------------------------- */}
        {/* MOTION PERSONALITY                              */}
        {/* ---------------------------------------------- */}

        <Card
          className="
            p-[16px]
          "
        >
          <SectionLabel>
            Motion personality
          </SectionLabel>

          <p
            className="
              mt-[11px]

              text-[21px]
              leading-[1.05]
              tracking-[-0.025em]

              text-white/86

              oook-medium
            "
          >
            {getMotionPersonality(
              sharedProfile
            )}
          </p>

          <p
            className="
              mt-[9px]

              text-[11px]
              leading-[1.42]

              text-white/42
            "
          >
            {getMotionDefinition(
              sharedProfile
            )}
          </p>

          <div
            className="
              mt-[14px]

              grid
              grid-cols-2

              gap-x-[14px]
              gap-y-[11px]
            "
          >
            <MotionMetric
              label="Tempo"
              value={
                sharedProfile.tempo
              }
              left="Slow"
              right="Fast"
            />

            <MotionMetric
              label="Expression"
              value={
                sharedProfile.expression
              }
              left="Productive"
              right="Expressive"
            />

            <MotionMetric
              label="Path"
              value={
                sharedProfile.softness
              }
              left="Direct"
              right="Fluid"
            />

            <MotionMetric
              label="Space"
              value={
                sharedProfile.spatiality
              }
              left="Flat"
              right="Spatial"
            />

            <MotionMetric
              label="Sequence"
              value={
                sharedProfile.sequencing
              }
              left="Together"
              right="Staggered"
            />

            <MotionMetric
              label="Amplitude"
              value={
                sharedProfile.amplitude
              }
              left="Subtle"
              right="Strong"
            />
          </div>
        </Card>

        {/* ---------------------------------------------- */}
        {/* PARTNERSHIP LOGIC                              */}
        {/* ---------------------------------------------- */}

        <Card
          className="
            mt-[11px]

            p-[16px]
          "
        >
          <SectionLabel>
            Partnership choreography
          </SectionLabel>

          <p
            className="
              mt-[10px]

              text-[11px]
              leading-[1.4]

              text-white/42
            "
          >
            {config.intro}
          </p>

          <div
            className="
              mt-[13px]

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
                    grid-cols-[22px_minmax(0,1fr)]

                    gap-[7px]
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

                      text-white/54
                    "
                  >
                    {rule}
                  </p>
                </div>
              )
            )}
          </div>
        </Card>

        {/* ---------------------------------------------- */}
        {/* CORE PRINCIPLES                                */}
        {/* ---------------------------------------------- */}

        <Card
          className="
            mt-[11px]

            p-[16px]
          "
        >
          <SectionLabel>
            Core principles
          </SectionLabel>

          <div
            className="
              mt-[11px]

              space-y-[8px]
            "
          >
            <PrincipleRow
              label="Clarity"
              text="Motion must explain change or direct attention."
            />

            <PrincipleRow
              label="Focus"
              text="One animation leads; secondary motion supports."
            />

            <PrincipleRow
              label="Exit"
              text="Exits are shorter and quieter than entrances."
            />

            <PrincipleRow
              label="Reduced"
              text="Keep the experience usable with motion removed."
            />
          </div>
        </Card>
      </aside>

      {/* ================================================= */}
      {/* DO / DON'T                                        */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[392px]
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
          <MotionDo
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
          <MotionDont
            model={model}

            brandAColor={
              brandAColor
            }

            brandBColor={
              brandBColor
            }

            brandAName={
              brandAName
            }

            brandBName={
              brandBName
            }
          />
        </ComparisonCard>
      </section>

      {/* ================================================= */}
      {/* MOTION RECIPES                                    */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[392px]
          right-[70px]
          top-[522px]
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
              Motion recipes
            </SectionLabel>

            <p
              className="
                mt-[4px]

                text-[10px]

                text-white/31
              "
            >
              Use different levels of expression according
              to frequency and importance.
            </p>
          </div>

          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.12em]

              text-white/20
            "
          >
            Duration · easing · properties
          </p>
        </div>

        <div
          className="
            mt-[9px]

            grid
            grid-cols-3

            gap-[9px]
          "
        >
          {recipes.map(
            (recipe) => (
              <MotionRecipeCard
                key={
                  recipe.label
                }
                recipe={
                  recipe
                }
              />
            )
          )}
        </div>
      </section>

      {/* ================================================= */}
      {/* CHARACTER → MOTION                                */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[392px]
          right-[70px]
          top-[680px]

          grid
          grid-cols-2

          gap-[13px]
        "
      >
        <CharacterMotionCard
          brandLabel="Brand A motion character"
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

        <CharacterMotionCard
          brandLabel="Brand B motion character"
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
      {/* ACCESSIBILITY BAR                                  */}
      {/* ================================================= */}

      <div
        className="
          absolute

          bottom-[25px]
          left-[392px]
          right-[70px]

          flex
          items-center
          justify-between

          border-t
          border-white/[0.06]

          pt-[11px]
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.14em]

            text-white/27
          "
        >
          Reduced motion
        </p>

        <p
          className="
            max-w-[760px]

            text-right
            text-[10px]
            leading-[1.35]

            text-white/34
          "
        >
          Remove large translation, parallax and scale.
          Preserve state changes through opacity, colour
          and immediate feedback.
        </p>
      </div>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* LABEL                                            */
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
/* MOTION METRIC                                    */
/* ------------------------------------------------ */

function MotionMetric({
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

          text-white/28
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

            bg-white/52
          "
          style={{
            width:
              `${Math.round(
                value * 100
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
/* PRINCIPLE                                        */
/* ------------------------------------------------ */

function PrincipleRow({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div
      className="
        grid
        grid-cols-[58px_minmax(0,1fr)]

        gap-[8px]
      "
    >
      <p
        className="
          text-[9px]

          text-white/63

          oook-medium
        "
      >
        {label}
      </p>

      <p
        className="
          text-[9px]
          leading-[1.35]

          text-white/31
        "
      >
        {text}
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
                type === "do"
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
            max-w-[270px]

            text-right
            text-[10px]
            leading-[1.3]

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

          h-[270px]

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
/* DO                                               */
/* ------------------------------------------------ */

function MotionDo({
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
    MotionProfile;

  brandBProfile:
    MotionProfile;

  sharedProfile:
    MotionProfile;
}) {
  if (
    model === "presentsB"
  ) {
    return (
      <PresentsMotionExample
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
    );
  }

  const leadColor =
    model ===
    "poweredByA"
      ? brandBColor
      : brandAColor;

  const supportColor =
    model ===
    "poweredByA"
      ? brandAColor
      : brandBColor;

  const leadName =
    model ===
    "poweredByA"
      ? brandBName
      : brandAName;

  const supportName =
    model ===
    "poweredByA"
      ? brandAName
      : brandBName;

  return (
    <>
      <MotionGrid />

      <MotionPath
        profile={
          sharedProfile
        }
        colour={
          leadColor
        }
      />

      <KeyframeObject
        left="13%"
        top="61%"
        opacity={0.24}
        scale={0.72}
        colour={
          leadColor
        }
      />

      <KeyframeObject
        left="34%"
        top="43%"
        opacity={0.42}
        scale={0.82}
        colour={
          leadColor
        }
      />

      <KeyframeObject
        left="57%"
        top="30%"
        opacity={0.68}
        scale={0.91}
        colour={
          leadColor
        }
      />

      <KeyframeObject
        left="77%"
        top="20%"
        opacity={1}
        scale={1}
        colour={
          leadColor
        }
      />

      {/* SUPPORTING MOTION */}

      <div
        className="
          absolute

          bottom-[24px]
          left-[24px]

          flex
          items-center

          gap-[8px]
        "
      >
        <div
          className="
            h-[5px]
            w-[28px]

            rounded-full
          "
          style={{
            backgroundColor:
              leadColor,
          }}
        />

        <p
          className="
            text-[9px]

            text-white/56
          "
        >
          {leadName} leads
        </p>

        <div
          className="
            ml-[8px]

            h-[4px]
            w-[17px]

            rounded-full
          "
          style={{
            backgroundColor:
              supportColor,
          }}
        />

        <p
          className="
            text-[9px]

            text-white/30
          "
        >
          {model === "axb"
            ? `${supportName} shares choreography`
            : model === "aandb"
              ? `${supportName} follows`
              : `${supportName} endorses`}
        </p>
      </div>

      {/* TIMING */}

      <Timeline
        profile={
          sharedProfile
        }
      />
    </>
  );
}

/* ------------------------------------------------ */
/* PRESENTS MOTION                                  */
/* ------------------------------------------------ */

function PresentsMotionExample({
  brandAName,
  brandBName,

  brandAColor,
  brandBColor,

  brandAProfile,
  brandBProfile,
}: {
  brandAName: string;
  brandBName: string;

  brandAColor: string;
  brandBColor: string;

  brandAProfile:
    MotionProfile;

  brandBProfile:
    MotionProfile;
}) {
  return (
    <>
      <MotionGrid />

      {/* A CONTAINER */}

      <div
        className="
          absolute

          left-[42px]
          right-[42px]
          top-[32px]

          h-[178px]

          rounded-[18px]

          border
          border-white/[0.08]

          bg-white/[0.015]
        "
      >
        <div
          className="
            flex
            h-[32px]

            items-center

            border-b
            border-white/[0.06]

            px-[11px]
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
              ml-[8px]

              text-[8px]

              text-white/42
            "
          >
            {brandAName} container
          </p>

          <p
            className="
              ml-auto

              text-[7px]

              text-white/20
            "
          >
            01 · enters first
          </p>
        </div>

        {/* B CONTENT */}

        <div
          className="
            absolute

            bottom-[12px]
            left-[12px]
            right-[12px]
            top-[44px]

            overflow-hidden

            rounded-[12px]

            border
            border-white/[0.05]
          "
        >
          <div
            className="
              absolute

              -right-[20px]
              -top-[25px]

              h-[110px]
              w-[110px]

              rounded-full

              blur-[30px]
            "
            style={{
              backgroundColor:
                alpha(
                  brandBColor,
                  0.22
                ),
            }}
          />

          <KeyframeObject
            left="18%"
            top="56%"
            opacity={0.25}
            scale={0.72}
            colour={
              brandBColor
            }
          />

          <KeyframeObject
            left="46%"
            top="36%"
            opacity={0.55}
            scale={0.86}
            colour={
              brandBColor
            }
          />

          <KeyframeObject
            left="73%"
            top="22%"
            opacity={1}
            scale={1}
            colour={
              brandBColor
            }
          />

          <p
            className="
              absolute

              bottom-[9px]
              right-[10px]

              text-[7px]

              text-white/28
            "
          >
            02 · {brandBName} expression follows
          </p>
        </div>
      </div>

      <div
        className="
          absolute

          bottom-[17px]
          left-[44px]

          flex
          items-center

          gap-[7px]
        "
      >
        <span
          className="
            text-[8px]

            text-white/35
          "
        >
          Platform
        </span>

        <div
          className="
            h-[3px]
            w-[52px]

            rounded-full
          "
          style={{
            backgroundColor:
              alpha(
                brandAColor,
                0.7
              ),
          }}
        />

        <span
          className="
            ml-[10px]

            text-[8px]

            text-white/35
          "
        >
          Content
        </span>

        <div
          className="
            h-[3px]
            w-[80px]

            rounded-full
          "
          style={{
            backgroundColor:
              alpha(
                brandBColor,
                0.7
              ),
          }}
        />
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* DON'T                                            */
/* ------------------------------------------------ */

function MotionDont({
  model,

  brandAColor,
  brandBColor,

  brandAName,
  brandBName,
}: {
  model:
    PartnershipModelId;

  brandAColor: string;
  brandBColor: string;

  brandAName: string;
  brandBName: string;
}) {
  const wrongLead =
    model === "aandb" ||
    model === "presentsB"
      ? brandBColor
      : model ===
          "poweredByA"
        ? brandAColor
        : brandAColor;

  return (
    <>
      <MotionGrid />

      {/* CHAOTIC PATHS */}

      <svg
        viewBox="0 0 560 270"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0

          h-full
          w-full
        "
      >
        <path
          d="M45 220 C110 30 180 250 260 70 C330 210 410 40 520 190"
          fill="none"
          stroke={
            alpha(
              brandAColor,
              0.58
            )
          }
          strokeWidth="2"
          strokeDasharray="6 7"
        />

        <path
          d="M48 50 C180 250 250 15 335 220 C390 65 450 240 520 55"
          fill="none"
          stroke={
            alpha(
              brandBColor,
              0.58
            )
          }
          strokeWidth="2"
          strokeDasharray="4 6"
        />
      </svg>

      {/* CONFLICTING ELEMENTS */}

      <ChaosObject
        left="12%"
        top="18%"
        colour={
          brandAColor
        }
        rotate="-16deg"
      />

      <ChaosObject
        left="34%"
        top="58%"
        colour={
          brandBColor
        }
        rotate="21deg"
      />

      <ChaosObject
        left="59%"
        top="16%"
        colour={
          wrongLead
        }
        rotate="-24deg"
      />

      <ChaosObject
        left="77%"
        top="52%"
        colour={
          brandBColor
        }
        rotate="17deg"
      />

      <div
        className="
          absolute

          left-1/2
          top-1/2

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-white/12

          bg-black/55

          px-[15px]
          py-[8px]

          text-[11px]

          text-white/64

          backdrop-blur-[8px]
        "
      >
        {model === "axb"
          ? "Competing rhythms"
          : model === "aandb"
            ? `${brandBName} overrides ${brandAName}`
            : model === "poweredByA"
              ? `${brandAName} becomes expressive`
              : `${brandBName} invades platform motion`}
      </div>

      <BigCross />

      <p
        className="
          absolute

          bottom-[18px]
          left-[20px]
          right-[20px]

          text-center
          text-[9px]
          leading-[1.35]

          text-white/28
        "
      >
        Avoid unrelated paths, simultaneous focal events,
        excessive property changes and inconsistent timing.
      </p>
    </>
  );
}

/* ------------------------------------------------ */
/* MOTION PATH                                      */
/* ------------------------------------------------ */

function MotionPath({
  profile,
  colour,
}: {
  profile:
    MotionProfile;

  colour: string;
}) {
  const fluid =
    profile.softness >
    0.62;

  const path =
    fluid
      ? "M70 205 C160 195 160 120 250 118 C355 115 350 65 490 55"
      : profile.spatiality >
          0.55
        ? "M70 205 L185 150 L310 105 L490 55"
        : "M70 205 L490 55";

  return (
    <svg
      viewBox="0 0 560 270"
      preserveAspectRatio="none"
      className="
        absolute
        inset-0

        h-full
        w-full
      "
    >
      <path
        d={path}
        fill="none"

        stroke={
          alpha(
            colour,
            0.42
          )
        }

        strokeWidth={
          1 +
          profile.amplitude *
            1.5
        }

        strokeDasharray="5 7"
      />
    </svg>
  );
}

/* ------------------------------------------------ */
/* KEYFRAME OBJECT                                  */
/* ------------------------------------------------ */

function KeyframeObject({
  left,
  top,
  opacity,
  scale,
  colour,
}: {
  left: string;
  top: string;

  opacity: number;
  scale: number;

  colour: string;
}) {
  return (
    <div
      className="
        absolute

        h-[42px]
        w-[42px]

        rounded-[12px]

        border
      "
      style={{
        left,
        top,

        opacity,

        transform:
          `translate(-50%, -50%) scale(${scale})`,

        borderColor:
          alpha(
            colour,
            0.7
          ),

        background:
          `radial-gradient(
            circle at 30% 25%,
            ${alpha(
              colour,
              0.28
            )},
            ${alpha(
              colour,
              0.05
            )}
          )`,

        boxShadow:
          `0 0 24px ${alpha(
            colour,
            opacity *
              0.2
          )}`,
      }}
    />
  );
}

/* ------------------------------------------------ */
/* TIMELINE                                         */
/* ------------------------------------------------ */

function Timeline({
  profile,
}: {
  profile:
    MotionProfile;
}) {
  const stagger =
    roundTo10(
      10 +
        profile.sequencing *
          30
    );

  return (
    <div
      className="
        absolute

        right-[20px]
        top-[18px]

        rounded-[10px]

        border
        border-white/[0.06]

        bg-black/30

        px-[10px]
        py-[8px]

        backdrop-blur-[8px]
      "
    >
      <p
        className="
          text-[7px]
          uppercase
          tracking-[0.12em]

          text-white/20
        "
      >
        Sequence
      </p>

      <p
        className="
          mt-[3px]

          text-[10px]

          text-white/52
        "
      >
        {stagger} ms stagger
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* GRID                                             */
/* ------------------------------------------------ */

function MotionGrid() {
  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        opacity-[0.22]

        [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]

        [background-size:42px_42px]
      "
    />
  );
}

/* ------------------------------------------------ */
/* CHAOS OBJECT                                     */
/* ------------------------------------------------ */

function ChaosObject({
  left,
  top,
  colour,
  rotate,
}: {
  left: string;
  top: string;
  colour: string;
  rotate: string;
}) {
  return (
    <div
      className="
        absolute

        h-[52px]
        w-[52px]

        border
      "
      style={{
        left,
        top,

        borderRadius:
          "15px 28px 12px 24px",

        borderColor:
          alpha(
            colour,
            0.7
          ),

        backgroundColor:
          alpha(
            colour,
            0.08
          ),

        transform:
          `rotate(${rotate})`,
      }}
    />
  );
}

/* ------------------------------------------------ */
/* RECIPE                                           */
/* ------------------------------------------------ */

function MotionRecipeCard({
  recipe,
}: {
  recipe:
    MotionRecipe;
}) {
  return (
    <Card
      className="
        p-[13px]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <p
          className="
            text-[13px]

            text-white/78

            oook-medium
          "
        >
          {recipe.label}
        </p>

        <p
          className="
            text-[13px]

            text-white/58
          "
        >
          {recipe.duration}
        </p>
      </div>

      <p
        className="
          mt-[5px]

          text-[9px]
          leading-[1.35]

          text-white/30
        "
      >
        {recipe.purpose}
      </p>

      <div
        className="
          mt-[10px]

          grid
          grid-cols-2

          gap-[8px]
        "
      >
        <RecipeValue
          label="Easing"
          value={
            recipe.easing
          }
        />

        <RecipeValue
          label="Properties"
          value={
            recipe.properties
          }
        />
      </div>
    </Card>
  );
}

function RecipeValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        rounded-[9px]

        border
        border-white/[0.055]

        bg-white/[0.015]

        px-[8px]
        py-[7px]
      "
    >
      <p
        className="
          text-[7px]
          uppercase
          tracking-[0.1em]

          text-white/20
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[3px]

          truncate

          text-[9px]

          text-white/47
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* CHARACTER → MOTION                               */
/* ------------------------------------------------ */

function CharacterMotionCard({
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
  const definitions =
    traits.flatMap(
      (id) => {
        const trait =
          MOTION_TRAITS.find(
            (item) =>
              item.id === id
          );

        const meta =
          brandCharacterTraits.find(
            (item) =>
              item.id === id
          );

        if (
          !trait ||
          !meta
        ) {
          return [];
        }

        return [
          {
            label:
              meta.label,

            implication:
              trait.implication,
          },
        ];
      }
    );

  return (
    <Card
      className="
        min-h-[128px]

        p-[14px]
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
              tracking-[0.12em]

              text-white/35

              oook-medium
            "
          >
            {brandLabel}
          </p>
        </div>

        <p
          className="
            max-w-[180px]

            truncate

            text-[9px]

            text-white/27
          "
        >
          {brandName}
        </p>
      </div>

      {definitions.length >
      0 ? (
        <div
          className="
            mt-[10px]

            grid
            grid-cols-1

            gap-[5px]
          "
        >
          {definitions.map(
            (
              definition
            ) => (
              <div
                key={
                  definition.label
                }
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

                    text-white/66

                    oook-medium
                  "
                >
                  {
                    definition.label
                  }
                </p>

                <p
                  className="
                    truncate

                    text-[8px]
                    leading-[1.3]

                    text-white/34
                  "
                  title={
                    definition.implication
                  }
                >
                  {
                    definition.implication
                  }
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <p
          className="
            mt-[11px]

            text-[9px]

            text-white/24
          "
        >
          No character traits selected. A neutral,
          responsive motion profile is being used.
        </p>
      )}
    </Card>
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

        right-[14px]
        top-[14px]

        flex

        h-[32px]
        w-[32px]

        items-center
        justify-center

        rounded-full

        border
        border-white/14

        bg-black/36

        text-[18px]

        text-white/62

        backdrop-blur-[8px]
      "
    >
      ×
    </div>
  );
}