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

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

interface MotionProfile {
  tempo: number;
  expression: number;
  softness: number;
  spatiality: number;
  sequence: number;
  amplitude: number;
  precision: number;
}

interface MotionRecipe {
  label: string;
  duration: string;
  easing: string;
  property: string;
}

/* ------------------------------------------------ */
/* HELPERS                                          */
/* ------------------------------------------------ */

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
  return typeof value === "string" &&
    /^#[0-9A-Fa-f]{6}$/.test(value)
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

function buildMotionProfile(
  traits:
    BrandCharacterTraitId[]
): MotionProfile {
  const p:
    MotionProfile = {
    tempo: 0.5,
    expression: 0.35,
    softness: 0.55,
    spatiality: 0.35,
    sequence: 0.45,
    amplitude: 0.35,
    precision: 0.6,
  };

  traits.forEach(
    (trait) => {
      switch (trait) {
        case "classic":
          p.tempo -= 0.08;
          p.expression -= 0.1;
          p.precision += 0.2;
          break;

        case "elegant":
          p.tempo -= 0.12;
          p.softness += 0.25;
          p.amplitude -= 0.12;
          break;

        case "premium":
          p.tempo -= 0.1;
          p.expression -= 0.08;
          p.softness += 0.12;
          break;

        case "minimal":
          p.expression -= 0.25;
          p.amplitude -= 0.2;
          p.precision += 0.12;
          break;

        case "editorial":
          p.sequence += 0.3;
          p.precision += 0.12;
          break;

        case "technical":
          p.tempo += 0.18;
          p.precision += 0.3;
          p.expression -= 0.1;
          break;

        case "precise":
          p.precision += 0.34;
          p.amplitude -= 0.12;
          break;

        case "futuristic":
          p.spatiality += 0.32;
          p.expression += 0.12;
          break;

        case "experimental":
          p.expression += 0.34;
          p.sequence += 0.12;
          p.amplitude += 0.14;
          break;

        case "disruptive":
          p.tempo += 0.18;
          p.expression += 0.28;
          p.amplitude += 0.3;
          p.softness -= 0.14;
          break;

        case "bold":
          p.expression += 0.2;
          p.amplitude += 0.24;
          break;

        case "dynamic":
          p.tempo += 0.3;
          p.amplitude += 0.17;
          break;

        case "energetic":
          p.tempo += 0.35;
          p.expression += 0.28;
          p.sequence += 0.2;
          break;

        case "playful":
          p.expression += 0.24;
          p.softness += 0.22;
          p.sequence += 0.12;
          break;

        case "youthful":
          p.tempo += 0.22;
          p.expression += 0.16;
          break;

        case "friendly":
          p.softness += 0.28;
          p.amplitude -= 0.05;
          break;

        case "organic":
          p.softness += 0.3;
          p.spatiality += 0.1;
          p.precision -= 0.08;
          break;

        case "immersive":
          p.spatiality += 0.42;
          p.expression += 0.12;
          break;

        case "cinematic":
          p.tempo -= 0.18;
          p.expression += 0.16;
          p.spatiality += 0.24;
          p.sequence += 0.16;
          break;

        case "sporty":
          p.tempo += 0.4;
          p.amplitude += 0.22;
          p.precision += 0.08;
          break;
      }
    }
  );

  Object.keys(p).forEach(
    (key) => {
      const k =
        key as keyof MotionProfile;

      p[k] =
        clamp(
          p[k]
        );
    }
  );

  return p;
}

function blend(
  a: MotionProfile,
  b: MotionProfile,
  weight: number
): MotionProfile {
  const inverse =
    1 - weight;

  return {
    tempo:
      a.tempo * weight +
      b.tempo * inverse,

    expression:
      a.expression * weight +
      b.expression * inverse,

    softness:
      a.softness * weight +
      b.softness * inverse,

    spatiality:
      a.spatiality * weight +
      b.spatiality * inverse,

    sequence:
      a.sequence * weight +
      b.sequence * inverse,

    amplitude:
      a.amplitude * weight +
      b.amplitude * inverse,

    precision:
      a.precision * weight +
      b.precision * inverse,
  };
}

function getProfile(
  model: PartnershipModelId,
  a: MotionProfile,
  b: MotionProfile
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

/* ------------------------------------------------ */
/* MODEL TEXT                                       */
/* ------------------------------------------------ */

function getModelText(
  model: PartnershipModelId,
  aName: string,
  bName: string
) {
  switch (model) {
    case "axb":
      return {
        title:
          "Shared choreography",

        body:
          "Both personalities blend into one rhythm. Neither brand creates an independent motion layer.",

        rules: [
          "50 / 50 motion personality",
          "One timing and easing system",
          "Shared focal choreography",
        ],
      };

    case "aandb":
      return {
        title:
          `${aName}-led choreography`,

        body:
          `${aName} establishes timing and rhythm. ${bName} follows the same motion grammar with reduced prominence.`,

        rules: [
          "Brand A initiates",
          "Brand B follows",
          "One shared easing logic",
        ],
      };

    case "poweredByA":
      return {
        title:
          `${bName}-owned motion`,

        body:
          `${bName} controls consumer-facing movement. ${aName} remains almost static outside endorsement moments.`,

        rules: [
          "Brand B owns motion",
          "Brand A stays functional",
          "No competing expressive system",
        ],
      };

    case "presentsB":
    default:
      return {
        title:
          "Container → content",

        body:
          `${aName} animates the platform first. ${bName} expression begins only once the content territory is established.`,

        rules: [
          "Brand A controls platform transitions",
          "Brand B owns content motion",
          "Container always precedes content",
        ],
      };
  }
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

  const aTraits =
    getTraits(brandA);

  const bTraits =
    getTraits(brandB);

  const aProfile =
    buildMotionProfile(
      aTraits
    );

  const bProfile =
    buildMotionProfile(
      bTraits
    );

  const profile =
    getProfile(
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
    model === "poweredByA"
      ? bPrimary
      : aPrimary;

  const leadSecondary =
    model === "poweredByA"
      ? bSecondary
      : aSecondary;

  const supportPrimary =
    model === "poweredByA"
      ? aPrimary
      : bPrimary;

  const supportSecondary =
    model === "poweredByA"
      ? aSecondary
      : bSecondary;

  const aName =
    brandA.name?.trim() ||
    "Brand A";

  const bName =
    brandB.name?.trim() ||
    "Brand B";

  const text =
    getModelText(
      model,
      aName,
      bName
    );

  const recipes:
    MotionRecipe[] = [
    {
      label:
        "Interaction",

      duration:
        `${Math.round(
          150 -
          profile.tempo * 60
        )} ms`,

      easing:
        profile.softness > 0.65
          ? "Soft ease-out"
          : "Crisp ease-out",

      property:
        "Opacity / colour",
    },

    {
      label:
        "Transition",

      duration:
        `${Math.round(
          360 -
          profile.tempo * 110
        )} ms`,

      easing:
        profile.softness > 0.65
          ? "Smooth in-out"
          : "Controlled ease-out",

      property:
        "Translate + opacity",
    },

    {
      label:
        "Brand moment",

      duration:
        `${Math.round(
          480 +
          profile.expression * 140
        )} ms`,

      easing:
        profile.expression > 0.65
          ? "Expressive settle"
          : "Smooth in-out",

      property:
        profile.spatiality > 0.6
          ? "Scale + depth"
          : "Transform + opacity",
    },
  ];

  return (
    <GuidelinePage>
      <header className="absolute left-[70px] right-[70px] top-[46px] flex items-start justify-between">
        <div>
          <p className="text-[13px] uppercase tracking-[0.17em] text-white/30">
            11 / Shared visual territory
          </p>

          <h1 className="mt-[12px] text-[52px] leading-none tracking-[-0.045em] text-white oook-semibold">
            Shared visual territory — motion language
          </h1>

          <p className="mt-[13px] max-w-[850px] text-[16px] leading-[1.38] text-white/45">
            Motion translates brand character into tempo, easing, spatial behaviour and choreography.
          </p>
        </div>

        <PartnershipLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
        />
      </header>

      {/* LEFT */}

      <aside className="absolute left-[70px] top-[190px] w-[300px]">
        <Card className="p-[16px]">
          <SectionLabel>
            Motion personality
          </SectionLabel>

          <h3 className="mt-[10px] text-[21px] tracking-[-0.03em] text-white/82 oook-medium">
            {profile.tempo > 0.7
              ? "Fast"
              : profile.tempo < 0.38
                ? "Measured"
                : "Responsive"}
            {" · "}
            {profile.softness > 0.68
              ? "Fluid"
              : profile.precision > 0.7
                ? "Precise"
                : "Controlled"}
            {" · "}
            {profile.spatiality > 0.62
              ? "Spatial"
              : "Subtle"}
          </h3>

          <div className="mt-[15px] grid grid-cols-2 gap-x-[14px] gap-y-[11px]">
            <Metric
              label="Tempo"
              value={profile.tempo}
              left="Slow"
              right="Fast"
            />

            <Metric
              label="Expression"
              value={profile.expression}
              left="Quiet"
              right="Expressive"
            />

            <Metric
              label="Path"
              value={profile.softness}
              left="Direct"
              right="Fluid"
            />

            <Metric
              label="Space"
              value={profile.spatiality}
              left="Flat"
              right="Spatial"
            />

            <Metric
              label="Sequence"
              value={profile.sequence}
              left="Together"
              right="Staggered"
            />

            <Metric
              label="Amplitude"
              value={profile.amplitude}
              left="Subtle"
              right="Strong"
            />
          </div>
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Partnership choreography
          </SectionLabel>

          <p className="mt-[9px] text-[13px] text-white/65 oook-medium">
            {text.title}
          </p>

          <p className="mt-[7px] text-[10px] leading-[1.42] text-white/35">
            {text.body}
          </p>

          <div className="mt-[12px] space-y-[7px]">
            {text.rules.map(
              (rule, index) => (
                <div
                  key={rule}
                  className="grid grid-cols-[22px_1fr] gap-[7px]"
                >
                  <span className="text-[8px] text-white/18">
                    0{index + 1}
                  </span>

                  <span className="text-[10px] text-white/50">
                    {rule}
                  </span>
                </div>
              )
            )}
          </div>
        </Card>
      </aside>

      {/* DO DON'T */}

      <section className="absolute left-[395px] right-[70px] top-[190px] grid grid-cols-2 gap-[12px]">
        <Comparison
          good
          title="DO"
          description="Use one dominant motion event and a controlled supporting sequence."
        >
          <MotionExample
            profile={profile}
            primary={leadPrimary}
            secondary={leadSecondary}
            support={supportPrimary}
            supportSecondary={supportSecondary}
          />
        </Comparison>

        <Comparison
          title="DON'T"
          description="Avoid simultaneous competing motion paths, timings and focal events."
        >
          <BadMotion
            aPrimary={aPrimary}
            aSecondary={aSecondary}
            bPrimary={bPrimary}
            bSecondary={bSecondary}
          />
        </Comparison>
      </section>

      {/* RECIPES */}

      <section className="absolute left-[395px] right-[70px] top-[565px]">
        <SectionLabel>
          Motion recipes
        </SectionLabel>

        <div className="mt-[8px] grid grid-cols-3 gap-[10px]">
          {recipes.map(
            (recipe, index) => (
              <RecipeCard
                key={recipe.label}
                recipe={recipe}
                primary={
                  index === 2
                    ? supportPrimary
                    : leadPrimary
                }
                secondary={
                  index === 2
                    ? supportSecondary
                    : leadSecondary
                }
              />
            )
          )}
        </div>
      </section>

      {/* CHARACTER */}

      <section className="absolute left-[395px] right-[70px] top-[730px] grid grid-cols-2 gap-[10px]">
        <CharacterSummary
          label="Brand A motion character"
          traits={aTraits}
          primary={aPrimary}
          secondary={aSecondary}
        />

        <CharacterSummary
          label="Brand B motion character"
          traits={bTraits}
          primary={bPrimary}
          secondary={bSecondary}
        />
      </section>

      <div className="absolute bottom-[24px] left-[70px] right-[70px] flex justify-between border-t border-white/[0.06] pt-[9px] text-[9px] text-white/24">
        <span>
          Reduced motion: replace large translation and parallax with opacity and state change.
        </span>

        <span>
          Secondary colours may trail motion — never create a second focal event.
        </span>
      </div>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* COMPONENTS                                       */
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
  children: ReactNode;
}) {
  return (
    <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 oook-medium">
      {children}
    </p>
  );
}

function Metric({
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
      <p className="text-[8px] uppercase tracking-[0.1em] text-white/25">
        {label}
      </p>

      <div className="mt-[5px] h-[4px] rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-white/50"
          style={{
            width:
              `${Math.round(
                value * 100
              )}%`,
          }}
        />
      </div>

      <div className="mt-[4px] flex justify-between text-[7px] text-white/18">
        <span>{left}</span>
        <span>{right}</span>
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
  good?: boolean;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card className="p-[13px]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-[8px]">
          <span
            className={`
              flex h-[24px] w-[24px]
              items-center justify-center
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

          <span className="text-[14px] text-white/72 oook-medium">
            {title}
          </span>
        </div>

        <p className="max-w-[285px] text-right text-[9px] leading-[1.35] text-white/34">
          {description}
        </p>
      </div>

      <div className="relative mt-[10px] h-[295px] overflow-hidden rounded-[13px] border border-white/[0.06] bg-[#050506]">
        {children}
      </div>
    </Card>
  );
}

function MotionExample({
  profile,
  primary,
  secondary,
  support,
  supportSecondary,
}: {
  profile: MotionProfile;
  primary: string;
  secondary: string;
  support: string;
  supportSecondary: string;
}) {
  const points = [
    [12, 72],
    [34, 55],
    [58, 37],
    [82, 21],
  ];

  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d={
            profile.softness > 0.6
              ? "M12 72 C30 70 29 51 44 50 C63 48 66 28 82 21"
              : "M12 72 L34 55 L58 37 L82 21"
          }
          fill="none"
          stroke={secondary}
          strokeOpacity="0.55"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />

        <path
          d="M12 77 C39 72 57 52 84 37"
          fill="none"
          stroke={supportSecondary}
          strokeOpacity="0.25"
          strokeWidth="0.4"
        />
      </svg>

      {points.map(
        ([left, top], index) => (
          <div
            key={index}
            className="absolute h-[38px] w-[38px] rounded-[11px] border"
            style={{
              left:
                `${left}%`,

              top:
                `${top}%`,

              transform:
                `translate(-50%,-50%) scale(${
                  0.65 +
                  index * 0.12
                })`,

              opacity:
                0.25 +
                index * 0.23,

              borderColor:
                index ===
                points.length - 1
                  ? primary
                  : secondary,

              backgroundColor:
                `${primary}18`,
            }}
          />
        )
      )}

      <div className="absolute bottom-[18px] left-[18px] flex items-center gap-[7px]">
        <div
          className="h-[5px] w-[35px] rounded-full"
          style={{
            backgroundColor:
              primary,
          }}
        />

        <div
          className="h-[5px] w-[18px] rounded-full"
          style={{
            backgroundColor:
              secondary,
          }}
        />

        <div
          className="ml-[8px] h-[4px] w-[12px] rounded-full"
          style={{
            backgroundColor:
              support,
          }}
        />

        <span className="text-[8px] text-white/28">
          controlled stagger
        </span>
      </div>
    </>
  );
}

function BadMotion({
  aPrimary,
  aSecondary,
  bPrimary,
  bSecondary,
}: {
  aPrimary: string;
  aSecondary: string;
  bPrimary: string;
  bSecondary: string;
}) {
  return (
    <>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M5 80 C30 5 45 95 92 20"
          fill="none"
          stroke={aPrimary}
          strokeWidth=".7"
        />

        <path
          d="M7 20 C35 98 62 8 94 75"
          fill="none"
          stroke={bPrimary}
          strokeWidth=".7"
        />

        <path
          d="M12 45 C35 30 61 85 91 35"
          fill="none"
          stroke={aSecondary}
          strokeWidth=".5"
        />

        <path
          d="M6 60 C40 20 64 55 95 10"
          fill="none"
          stroke={bSecondary}
          strokeWidth=".5"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-black/70 text-[21px] text-white">
          ×
        </span>
      </div>
    </>
  );
}

function RecipeCard({
  recipe,
  primary,
  secondary,
}: {
  recipe: MotionRecipe;
  primary: string;
  secondary: string;
}) {
  return (
    <Card className="p-[13px]">
      <div className="flex justify-between">
        <p className="text-[12px] text-white/70 oook-medium">
          {recipe.label}
        </p>

        <p className="text-[11px] text-white/42">
          {recipe.duration}
        </p>
      </div>

      <div className="mt-[10px] flex gap-[4px]">
        <span
          className="h-[3px] w-[65px] rounded-full"
          style={{
            backgroundColor:
              primary,
          }}
        />

        <span
          className="h-[3px] w-[25px] rounded-full"
          style={{
            backgroundColor:
              secondary,
          }}
        />
      </div>

      <p className="mt-[8px] text-[8px] uppercase tracking-[0.09em] text-white/22">
        Easing
      </p>

      <p className="mt-[2px] text-[9px] text-white/48">
        {recipe.easing}
      </p>

      <p className="mt-[7px] text-[8px] uppercase tracking-[0.09em] text-white/22">
        Properties
      </p>

      <p className="mt-[2px] text-[9px] text-white/48">
        {recipe.property}
      </p>
    </Card>
  );
}

function CharacterSummary({
  label,
  traits,
  primary,
  secondary,
}: {
  label: string;
  traits:
    BrandCharacterTraitId[];
  primary: string;
  secondary: string;
}) {
  return (
    <Card className="min-h-[95px] p-[12px]">
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

        <span className="ml-[4px] text-[9px] uppercase tracking-[0.1em] text-white/30">
          {label}
        </span>
      </div>

      <p className="mt-[9px] text-[9px] text-white/37">
        {traits.length
          ? traits
              .map(
                (id) =>
                  brandCharacterTraits.find(
                    (item) =>
                      item.id ===
                      id
                  )?.label
              )
              .filter(Boolean)
              .join(" · ")
          : "Neutral responsive motion"}
      </p>
    </Card>
  );
}