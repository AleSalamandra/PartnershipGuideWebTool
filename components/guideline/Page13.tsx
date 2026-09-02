"use client";

import {
  useEffect,
  useState,
} from "react";

import GuidelinePage, {
  useGuidelineThemeStore,
} from "./GuidelinePage";

import PartnershipLockup from "./PartnershipLockup";
import RasterGlow from "./RasterGlow";
import RasterGradient from "./RasterGradient";

import {
  BrandCharacterTraitId,
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

interface BrandView {
  name:
    string;

  logoUrl:
    string | null;

  primaryColor:
    string;

  secondaryColor:
    string;

  fontFamily:
    string;

  characterTraits:
    BrandCharacterTraitId[];
}

interface SceneProfile {
  roundness:
    number;

  energy:
    number;

  glow:
    number;

  depth:
    number;

  expressiveTilt:
    number;
}

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

const DEFAULT_FONT =
  '"oook-variable", sans-serif';

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

function getBrand(
  brand: unknown,

  fallbackName:
    string,

  fallbackPrimary:
    string,

  fallbackSecondary:
    string
): BrandView {
  const value =
    brand as {
      name?:
        string;

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
      safeColour(
        value.primaryColor,
        fallbackPrimary
      ),

    secondaryColor:
      safeColour(
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

function buildProfile(
  traits:
    BrandCharacterTraitId[]
): SceneProfile {
  const p:
    SceneProfile = {
    roundness:
      0.42,

    energy:
      0.32,

    glow:
      0.2,

    depth:
      0.42,

    expressiveTilt:
      0,
  };

  traits.forEach(
    (trait) => {
      switch (trait) {
        case "premium":
        case "cinematic":
          p.depth +=
            0.2;
          p.glow +=
            0.1;
          break;

        case "futuristic":
        case "immersive":
          p.depth +=
            0.3;
          p.glow +=
            0.22;
          break;

        case "dynamic":
        case "sporty":
        case "energetic":
          p.energy +=
            0.3;
          break;

        case "friendly":
        case "organic":
          p.roundness +=
            0.25;
          break;

        case "playful":
          p.roundness +=
            0.3;
          p.energy +=
            0.15;
          p.expressiveTilt +=
            0.8;
          break;

        case "experimental":
          p.expressiveTilt +=
            0.7;
          p.energy +=
            0.14;
          break;

        case "disruptive":
          p.expressiveTilt +=
            0.55;
          p.energy +=
            0.22;
          break;
      }
    }
  );

  return {
    roundness:
      clamp(
        p.roundness
      ),

    energy:
      clamp(
        p.energy
      ),

    glow:
      clamp(
        p.glow
      ),

    depth:
      clamp(
        p.depth
      ),

    expressiveTilt:
      clamp(
        p.expressiveTilt
      ),
  };
}

function blend(
  a:
    SceneProfile,

  b:
    SceneProfile,

  weight:
    number
): SceneProfile {
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

    glow:
      a.glow *
        weight +
      b.glow *
        inverse,

    depth:
      a.depth *
        weight +
      b.depth *
        inverse,

    expressiveTilt:
      a.expressiveTilt *
        weight +
      b.expressiveTilt *
        inverse,
  };
}

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
/* PAGE                                              */
/* ================================================= */

export default function Page13() {
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

  const a =
    getBrand(
      brandA,
      "Brand A",
      "#FF453A",
      "#FF8A80"
    );

  const b =
    getBrand(
      brandB,
      "Brand B",
      "#3478F6",
      "#64D2FF"
    );

  const aProfile =
    buildProfile(
      a.characterTraits
    );

  const bProfile =
    buildProfile(
      b.characterTraits
    );

  const profile =
    getSharedProfile(
      model,
      aProfile,
      bProfile
    );

  return (
    <GuidelinePage>
      {/* HEADER */}

      <header className="absolute left-[70px] right-[70px] top-[46px] flex items-start justify-between">
        <div>
          <p className="text-[13px] uppercase tracking-[0.17em] text-white/30">
            13 / Shared visual territory
          </p>

          <h1 className="mt-[12px] text-[52px] leading-none tracking-[-0.045em] text-white oook-semibold">
            Complete shared branding example
          </h1>

          <p className="mt-[13px] max-w-[850px] text-[16px] leading-[1.38] text-white/45">
            A complete application of hierarchy, colour, typography, graphic language, image treatment and brand character.
          </p>
        </div>

        <PartnershipLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
        />
      </header>

      {/* HERO */}

      <section className="absolute bottom-[58px] left-[70px] right-[70px] top-[185px]">
        <div
          className="relative h-full w-full overflow-hidden border border-white/[0.08] bg-[#050506]"
          style={{
            borderRadius:
              `${
                12 +
                profile.roundness *
                  20
              }px`,
          }}
        >
          <BackgroundImage
            model={
              model
            }
            profile={
              profile
            }
          />

          <SceneTreatment
            profile={
              profile
            }
            aPrimary={
              a.primaryColor
            }
            aSecondary={
              a.secondaryColor
            }
            bPrimary={
              b.primaryColor
            }
            bSecondary={
              b.secondaryColor
            }
            isLight={
              isLight
            }
          />

          {model ===
            "axb" && (
            <AXBExample
              a={a}
              b={b}
            />
          )}

          {model ===
            "aandb" && (
            <AWithBExample
              a={a}
              b={b}
            />
          )}

          {model ===
            "poweredByA" && (
            <PoweredExample
              a={a}
              b={b}
              profile={
                bProfile
              }
            />
          )}

          {model ===
            "presentsB" && (
            <PresentsExample
              a={a}
              b={b}
              aProfile={
                aProfile
              }
              bProfile={
                bProfile
              }
              isLight={
                isLight
              }
            />
          )}
        </div>
      </section>

      <div className="absolute bottom-[24px] left-[70px] right-[70px] flex justify-between text-[9px] text-white/22">
        <span>
          Full application sample
        </span>

        <span>
          Image · colour · type · graphic language · hierarchy
        </span>
      </div>
    </GuidelinePage>
  );
}

/* ================================================= */
/* BACKGROUND                                        */
/* ================================================= */

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
    model ===
    "axb"
      ? 3
      : model ===
          "aandb"
        ? 4
        : model ===
            "poweredByA"
          ? 7
          : 9;

  const extensions = [
    "jpg",
    "jpeg",
    "png",
    "webp",
  ];

  const [
    extension,
    setExtension,
  ] =
    useState(0);

  useEffect(
    () => {
      setExtension(
        0
      );
    },
    [imageNumber]
  );

  return (
    <img
      src={`/images/image${imageNumber}.${extensions[extension]}`}
      alt=""
      draggable={false}
      onError={() => {
        if (
          extension <
          extensions.length -
            1
        ) {
          setExtension(
            (current) =>
              current +
              1
          );
        }
      }}
      className="absolute inset-0 h-full w-full object-cover"
      style={{
        filter:
          `grayscale(.22)
           brightness(.69)
           contrast(${
             1 +
             profile.depth *
               0.18
           })`,

        transform:
          `scale(${
            1.04 +
            profile.energy *
              0.04
          })`,
      }}
    />
  );
}

/* ================================================= */
/* TREATMENT                                         */
/* ================================================= */

function SceneTreatment({
  profile,

  aPrimary,
  aSecondary,

  bPrimary,
  bSecondary,

  isLight,
}: {
  profile:
    SceneProfile;

  aPrimary:
    string;

  aSecondary:
    string;

  bPrimary:
    string;

  bSecondary:
    string;

  isLight:
    boolean;
}) {
  return (
    <>
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
                  opacity: 0.8,
                },
                {
                  color:
                    "#FFFFFF",
                  offset: 54,
                  opacity: 0.3,
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
                  opacity: 0.8,
                },
                {
                  color:
                    "#000000",
                  offset: 54,
                  opacity: 0.3,
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
          aPrimary
        }
        secondaryColor={
          aSecondary
        }
        opacity={
          0.08 +
          profile.glow *
            0.18
        }
        secondaryOpacity={
          0.03 +
          profile.glow *
            0.05
        }
        centerX={30}
        centerY={25}
        className="absolute -left-[12%] -top-[25%] h-[420px] w-[520px]"
      />

      <RasterGlow
        color={
          bPrimary
        }
        secondaryColor={
          bSecondary
        }
        opacity={
          0.08 +
          profile.glow *
            0.18
        }
        secondaryOpacity={
          0.03 +
          profile.glow *
            0.05
        }
        centerX={68}
        centerY={68}
        className="absolute -bottom-[34%] right-[0%] h-[430px] w-[540px]"
      />
    </>
  );
}

/* ================================================= */
/* MODEL — A × B                                     */
/* ================================================= */

function AXBExample({
  a,
  b,
}: {
  a:
    BrandView;

  b:
    BrandView;
}) {
  return (
    <>
      <div className="absolute left-[42px] top-[36px] flex items-center gap-[20px]">
        <BrandIdentity
          brand={a}
          width={180}
          height={50}
        />

        <span className="text-[23px] text-white/38">
          ×
        </span>

        <BrandIdentity
          brand={b}
          width={180}
          height={50}
        />
      </div>

      <HeroCopy
        eyebrow="Shared immersive experience"
        title="Experience the moment from inside."
        family={
          DEFAULT_FONT
        }
      />

      <AccentGraphic
        primary={
          a.primaryColor
        }
        secondary={
          a.secondaryColor
        }
        support={
          b.primaryColor
        }
        supportSecondary={
          b.secondaryColor
        }
      />

      <CTA
        primary={
          a.primaryColor
        }
        secondary={
          b.secondaryColor
        }
        label="Enter experience"
      />
    </>
  );
}

/* ================================================= */
/* MODEL — A WITH B                                  */
/* ================================================= */

function AWithBExample({
  a,
  b,
}: {
  a:
    BrandView;

  b:
    BrandView;
}) {
  return (
    <>
      <div className="absolute left-[42px] top-[34px]">
        <BrandIdentity
          brand={a}
          width={220}
          height={58}
        />

        <div className="mt-[12px] flex items-center gap-[10px]">
          <span className="text-[9px] uppercase tracking-[0.12em] text-white/28">
            with
          </span>

          <BrandIdentity
            brand={b}
            width={105}
            height={30}
          />
        </div>
      </div>

      <HeroCopy
        eyebrow="A curated immersive experience"
        title="See the event differently."
        family={
          a.fontFamily
        }
      />

      <AccentGraphic
        primary={
          a.primaryColor
        }
        secondary={
          a.secondaryColor
        }
        support={
          b.primaryColor
        }
        supportSecondary={
          b.secondaryColor
        }
      />

      <CTA
        primary={
          a.primaryColor
        }
        secondary={
          a.secondaryColor
        }
        label="Explore now"
      />
    </>
  );
}

/* ================================================= */
/* MODEL — POWERED                                   */
/* ================================================= */

function PoweredExample({
  a,
  b,
  profile,
}: {
  a:
    BrandView;

  b:
    BrandView;

  profile:
    SceneProfile;
}) {
  return (
    <>
      <div className="absolute left-[42px] top-[34px]">
        <BrandIdentity
          brand={b}
          width={245}
          height={64}
        />
      </div>

      <div className="absolute right-[38px] top-[34px] flex items-center gap-[9px] rounded-[14px] border border-white/[0.09] bg-black/50 px-[14px] py-[9px]">
        <span className="text-[8px] uppercase tracking-[0.11em] text-white/28">
          Powered by
        </span>

        <BrandIdentity
          brand={a}
          width={105}
          height={29}
        />
      </div>

      <HeroCopy
        eyebrow="Live immersive coverage"
        title="Feel closer to every moment."
        family={
          b.fontFamily
        }
      />

      <Visualizer
        profile={
          profile
        }
        primary={
          b.primaryColor
        }
        secondary={
          b.secondaryColor
        }
      />

      <CTA
        primary={
          b.primaryColor
        }
        secondary={
          b.secondaryColor
        }
        label="Watch live"
      />
    </>
  );
}

/* ================================================= */
/* MODEL — PRESENTS                                  */
/* ================================================= */

function PresentsExample({
  a,
  b,

  aProfile,
  bProfile,

  isLight,
}: {
  a:
    BrandView;

  b:
    BrandView;

  aProfile:
    SceneProfile;

  bProfile:
    SceneProfile;

  isLight:
    boolean;
}) {
  return (
    <>
      <div
        className="absolute left-[26px] right-[26px] top-[24px] flex h-[72px] items-center border border-white/[0.09] bg-black/48 px-[19px]"
        style={{
          borderRadius:
            `${
              8 +
              aProfile.roundness *
                18
            }px`,
        }}
      >
        <BrandIdentity
          brand={a}
          width={160}
          height={42}
        />

        <span className="ml-[20px] text-[9px] uppercase tracking-[0.12em] text-white/27">
          Presents
        </span>

        <div className="ml-auto flex gap-[20px] text-[9px] text-white/28">
          <span>
            Live
          </span>

          <span>
            Highlights
          </span>

          <span>
            Explore
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-[28px] left-[30px] right-[30px] top-[112px] overflow-hidden border border-white/[0.08]"
        style={{
          borderRadius:
            `${
              10 +
              bProfile.roundness *
                24
            }px`,
        }}
      >
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
                    opacity: 0.65,
                  },
                  {
                    color:
                      "#FFFFFF",
                    offset: 58,
                    opacity: 0.18,
                  },
                  {
                    color:
                      "#FFFFFF",
                    offset:
                      100,
                    opacity: 0,
                  },
                ]
              : [
                  {
                    color:
                      "#000000",
                    offset: 0,
                    opacity: 0.65,
                  },
                  {
                    color:
                      "#000000",
                    offset: 58,
                    opacity: 0.2,
                  },
                  {
                    color:
                      "#000000",
                    offset:
                      100,
                    opacity: 0,
                  },
                ]
          }
        />

        <div className="absolute bottom-[55px] left-[38px]">
          <div className="mb-[18px] flex items-center gap-[13px]">
            <BrandIdentity
              brand={b}
              width={205}
              height={54}
            />

            <span className="text-[8px] uppercase tracking-[0.11em] text-white/27">
              Featured content
            </span>
          </div>

          <h2
            className="max-w-[690px] text-[55px] leading-[0.94] tracking-[-0.045em] text-white"
            style={{
              fontFamily:
                b.fontFamily,
            }}
          >
            Step into the experience.
          </h2>

          <div className="mt-[16px] flex gap-[5px]">
            <span
              className="h-[5px] w-[72px] rounded-full"
              style={{
                backgroundColor:
                  b.primaryColor,
              }}
            />

            <span
              className="h-[5px] w-[32px] rounded-full"
              style={{
                backgroundColor:
                  b.secondaryColor,
              }}
            />
          </div>
        </div>

        <CTA
          primary={
            b.primaryColor
          }
          secondary={
            b.secondaryColor
          }
          label="Discover"
          inset
        />
      </div>
    </>
  );
}

/* ================================================= */
/* BRAND IDENTITY                                    */
/* ================================================= */

function BrandIdentity({
  brand,
  width,
  height,
}: {
  brand:
    BrandView;

  width:
    number;

  height:
    number;
}) {
  if (
    brand.logoUrl
  ) {
    return (
      <div
        className="flex shrink-0 items-center"
        style={{
          width,
          height,
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
          className="block h-full w-full object-contain object-left"
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center"
      style={{
        width,
        minHeight:
          height,
      }}
    >
      <span
        className="whitespace-nowrap text-[23px] leading-none text-white"
        style={{
          fontFamily:
            brand.fontFamily,
        }}
      >
        {brand.name}
      </span>
    </div>
  );
}

/* ================================================= */
/* COPY                                              */
/* ================================================= */

function HeroCopy({
  eyebrow,
  title,
  family,
}: {
  eyebrow:
    string;

  title:
    string;

  family:
    string;
}) {
  return (
    <div className="absolute bottom-[110px] left-[42px] max-w-[760px]">
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
        {eyebrow}
      </p>

      <h2
        className="mt-[10px] text-[56px] leading-[0.94] tracking-[-0.045em] text-white"
        style={{
          fontFamily:
            family,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ================================================= */
/* GRAPHIC                                           */
/* ================================================= */

function AccentGraphic({
  primary,
  secondary,
  support,
  supportSecondary,
}: {
  primary:
    string;

  secondary:
    string;

  support:
    string;

  supportSecondary:
    string;
}) {
  return (
    <div className="absolute right-[55px] top-[140px] flex h-[210px] w-[340px] items-end justify-end gap-[7px]">
      {[
        70,
        130,
        96,
        185,
        120,
        165,
        82,
      ].map(
        (
          height,
          index
        ) => (
          <div
            key={
              index
            }
            className="w-[6px] rounded-full"
            style={{
              height,

              backgroundColor:
                index %
                  4 ===
                0
                  ? support
                  : index %
                        3 ===
                      0
                    ? supportSecondary
                    : index %
                          2 ===
                        0
                      ? secondary
                      : primary,
            }}
          />
        )
      )}
    </div>
  );
}

function Visualizer({
  profile,
  primary,
  secondary,
}: {
  profile:
    SceneProfile;

  primary:
    string;

  secondary:
    string;
}) {
  const count =
    Math.round(
      6 +
        profile.energy *
          8
    );

  return (
    <div className="absolute right-[48px] top-[130px] flex h-[220px] w-[340px] items-end justify-end gap-[7px]">
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
            className="w-[6px] rounded-full"
            style={{
              height:
                45 +
                ((index *
                  41) %
                  155),

              backgroundColor:
                index %
                  3 ===
                0
                  ? secondary
                  : primary,
            }}
          />
        )
      )}
    </div>
  );
}

/* ================================================= */
/* CTA                                               */
/* ================================================= */

function CTA({
  primary,
  secondary,
  label,
  inset = false,
}: {
  primary:
    string;

  secondary:
    string;

  label:
    string;

  inset?:
    boolean;
}) {
  return (
    <div
      className={`
        absolute

        flex
        items-center
        gap-[9px]

        rounded-full

        border
        border-white/[0.1]

        bg-black/52

        px-[16px]
        py-[10px]

        ${
          inset
            ? "bottom-[34px] right-[32px]"
            : "bottom-[38px] right-[40px]"
        }
      `}
    >
      <span
        className="h-[7px] w-[7px] rounded-full"
        style={{
          backgroundColor:
            primary,
        }}
      />

      <span
        className="h-[4px] w-[10px] rounded-full"
        style={{
          backgroundColor:
            secondary,
        }}
      />

      <span className="text-[10px] text-white/67">
        {label}
      </span>

      <span className="text-[11px] text-white/30">
        →
      </span>
    </div>
  );
}