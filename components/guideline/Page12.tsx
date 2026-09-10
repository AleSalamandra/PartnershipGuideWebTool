"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import GuidelineMediaImage from "./GuidelineMediaImage";
import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";
import RasterGradient from "./RasterGradient";

import type {
  BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import type {
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
    ? value.characterTraits.slice(
        0,
        2
      )
    : [];
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
      0.5,

    warmth:
      0.5,

    grain:
      0.12,

    softness:
      0.22,

    depth:
      0.42,

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
        case "elegant":
          profile.saturation -=
            0.12;
          profile.softness +=
            0.13;
          break;

        case "premium":
          profile.contrast +=
            0.15;
          profile.depth +=
            0.12;
          break;

        case "minimal":
          profile.grain -=
            0.1;
          profile.crop -=
            0.12;
          break;

        case "editorial":
          profile.contrast +=
            0.12;
          profile.crop +=
            0.2;
          break;

        case "technical":
        case "precise":
          profile.softness -=
            0.12;
          profile.contrast +=
            0.08;
          break;

        case "futuristic":
          profile.depth +=
            0.2;
          profile.contrast +=
            0.12;
          break;

        case "experimental":
        case "disruptive":
          profile.crop +=
            0.28;
          profile.contrast +=
            0.16;
          break;

        case "bold":
          profile.contrast +=
            0.25;
          profile.saturation +=
            0.08;
          break;

        case "dynamic":
        case "sporty":
          profile.crop +=
            0.28;
          profile.contrast +=
            0.13;
          break;

        case "energetic":
          profile.saturation +=
            0.25;
          profile.crop +=
            0.2;
          break;

        case "playful":
        case "youthful":
          profile.saturation +=
            0.18;
          break;

        case "friendly":
          profile.warmth +=
            0.18;
          profile.softness +=
            0.12;
          break;

        case "organic":
          profile.warmth +=
            0.18;
          profile.grain +=
            0.12;
          break;

        case "immersive":
          profile.depth +=
            0.35;
          break;

        case "cinematic":
          profile.contrast +=
            0.22;
          profile.grain +=
            0.15;
          profile.depth +=
            0.2;
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
      const field =
        key as keyof ImageProfile;

      profile[
        field
      ] =
        clamp(
          profile[
            field
          ]
        );
    }
  );

  return profile;
}

function blend(
  a:
    ImageProfile,

  b:
    ImageProfile,

  aWeight:
    number
): ImageProfile {
  const bWeight =
    1 -
    aWeight;

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

    depth:
      a.depth *
        aWeight +
      b.depth *
        bWeight,

    crop:
      a.crop *
        aWeight +
      b.crop *
        bWeight,
  };
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

  const model =
    partnershipModel as PartnershipModelId;

  const aProfile =
    buildProfile(
      getTraits(
        brandA
      )
    );

  const bProfile =
    buildProfile(
      getTraits(
        brandB
      )
    );

  const xProfile =
    buildProfile(
      getTraits(
        propertyX
      )
    );

  let profile:
    ImageProfile;

  switch (
    model
  ) {
    case "axb":
      profile =
        blend(
          aProfile,
          bProfile,
          0.5
        );
      break;

    case "aandb":
      profile =
        blend(
          aProfile,
          bProfile,
          0.7
        );
      break;

    case "poweredByA":
      profile =
        blend(
          bProfile,
          aProfile,
          0.9
        );
      break;

    case "presentsB":
    default:
      profile =
        blend(
          aProfile,
          bProfile,
          0.35
        );
      break;
  }

  if (
    additionalRelationship ===
    "presenting"
  ) {
    profile =
      xProfile;
  }

  const expressionBrand =
    additionalRelationship ===
    "presenting"
      ? propertyX
      : model ===
          "poweredByA"
        ? brandB
        : model ===
            "presentsB"
          ? brandB
          : brandA;

  const imageFilter =
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
     brightness(.86)`;

  return (
    <GuidelinePage>
      <header className="absolute left-[70px] right-[70px] top-[46px] flex items-start justify-between">
        <div>
          <p className="text-[13px] uppercase tracking-[0.17em] text-white/30">
            12 / Shared visual territory
          </p>

          <h1 className="mt-[12px] text-[52px] leading-none tracking-[-0.045em] oook-semibold">
            Shared visual territory — footage & image treatment
          </h1>

          <p className="mt-[13px] max-w-[880px] text-[16px] leading-[1.38] text-white/45">
            Character influences grade, contrast, texture and framing while preserving believable source imagery.
          </p>
        </div>

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
      </header>

      <aside className="absolute left-[70px] top-[190px] w-[300px]">
        <Card className="p-[16px]">
          <SectionLabel>
            Image personality
          </SectionLabel>

          <h3 className="mt-[10px] text-[21px] tracking-[-0.03em] text-white/82 oook-medium">
            {profile.contrast >
            0.68
              ? "Punchy"
              : profile.softness >
                  0.5
                ? "Soft"
                : "Balanced"}

            {" · "}

            {profile.saturation >
            0.62
              ? "Vivid"
              : "Restrained"}

            {" · "}

            {profile.depth >
            0.65
              ? "Immersive"
              : "Controlled"}
          </h3>

          <div className="mt-[16px] grid grid-cols-2 gap-[12px]">
            <Metric
              label="Contrast"
              value={
                profile.contrast
              }
            />

            <Metric
              label="Colour"
              value={
                profile.saturation
              }
            />

            <Metric
              label="Warmth"
              value={
                profile.warmth
              }
            />

            <Metric
              label="Texture"
              value={
                profile.grain
              }
            />

            <Metric
              label="Framing"
              value={
                profile.crop
              }
            />

            <Metric
              label="Depth"
              value={
                profile.depth
              }
            />
          </div>
        </Card>
      </aside>

      <section className="absolute left-[395px] right-[70px] top-[190px] grid grid-cols-2 gap-[12px]">
        <Comparison
          good
          title="DO"
        >
          <TreatmentExample
            profile={
              profile
            }
            filter={
              imageFilter
            }
            primary={
              expressionBrand.primaryColor
            }
            secondary={
              expressionBrand.secondaryColor
            }
          />
        </Comparison>

        <Comparison
          title="DON'T"
        >
          <BadTreatment
            aProfile={
              aProfile
            }
            bProfile={
              bProfile
            }
            aColour={
              brandA.primaryColor
            }
            bColour={
              brandB.primaryColor
            }
          />
        </Comparison>
      </section>

      <section className="absolute left-[395px] right-[70px] top-[590px]">
        <SectionLabel>
          Treatment rules
        </SectionLabel>

        <div className="mt-[10px] grid grid-cols-3 gap-[10px]">
          <Rule
            title="Hero footage"
            value={
              profile.crop >
              0.6
                ? "Kinetic framing"
                : "Stable framing"
            }
          />

          <Rule
            title="Photography"
            value={
              profile.grain >
              0.42
                ? "Fine texture"
                : "Clean surface"
            }
          />

          <Rule
            title="Colour"
            value={
              profile.saturation >
              0.62
                ? "Rich"
                : "Controlled"
            }
          />
        </div>
      </section>

      <footer className="absolute bottom-[24px] left-[70px] right-[70px] flex justify-between border-t border-white/[0.06] pt-[9px] text-[9px] text-white/24">
        <span>
          User-uploaded footage preserves its original Dark / Light tonal orientation.
        </span>

        <span>
          Character treatment ≠ theme inversion
        </span>
      </footer>
    </GuidelinePage>
  );
}

/* ================================================= */
/* IMAGE EXAMPLE                                     */
/* ================================================= */

function TreatmentExample({
  profile,
  filter,
  primary,
  secondary,
}: {
  profile:
    ImageProfile;

  filter:
    string;

  primary:
    string;

  secondary:
    string;
}) {
  return (
    <>
      <GuidelineMediaImage
        slot={
          4
        }
        treatmentFilter={
          filter
        }
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform:
            `scale(${
              1.03 +
              profile.crop *
                0.08
            })`,
        }}
      />

      <RasterGradient
        direction="horizontal"
        className="absolute inset-0 h-full w-full"
        stops={[
          {
            color:
              "#000000",
            offset: 0,
            opacity:
              0.52,
          },
          {
            color:
              "#000000",
            offset: 55,
            opacity:
              0,
          },
          {
            color:
              "#000000",
            offset: 100,
            opacity:
              0.2,
          },
        ]}
      />

      <RasterGlow
        color={
          secondary
        }
        secondaryColor={
          primary
        }
        opacity={
          0.22
        }
        secondaryOpacity={
          0.05
        }
        centerX={
          76
        }
        centerY={
          20
        }
        className="absolute -right-[80px] -top-[80px] h-[280px] w-[280px]"
      />
    </>
  );
}

/* ================================================= */
/* BAD                                               */
/* ================================================= */

function BadTreatment({
  aProfile,
  bProfile,
  aColour,
  bColour,
}: {
  aProfile:
    ImageProfile;

  bProfile:
    ImageProfile;

  aColour:
    string;

  bColour:
    string;
}) {
  const aFilter =
    `contrast(${
      0.8 +
      aProfile.contrast *
        0.65
    }) saturate(${
      0.5 +
      aProfile.saturation *
        1.3
    })`;

  const bFilter =
    `contrast(${
      0.8 +
      bProfile.contrast *
        0.65
    }) saturate(${
      0.5 +
      bProfile.saturation *
        1.3
    })`;

  return (
    <>
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
        <GuidelineMediaImage
          slot={
            4
          }
          treatmentFilter={
            aFilter
          }
          className="h-full w-full object-cover"
        />

        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundColor:
              aColour,
          }}
        />
      </div>

      <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
        <GuidelineMediaImage
          slot={
            4
          }
          treatmentFilter={
            bFilter
          }
          className="h-full w-full object-cover"
        />

        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundColor:
              bColour,
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
    <div className={`rounded-[18px] border border-white/[0.07] bg-white/[0.018] ${className}`}>
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
}: {
  label:
    string;

  value:
    number;
}) {
  return (
    <div>
      <p className="text-[7px] uppercase tracking-[0.1em] text-white/24">
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
    </div>
  );
}

function Comparison({
  good = false,
  title,
  children,
}: {
  good?:
    boolean;

  title:
    string;

  children:
    ReactNode;
}) {
  return (
    <Card className="p-[13px]">
      <div className="flex items-center gap-[8px]">
        <span
          className={
            good
              ? "flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white text-[11px] text-black"
              : "flex h-[24px] w-[24px] items-center justify-center rounded-full border border-white/12 text-[11px] text-white/40"
          }
        >
          {good
            ? "✓"
            : "×"}
        </span>

        <span className="text-[14px] text-white/72 oook-medium">
          {title}
        </span>
      </div>

      <div className="relative mt-[10px] h-[305px] overflow-hidden rounded-[13px] border border-white/[0.06] bg-[#050506]">
        {children}
      </div>
    </Card>
  );
}

function Rule({
  title,
  value,
}: {
  title:
    string;

  value:
    string;
}) {
  return (
    <Card className="p-[13px]">
      <p className="text-[8px] uppercase tracking-[0.12em] text-white/22">
        {title}
      </p>

      <p className="mt-[7px] text-[12px] text-white/58">
        {value}
      </p>
    </Card>
  );
}