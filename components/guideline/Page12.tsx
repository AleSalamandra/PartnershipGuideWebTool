"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import GuidelinePage, {
  useGuidelineThemeStore,
} from "./GuidelinePage";

import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";
import RasterGradient from "./RasterGradient";

import {
  BrandCharacterTraitId,
  brandCharacterTraits,
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

interface ImageProfile {
  contrast:
    number;

  saturation:
    number;

  warmth:
    number;

  grain:
    number;

  softness:
    number;

  depth:
    number;

  crop:
    number;
}

interface TreatmentRecipe {
  label:
    string;

  contrast:
    string;

  colour:
    string;

  texture:
    string;

  framing:
    string;
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

function buildProfile(
  traits:
    BrandCharacterTraitId[]
): ImageProfile {
  const p:
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
    (trait) => {
      switch (trait) {
        case "classic":
          p.saturation -=
            0.05;
          p.crop -=
            0.1;
          break;

        case "elegant":
          p.saturation -=
            0.1;
          p.softness +=
            0.15;
          break;

        case "premium":
          p.contrast +=
            0.18;
          p.grain +=
            0.08;
          p.depth +=
            0.12;
          break;

        case "minimal":
          p.saturation -=
            0.08;
          p.grain -=
            0.1;
          p.crop -=
            0.12;
          break;

        case "editorial":
          p.contrast +=
            0.12;
          p.crop +=
            0.18;
          break;

        case "technical":
          p.warmth -=
            0.18;
          p.contrast +=
            0.08;
          p.softness -=
            0.12;
          break;

        case "precise":
          p.softness -=
            0.15;
          p.crop -=
            0.08;
          break;

        case "futuristic":
          p.warmth -=
            0.2;
          p.contrast +=
            0.14;
          p.depth +=
            0.2;
          break;

        case "experimental":
          p.crop +=
            0.3;
          p.softness +=
            0.12;
          break;

        case "disruptive":
          p.contrast +=
            0.3;
          p.crop +=
            0.34;
          break;

        case "bold":
          p.contrast +=
            0.26;
          p.saturation +=
            0.1;
          break;

        case "dynamic":
          p.crop +=
            0.3;
          break;

        case "energetic":
          p.saturation +=
            0.28;
          p.contrast +=
            0.15;
          p.crop +=
            0.2;
          break;

        case "playful":
          p.saturation +=
            0.2;
          p.warmth +=
            0.08;
          p.softness +=
            0.08;
          break;

        case "youthful":
          p.saturation +=
            0.2;
          p.crop +=
            0.15;
          break;

        case "friendly":
          p.warmth +=
            0.2;
          p.softness +=
            0.14;
          p.contrast -=
            0.08;
          break;

        case "organic":
          p.warmth +=
            0.22;
          p.grain +=
            0.14;
          p.softness +=
            0.12;
          break;

        case "immersive":
          p.depth +=
            0.38;
          p.crop +=
            0.1;
          break;

        case "cinematic":
          p.contrast +=
            0.24;
          p.grain +=
            0.18;
          p.depth +=
            0.22;
          break;

        case "sporty":
          p.contrast +=
            0.24;
          p.crop +=
            0.32;
          p.saturation +=
            0.08;
          break;
      }
    }
  );

  Object.keys(
    p
  ).forEach(
    (key) => {
      const k =
        key as keyof ImageProfile;

      p[k] =
        clamp(
          p[k]
        );
    }
  );

  return p;
}

function blend(
  a:
    ImageProfile,

  b:
    ImageProfile,

  weight:
    number
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

function getProfile(
  model:
    PartnershipModelId,

  a:
    ImageProfile,

  b:
    ImageProfile
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
/* IMAGE                                             */
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
    useState(0);

  useEffect(
    () => {
      setExtensionIndex(
        0
      );
    },
    [number]
  );

  return (
    <img
      src={`/images/image${number}.${extensions[extensionIndex]}`}
      alt=""
      draggable={false}
      onError={() => {
        if (
          extensionIndex <
          extensions.length -
            1
        ) {
          setExtensionIndex(
            (current) =>
              current +
              1
          );
        }
      }}
      className="absolute inset-0 h-full w-full object-cover"
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
    brandA,
    brandB,
  } =
    useGuidelineStore();

  const theme =
    useGuidelineThemeStore(
      (state) =>
        state.theme
    );

  const isLight =
    theme ===
    "light";

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
      <header className="absolute left-[70px] right-[70px] top-[46px] flex items-start justify-between">
        <div>
          <p className="text-[13px] uppercase tracking-[0.17em] text-white/30">
            12 / Shared visual territory
          </p>

          <h1 className="mt-[12px] text-[52px] leading-none tracking-[-0.045em] text-white oook-semibold">
            Shared visual territory — footage & image treatment
          </h1>

          <p className="mt-[13px] max-w-[890px] text-[16px] leading-[1.38] text-white/45">
            Image treatment creates family resemblance through grade, contrast, texture, framing and depth without destroying source integrity.
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
            Image personality
          </SectionLabel>

          <h3 className="mt-[10px] text-[21px] tracking-[-0.03em] text-white/82 oook-medium">
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

          <div className="mt-[15px] grid grid-cols-2 gap-x-[14px] gap-y-[11px]">
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
        </Card>

        <Card className="mt-[10px] p-[16px]">
          <SectionLabel>
            Colour treatment
          </SectionLabel>

          <p className="mt-[9px] text-[10px] leading-[1.4] text-white/35">
            Primary colour may establish the grade. Secondary colour is reserved for atmospheric light, edge glow and subtle tonal separation.
          </p>

          <div className="mt-[12px] flex gap-[5px]">
            <span
              className="h-[6px] flex-1 rounded-full"
              style={{
                backgroundColor:
                  leadPrimary,
              }}
            />

            <span
              className="h-[6px] w-[40px] rounded-full"
              style={{
                backgroundColor:
                  leadSecondary,
              }}
            />

            <span
              className="h-[6px] w-[18px] rounded-full"
              style={{
                backgroundColor:
                  supportSecondary,
              }}
            />
          </div>
        </Card>
      </aside>

      {/* DO / DON'T */}

      <section className="absolute left-[395px] right-[70px] top-[190px] grid grid-cols-2 gap-[12px]">
        <Comparison
          good
          title="DO"
          description="Create one coherent treatment while keeping colour and content believable."
        >
          <TreatmentExample
            profile={
              model ===
              "presentsB"
                ? bProfile
                : profile
            }
            primary={
              leadPrimary
            }
            secondary={
              leadSecondary
            }
            support={
              supportSecondary
            }
            isLight={
              isLight
            }
          />
        </Comparison>

        <Comparison
          title="DON'T"
          description="Do not apply two aggressive competing brand grades to the same content."
        >
          <BadTreatment
            aProfile={
              aProfile
            }
            bProfile={
              bProfile
            }
            aPrimary={
              aPrimary
            }
            bPrimary={
              bPrimary
            }
          />
        </Comparison>
      </section>

      {/* RECIPES */}

      <section className="absolute left-[395px] right-[70px] top-[575px]">
        <SectionLabel>
          Treatment recipes
        </SectionLabel>

        <div className="mt-[8px] grid grid-cols-3 gap-[10px]">
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
                    ? supportPrimary
                    : leadPrimary
                }
                secondary={
                  index ===
                  2
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
      </section>

      <div className="absolute bottom-[24px] left-[70px] right-[70px] flex justify-between border-t border-white/[0.06] pt-[9px] text-[9px] text-white/24">
        <span>
          Preserve skin tones, uniforms, products and essential real-world colours.
        </span>

        <span>
          Secondary brand colour = atmosphere, not recolouring.
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
      <p className="text-[8px] uppercase tracking-[0.1em] text-white/25">
        {label}
      </p>

      <div className="mt-[5px] h-[4px] rounded-full bg-white/[0.07]">
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
      <div className="flex items-start justify-between">
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

          <span className="text-[14px] text-white/72 oook-medium">
            {title}
          </span>
        </div>

        <p className="max-w-[285px] text-right text-[9px] leading-[1.35] text-white/34">
          {description}
        </p>
      </div>

      <div className="relative mt-[10px] h-[305px] overflow-hidden rounded-[13px] border border-white/[0.06] bg-[#050506]">
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
        number={4}
        profile={
          profile
        }
      />

      <RasterGradient
        direction="horizontal"
        className="absolute inset-0 h-full w-full"
        stops={
          isLight
            ? [
                {
                  color:
                    "#FFFFFF",
                  offset: 0,
                  opacity: 0.48,
                },
                {
                  color:
                    "#FFFFFF",
                  offset: 52,
                  opacity: 0.04,
                },
                {
                  color:
                    "#FFFFFF",
                  offset:
                    100,
                  opacity: 0.18,
                },
              ]
            : [
                {
                  color:
                    "#000000",
                  offset: 0,
                  opacity: 0.55,
                },
                {
                  color:
                    "#000000",
                  offset: 52,
                  opacity: 0,
                },
                {
                  color:
                    "#000000",
                  offset:
                    100,
                  opacity: 0.2,
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
        opacity={0.28}
        secondaryOpacity={0.07}
        centerX={78}
        centerY={18}
        className="absolute -right-[80px] -top-[80px] h-[280px] w-[280px]"
      />

      <RasterGlow
        color={
          support
        }
        secondaryColor={
          primary
        }
        opacity={0.12}
        secondaryOpacity={0.035}
        centerX={40}
        centerY={60}
        className="absolute -bottom-[80px] left-[5%] h-[240px] w-[380px]"
      />

      <div className="absolute bottom-[18px] left-[18px] right-[18px] flex items-center rounded-[10px] border border-white/[0.08] bg-black/50 px-[11px] py-[9px]">
        <span
          className="h-[5px] w-[36px] rounded-full"
          style={{
            backgroundColor:
              primary,
          }}
        />

        <span
          className="ml-[5px] h-[5px] w-[17px] rounded-full"
          style={{
            backgroundColor:
              secondary,
          }}
        />

        <span className="ml-[8px] text-[9px] text-white/42">
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
  aProfile,
  bProfile,
  aPrimary,
  bPrimary,
}: {
  aProfile:
    ImageProfile;

  bProfile:
    ImageProfile;

  aPrimary:
    string;

  bPrimary:
    string;
}) {
  return (
    <>
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
        <SmartImage
          number={4}
          profile={
            aProfile
          }
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundColor:
              `${aPrimary}44`,
          }}
        />
      </div>

      <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <SmartImage
          number={4}
          profile={
            bProfile
          }
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundColor:
              `${bPrimary}44`,
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-black/75 text-[20px] text-white">
          ×
        </span>
      </div>
    </>
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
      <div className="flex justify-between">
        <p className="text-[12px] text-white/68 oook-medium">
          {recipe.label}
        </p>

        <div className="flex gap-[3px]">
          <span
            className="h-[5px] w-[20px] rounded-full"
            style={{
              backgroundColor:
                primary,
            }}
          />

          <span
            className="h-[5px] w-[10px] rounded-full"
            style={{
              backgroundColor:
                secondary,
            }}
          />
        </div>
      </div>

      <div className="mt-[11px] grid grid-cols-4 gap-[5px]">
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
    <div className="rounded-[7px] border border-white/[0.05] p-[6px]">
      <p className="text-[6px] uppercase tracking-[0.08em] text-white/18">
        {label}
      </p>

      <p className="mt-[3px] text-[8px] text-white/45">
        {value}
      </p>
    </div>
  );
}

function CharacterSummary({
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
    <Card className="min-h-[94px] p-[12px]">
      <div className="flex items-center gap-[4px]">
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

        <span className="ml-[5px] text-[9px] uppercase tracking-[0.1em] text-white/28">
          {label}
        </span>
      </div>

      <p className="mt-[9px] text-[9px] text-white/34">
        {traits.length
          ? traits
              .map(
                (id) =>
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