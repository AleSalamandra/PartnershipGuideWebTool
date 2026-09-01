"use client";

import {
  useEffect,
  useState,
} from "react";

import GuidelinePage from "./GuidelinePage";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

import type {
  BrandCharacterTraitId,
} from "@/data/brandCharacterTraits";

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

interface SceneProfile {
  roundness: number;

  energy: number;

  depth: number;

  glow: number;

  texture: number;

  precision: number;

  organic: number;

  minimal: number;

  expressiveTilt: number;
}

interface BrandView {
  name: string;

  logoUrl: string | null;

  primaryColor: string;

  secondaryColor: string;

  fontFamily: string;

  characterTraits:
    BrandCharacterTraitId[];
}

interface BrandIdentityProps {
  brand: BrandView;

  width: number;

  height: number;

  scale?: number;

  textSize?: number;

  align?:
    | "left"
    | "center"
    | "right";
}

/* ------------------------------------------------ */
/* DEFAULTS                                         */
/* ------------------------------------------------ */

const DEFAULT_FONT =
  '"oook-variable", sans-serif';

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
    typeof value !==
    "string"
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
      safe.replace(
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
  } = hexToRgb(
    colour
  );

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/* ------------------------------------------------ */
/* BRAND DATA                                       */
/* ------------------------------------------------ */

function getBrandView(
  brand: unknown,

  fallbackName: string,

  fallbackPrimary: string,

  fallbackSecondary: string
): BrandView {
  const value =
    brand as {
      name?: string;

      logoUrl?:
        string | null;

      primaryColor?:
        string;

      secondaryColor?:
        string;

      fontFamily?:
        string;

      characterTraits?:
        BrandCharacterTraitId[];
    };

  return {
    name:
      value.name?.trim() ||
      fallbackName,

    logoUrl:
      value.logoUrl ??
      null,

    primaryColor:
      normalizeHex(
        value.primaryColor,
        fallbackPrimary
      ),

    secondaryColor:
      normalizeHex(
        value.secondaryColor,
        fallbackSecondary
      ),

    fontFamily:
      value.fontFamily ||
      DEFAULT_FONT,

    characterTraits:
      Array.isArray(
        value.characterTraits
      )
        ? value.characterTraits
        : [],
  };
}

/* ------------------------------------------------ */
/* CHARACTER → SCENE PROFILE                        */
/* ------------------------------------------------ */

function buildSceneProfile(
  traits:
    BrandCharacterTraitId[]
): SceneProfile {
  const profile:
    SceneProfile = {
    roundness: 0.42,

    energy: 0.32,

    depth: 0.4,

    glow: 0.18,

    texture: 0.12,

    precision: 0.58,

    organic: 0.18,

    minimal: 0.52,

    expressiveTilt: 0,
  };

  traits.forEach(
    (trait) => {
      switch (trait) {
        case "classic":
          profile.precision +=
            0.2;

          profile.energy -=
            0.08;

          profile.organic -=
            0.08;

          break;

        case "elegant":
          profile.minimal +=
            0.22;

          profile.energy -=
            0.12;

          profile.glow +=
            0.04;

          profile.roundness +=
            0.04;

          break;

        case "premium":
          profile.minimal +=
            0.18;

          profile.depth +=
            0.16;

          profile.glow +=
            0.08;

          profile.texture +=
            0.07;

          break;

        case "minimal":
          profile.minimal +=
            0.32;

          profile.texture -=
            0.1;

          profile.glow -=
            0.05;

          profile.energy -=
            0.08;

          break;

        case "editorial":
          profile.precision +=
            0.2;

          profile.minimal +=
            0.06;

          break;

        case "technical":
          profile.precision +=
            0.3;

          profile.depth +=
            0.08;

          profile.glow +=
            0.07;

          break;

        case "precise":
          profile.precision +=
            0.34;

          profile.organic -=
            0.16;

          profile.expressiveTilt -=
            0.2;

          break;

        case "futuristic":
          profile.depth +=
            0.28;

          profile.glow +=
            0.3;

          profile.texture +=
            0.05;

          break;

        case "immersive":
          profile.depth +=
            0.42;

          profile.glow +=
            0.18;

          break;

        case "cinematic":
          profile.depth +=
            0.3;

          profile.texture +=
            0.18;

          profile.glow +=
            0.12;

          profile.energy -=
            0.05;

          break;

        case "bold":
          profile.energy +=
            0.18;

          profile.minimal -=
            0.08;

          break;

        case "dynamic":
          profile.energy +=
            0.3;

          break;

        case "energetic":
          profile.energy +=
            0.4;

          profile.glow +=
            0.12;

          profile.texture +=
            0.08;

          break;

        case "sporty":
          profile.energy +=
            0.38;

          profile.precision +=
            0.08;

          break;

        case "youthful":
          profile.energy +=
            0.2;

          profile.roundness +=
            0.12;

          break;

        case "friendly":
          profile.roundness +=
            0.32;

          profile.organic +=
            0.12;

          profile.energy -=
            0.04;

          break;

        case "organic":
          profile.organic +=
            0.5;

          profile.roundness +=
            0.18;

          profile.texture +=
            0.16;

          profile.precision -=
            0.12;

          break;

        case "playful":
          profile.roundness +=
            0.34;

          profile.organic +=
            0.18;

          profile.energy +=
            0.15;

          profile.expressiveTilt +=
            0.85;

          break;

        case "experimental":
          profile.organic +=
            0.2;

          profile.energy +=
            0.12;

          profile.texture +=
            0.12;

          profile.expressiveTilt +=
            0.72;

          break;

        case "disruptive":
          profile.energy +=
            0.28;

          profile.minimal -=
            0.08;

          profile.expressiveTilt +=
            0.58;

          break;
      }
    }
  );

  return {
    roundness:
      clamp(
        profile.roundness
      ),

    energy:
      clamp(
        profile.energy
      ),

    depth:
      clamp(
        profile.depth
      ),

    glow:
      clamp(
        profile.glow
      ),

    texture:
      clamp(
        profile.texture
      ),

    precision:
      clamp(
        profile.precision
      ),

    organic:
      clamp(
        profile.organic
      ),

    minimal:
      clamp(
        profile.minimal
      ),

    expressiveTilt:
      clamp(
        profile.expressiveTilt
      ),
  };
}

/* ------------------------------------------------ */
/* BLEND PROFILES                                   */
/* ------------------------------------------------ */

function blendProfiles(
  a: SceneProfile,

  b: SceneProfile,

  aWeight: number
): SceneProfile {
  const bWeight =
    1 - aWeight;

  return {
    roundness:
      a.roundness *
        aWeight +
      b.roundness *
        bWeight,

    energy:
      a.energy *
        aWeight +
      b.energy *
        bWeight,

    depth:
      a.depth *
        aWeight +
      b.depth *
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

    precision:
      a.precision *
        aWeight +
      b.precision *
        bWeight,

    organic:
      a.organic *
        aWeight +
      b.organic *
        bWeight,

    minimal:
      a.minimal *
        aWeight +
      b.minimal *
        bWeight,

    expressiveTilt:
      a.expressiveTilt *
        aWeight +
      b.expressiveTilt *
        bWeight,
  };
}

/* ------------------------------------------------ */
/* PARTNERSHIP PROFILE                              */
/* ------------------------------------------------ */

function getSharedProfile(
  model:
    PartnershipModelId,

  a:
    SceneProfile,

  b:
    SceneProfile
) {
  switch (model) {
    case "axb":
      return blendProfiles(
        a,
        b,
        0.5
      );

    case "aandb":
      return blendProfiles(
        a,
        b,
        0.7
      );

    case "poweredByA":
      return blendProfiles(
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
/* EXPRESSIVE ROTATION                              */
/* ------------------------------------------------ */

function getExpressiveRotation(
  profile:
    SceneProfile,

  maxDegrees = 6
) {
  if (
    profile.expressiveTilt <
    0.45
  ) {
    return 0;
  }

  const amount =
    (
      profile.expressiveTilt -
      0.45
    ) /
    0.55;

  return (
    clamp(
      amount
    ) *
    maxDegrees
  );
}

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page13() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } =
    useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

  const a =
    getBrandView(
      brandA,
      "Brand A",
      "#FF453A",
      "#FF8A80"
    );

  const b =
    getBrandView(
      brandB,
      "Brand B",
      "#3478F6",
      "#64D2FF"
    );

  const aProfile =
    buildSceneProfile(
      a.characterTraits
    );

  const bProfile =
    buildSceneProfile(
      b.characterTraits
    );

  const sharedProfile =
    getSharedProfile(
      model,
      aProfile,
      bProfile
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
        <div>
          <p
            className="
              text-[13px]
              uppercase
              tracking-[0.17em]

              text-white/30
            "
          >
            13 / Shared visual territory
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
            Complete shared branding example
          </h1>

          <p
            className="
              mt-[13px]

              max-w-[820px]

              text-[16px]
              leading-[1.38]

              text-white/45
            "
          >
            A complete application of hierarchy,
            colour, typography, graphic language,
            image treatment and brand character.
          </p>
        </div>

        <ModelLabel
          model={
            model
          }

          brandAName={
            a.name
          }

          brandBName={
            b.name
          }
        />
      </header>

      {/* ================================================= */}
      {/* HERO                                              */}
      {/* ================================================= */}

      <section
        className="
          absolute

          bottom-[58px]
          left-[70px]
          right-[70px]
          top-[185px]
        "
      >
        <div
          className="
            relative

            h-full
            w-full

            overflow-hidden

            border
            border-white/[0.08]

            bg-[#050506]
          "
          style={{
            borderRadius:
              `${12 +
              sharedProfile.roundness *
                22}px`,
          }}
        >
          <BackgroundImage
            model={
              model
            }

            profile={
              model ===
              "poweredByA"
                ? bProfile
                : model ===
                    "presentsB"
                  ? bProfile
                  : sharedProfile
            }
          />

          <SceneTreatment
            profile={
              sharedProfile
            }

            brandAColor={
              a.primaryColor
            }

            brandBColor={
              b.primaryColor
            }
          />

          {model ===
            "axb" && (
            <AXBExample
              brandA={
                a
              }

              brandB={
                b
              }

              profile={
                sharedProfile
              }
            />
          )}

          {model ===
            "aandb" && (
            <AAndBExample
              brandA={
                a
              }

              brandB={
                b
              }

              profile={
                sharedProfile
              }
            />
          )}

          {model ===
            "poweredByA" && (
            <PoweredByExample
              brandA={
                a
              }

              brandB={
                b
              }

              profile={
                bProfile
              }
            />
          )}

          {model ===
            "presentsB" && (
            <PresentsExample
              brandA={
                a
              }

              brandB={
                b
              }

              brandAProfile={
                aProfile
              }

              brandBProfile={
                bProfile
              }
            />
          )}
        </div>
      </section>

      {/* ================================================= */}
      {/* FOOTER                                            */}
      {/* ================================================= */}

      <div
        className="
          absolute

          bottom-[24px]
          left-[70px]
          right-[70px]

          flex
          items-center
          justify-between
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.13em]

            text-white/22
          "
        >
          Full application sample
        </p>

        <p
          className="
            text-[10px]

            text-white/26
          "
        >
          Image · colour · type · graphic language · hierarchy
        </p>
      </div>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* MODEL LABEL                                      */
/* ------------------------------------------------ */

function ModelLabel({
  model,

  brandAName,
  brandBName,
}: {
  model:
    PartnershipModelId;

  brandAName:
    string;

  brandBName:
    string;
}) {
  const label =
    model === "axb"
      ? `${brandAName} × ${brandBName}`

      : model === "aandb"
        ? `${brandAName} with ${brandBName}`

        : model ===
            "poweredByA"
          ? `${brandBName} powered by ${brandAName}`

          : `${brandAName} presents ${brandBName}`;

  return (
    <div
      className="
        max-w-[320px]

        text-right
      "
    >
      <p
        className="
          text-[9px]
          uppercase
          tracking-[0.15em]

          text-white/22
        "
      >
        Partnership model
      </p>

      <p
        className="
          mt-[6px]

          text-[17px]
          leading-[1.25]

          text-white/58

          oook-medium
        "
      >
        {label}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* BACKGROUND                                       */
/* ------------------------------------------------ */

function BackgroundImage({
  model,
  profile,
}: {
  model:
    PartnershipModelId;

  profile:
    SceneProfile;
}) {
  const imageNumber =
    model === "axb"
      ? 3

      : model === "aandb"
        ? 4

        : model ===
            "poweredByA"
          ? 7

          : 9;

  const [
    extensionIndex,
    setExtensionIndex,
  ] =
    useState(0);

  const extensions = [
    "jpg",
    "jpeg",
    "png",
    "webp",
  ];

  useEffect(
    () => {
      setExtensionIndex(
        0
      );
    },
    [
      imageNumber,
    ]
  );

  const extension =
    extensions[
      extensionIndex
    ];

  const contrast =
    0.88 +
    profile.precision *
      0.28;

  const saturation =
    0.65 +
    profile.energy *
      0.45;

  const brightness =
    0.68 +
    profile.minimal *
      0.12;

  const scale =
    1.04 +
    profile.energy *
      0.06;

  return (
    <img
      src={`/images/image${imageNumber}.${extension}`}

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
          `grayscale(0.22)
          contrast(${contrast})
          saturate(${saturation})
          brightness(${brightness})`,

        transform:
          `scale(${scale})`,
      }}
    />
  );
}

/* ------------------------------------------------ */
/* TREATMENT                                        */
/* ------------------------------------------------ */

function SceneTreatment({
  profile,

  brandAColor,
  brandBColor,
}: {
  profile:
    SceneProfile;

  brandAColor:
    string;

  brandBColor:
    string;
}) {
  return (
    <>
      <div
        className="
          pointer-events-none

          absolute
          inset-0
        "
        style={{
          background:
            `linear-gradient(
              90deg,
              rgba(0,0,0,0.82) 0%,
              rgba(0,0,0,0.38) 43%,
              rgba(0,0,0,0.10) 72%,
              rgba(0,0,0,0.30) 100%
            )`,
        }}
      />

      <div
        className="
          pointer-events-none

          absolute
          inset-0
        "
        style={{
          background:
            `radial-gradient(
              circle at 68% 35%,
              transparent 20%,
              rgba(0,0,0,${
                0.18 +
                profile.depth *
                  0.24
              }) 100%
            )`,
        }}
      />

      {profile.glow >
        0.18 && (
        <div
          className="
            pointer-events-none

            absolute

            -left-[8%]
            -top-[30%]

            h-[70%]
            w-[45%]

            rounded-full

            blur-[100px]
          "
          style={{
            backgroundColor:
              alpha(
                brandAColor,
                profile.glow *
                  0.14
              ),
          }}
        />
      )}

      {profile.glow >
        0.35 && (
        <div
          className="
            pointer-events-none

            absolute

            -bottom-[28%]
            right-[4%]

            h-[65%]
            w-[38%]

            rounded-full

            blur-[110px]
          "
          style={{
            backgroundColor:
              alpha(
                brandBColor,
                profile.glow *
                  0.12
              ),
          }}
        />
      )}

      {profile.texture >
        0.18 && (
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
              0.12,

            backgroundImage:
              "repeating-linear-gradient(0deg,rgba(255,255,255,0.08) 0px,rgba(255,255,255,0.08) 1px,transparent 1px,transparent 3px)",
          }}
        />
      )}
    </>
  );
}

/* ------------------------------------------------ */
/* A × B                                            */
/* ------------------------------------------------ */

function AXBExample({
  brandA,
  brandB,
  profile,
}: {
  brandA:
    BrandView;

  brandB:
    BrandView;

  profile:
    SceneProfile;
}) {
  return (
    <>
      {/* ======================================== */}
      {/* HERO BRAND LOCKUP                        */}
      {/* ======================================== */}

      <div
        className="
          absolute

          left-[42px]
          top-[34px]

          flex
          items-center

          gap-[20px]
        "
      >
        <BrandIdentity
          brand={
            brandA
          }

          width={175}
          height={48}

          scale={1.08}

          textSize={25}
        />

        <span
          className="
            mx-[2px]

            text-[24px]

            text-white/44
          "
        >
          ×
        </span>

        <BrandIdentity
          brand={
            brandB
          }

          width={175}
          height={48}

          scale={1.08}

          textSize={25}
        />
      </div>

      <AccentLines
        colourA={
          brandA.primaryColor
        }

        colourB={
          brandB.primaryColor
        }

        profile={
          profile
        }
      />

      {/* ======================================== */}
      {/* COPY                                     */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[125px]
          left-[42px]

          max-w-[720px]
        "
      >
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.18em]

            text-white/45
          "
        >
          Shared immersive experience
        </p>

        <h2
          className="
            mt-[10px]

            text-[54px]
            leading-[0.95]
            tracking-[-0.045em]

            text-white

            oook-semibold
          "
        >
          Experience the moment
          from inside.
        </h2>

        <p
          className="
            mt-[14px]

            max-w-[590px]

            text-[15px]
            leading-[1.4]

            text-white/52
          "
        >
          One visual system, one shared experience,
          equal brand presence.
        </p>
      </div>

      <SharedLowerThird
        brandA={
          brandA
        }

        brandB={
          brandB
        }
      />

      <CTA
        label="Enter experience"

        colour={
          brandA.primaryColor
        }
      />
    </>
  );
}

/* ------------------------------------------------ */
/* A WITH B                                         */
/* ------------------------------------------------ */

function AAndBExample({
  brandA,
  brandB,
  profile,
}: {
  brandA:
    BrandView;

  brandB:
    BrandView;

  profile:
    SceneProfile;
}) {
  return (
    <>
      {/* ======================================== */}
      {/* BRAND HIERARCHY                           */}
      {/* ======================================== */}

      <div
        className="
          absolute

          left-[42px]
          top-[32px]
        "
      >
        {/* A = LEAD */}

        <BrandIdentity
          brand={
            brandA
          }

          width={215}
          height={56}

          scale={1.08}

          textSize={29}
        />

        {/* B = SECONDARY */}

        <div
          className="
            mt-[15px]

            flex
            items-center

            gap-[10px]
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.14em]

              text-white/34
            "
          >
            with
          </span>

          <BrandIdentity
            brand={
              brandB
            }

            width={105}
            height={30}

            scale={1.06}

            textSize={16}
          />
        </div>
      </div>

      <DominantFrame
        profile={
          profile
        }

        colour={
          brandA.primaryColor
        }
      />

      <div
        className="
          absolute

          bottom-[112px]
          left-[42px]

          max-w-[700px]
        "
      >
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.18em]

            text-white/42
          "
        >
          A curated experience
        </p>

        <h2
          className="
            mt-[10px]

            text-[56px]
            leading-[0.94]
            tracking-[-0.045em]

            text-white
          "
          style={{
            fontFamily:
              brandA.fontFamily,
          }}
        >
          See the event
          differently.
        </h2>
      </div>

      <div
        className="
          absolute

          right-[44px]
          top-[42px]

          h-[7px]
          w-[56px]

          rounded-full
        "
        style={{
          backgroundColor:
            brandB.primaryColor,
        }}
      />

      <DataPanel
        accent={
          brandA.primaryColor
        }

        secondary={
          brandB.primaryColor
        }
      />

      <CTA
        label="Explore now"

        colour={
          brandA.primaryColor
        }
      />
    </>
  );
}

/* ------------------------------------------------ */
/* POWERED BY                                       */
/* ------------------------------------------------ */

function PoweredByExample({
  brandA,
  brandB,
  profile,
}: {
  brandA:
    BrandView;

  brandB:
    BrandView;

  profile:
    SceneProfile;
}) {
  return (
    <>
      {/* ======================================== */}
      {/* B MAIN IDENTITY                          */}
      {/* ======================================== */}

      <div
        className="
          absolute

          left-[42px]
          top-[32px]
        "
      >
        <BrandIdentity
          brand={
            brandB
          }

          width={240}
          height={62}

          scale={1.1}

          textSize={31}
        />
      </div>

      <DynamicGraphic
        profile={
          profile
        }

        colour={
          brandB.primaryColor
        }
      />

      {/* ======================================== */}
      {/* HERO COPY                                */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[112px]
          left-[42px]

          max-w-[760px]
        "
      >
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.18em]

            text-white/44
          "
        >
          Live immersive coverage
        </p>

        <h2
          className="
            mt-[10px]

            text-[56px]
            leading-[0.94]
            tracking-[-0.045em]

            text-white
          "
          style={{
            fontFamily:
              brandB.fontFamily,
          }}
        >
          Feel closer to
          every moment.
        </h2>

        <p
          className="
            mt-[14px]

            max-w-[600px]

            text-[15px]
            leading-[1.4]

            text-white/52
          "
        >
          The consumer-facing experience remains
          unmistakably {brandB.name}.
        </p>
      </div>

      {/* ======================================== */}
      {/* POWERED BY ENDORSEMENT                   */}
      {/* ======================================== */}

      <div
        className="
          absolute

          right-[38px]
          top-[34px]

          flex
          min-h-[54px]

          items-center

          gap-[11px]

          rounded-[15px]

          border
          border-white/[0.10]

          bg-black/46

          px-[15px]
          py-[10px]

          backdrop-blur-[14px]
        "
      >
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.12em]

            text-white/38
          "
        >
          Powered by
        </span>

        <BrandIdentity
          brand={
            brandA
          }

          width={105}
          height={30}

          scale={1.08}

          textSize={16}
        />
      </div>

      <CTA
        label="Watch live"

        colour={
          brandB.primaryColor
        }
      />
    </>
  );
}

/* ------------------------------------------------ */
/* PRESENTS                                         */
/* ------------------------------------------------ */

function PresentsExample({
  brandA,
  brandB,

  brandAProfile,
  brandBProfile,
}: {
  brandA:
    BrandView;

  brandB:
    BrandView;

  brandAProfile:
    SceneProfile;

  brandBProfile:
    SceneProfile;
}) {
  return (
    <>
      {/* ======================================== */}
      {/* BRAND A PLATFORM HEADER                  */}
      {/* ======================================== */}

      <div
        className="
          absolute

          left-[28px]
          right-[28px]
          top-[26px]

          flex
          h-[72px]

          items-center

          border
          border-white/[0.09]

          bg-black/46

          px-[20px]

          backdrop-blur-[16px]
        "
        style={{
          borderRadius:
            `${8 +
            brandAProfile.roundness *
              18}px`,
        }}
      >
        <BrandIdentity
          brand={
            brandA
          }

          width={160}
          height={42}

          scale={1.08}

          textSize={22}
        />

        <div
          className="
            ml-[22px]

            h-[25px]
            w-px

            bg-white/[0.10]
          "
        />

        <span
          className="
            ml-[22px]

            text-[10px]
            uppercase
            tracking-[0.14em]

            text-white/38
          "
        >
          Presents
        </span>

        <div
          className="
            ml-auto

            flex
            items-center

            gap-[20px]

            text-[10px]

            text-white/35
          "
        >
          <span>Live</span>
          <span>Highlights</span>
          <span>Explore</span>
        </div>
      </div>

      {/* ======================================== */}
      {/* B FEATURED CONTENT                       */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[32px]
          left-[32px]
          right-[32px]
          top-[114px]

          overflow-hidden

          border
          border-white/[0.08]
        "
        style={{
          borderRadius:
            `${10 +
            brandBProfile.roundness *
              24}px`,
        }}
      >
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r

            from-black/64
            via-black/20
            to-transparent
          "
        />

        <div
          className="
            absolute

            -bottom-[25%]
            right-[4%]

            h-[68%]
            w-[38%]

            rounded-full

            blur-[85px]
          "
          style={{
            backgroundColor:
              alpha(
                brandB.primaryColor,

                0.16 +
                  brandBProfile.glow *
                    0.16
              ),
          }}
        />

        {/* ====================================== */}
        {/* B IDENTITY                             */}
        {/* ====================================== */}

        <div
          className="
            absolute

            bottom-[54px]
            left-[38px]

            max-w-[750px]
          "
        >
          <div
            className="
              mb-[20px]

              flex
              items-center

              gap-[14px]
            "
          >
            <BrandIdentity
              brand={
                brandB
              }

              width={205}
              height={54}

              scale={1.1}

              textSize={28}
            />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.13em]

                text-white/34
              "
            >
              Featured content
            </span>
          </div>

          <h2
            className="
              text-[55px]
              leading-[0.94]
              tracking-[-0.045em]

              text-white
            "
            style={{
              fontFamily:
                brandB.fontFamily,
            }}
          >
            Step into the
            experience.
          </h2>

          <p
            className="
              mt-[14px]

              max-w-[590px]

              text-[15px]
              leading-[1.4]

              text-white/52
            "
          >
            {brandB.name} owns the featured visual
            expression while {brandA.name} remains
            the presentation layer.
          </p>
        </div>

        <CTA
          label="Discover"

          colour={
            brandB.primaryColor
          }

          inset
        />
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* BRAND IDENTITY                                   */
/* ------------------------------------------------ */

function BrandIdentity({
  brand,

  width,
  height,

  scale = 1,

  textSize = 20,

  align = "left",
}: BrandIdentityProps) {
  const justifyContent =
    align === "center"
      ? "center"

      : align === "right"
        ? "flex-end"

        : "flex-start";

  /*
    Real identity slot instead of
    max-width/max-height.

    This makes uploaded logos occupy a
    predictable amount of optical space.
  */

  if (
    brand.logoUrl
  ) {
    return (
      <div
        className="
          flex
          shrink-0

          items-center
        "
        style={{
          width:
            `${width}px`,

          height:
            `${height}px`,

          justifyContent,
        }}
      >
        <img
          src={
            brand.logoUrl
          }

          alt={
            brand.name
          }

          draggable={
            false
          }

          className="
            block

            h-full
            w-full

            object-contain

            drop-shadow-[0_4px_20px_rgba(0,0,0,0.42)]
          "

          style={{
            transform:
              `scale(${scale})`,

            transformOrigin:
              align === "right"
                ? "right center"
                : align === "center"
                  ? "center"
                  : "left center",
          }}
        />
      </div>
    );
  }

  /*
    Text fallback receives the same
    visual importance as an uploaded logo.
  */

  return (
    <div
      className="
        flex
        shrink-0

        items-center
      "
      style={{
        width:
          `${width}px`,

        minHeight:
          `${height}px`,

        justifyContent,
      }}
    >
      <span
        className="
          whitespace-nowrap

          leading-none

          text-white

          oook-medium
        "
        style={{
          fontFamily:
            brand.fontFamily,

          fontSize:
            `${textSize}px`,
        }}
      >
        {brand.name}
      </span>
    </div>
  );
}

/* ------------------------------------------------ */
/* CTA                                              */
/* ------------------------------------------------ */

function CTA({
  label,
  colour,
  inset = false,
}: {
  label: string;

  colour: string;

  inset?: boolean;
}) {
  return (
    <div
      className={`
        absolute

        flex
        items-center

        gap-[12px]

        rounded-full

        border
        border-white/[0.12]

        bg-black/48

        px-[17px]
        py-[11px]

        backdrop-blur-[14px]

        ${
          inset
            ? "bottom-[40px] right-[36px]"
            : "bottom-[42px] right-[42px]"
        }
      `}
    >
      <div
        className="
          h-[7px]
          w-[7px]

          rounded-full
        "
        style={{
          backgroundColor:
            colour,

          boxShadow:
            `0 0 14px ${alpha(
              colour,
              0.6
            )}`,
        }}
      />

      <span
        className="
          text-[11px]

          text-white/72

          oook-medium
        "
      >
        {label}
      </span>

      <span
        className="
          text-[13px]

          text-white/35
        "
      >
        →
      </span>
    </div>
  );
}

/* ------------------------------------------------ */
/* SHARED LOWER THIRD                               */
/* ------------------------------------------------ */

function SharedLowerThird({
  brandA,
  brandB,
}: {
  brandA:
    BrandView;

  brandB:
    BrandView;
}) {
  return (
    <div
      className="
        absolute

        bottom-[38px]
        left-[42px]

        flex
        min-h-[52px]

        items-center

        gap-[13px]

        rounded-[14px]

        border
        border-white/[0.09]

        bg-black/50

        px-[15px]
        py-[9px]

        backdrop-blur-[14px]
      "
    >
      <BrandIdentity
        brand={
          brandA
        }

        width={92}
        height={29}

        scale={1.06}

        textSize={14}
      />

      <span
        className="
          text-[11px]

          text-white/30
        "
      >
        ×
      </span>

      <BrandIdentity
        brand={
          brandB
        }

        width={92}
        height={29}

        scale={1.06}

        textSize={14}
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* ACCENT LINES                                     */
/* ------------------------------------------------ */

function AccentLines({
  colourA,
  colourB,
  profile,
}: {
  colourA:
    string;

  colourB:
    string;

  profile:
    SceneProfile;
}) {
  const rotation =
    getExpressiveRotation(
      profile,
      8
    );

  return (
    <div
      className="
        absolute

        right-[7%]
        top-[20%]

        flex
        w-[26%]

        flex-col

        gap-[10px]
      "
      style={{
        transform:
          rotation === 0
            ? undefined
            : `rotate(${rotation}deg)`,
      }}
    >
      {[
        86,
        62,
        100,
        48,
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

              marginLeft:
                "auto",

              backgroundColor:
                index % 2 ===
                0
                  ? alpha(
                      colourA,
                      0.6
                    )
                  : alpha(
                      colourB,
                      0.6
                    ),
            }}
          />
        )
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* DOMINANT FRAME                                   */
/* ------------------------------------------------ */

function DominantFrame({
  profile,
  colour,
}: {
  profile:
    SceneProfile;

  colour:
    string;
}) {
  const rotation =
    getExpressiveRotation(
      profile,
      6
    );

  return (
    <div
      className="
        absolute

        right-[46px]
        top-[120px]

        h-[245px]
        w-[345px]

        border
      "
      style={{
        borderColor:
          alpha(
            colour,
            0.42
          ),

        borderRadius:
          `${10 +
          profile.roundness *
            45}px`,

        transform:
          rotation === 0
            ? undefined
            : `rotate(${rotation}deg)`,

        boxShadow:
          profile.glow >
          0.35
            ? `0 0 55px ${alpha(
                colour,
                0.16
              )}`
            : undefined,
      }}
    />
  );
}

/* ------------------------------------------------ */
/* DYNAMIC GRAPHIC                                  */
/* ------------------------------------------------ */

function DynamicGraphic({
  profile,
  colour,
}: {
  profile:
    SceneProfile;

  colour:
    string;
}) {
  const count =
    Math.round(
      5 +
        profile.energy *
          7
    );

  return (
    <div
      className="
        absolute

        right-[48px]
        top-[120px]

        flex
        h-[220px]
        w-[340px]

        items-end
        justify-end

        gap-[7px]
      "
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
            key={
              index
            }

            className="
              rounded-full
            "

            style={{
              width:
                4 +
                profile.energy *
                  2,

              height:
                40 +
                ((index *
                  37) %
                  165),

              backgroundColor:
                index % 3 ===
                0
                  ? colour
                  : alpha(
                      colour,
                      0.32
                    ),

              boxShadow:
                profile.glow >
                0.4
                  ? `0 0 18px ${alpha(
                      colour,
                      0.26
                    )}`
                  : undefined,
            }}
          />
        )
      )}
    </div>
  );
}

/* ------------------------------------------------ */
/* DATA PANEL                                       */
/* ------------------------------------------------ */

function DataPanel({
  accent,
  secondary,
}: {
  accent:
    string;

  secondary:
    string;
}) {
  return (
    <div
      className="
        absolute

        bottom-[42px]
        right-[210px]

        grid
        grid-cols-3

        gap-[6px]

        rounded-[12px]

        border
        border-white/[0.08]

        bg-black/45

        p-[7px]

        backdrop-blur-[12px]
      "
    >
      <DataItem
        label="LIVE"
        value="01"
        colour={
          accent
        }
      />

      <DataItem
        label="VIEW"
        value="360°"
        colour={
          secondary
        }
      />

      <DataItem
        label="MODE"
        value="XR"
        colour="#FFFFFF"
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* DATA ITEM                                        */
/* ------------------------------------------------ */

function DataItem({
  label,
  value,
  colour,
}: {
  label:
    string;

  value:
    string;

  colour:
    string;
}) {
  return (
    <div
      className="
        min-w-[58px]

        rounded-[8px]

        border
        border-white/[0.06]

        bg-white/[0.025]

        px-[8px]
        py-[7px]
      "
    >
      <p
        className="
          text-[7px]
          uppercase
          tracking-[0.1em]

          text-white/25
        "
      >
        {label}
      </p>

      <div
        className="
          mt-[3px]

          flex
          items-center

          gap-[5px]
        "
      >
        <div
          className="
            h-[4px]
            w-[4px]

            rounded-full
          "
          style={{
            backgroundColor:
              colour,
          }}
        />

        <p
          className="
            text-[10px]

            text-white/58
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}