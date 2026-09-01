"use client";

import {
  useEffect,
  useState,
  type ReactNode,
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

interface ImageProfile {
  contrast: number;
  saturation: number;
  warmth: number;
  brightness: number;

  grain: number;
  softness: number;
  sharpness: number;

  vignette: number;
  glow: number;
  depth: number;

  cropEnergy: number;
  asymmetry: number;
  monochrome: number;

  texture: number;
}

interface TreatmentConfig {
  eyebrow: string;
  intro: string;

  owner: string;
  supportingRole: string;

  doLabel: string;
  dontLabel: string;

  rules: [
    string,
    string,
    string
  ];
}

interface TreatmentRecipe {
  label: string;

  description: string;

  contrast: string;
  colour: string;
  texture: string;
  framing: string;
}

interface ImageTraitDefinition {
  id: BrandCharacterTraitId;

  implication: string;
}

/* ------------------------------------------------ */
/* CHARACTER → IMAGE LANGUAGE                       */
/* ------------------------------------------------ */

const IMAGE_TRAITS: ImageTraitDefinition[] = [
  {
    id: "classic",
    implication:
      "Balanced exposure, natural colour and stable compositions.",
  },

  {
    id: "elegant",
    implication:
      "Restrained saturation, soft highlights and generous negative space.",
  },

  {
    id: "premium",
    implication:
      "Deep blacks, controlled highlights, subtle grain and refined contrast.",
  },

  {
    id: "minimal",
    implication:
      "Clean surfaces, low visual noise and simple restrained crops.",
  },

  {
    id: "editorial",
    implication:
      "Confident crops, strong framing and carefully controlled tonal contrast.",
  },

  {
    id: "technical",
    implication:
      "Cooler colour, high clarity, neutral exposure and precise overlays.",
  },

  {
    id: "precise",
    implication:
      "Sharp detail, neutral grading and disciplined image alignment.",
  },

  {
    id: "futuristic",
    implication:
      "Cool bias, deeper blacks, selective glow and luminous highlights.",
  },

  {
    id: "experimental",
    implication:
      "Unexpected crops, selective blur, distortion and unconventional layering.",
  },

  {
    id: "disruptive",
    implication:
      "Aggressive crops, high contrast and deliberately tense compositions.",
  },

  {
    id: "bold",
    implication:
      "High contrast, strong subject separation and large visual masses.",
  },

  {
    id: "dynamic",
    implication:
      "Directional crops, off-centre framing and stronger sense of movement.",
  },

  {
    id: "energetic",
    implication:
      "Higher saturation, punchier contrast and active compositions.",
  },

  {
    id: "playful",
    implication:
      "Brighter colour, softer contrast and more flexible framing.",
  },

  {
    id: "youthful",
    implication:
      "Fresh colour, brighter exposure and spontaneous crops.",
  },

  {
    id: "friendly",
    implication:
      "Warmer skin tones, softer highlights and approachable framing.",
  },

  {
    id: "organic",
    implication:
      "Warm natural tones, texture, softer sharpness and imperfect framing.",
  },

  {
    id: "immersive",
    implication:
      "Strong depth, foreground layers, wide framing and atmospheric separation.",
  },

  {
    id: "cinematic",
    implication:
      "Deep contrast, atmospheric colour, grain, vignette and narrative framing.",
  },

  {
    id: "sporty",
    implication:
      "Crisp detail, punchy contrast, kinetic crops and strong subject focus.",
  },
];

/* ------------------------------------------------ */
/* HELPERS                                          */
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
/* BASE PROFILE                                     */
/* ------------------------------------------------ */

function getBaseImageProfile(): ImageProfile {
  return {
    contrast: 0.5,
    saturation: 0.45,
    warmth: 0.5,
    brightness: 0.5,

    grain: 0.12,
    softness: 0.25,
    sharpness: 0.6,

    vignette: 0.15,
    glow: 0.12,
    depth: 0.45,

    cropEnergy: 0.3,
    asymmetry: 0.25,
    monochrome: 0.05,

    texture: 0.15,
  };
}

/* ------------------------------------------------ */
/* BUILD PROFILE                                    */
/* ------------------------------------------------ */

function buildImageProfile(
  traits: BrandCharacterTraitId[]
): ImageProfile {
  const profile =
    getBaseImageProfile();

  traits.forEach(
    (trait) => {
      switch (trait) {
        case "classic":
          profile.contrast += 0.04;
          profile.saturation -= 0.06;
          profile.asymmetry -= 0.15;
          profile.cropEnergy -= 0.12;
          profile.sharpness += 0.08;
          break;

        case "elegant":
          profile.saturation -= 0.12;
          profile.softness += 0.14;
          profile.brightness += 0.04;
          profile.cropEnergy -= 0.08;
          profile.texture -= 0.04;
          break;

        case "premium":
          profile.contrast += 0.18;
          profile.saturation -= 0.07;
          profile.grain += 0.08;
          profile.vignette += 0.12;
          profile.depth += 0.1;
          break;

        case "minimal":
          profile.saturation -= 0.08;
          profile.texture -= 0.12;
          profile.grain -= 0.1;
          profile.cropEnergy -= 0.14;
          profile.brightness += 0.05;
          break;

        case "editorial":
          profile.contrast += 0.12;
          profile.cropEnergy += 0.18;
          profile.asymmetry += 0.1;
          profile.sharpness += 0.08;
          break;

        case "technical":
          profile.warmth -= 0.18;
          profile.sharpness += 0.28;
          profile.contrast += 0.08;
          profile.saturation -= 0.08;
          profile.softness -= 0.12;
          break;

        case "precise":
          profile.sharpness += 0.32;
          profile.asymmetry -= 0.18;
          profile.softness -= 0.15;
          profile.texture -= 0.08;
          break;

        case "futuristic":
          profile.warmth -= 0.24;
          profile.contrast += 0.16;
          profile.glow += 0.3;
          profile.depth += 0.18;
          profile.saturation += 0.05;
          break;

        case "experimental":
          profile.cropEnergy += 0.3;
          profile.asymmetry += 0.26;
          profile.softness += 0.12;
          profile.texture += 0.16;
          profile.monochrome += 0.08;
          break;

        case "disruptive":
          profile.contrast += 0.32;
          profile.cropEnergy += 0.36;
          profile.asymmetry += 0.28;
          profile.saturation += 0.08;
          break;

        case "bold":
          profile.contrast += 0.28;
          profile.saturation += 0.12;
          profile.sharpness += 0.1;
          profile.cropEnergy += 0.14;
          break;

        case "dynamic":
          profile.cropEnergy += 0.3;
          profile.asymmetry += 0.18;
          profile.sharpness += 0.08;
          break;

        case "energetic":
          profile.saturation += 0.28;
          profile.contrast += 0.18;
          profile.brightness += 0.08;
          profile.cropEnergy += 0.22;
          break;

        case "playful":
          profile.saturation += 0.22;
          profile.warmth += 0.08;
          profile.brightness += 0.1;
          profile.softness += 0.08;
          profile.asymmetry += 0.1;
          break;

        case "youthful":
          profile.saturation += 0.2;
          profile.brightness += 0.14;
          profile.cropEnergy += 0.15;
          profile.asymmetry += 0.1;
          break;

        case "friendly":
          profile.warmth += 0.2;
          profile.softness += 0.14;
          profile.contrast -= 0.08;
          profile.brightness += 0.08;
          break;

        case "organic":
          profile.warmth += 0.24;
          profile.grain += 0.15;
          profile.texture += 0.18;
          profile.softness += 0.12;
          profile.sharpness -= 0.12;
          break;

        case "immersive":
          profile.depth += 0.38;
          profile.vignette += 0.1;
          profile.glow += 0.1;
          profile.cropEnergy += 0.1;
          break;

        case "cinematic":
          profile.contrast += 0.24;
          profile.grain += 0.18;
          profile.vignette += 0.22;
          profile.depth += 0.2;
          profile.saturation -= 0.05;
          break;

        case "sporty":
          profile.contrast += 0.24;
          profile.sharpness += 0.22;
          profile.cropEnergy += 0.34;
          profile.saturation += 0.08;
          profile.warmth -= 0.05;
          break;
      }
    }
  );

  return normalizeImageProfile(
    profile
  );
}

function normalizeImageProfile(
  profile: ImageProfile
): ImageProfile {
  return {
    contrast:
      clamp(
        profile.contrast
      ),

    saturation:
      clamp(
        profile.saturation
      ),

    warmth:
      clamp(
        profile.warmth
      ),

    brightness:
      clamp(
        profile.brightness
      ),

    grain:
      clamp(
        profile.grain
      ),

    softness:
      clamp(
        profile.softness
      ),

    sharpness:
      clamp(
        profile.sharpness
      ),

    vignette:
      clamp(
        profile.vignette
      ),

    glow:
      clamp(
        profile.glow
      ),

    depth:
      clamp(
        profile.depth
      ),

    cropEnergy:
      clamp(
        profile.cropEnergy
      ),

    asymmetry:
      clamp(
        profile.asymmetry
      ),

    monochrome:
      clamp(
        profile.monochrome
      ),

    texture:
      clamp(
        profile.texture
      ),
  };
}

/* ------------------------------------------------ */
/* PROFILE BLENDING                                 */
/* ------------------------------------------------ */

function blendImageProfiles(
  a: ImageProfile,
  b: ImageProfile,
  aWeight: number
): ImageProfile {
  const bWeight =
    1 - aWeight;

  return {
    contrast:
      a.contrast *
        aWeight +
      b.contrast *
        bWeight,

    saturation:
      a.saturation *
        aWeight +
      b.saturation *
        bWeight,

    warmth:
      a.warmth *
        aWeight +
      b.warmth *
        bWeight,

    brightness:
      a.brightness *
        aWeight +
      b.brightness *
        bWeight,

    grain:
      a.grain *
        aWeight +
      b.grain *
        bWeight,

    softness:
      a.softness *
        aWeight +
      b.softness *
        bWeight,

    sharpness:
      a.sharpness *
        aWeight +
      b.sharpness *
        bWeight,

    vignette:
      a.vignette *
        aWeight +
      b.vignette *
        bWeight,

    glow:
      a.glow *
        aWeight +
      b.glow *
        bWeight,

    depth:
      a.depth *
        aWeight +
      b.depth *
        bWeight,

    cropEnergy:
      a.cropEnergy *
        aWeight +
      b.cropEnergy *
        bWeight,

    asymmetry:
      a.asymmetry *
        aWeight +
      b.asymmetry *
        bWeight,

    monochrome:
      a.monochrome *
        aWeight +
      b.monochrome *
        bWeight,

    texture:
      a.texture *
        aWeight +
      b.texture *
        bWeight,
  };
}

/* ------------------------------------------------ */
/* PARTNERSHIP PROFILE                              */
/* ------------------------------------------------ */

function getPartnershipImageProfile(
  model: PartnershipModelId,
  brandA: ImageProfile,
  brandB: ImageProfile
) {
  switch (model) {
    case "axb":
      return blendImageProfiles(
        brandA,
        brandB,
        0.5
      );

    case "aandb":
      return blendImageProfiles(
        brandA,
        brandB,
        0.7
      );

    case "poweredByA":
      return blendImageProfiles(
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

function getTreatmentConfig(
  model: PartnershipModelId,
  brandAName: string,
  brandBName: string
): TreatmentConfig {
  switch (model) {
    case "axb":
      return {
        eyebrow:
          "Shared image world",

        intro:
          "Both brands contribute to one coherent photographic and footage treatment. Source material may vary, but grade, contrast and texture should create a shared visual world.",

        owner:
          "Shared",

        supportingRole:
          `${brandAName} + ${brandBName}`,

        doLabel:
          "Unify different source material through one common treatment.",

        dontLabel:
          "Place two visibly different brand grades next to each other.",

        rules: [
          "One collaboration grade",
          "Equal treatment of both brands",
          "Accent colour stays secondary",
        ],
      };

    case "aandb":
      return {
        eyebrow:
          `${brandAName}-led image world`,

        intro:
          `${brandAName} defines the dominant photographic treatment. ${brandBName} imagery should be adapted enough to feel part of the same campaign without losing its source identity.`,

        owner:
          brandAName,

        supportingRole:
          brandBName,

        doLabel:
          `${brandAName}'s grade defines the visual world; ${brandBName} adapts to it.`,

        dontLabel:
          `${brandBName} introducing a stronger or unrelated image treatment.`,

        rules: [
          "≈ 70% Brand A image character",
          "Brand B footage adapts",
          "One tonal world",
        ],
      };

    case "poweredByA":
      return {
        eyebrow:
          `${brandBName}-owned image world`,

        intro:
          `${brandBName} owns the consumer-facing footage and photographic treatment. ${brandAName} should not impose its own colour grade, texture or crop language.`,

        owner:
          brandBName,

        supportingRole:
          `${brandAName} endorsement only`,

        doLabel:
          `${brandBName} controls footage treatment; ${brandAName} remains visually neutral.`,

        dontLabel:
          `${brandAName}'s image treatment becoming visible in the consumer experience.`,

        rules: [
          "≈ 90% Brand B image character",
          "Brand A does not recolour content",
          "Endorsement remains neutral",
        ],
      };

    case "presentsB":
    default:
      return {
        eyebrow:
          `${brandAName} container / ${brandBName} imagery`,

        intro:
          `${brandAName} controls the presentation layer, framing and interface treatment. ${brandBName} may preserve a recognisable photographic identity inside the featured content.`,

        owner:
          `${brandAName} presentation`,

        supportingRole:
          `${brandBName} content`,

        doLabel:
          `${brandAName} frames the image; ${brandBName}'s content identity remains visible inside.`,

        dontLabel:
          `Do not force ${brandBName} footage into ${brandAName}'s complete image treatment.`,

        rules: [
          "Brand A = container treatment",
          "Brand B = content treatment",
          "Do not flatten both identities",
        ],
      };
  }
}

/* ------------------------------------------------ */
/* PERSONALITY                                      */
/* ------------------------------------------------ */

function getImagePersonality(
  profile: ImageProfile
) {
  const tonal =
    profile.contrast >
    0.72
      ? "Punchy"
      : profile.softness >
          0.62
        ? "Soft"
        : "Balanced";

  const colour =
    profile.saturation >
    0.7
      ? "Vivid"
      : profile.monochrome >
          0.45
        ? "Desaturated"
        : profile.saturation <
            0.35
          ? "Restrained"
          : "Natural";

  const frame =
    profile.cropEnergy >
    0.65
      ? "Kinetic"
      : profile.depth >
          0.68
        ? "Immersive"
        : "Controlled";

  return `${tonal} · ${colour} · ${frame}`;
}

function getImageDefinition(
  profile: ImageProfile
) {
  const contrast =
    profile.contrast >
    0.68
      ? "strong tonal separation"
      : profile.contrast <
          0.38
        ? "soft tonal transitions"
        : "balanced contrast";

  const texture =
    profile.grain >
    0.55
      ? "visible texture and grain"
      : profile.texture >
          0.45
        ? "subtle material texture"
        : "clean surfaces";

  const framing =
    profile.cropEnergy >
    0.65
      ? "confident, directional framing"
      : "controlled framing";

  return `Use ${contrast}, ${texture} and ${framing}. Treatment should support the source material rather than overpower it.`;
}

/* ------------------------------------------------ */
/* RECIPES                                          */
/* ------------------------------------------------ */

function buildTreatmentRecipes(
  profile: ImageProfile
): TreatmentRecipe[] {
  return [
    {
      label:
        "Hero footage",

      description:
        "Main campaign and immersive video imagery.",

      contrast:
        describeContrast(
          profile
        ),

      colour:
        describeColour(
          profile
        ),

      texture:
        describeTexture(
          profile
        ),

      framing:
        describeFraming(
          profile
        ),
    },

    {
      label:
        "Photography",

      description:
        "Editorial stills, press imagery and promotional photography.",

      contrast:
        profile.contrast >
        0.65
          ? "Defined"
          : "Natural",

      colour:
        profile.saturation >
        0.65
          ? "Rich"
          : "Controlled",

      texture:
        profile.grain >
        0.5
          ? "Fine grain"
          : "Clean",

      framing:
        profile.asymmetry >
        0.55
          ? "Asymmetric"
          : "Stable",
    },

    {
      label:
        "UI imagery",

      description:
        "Thumbnails, cards and imagery behind interface elements.",

      contrast:
        "Reduced",

      colour:
        profile.monochrome >
        0.4
          ? "Near mono"
          : "Neutral",

      texture:
        "Minimal",

      framing:
        "Clear subject",
    },
  ];
}

function describeContrast(
  profile: ImageProfile
) {
  if (
    profile.contrast >
    0.75
  ) {
    return "High";
  }

  if (
    profile.contrast <
    0.35
  ) {
    return "Soft";
  }

  return "Balanced";
}

function describeColour(
  profile: ImageProfile
) {
  if (
    profile.monochrome >
    0.5
  ) {
    return "Monochrome";
  }

  if (
    profile.saturation >
    0.72
  ) {
    return "Vivid";
  }

  if (
    profile.saturation <
    0.35
  ) {
    return "Restrained";
  }

  return profile.warmth >
    0.62
    ? "Warm"
    : profile.warmth <
        0.38
      ? "Cool"
      : "Neutral";
}

function describeTexture(
  profile: ImageProfile
) {
  if (
    profile.grain >
    0.62
  ) {
    return "Grain";
  }

  if (
    profile.softness >
    0.62
  ) {
    return "Soft";
  }

  return "Clean";
}

function describeFraming(
  profile: ImageProfile
) {
  if (
    profile.cropEnergy >
    0.7
  ) {
    return "Kinetic";
  }

  if (
    profile.depth >
    0.68
  ) {
    return "Layered";
  }

  if (
    profile.asymmetry >
    0.58
  ) {
    return "Off-centre";
  }

  return "Stable";
}

/* ------------------------------------------------ */
/* CSS IMAGE FILTER                                 */
/* ------------------------------------------------ */

function getImageFilter(
  profile: ImageProfile
) {
  const contrast =
    0.82 +
    profile.contrast *
      0.55;

  const saturation =
    Math.max(
      0.15,
      0.45 +
        profile.saturation *
          1.25 -
        profile.monochrome *
          0.7
    );

  const brightness =
    0.78 +
    profile.brightness *
      0.4;

  const blur =
    profile.softness *
    1.6;

  return `
    contrast(${contrast})
    saturate(${saturation})
    brightness(${brightness})
    blur(${blur}px)
  `;
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

export default function Page12() {
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
    buildImageProfile(
      brandATraits
    );

  const brandBProfile =
    buildImageProfile(
      brandBTraits
    );

  const sharedProfile =
    getPartnershipImageProfile(
      model,
      brandAProfile,
      brandBProfile
    );

  const config =
    getTreatmentConfig(
      model,
      brandAName,
      brandBName
    );

  const recipes =
    buildTreatmentRecipes(
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
            12 / Shared visual territory
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
            Shared visual territory — footage & image treatment
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
            A shared image world is defined through
            colour, contrast, texture, framing and
            depth — not by applying the same filter
            indiscriminately to every asset.
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
            Image model
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
        {/* PERSONALITY                                    */}
        {/* ---------------------------------------------- */}

        <Card
          className="
            p-[16px]
          "
        >
          <SectionLabel>
            Image personality
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
            {getImagePersonality(
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
            {getImageDefinition(
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
            <ImageMetric
              label="Contrast"
              value={
                sharedProfile.contrast
              }
              left="Soft"
              right="Punchy"
            />

            <ImageMetric
              label="Colour"
              value={
                sharedProfile.saturation
              }
              left="Quiet"
              right="Vivid"
            />

            <ImageMetric
              label="Temperature"
              value={
                sharedProfile.warmth
              }
              left="Cool"
              right="Warm"
            />

            <ImageMetric
              label="Texture"
              value={
                Math.max(
                  sharedProfile.texture,
                  sharedProfile.grain
                )
              }
              left="Clean"
              right="Textured"
            />

            <ImageMetric
              label="Framing"
              value={
                sharedProfile.cropEnergy
              }
              left="Stable"
              right="Kinetic"
            />

            <ImageMetric
              label="Depth"
              value={
                sharedProfile.depth
              }
              left="Flat"
              right="Immersive"
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
            Partnership treatment
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
        {/* OWNERSHIP                                      */}
        {/* ---------------------------------------------- */}

        <Card
          className="
            mt-[11px]

            p-[16px]
          "
        >
          <SectionLabel>
            Ownership
          </SectionLabel>

          <OwnershipRow
            label="Treatment"
            value={
              config.owner
            }
          />

          <OwnershipRow
            label="Secondary"
            value={
              config.supportingRole
            }
          />
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
          <TreatmentDo
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
          <TreatmentDont
            model={model}

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
      {/* TREATMENT RECIPES                                 */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[392px]
          right-[70px]
          top-[525px]
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
              Treatment recipes
            </SectionLabel>

            <p
              className="
                mt-[4px]

                text-[10px]

                text-white/31
              "
            >
              Maintain one family resemblance while
              adapting treatment to context.
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
            Contrast · colour · texture · framing
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
              <TreatmentRecipeCard
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
      {/* CHARACTER → IMAGE                                 */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[392px]
          right-[70px]
          top-[690px]

          grid
          grid-cols-2

          gap-[13px]
        "
      >
        <CharacterTreatmentCard
          brandLabel="Brand A image character"
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

        <CharacterTreatmentCard
          brandLabel="Brand B image character"
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
      {/* BOTTOM RULE                                       */}
      {/* ================================================= */}

      <div
        className="
          absolute

          bottom-[24px]
          left-[392px]
          right-[70px]

          flex
          items-center
          justify-between

          border-t
          border-white/[0.06]

          pt-[10px]
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
          Source integrity
        </p>

        <p
          className="
            max-w-[820px]

            text-right
            text-[10px]
            leading-[1.35]

            text-white/34
          "
        >
          Never push a treatment so far that skin tones,
          product colour, sports uniforms or essential
          content information become inaccurate.
        </p>
      </div>
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
/* METRIC                                           */
/* ------------------------------------------------ */

function ImageMetric({
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
        mt-[10px]

        flex
        items-start
        justify-between

        gap-[12px]
      "
    >
      <p
        className="
          text-[9px]
          uppercase
          tracking-[0.11em]

          text-white/25
        "
      >
        {label}
      </p>

      <p
        className="
          max-w-[170px]

          text-right
          text-[11px]
          leading-[1.25]

          text-white/55
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* COMPARISON                                       */
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

          bg-[#050506]
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

function TreatmentDo({
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
    ImageProfile;

  brandBProfile:
    ImageProfile;

  sharedProfile:
    ImageProfile;
}) {
  /* ============================================= */
  /* A PRESENTS B                                  */
  /* ============================================= */

  if (
    model === "presentsB"
  ) {
    return (
      <>
        <ImageFrame
          imageNumber={7}
          profile={
            brandBProfile
          }
          className="
            absolute
            inset-[22px]
          "
        />

        {/* A CONTAINER */}

        <div
          className="
            pointer-events-none

            absolute
            inset-[22px]

            rounded-[14px]

            border
            border-white/[0.11]
          "
        />

        <div
          className="
            absolute

            left-[34px]
            right-[34px]
            top-[34px]

            flex
            items-center
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
              ml-[8px]

              text-[8px]
              uppercase
              tracking-[0.12em]

              text-white/38
            "
          >
            {brandAName} frame
          </p>
        </div>

        <div
          className="
            absolute

            bottom-[32px]
            left-[34px]

            rounded-[10px]

            border
            border-white/[0.08]

            bg-black/45

            px-[10px]
            py-[8px]

            backdrop-blur-[10px]
          "
        >
          <p
            className="
              text-[8px]

              text-white/32
            "
          >
            Presented content
          </p>

          <p
            className="
              mt-[2px]

              text-[12px]

              text-white/72

              oook-medium
            "
          >
            {brandBName}
          </p>
        </div>

        <TreatmentBadge
          text="B content treatment preserved"
          colour={
            brandBColor
          }
        />
      </>
    );
  }

  /* ============================================= */
  /* OTHER MODELS                                  */
  /* ============================================= */

  const mainProfile =
    model ===
    "poweredByA"
      ? brandBProfile
      : model ===
          "aandb"
        ? brandAProfile
        : sharedProfile;

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

  return (
    <>
      <ImageFrame
        imageNumber={4}
        profile={
          mainProfile
        }
        className="
          absolute
          inset-0
        "
      />

      <ImageTreatmentEffects
        profile={
          mainProfile
        }
        accent={
          leadColor
        }
      />

      <div
        className="
          absolute

          bottom-[18px]
          left-[18px]
          right-[18px]

          flex
          items-center

          rounded-[12px]

          border
          border-white/[0.08]

          bg-black/48

          px-[11px]
          py-[9px]

          backdrop-blur-[12px]
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
            ml-[8px]

            text-[9px]

            text-white/58
          "
        >
          {model === "axb"
            ? "Shared collaboration grade"
            : model === "aandb"
              ? `${brandAName} grade leads`
              : `${brandBName} treatment owns`}
        </p>

        <div
          className="
            ml-auto

            h-[4px]
            w-[18px]

            rounded-full
          "
          style={{
            backgroundColor:
              supportColor,
          }}
        />
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* DON'T                                            */
/* ------------------------------------------------ */

function TreatmentDont({
  model,

  brandAColor,
  brandBColor,

  brandAProfile,
  brandBProfile,
}: {
  model:
    PartnershipModelId;

  brandAColor: string;
  brandBColor: string;

  brandAProfile:
    ImageProfile;

  brandBProfile:
    ImageProfile;
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
          "
        >
          <ImageFrame
            imageNumber={4}
            profile={
              brandAProfile
            }
            className="
              absolute
              inset-0
            "
          />

          <div
            className="
              absolute
              inset-0
            "
            style={{
              background:
                alpha(
                  brandAColor,
                  0.18
                ),
            }}
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
        >
          <ImageFrame
            imageNumber={7}
            profile={
              brandBProfile
            }
            className="
              absolute
              inset-0
            "
          />

          <div
            className="
              absolute
              inset-0
            "
            style={{
              background:
                alpha(
                  brandBColor,
                  0.22
                ),
            }}
          />
        </div>

        <DontLabel>
          Two unrelated grades
        </DontLabel>

        <BigCross />
      </>
    );
  }

  const wrongProfile =
    model === "aandb"
      ? brandBProfile
      : brandAProfile;

  const wrongColor =
    model === "aandb"
      ? brandBColor
      : brandAColor;

  if (
    model ===
    "poweredByA" ||
    model === "aandb"
  ) {
    return (
      <>
        <ImageFrame
          imageNumber={4}
          profile={
            wrongProfile
          }
          className="
            absolute
            inset-0
          "
        />

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
                  wrongColor,
                  0.36
                )},
                transparent 70%
              )`,
          }}
        />

        <DontLabel>
          Wrong brand treatment dominates
        </DontLabel>

        <BigCross />
      </>
    );
  }

  /* PRESENTS */

  return (
    <>
      <ImageFrame
        imageNumber={7}
        profile={
          brandAProfile
        }
        className="
          absolute
          inset-0
        "
      />

      <div
        className="
          absolute
          inset-0
        "
        style={{
          background:
            `linear-gradient(
              145deg,
              ${alpha(
                brandAColor,
                0.48
              )},
              transparent 65%
            )`,
        }}
      />

      <div
        className="
          absolute

          inset-[20px]

          rounded-[16px]

          border-2
        "
        style={{
          borderColor:
            alpha(
              brandAColor,
              0.75
            ),
        }}
      />

      <DontLabel>
        Platform treatment overrides content
      </DontLabel>

      <BigCross />
    </>
  );
}

/* ------------------------------------------------ */
/* IMAGE FRAME                                      */
/* ------------------------------------------------ */

function ImageFrame({
  imageNumber,
  profile,
  className = "",
}: {
  imageNumber: number;

  profile:
    ImageProfile;

  className?: string;
}) {
  const [
    extensionIndex,
    setExtensionIndex,
  ] = useState(0);

  const extensions = [
    "jpg",
    "jpeg",
    "png",
    "webp",
  ];

  useEffect(() => {
    setExtensionIndex(0);
  }, [imageNumber]);

  const extension =
    extensions[
      extensionIndex
    ];

  const objectPosition =
    `${50 +
    (profile.asymmetry -
      0.5) *
      24}% 50%`;

  const scale =
    1 +
    profile.cropEnergy *
      0.12;

  return (
    <div
      className={`
        overflow-hidden

        ${className}
      `}
    >
      <img
        src={`/images/image${imageNumber}.${extension}`}
        alt=""

        draggable={false}

        onError={() => {
          if (
            extensionIndex <
            extensions.length -
              1
          ) {
            setExtensionIndex(
              (
                current
              ) =>
                current +
                1
            );
          }
        }}

        className="
          h-full
          w-full

          object-cover
        "

        style={{
          objectPosition,

          filter:
            getImageFilter(
              profile
            ),

          transform:
            `scale(${scale})`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* TREATMENT EFFECTS                                */
/* ------------------------------------------------ */

function ImageTreatmentEffects({
  profile,
  accent,
}: {
  profile:
    ImageProfile;

  accent: string;
}) {
  return (
    <>
      {/* TEMPERATURE */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          mix-blend-soft-light
        "
        style={{
          background:
            profile.warmth >
            0.55
              ? `rgba(255,150,80,${
                  (
                    profile.warmth -
                    0.5
                  ) *
                  0.2
                })`
              : `rgba(70,130,255,${
                  (
                    0.5 -
                    profile.warmth
                  ) *
                  0.22
                })`,
        }}
      />

      {/* GLOW */}

      {profile.glow >
        0.22 && (
        <div
          className="
            pointer-events-none

            absolute

            -right-[15%]
            -top-[30%]

            h-[80%]
            w-[55%]

            rounded-full

            blur-[60px]
          "
          style={{
            backgroundColor:
              alpha(
                accent,
                profile.glow *
                  0.18
              ),
          }}
        />
      )}

      {/* VIGNETTE */}

      {profile.vignette >
        0.16 && (
        <div
          className="
            pointer-events-none

            absolute
            inset-0
          "
          style={{
            background:
              `radial-gradient(
                circle at center,
                transparent 45%,
                rgba(0,0,0,${
                  profile.vignette *
                  0.6
                }) 100%
              )`,
          }}
        />
      )}

      {/* GRAIN */}

      {profile.grain >
        0.14 && (
        <div
          className="
            pointer-events-none

            absolute
            inset-0

            mix-blend-screen
          "
          style={{
            opacity:
              profile.grain *
              0.16,

            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 3px)",
          }}
        />
      )}
    </>
  );
}

/* ------------------------------------------------ */
/* BADGE                                            */
/* ------------------------------------------------ */

function TreatmentBadge({
  text,
  colour,
}: {
  text: string;
  colour: string;
}) {
  return (
    <div
      className="
        absolute

        bottom-[32px]
        right-[34px]

        flex
        items-center

        gap-[6px]

        rounded-full

        border
        border-white/[0.08]

        bg-black/45

        px-[9px]
        py-[6px]

        backdrop-blur-[8px]
      "
    >
      <div
        className="
          h-[4px]
          w-[16px]

          rounded-full
        "
        style={{
          backgroundColor:
            colour,
        }}
      />

      <p
        className="
          text-[8px]

          text-white/38
        "
      >
        {text}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* DON'T LABEL                                      */
/* ------------------------------------------------ */

function DontLabel({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <div
      className="
        absolute

        left-1/2
        top-1/2

        -translate-x-1/2
        -translate-y-1/2

        whitespace-nowrap

        rounded-full

        border
        border-white/12

        bg-black/60

        px-[14px]
        py-[8px]

        text-[11px]

        text-white/67

        backdrop-blur-[10px]
      "
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------ */
/* RECIPE                                           */
/* ------------------------------------------------ */

function TreatmentRecipeCard({
  recipe,
}: {
  recipe:
    TreatmentRecipe;
}) {
  return (
    <Card
      className="
        p-[13px]
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
          mt-[5px]

          text-[9px]
          leading-[1.35]

          text-white/30
        "
      >
        {recipe.description}
      </p>

      <div
        className="
          mt-[10px]

          grid
          grid-cols-4

          gap-[5px]
        "
      >
        <RecipeValue
          label="Contrast"
          value={
            recipe.contrast
          }
        />

        <RecipeValue
          label="Colour"
          value={
            recipe.colour
          }
        />

        <RecipeValue
          label="Texture"
          value={
            recipe.texture
          }
        />

        <RecipeValue
          label="Frame"
          value={
            recipe.framing
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
        min-w-0

        rounded-[8px]

        border
        border-white/[0.055]

        bg-white/[0.015]

        px-[6px]
        py-[7px]
      "
    >
      <p
        className="
          text-[6px]
          uppercase
          tracking-[0.09em]

          text-white/20
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[3px]

          truncate

          text-[8px]

          text-white/48
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* CHARACTER → TREATMENT                            */
/* ------------------------------------------------ */

function CharacterTreatmentCard({
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
          IMAGE_TRAITS.find(
            (item) =>
              item.id === id
          );

        const metadata =
          brandCharacterTraits.find(
            (item) =>
              item.id === id
          );

        if (
          !trait ||
          !metadata
        ) {
          return [];
        }

        return [
          {
            label:
              metadata.label,

            implication:
              trait.implication,
          },
        ];
      }
    );

  return (
    <Card
      className="
        min-h-[126px]

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
          natural image treatment is being used.
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