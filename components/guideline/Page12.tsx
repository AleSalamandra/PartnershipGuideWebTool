"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import BrandLogo from "./BrandLogo";

import GuidelinePage, {
  useGuidelineThemeStore,
} from "./GuidelinePage";

import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";
import RasterGradient from "./RasterGradient";

import {
  brandCharacterTraits,
  type BrandCharacterTraitId,
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

interface ImageProfile {
  contrast: number;
  saturation: number;
  warmth: number;
  grain: number;
  softness: number;
  depth: number;
  crop: number;
}

interface TreatmentRecipe {
  label: string;
  contrast: string;
  colour: string;
  texture: string;
  framing: string;
}

interface ImageColourSystem {
  leadPrimary: string;
  leadSecondary: string;

  supportPrimary: string;
  supportSecondary: string;
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
    typeof value === "string" &&
    /^#[0-9A-Fa-f]{6}$/.test(
      value
    )
  )
    ? value
    : fallback;
}

function getTraits(
  brand: unknown
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

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/* ================================================= */
/* PROFILE                                           */
/* ================================================= */

function buildProfile(
  traits:
    BrandCharacterTraitId[]
): ImageProfile {
  const profile:
    ImageProfile = {
    contrast:
      0.5,

    saturation:
      0.45,

    warmth:
      0.5,

    grain:
      0.12,

    softness:
      0.25,

    depth:
      0.45,

    crop:
      0.3,
  };

  traits.forEach(
    (
      trait
    ) => {
      switch (
        trait
      ) {
        case "classic":
          profile.saturation -=
            0.05;

          profile.crop -=
            0.1;
          break;

        case "elegant":
          profile.saturation -=
            0.1;

          profile.softness +=
            0.15;
          break;

        case "premium":
          profile.contrast +=
            0.18;

          profile.grain +=
            0.08;

          profile.depth +=
            0.12;
          break;

        case "minimal":
          profile.saturation -=
            0.08;

          profile.grain -=
            0.1;

          profile.crop -=
            0.12;
          break;

        case "editorial":
          profile.contrast +=
            0.12;

          profile.crop +=
            0.18;
          break;

        case "technical":
          profile.warmth -=
            0.18;

          profile.contrast +=
            0.08;

          profile.softness -=
            0.12;
          break;

        case "precise":
          profile.softness -=
            0.15;

          profile.crop -=
            0.08;
          break;

        case "futuristic":
          profile.warmth -=
            0.2;

          profile.contrast +=
            0.14;

          profile.depth +=
            0.2;
          break;

        case "experimental":
          profile.crop +=
            0.3;

          profile.softness +=
            0.12;
          break;

        case "disruptive":
          profile.contrast +=
            0.3;

          profile.crop +=
            0.34;
          break;

        case "bold":
          profile.contrast +=
            0.26;

          profile.saturation +=
            0.1;
          break;

        case "dynamic":
          profile.crop +=
            0.3;
          break;

        case "energetic":
          profile.saturation +=
            0.28;

          profile.contrast +=
            0.15;

          profile.crop +=
            0.2;
          break;

        case "playful":
          profile.saturation +=
            0.2;

          profile.warmth +=
            0.08;

          profile.softness +=
            0.08;
          break;

        case "youthful":
          profile.saturation +=
            0.2;

          profile.crop +=
            0.15;
          break;

        case "friendly":
          profile.warmth +=
            0.2;

          profile.softness +=
            0.14;

          profile.contrast -=
            0.08;
          break;

        case "organic":
          profile.warmth +=
            0.22;

          profile.grain +=
            0.14;

          profile.softness +=
            0.12;
          break;

        case "immersive":
          profile.depth +=
            0.38;

          profile.crop +=
            0.1;
          break;

        case "cinematic":
          profile.contrast +=
            0.24;

          profile.grain +=
            0.18;

          profile.depth +=
            0.22;
          break;

        case "sporty":
          profile.contrast +=
            0.24;

          profile.crop +=
            0.32;

          profile.saturation +=
            0.08;
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
        key as keyof ImageProfile;

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
/* PROFILE BLENDING                                  */
/* ================================================= */

function blend(
  a: ImageProfile,
  b: ImageProfile,
  weight: number
): ImageProfile {
  const inverse =
    1 -
    weight;

  return {
    contrast:
      a.contrast *
        weight +
      b.contrast *
        inverse,

    saturation:
      a.saturation *
        weight +
      b.saturation *
        inverse,

    warmth:
      a.warmth *
        weight +
      b.warmth *
        inverse,

    grain:
      a.grain *
        weight +
      b.grain *
        inverse,

    softness:
      a.softness *
        weight +
      b.softness *
        inverse,

    depth:
      a.depth *
        weight +
      b.depth *
        inverse,

    crop:
      a.crop *
        weight +
      b.crop *
        inverse,
  };
}

function getBaseProfile(
  model:
    PartnershipModelId,

  a:
    ImageProfile,

  b:
    ImageProfile
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

function applyAdditionalRelationship(
  base:
    ImageProfile,

  x:
    ImageProfile,

  mode:
    AdditionalRelationshipMode
) {
  if (
    mode ===
    "presenting"
  ) {
    /*
      55% A/B partnership
      45% presented property
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
): ImageColourSystem {
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
/* SMART IMAGE                                       */
/* ================================================= */

function SmartImage({
  number,
  profile,
}: {
  number:
    number;

  profile:
    ImageProfile;
}) {
  const extensions = [
    "jpg",
    "jpeg",
    "png",
    "webp",
  ];

  const [
    extensionIndex,
    setExtensionIndex,
  ] =
    useState(
      0
    );

  useEffect(
    () => {
      setExtensionIndex(
        0
      );
    },
    [
      number,
    ]
  );

  return (
    <img
      src={`/images/image${number}.${extensions[extensionIndex]}`}
      alt=""
      draggable={
        false
      }
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
        absolute
        inset-0

        h-full
        w-full

        object-cover
      "
      style={{
        filter:
          `contrast(${
            0.84 +
            profile.contrast *
              0.5
          })
          saturate(${
            0.55 +
            profile.saturation *
              1.1
          })
          brightness(.86)`,

        transform:
          `scale(${
            1.03 +
            profile.crop *
              0.08
          })`,
      }}
    />
  );
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page12() {
  const {
    partnershipModel,
    additionalRelationship,

    brandA,
    brandB,
    propertyX,
  } =
    useGuidelineStore();

  const theme =
    useGuidelineThemeStore(
      (
        state
      ) =>
        state.theme
    );

  const isLight =
    theme ===
    "light";

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
  /* CHARACTER                                        */
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
    applyAdditionalRelationship(
      baseProfile,
      xProfile,
      additionalRelationship
    );

  /*
    In A presents B without an X layer,
    the featured content may retain B's
    image character.

    Once X is presented, X participates
    directly in the final treatment.
  */

  const contentProfile =
    presenting
      ? profile
      : model ===
          "presentsB"
        ? bProfile
        : profile;

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
    ImageColourSystem =
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

  /* ------------------------------------------------ */
  /* RECIPES                                          */
  /* ------------------------------------------------ */

  const recipes:
    TreatmentRecipe[] = [
    {
      label:
        "Hero footage",

      contrast:
        profile.contrast >
        0.65
          ? "Defined"
          : "Balanced",

      colour:
        profile.saturation >
        0.62
          ? "Rich"
          : "Controlled",

      texture:
        profile.grain >
        0.5
          ? "Fine grain"
          : "Clean",

      framing:
        profile.crop >
        0.62
          ? "Kinetic"
          : "Stable",
    },

    {
      label:
        "Photography",

      contrast:
        profile.contrast >
        0.65
          ? "Strong"
          : "Natural",

      colour:
        profile.warmth >
        0.6
          ? "Warm"
          : profile.warmth <
              0.4
            ? "Cool"
            : "Neutral",

      texture:
        profile.grain >
        0.45
          ? "Textured"
          : "Clean",

      framing:
        profile.crop >
        0.55
          ? "Editorial"
          : "Controlled",
    },

    {
      label:
        "UI imagery",

      contrast:
        "Reduced",

      colour:
        "Neutral",

      texture:
        "Minimal",

      framing:
        "Clear subject",
    },
  ];

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
            12 / Shared visual territory
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
            Shared visual territory — footage & image treatment
          </h1>

          <p
            className="
              mt-[13px]

              max-w-[930px]

              text-[16px]
              leading-[1.38]

              text-white/45
            "
          >
            {presenting
              ? `${propertyName} actively influences grade, atmosphere, framing and image character while the A / B partnership remains visible as the presenting layer.`
              : sponsored
                ? `The partnership image treatment remains unchanged. ${propertyName} does not influence grade, framing, colour or photographic character.`
                : "Image treatment creates family resemblance through grade, contrast, texture, framing and depth without destroying source integrity."}
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

          w-[300px]
        "
      >
        <Card className="p-[16px]">
          <SectionLabel>
            Image personality
          </SectionLabel>

          <h3
            className="
              mt-[10px]

              text-[21px]
              tracking-[-0.03em]

              text-white/82

              oook-medium
            "
          >
            {profile.contrast >
            0.7
              ? "Punchy"
              : profile.softness >
                  0.55
                ? "Soft"
                : "Balanced"}

            {" · "}

            {profile.saturation >
            0.65
              ? "Vivid"
              : "Restrained"}

            {" · "}

            {profile.depth >
            0.65
              ? "Immersive"
              : "Controlled"}
          </h3>

          <div
            className="
              mt-[15px]

              grid
              grid-cols-2

              gap-x-[14px]
              gap-y-[11px]
            "
          >
            <Metric
              label="Contrast"
              value={
                profile.contrast
              }
              left="Soft"
              right="Punchy"
            />

            <Metric
              label="Colour"
              value={
                profile.saturation
              }
              left="Quiet"
              right="Vivid"
            />

            <Metric
              label="Temperature"
              value={
                profile.warmth
              }
              left="Cool"
              right="Warm"
            />

            <Metric
              label="Texture"
              value={
                profile.grain
              }
              left="Clean"
              right="Grain"
            />

            <Metric
              label="Framing"
              value={
                profile.crop
              }
              left="Stable"
              right="Kinetic"
            />

            <Metric
              label="Depth"
              value={
                profile.depth
              }
              left="Flat"
              right="Immersive"
            />
          </div>

          {presenting && (
            <p
              className="
                mt-[13px]

                border-t
                border-white/[0.06]

                pt-[9px]

                text-[8px]
                leading-[1.4]

                text-white/24
              "
            >
              Result = 55% partnership image character + 45% {propertyName}.
            </p>
          )}
        </Card>

        {/* ====================================== */}
        {/* COLOUR TREATMENT                       */}
        {/* ====================================== */}

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Colour treatment
          </SectionLabel>

          <p
            className="
              mt-[9px]

              text-[10px]
              leading-[1.4]

              text-white/35
            "
          >
            {presenting
              ? `${propertyName} colours may establish the atmospheric grade. Partnership colours remain supporting cues rather than competing grades.`
              : sponsored
                ? "Sponsor colour never enters the image grade. It remains restricted to approved sponsor assets."
                : "Primary colour may establish the grade. Secondary colour is reserved for atmospheric light, edge glow and subtle tonal separation."}
          </p>

          <div
            className="
              mt-[12px]

              flex
              gap-[5px]
            "
          >
            <span
              className="
                h-[6px]
                flex-1

                rounded-full
              "
              style={{
                backgroundColor:
                  colours.leadPrimary,
              }}
            />

            <span
              className="
                h-[6px]
                w-[40px]

                rounded-full
              "
              style={{
                backgroundColor:
                  colours.leadSecondary,
              }}
            />

            <span
              className="
                h-[6px]
                w-[18px]

                rounded-full
              "
              style={{
                backgroundColor:
                  colours.supportSecondary,
              }}
            />
          </div>
        </Card>

        {/* ====================================== */}
        {/* X RULE                                 */}
        {/* ====================================== */}

        {sponsored && (
          <Card className="mt-[10px] p-[16px]">
            <SectionLabel>
              Sponsor rule
            </SectionLabel>

            <p
              className="
                mt-[9px]

                text-[10px]
                leading-[1.42]

                text-white/36
              "
            >
              {propertyName} may appear as a sponsor logo or credit, but never as a colour grade, LUT, glow, image overlay or photographic treatment.
            </p>
          </Card>
        )}
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
              ? `Create one coherent treatment in which ${propertyName} visibly influences the content world.`
              : "Create one coherent treatment while keeping colour and content believable."
          }
        >
          <TreatmentExample
            profile={
              contentProfile
            }
            primary={
              colours.leadPrimary
            }
            secondary={
              colours.leadSecondary
            }
            support={
              colours.supportSecondary
            }
            isLight={
              isLight
            }
          />
        </Comparison>

        <Comparison
          title="DON'T"
          description={
            presenting
              ? "Do not apply three independent A, B and X grades to the same footage."
              : sponsored
                ? "Do not recolour footage using the sponsor identity."
                : "Do not apply two aggressive competing brand grades to the same content."
          }
        >
          <BadTreatment
            mode={
              additionalRelationship
            }
            aProfile={
              aProfile
            }
            bProfile={
              bProfile
            }
            xProfile={
              xProfile
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
      {/* RECIPES                                  */}
      {/* ======================================== */}

      <section
        className="
          absolute

          left-[395px]
          right-[70px]
          top-[575px]
        "
      >
        <SectionLabel>
          Treatment recipes
        </SectionLabel>

        <div
          className="
            mt-[8px]

            grid
            grid-cols-3

            gap-[10px]
          "
        >
          {recipes.map(
            (
              recipe,
              index
            ) => (
              <RecipeCard
                key={
                  recipe.label
                }
                recipe={
                  recipe
                }
                primary={
                  index ===
                  2
                    ? colours.supportPrimary
                    : colours.leadPrimary
                }
                secondary={
                  index ===
                  2
                    ? colours.supportSecondary
                    : colours.leadSecondary
                }
              />
            )
          )}
        </div>
      </section>

      {/* ======================================== */}
      {/* CHARACTER                                */}
      {/* ======================================== */}

      <section
        className={`
          absolute

          left-[395px]
          right-[70px]
          top-[730px]

          grid

          gap-[10px]

          ${
            presenting
              ? "grid-cols-3"
              : "grid-cols-2"
          }
        `}
      >
        <CharacterSummary
          label="Brand A image character"
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

        <CharacterSummary
          label="Brand B image character"
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
          <CharacterSummary
            label={`${propertyName} image character`}
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
      {/* FOOTER                                   */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[24px]
          left-[70px]
          right-[70px]

          flex
          justify-between

          border-t
          border-white/[0.06]

          pt-[9px]

          text-[9px]
          text-white/24
        "
      >
        <span>
          Preserve skin tones, uniforms, products and essential real-world colours.
        </span>

        <span>
          {presenting
            ? `${propertyName} colour = atmosphere, not destructive recolouring.`
            : sponsored
              ? "Sponsor identity = attribution only."
              : "Secondary brand colour = atmosphere, not recolouring."}
        </span>
      </div>
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

          text-white/25
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

              text-white/72

              oook-medium
            "
          >
            {title}
          </span>
        </div>

        <p
          className="
            max-w-[285px]

            text-right

            text-[9px]
            leading-[1.35]

            text-white/34
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          relative

          mt-[10px]

          h-[305px]

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
/* GOOD TREATMENT                                    */
/* ================================================= */

function TreatmentExample({
  profile,
  primary,
  secondary,
  support,
  isLight,
}: {
  profile:
    ImageProfile;

  primary:
    string;

  secondary:
    string;

  support:
    string;

  isLight:
    boolean;
}) {
  return (
    <>
      <SmartImage
        number={
          4
        }
        profile={
          profile
        }
      />

      <RasterGradient
        direction="horizontal"
        className="
          absolute
          inset-0

          h-full
          w-full
        "
        stops={
          isLight
            ? [
                {
                  color:
                    "#FFFFFF",

                  offset:
                    0,

                  opacity:
                    0.48,
                },

                {
                  color:
                    "#FFFFFF",

                  offset:
                    52,

                  opacity:
                    0.04,
                },

                {
                  color:
                    "#FFFFFF",

                  offset:
                    100,

                  opacity:
                    0.18,
                },
              ]
            : [
                {
                  color:
                    "#000000",

                  offset:
                    0,

                  opacity:
                    0.55,
                },

                {
                  color:
                    "#000000",

                  offset:
                    52,

                  opacity:
                    0,
                },

                {
                  color:
                    "#000000",

                  offset:
                    100,

                  opacity:
                    0.2,
                },
              ]
        }
      />

      <RasterGlow
        color={
          secondary
        }
        secondaryColor={
          primary
        }
        opacity={
          0.28
        }
        secondaryOpacity={
          0.07
        }
        centerX={
          78
        }
        centerY={
          18
        }
        className="
          absolute

          -right-[80px]
          -top-[80px]

          h-[280px]
          w-[280px]
        "
      />

      <RasterGlow
        color={
          support
        }
        secondaryColor={
          primary
        }
        opacity={
          0.12
        }
        secondaryOpacity={
          0.035
        }
        centerX={
          40
        }
        centerY={
          60
        }
        className="
          absolute

          -bottom-[80px]
          left-[5%]

          h-[240px]
          w-[380px]
        "
      />

      <div
        className="
          absolute

          bottom-[18px]
          left-[18px]
          right-[18px]

          flex
          items-center

          rounded-[10px]

          border
          border-white/[0.08]

          bg-black/50

          px-[11px]
          py-[9px]
        "
      >
        <span
          className="
            h-[5px]
            w-[36px]

            rounded-full
          "
          style={{
            backgroundColor:
              primary,
          }}
        />

        <span
          className="
            ml-[5px]

            h-[5px]
            w-[17px]

            rounded-full
          "
          style={{
            backgroundColor:
              secondary,
          }}
        />

        <span
          className="
            ml-[8px]

            text-[9px]

            text-white/42
          "
        >
          Shared image treatment
        </span>
      </div>
    </>
  );
}

/* ================================================= */
/* BAD TREATMENT                                     */
/* ================================================= */

function BadTreatment({
  mode,

  aProfile,
  bProfile,
  xProfile,

  aPrimary,
  bPrimary,
  xPrimary,
}: {
  mode:
    AdditionalRelationshipMode;

  aProfile:
    ImageProfile;

  bProfile:
    ImageProfile;

  xProfile:
    ImageProfile;

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

  if (
    presenting
  ) {
    return (
      <>
        <BadImageColumn
          left="0%"
          width="33.333%"
          profile={
            aProfile
          }
          tint={
            aPrimary
          }
        />

        <BadImageColumn
          left="33.333%"
          width="33.333%"
          profile={
            bProfile
          }
          tint={
            bPrimary
          }
        />

        <BadImageColumn
          left="66.666%"
          width="33.334%"
          profile={
            xProfile
          }
          tint={
            xPrimary
          }
        />

        <ForbiddenMark />

        <p
          className="
            absolute

            bottom-[14px]
            left-[20px]
            right-[20px]

            text-center

            text-[8px]
            leading-[1.35]

            text-white/55
          "
        >
          Three identities should never create three independent photographic worlds.
        </p>
      </>
    );
  }

  return (
    <>
      <BadImageColumn
        left="0%"
        width="50%"
        profile={
          aProfile
        }
        tint={
          aPrimary
        }
      />

      <BadImageColumn
        left="50%"
        width="50%"
        profile={
          bProfile
        }
        tint={
          bPrimary
        }
      />

      <ForbiddenMark />
    </>
  );
}

function BadImageColumn({
  left,
  width,
  profile,
  tint,
}: {
  left:
    string;

  width:
    string;

  profile:
    ImageProfile;

  tint:
    string;
}) {
  return (
    <div
      className="
        absolute
        inset-y-0

        overflow-hidden
      "
      style={{
        left,
        width,
      }}
    >
      <SmartImage
        number={
          4
        }
        profile={
          profile
        }
      />

      <div
        className="
          absolute
          inset-0
        "
        style={{
          backgroundColor:
            alpha(
              tint,
              0.26
            ),
        }}
      />
    </div>
  );
}

function ForbiddenMark() {
  return (
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

          h-[42px]
          w-[42px]

          items-center
          justify-center

          rounded-full

          bg-black/75

          text-[20px]
          text-white
        "
      >
        ×
      </span>
    </div>
  );
}

/* ================================================= */
/* RECIPES                                           */
/* ================================================= */

function RecipeCard({
  recipe,
  primary,
  secondary,
}: {
  recipe:
    TreatmentRecipe;

  primary:
    string;

  secondary:
    string;
}) {
  return (
    <Card className="p-[12px]">
      <div
        className="
          flex
          justify-between

          gap-[12px]
        "
      >
        <p
          className="
            text-[12px]

            text-white/68

            oook-medium
          "
        >
          {recipe.label}
        </p>

        <div className="flex gap-[3px]">
          <span
            className="
              h-[5px]
              w-[20px]

              rounded-full
            "
            style={{
              backgroundColor:
                primary,
            }}
          />

          <span
            className="
              h-[5px]
              w-[10px]

              rounded-full
            "
            style={{
              backgroundColor:
                secondary,
            }}
          />
        </div>
      </div>

      <div
        className="
          mt-[11px]

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
  label:
    string;

  value:
    string;
}) {
  return (
    <div
      className="
        rounded-[7px]

        border
        border-white/[0.05]

        p-[6px]
      "
    >
      <p
        className="
          text-[6px]
          uppercase
          tracking-[0.08em]

          text-white/18
        "
      >
        {label}
      </p>

      <p
        className="
          mt-[3px]

          text-[8px]

          text-white/45
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ================================================= */
/* CHARACTER SUMMARY                                 */
/* ================================================= */

function CharacterSummary({
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
        min-h-[94px]

        p-[12px]

        ${
          featured
            ? "border-white/[0.12]"
            : ""
        }
      `}
    >
      <div
        className="
          flex
          items-center
          gap-[4px]
        "
      >
        <span
          className="
            h-[4px]
            w-[24px]

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
            w-[12px]

            rounded-full
          "
          style={{
            backgroundColor:
              secondary,
          }}
        />

        <span
          className="
            ml-[5px]

            text-[9px]
            uppercase
            tracking-[0.1em]

            text-white/28
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-[9px]

          text-[9px]

          text-white/34
        "
      >
        {traits.length
          ? traits
              .map(
                (
                  id
                ) =>
                  brandCharacterTraits.find(
                    (
                      item
                    ) =>
                      item.id ===
                      id
                  )?.label
              )
              .filter(
                Boolean
              )
              .join(
                " · "
              )
          : "Neutral natural treatment"}
      </p>
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
    <div
      className="
        flex
        items-center
        gap-[8px]
      "
    >
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