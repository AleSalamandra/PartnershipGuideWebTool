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
  diagonal: number;
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

function getBrandView(
  brand: unknown,
  fallbackName: string,
  fallbackPrimary: string,
  fallbackSecondary: string
): BrandView {
  const value =
    brand as {
      name?: string;

      logoUrl?: string | null;

      primaryColor?: string;
      secondaryColor?: string;

      fontFamily?: string;

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
    roundness: 0.45,
    energy: 0.35,
    depth: 0.4,
    glow: 0.2,
    texture: 0.14,
    precision: 0.55,
    organic: 0.2,
    minimal: 0.5,
    diagonal: 0.12,
  };

  traits.forEach(
    (trait) => {
      switch (trait) {
        case "classic":
          profile.precision += 0.18;
          profile.energy -= 0.08;
          profile.diagonal -= 0.05;
          profile.organic -= 0.08;
          break;

        case "elegant":
          profile.minimal += 0.22;
          profile.energy -= 0.12;
          profile.glow += 0.04;
          profile.roundness += 0.05;
          break;

        case "premium":
          profile.minimal += 0.18;
          profile.depth += 0.16;
          profile.glow += 0.08;
          profile.texture += 0.08;
          break;

        case "minimal":
          profile.minimal += 0.32;
          profile.texture -= 0.1;
          profile.glow -= 0.05;
          profile.energy -= 0.08;
          break;

        case "editorial":
          profile.precision += 0.18;
          profile.minimal += 0.06;
          profile.diagonal += 0.05;
          break;

        case "technical":
          profile.precision += 0.3;
          profile.depth += 0.08;
          profile.glow += 0.08;
          break;

        case "precise":
          profile.precision += 0.34;
          profile.organic -= 0.16;
          profile.diagonal -= 0.08;
          break;

        case "futuristic":
          profile.depth += 0.28;
          profile.glow += 0.3;
          profile.texture += 0.05;
          break;

        case "experimental":
          profile.organic += 0.2;
          profile.diagonal += 0.2;
          profile.energy += 0.12;
          profile.texture += 0.12;
          break;

        case "disruptive":
          profile.energy += 0.28;
          profile.diagonal += 0.34;
          profile.minimal -= 0.08;
          break;

        case "bold":
          profile.energy += 0.18;
          profile.minimal -= 0.08;
          break;

        case "dynamic":
          profile.energy += 0.3;
          profile.diagonal += 0.3;
          break;

        case "energetic":
          profile.energy += 0.4;
          profile.glow += 0.12;
          profile.texture += 0.08;
          break;

        case "playful":
          profile.roundness += 0.34;
          profile.organic += 0.18;
          profile.energy += 0.15;
          break;

        case "youthful":
          profile.energy += 0.2;
          profile.roundness += 0.12;
          break;

        case "friendly":
          profile.roundness += 0.32;
          profile.organic += 0.12;
          profile.energy -= 0.04;
          break;

        case "organic":
          profile.organic += 0.5;
          profile.roundness += 0.18;
          profile.texture += 0.16;
          profile.precision -= 0.12;
          break;

        case "immersive":
          profile.depth += 0.42;
          profile.glow += 0.18;
          break;

        case "cinematic":
          profile.depth += 0.3;
          profile.texture += 0.18;
          profile.glow += 0.12;
          profile.energy -= 0.05;
          break;

        case "sporty":
          profile.energy += 0.38;
          profile.diagonal += 0.36;
          profile.precision += 0.08;
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

    diagonal:
      clamp(
        profile.diagonal
      ),
  };
}

/* ------------------------------------------------ */
/* BLEND                                            */
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

    diagonal:
      a.diagonal *
        aWeight +
      b.diagonal *
        bWeight,
  };
}

function getSharedProfile(
  model:
    PartnershipModelId,

  a: SceneProfile,
  b: SceneProfile
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
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page13() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } = useGuidelineStore();

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
          model={model}
          brandAName={
            a.name
          }
          brandBName={
            b.name
          }
        />
      </header>

      {/* ================================================= */}
      {/* LARGE BRANDING EXAMPLE                            */}
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
                24}px`,
          }}
        >
          <BackgroundImage
            model={model}
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

          {/* ------------------------------------------ */}
          {/* MODEL-SPECIFIC BRANDING                    */}
          {/* ------------------------------------------ */}

          {model ===
            "axb" && (
            <AXBExample
              brandA={a}
              brandB={b}
              profile={
                sharedProfile
              }
            />
          )}

          {model ===
            "aandb" && (
            <AAndBExample
              brandA={a}
              brandB={b}
              profile={
                sharedProfile
              }
            />
          )}

          {model ===
            "poweredByA" && (
            <PoweredByExample
              brandA={a}
              brandB={b}
              profile={
                bProfile
              }
            />
          )}

          {model ===
            "presentsB" && (
            <PresentsExample
              brandA={a}
              brandB={b}
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

  brandAName: string;
  brandBName: string;
}) {
  const label =
    model === "axb"
      ? `${brandAName} × ${brandBName}`
      : model === "aandb"
        ? `${brandAName} with ${brandBName}`
        : model === "poweredByA"
          ? `${brandBName} powered by ${brandAName}`
          : `${brandAName} presents ${brandBName}`;

  return (
    <div
      className="
        max-w-[300px]

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
/* BACKGROUND IMAGE                                 */
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
              current + 1
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
/* GLOBAL TREATMENT                                 */
/* ------------------------------------------------ */

function SceneTreatment({
  profile,

  brandAColor,
  brandBColor,
}: {
  profile:
    SceneProfile;

  brandAColor: string;
  brandBColor: string;
}) {
  return (
    <>
      {/* DARK GRADE */}

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

      {/* DEPTH */}

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

      {/* BRAND A GLOW */}

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

      {/* BRAND B GLOW */}

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

      {/* TEXTURE */}

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
      {/* TOP LOCKUP */}

      <div
        className="
          absolute

          left-[42px]
          top-[38px]

          flex
          items-center

          gap-[18px]
        "
      >
        <BrandIdentity
          brand={brandA}
          maxWidth={126}
        />

        <span
          className="
            text-[20px]

            text-white/48
          "
        >
          ×
        </span>

        <BrandIdentity
          brand={brandB}
          maxWidth={126}
        />
      </div>

      {/* SHARED GRAPHIC LINES */}

      <AccentLines
        colourA={
          brandA.primaryColor
        }
        colourB={
          brandB.primaryColor
        }
        profile={profile}
      />

      {/* HERO COPY */}

      <div
        className="
          absolute

          bottom-[120px]
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
          One visual system, one shared
          experience, equal brand presence.
        </p>
      </div>

      <SharedLowerThird
        brandA={brandA}
        brandB={brandB}
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
      {/* A HERO BRAND */}

      <div
        className="
          absolute

          left-[42px]
          top-[38px]
        "
      >
        <BrandIdentity
          brand={brandA}
          maxWidth={155}
        />

        <div
          className="
            mt-[12px]

            flex
            items-center

            gap-[7px]
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.14em]

              text-white/30
            "
          >
            with
          </span>

          <BrandIdentity
            brand={brandB}
            maxWidth={72}
            compact
          />
        </div>
      </div>

      {/* A GRAPHIC SYSTEM */}

      <DominantFrame
        profile={profile}
        colour={
          brandA.primaryColor
        }
      />

      {/* HERO */}

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

      {/* SECONDARY B ACCENT */}

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
      {/* B MAIN BRAND */}

      <div
        className="
          absolute

          left-[42px]
          top-[38px]
        "
      >
        <BrandIdentity
          brand={brandB}
          maxWidth={165}
        />
      </div>

      <DynamicGraphic
        profile={profile}
        colour={
          brandB.primaryColor
        }
      />

      {/* HERO */}

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
          The consumer-facing experience
          remains unmistakably {brandB.name}.
        </p>
      </div>

      {/* POWERED BY */}

      <div
        className="
          absolute

          right-[42px]
          top-[38px]

          flex
          items-center

          gap-[9px]

          rounded-full

          border
          border-white/[0.09]

          bg-black/38

          px-[12px]
          py-[9px]

          backdrop-blur-[12px]
        "
      >
        <span
          className="
            text-[9px]
            uppercase
            tracking-[0.12em]

            text-white/30
          "
        >
          Powered by
        </span>

        <BrandIdentity
          brand={brandA}
          maxWidth={70}
          compact
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
      {/* A PLATFORM CHROME                        */}
      {/* ======================================== */}

      <div
        className="
          absolute

          left-[28px]
          right-[28px]
          top-[26px]

          flex
          h-[62px]

          items-center

          border
          border-white/[0.09]

          bg-black/42

          px-[18px]

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
          brand={brandA}
          maxWidth={108}
        />

        <div
          className="
            ml-[20px]

            h-[20px]
            w-px

            bg-white/[0.09]
          "
        />

        <span
          className="
            ml-[20px]

            text-[10px]
            uppercase
            tracking-[0.14em]

            text-white/32
          "
        >
          Presents
        </span>

        <div
          className="
            ml-auto

            flex
            items-center

            gap-[18px]

            text-[10px]

            text-white/33
          "
        >
          <span>Live</span>
          <span>Highlights</span>
          <span>Explore</span>
        </div>
      </div>

      {/* ======================================== */}
      {/* B CONTENT CARD                           */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[32px]
          left-[32px]
          right-[32px]
          top-[108px]

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
        {/* INNER DARKENING */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r

            from-black/62
            via-black/20
            to-transparent
          "
        />

        {/* B EXPRESSION */}

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

        <div
          className="
            absolute

            bottom-[56px]
            left-[38px]

            max-w-[710px]
          "
        >
          <div
            className="
              mb-[15px]

              flex
              items-center

              gap-[9px]
            "
          >
            <BrandIdentity
              brand={brandB}
              maxWidth={130}
            />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.13em]

                text-white/30
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

              max-w-[580px]

              text-[15px]
              leading-[1.4]

              text-white/52
            "
          >
            {brandB.name} owns the featured
            visual expression while {brandA.name}
            remains the presentation layer.
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
  maxWidth,
  compact = false,
}: {
  brand:
    BrandView;

  maxWidth: number;

  compact?: boolean;
}) {
  if (
    brand.logoUrl
  ) {
    return (
      <img
        src={
          brand.logoUrl
        }
        alt=""

        draggable={false}

        className="
          block

          object-contain

          drop-shadow-[0_3px_18px_rgba(0,0,0,0.35)]
        "

        style={{
          maxWidth,

          maxHeight:
            compact
              ? 21
              : 32,
        }}
      />
    );
  }

  return (
    <span
      className={`
        whitespace-nowrap

        text-white

        ${
          compact
            ? "text-[13px]"
            : "text-[19px]"
        }
      `}
      style={{
        fontFamily:
          brand.fontFamily,
      }}
    >
      {brand.name}
    </span>
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

        bottom-[42px]
        left-[42px]

        flex
        items-center

        gap-[10px]

        rounded-[12px]

        border
        border-white/[0.09]

        bg-black/48

        px-[13px]
        py-[10px]

        backdrop-blur-[14px]
      "
    >
      <BrandIdentity
        brand={brandA}
        maxWidth={68}
        compact
      />

      <span
        className="
          text-[10px]

          text-white/26
        "
      >
        ×
      </span>

      <BrandIdentity
        brand={brandB}
        maxWidth={68}
        compact
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
  colourA: string;
  colourB: string;

  profile:
    SceneProfile;
}) {
  const rotation =
    profile.diagonal *
    12;

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
          `rotate(${rotation}deg)`,
      }}
    >
      {[86, 62, 100, 48].map(
        (
          width,
          index
        ) => (
          <div
            key={index}
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

  colour: string;
}) {
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
          `rotate(${
            profile.diagonal *
            8
          }deg)`,

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

  colour: string;
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
      style={{
        transform:
          `rotate(${
            profile.diagonal *
            8
          }deg)`,
      }}
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
            key={index}
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
  accent: string;
  secondary: string;
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

function DataItem({
  label,
  value,
  colour,
}: {
  label: string;
  value: string;
  colour: string;
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