"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import BrandLogo from "./BrandLogo";

import GuidelinePage from "./GuidelinePage";

import PartnershipLockup from "./PartnershipLockup";

import RasterGradient from "./RasterGradient";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import {
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

type VideoLogoSize =
  | "hero"
  | "primary"
  | "secondary"
  | "credit"
  | "footer";

interface BrandView {
  name: string;
  logoUrl: string | null;
}

interface ModelSequence {
  first: "A" | "B";
  second: "A" | "B";

  relationship: string;
  description: string;
}

/* ================================================= */
/* IMAGE CONFIG                                      */
/* ================================================= */

const RESERVED_BRAND_IMAGE =
  6;

const IMAGE_NUMBERS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];

const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
];

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function shuffle<T>(
  source: T[]
) {
  const result =
    [...source];

  for (
    let index =
      result.length -
      1;

    index >
    0;

    index -=
      1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
          (index +
            1)
      );

    [
      result[index],
      result[randomIndex],
    ] = [
      result[randomIndex],
      result[index],
    ];
  }

  return result;
}

function getRandomFrameImages() {
  const available =
    IMAGE_NUMBERS.filter(
      (number) =>
        number !==
        RESERVED_BRAND_IMAGE
    );

  const random =
    shuffle(
      available
    ).slice(
      0,
      4
    );

  return [
    random[0] ??
      1,

    RESERVED_BRAND_IMAGE,

    random[1] ??
      2,

    RESERVED_BRAND_IMAGE,

    random[2] ??
      3,

    random[3] ??
      4,
  ];
}

function getSequence(
  model:
    PartnershipModelId
): ModelSequence {
  switch (model) {
    case "axb":
      return {
        first:
          "A",

        second:
          "B",

        relationship:
          "×",

        description:
          "Both brands arrive independently with equal optical weight before resolving into one shared identity.",
      };

    case "aandb":
      return {
        first:
          "A",

        second:
          "B",

        relationship:
          "with",

        description:
          "Brand A establishes the opening rhythm. Brand B is introduced as the supporting partner before the final shared signature.",
      };

    case "poweredByA":
      return {
        first:
          "B",

        second:
          "A",

        relationship:
          "Powered by",

        description:
          "Brand B opens the consumer experience. Brand A is revealed later as the technology and production endorsement.",
      };

    case "presentsB":
    default:
      return {
        first:
          "A",

        second:
          "B",

        relationship:
          "presents",

        description:
          "Brand A opens the platform and introduces Brand B as the featured content identity.",
      };
  }
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page05() {
  const {
    partnershipModel,
    brandA,
    brandB,
  } =
    useGuidelineStore();

  const model =
    partnershipModel as PartnershipModelId;

  const sequence =
    getSequence(
      model
    );

  const brandAView:
    BrandView = {
    name:
      brandA.name ||
      "Brand A",

    logoUrl:
      brandA.logoUrl ??
      null,
  };

  const brandBView:
    BrandView = {
    name:
      brandB.name ||
      "Brand B",

    logoUrl:
      brandB.logoUrl ??
      null,
  };

  const [
    images,
    setImages,
  ] =
    useState<
      number[]
    >([
      1,
      6,
      2,
      6,
      3,
      4,
    ]);

  useEffect(
    () => {
      setImages(
        getRandomFrameImages()
      );
    },
    [model]
  );

  const firstBrand =
    sequence.first ===
    "A"
      ? brandAView
      : brandBView;

  const secondBrand =
    sequence.second ===
    "A"
      ? brandAView
      : brandBView;

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header
        className="
          absolute
          left-[36px]
          right-[36px]
          top-[26px]

          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.17em]
              text-white/30
            "
          >
            05 / Video identity
          </p>

          <h1
            className="
              mt-[14px]

              text-[50px]
              leading-none
              tracking-[-0.045em]

              text-white

              oook-semibold
            "
          >
            Video opening keyframes
          </h1>

          <p
            className="
              mt-[17px]

              max-w-[720px]

              text-[16px]
              leading-[1.38]

              text-white/45
            "
          >
            {
              sequence.description
            }
          </p>
        </div>

        <PartnershipLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
        />
      </header>

      {/* ======================================== */}
      {/* STORYBOARD                               */}
      {/* ======================================== */}

      <section
        className="
          absolute

          left-[36px]
          right-[36px]
          top-[170px]

          grid
          grid-cols-3

          gap-x-[52px]
          gap-y-[56px]
        "
      >
        {/* 01 */}

        <Keyframe
          number="01"
          title="Atmosphere"
          image={
            images[0]
          }
        >
          <AtmosphereFrame />
        </Keyframe>

        {/* 02 */}

        <Keyframe
          number="02"
          title={
            sequence.first ===
            "A"
              ? "Brand A"
              : "Brand B"
          }
          image={
            images[1]
          }
        >
          <BareHeroLogo
            brand={
              firstBrand
            }
          />
        </Keyframe>

        {/* 03 */}

        <Keyframe
          number="03"
          title="Relationship"
          image={
            images[2]
          }
        >
          <RelationshipFrame
            relationship={
              sequence.relationship
            }
          />
        </Keyframe>

        {/* 04 */}

        <Keyframe
          number="04"
          title={
            sequence.second ===
            "A"
              ? "Brand A"
              : "Brand B"
          }
          image={
            images[3]
          }
        >
          <BareHeroLogo
            brand={
              secondBrand
            }
          />
        </Keyframe>

        {/* 05 */}

        <Keyframe
          number="05"
          title="Final lockup"
          image={
            images[4]
          }
        >
          <FinalLockup
            model={
              model
            }
            brandA={
              brandAView
            }
            brandB={
              brandBView
            }
          />
        </Keyframe>

        {/* 06 */}

        <Keyframe
          number="06"
          title="Content starts"
          image={
            images[5]
          }
        >
          <ContentStart
            model={
              model
            }
            brandA={
              brandAView
            }
            brandB={
              brandBView
            }
          />
        </Keyframe>

        {/* ====================================== */}
        {/* TRANSITION CUES                        */}
        {/* ====================================== */}

        <MotionCue
          label="→ fade in"
          style={{
            left:
              "32.95%",

            top:
              "127px",
          }}
        />

        <MotionCue
          label="→ introduce"
          style={{
            left:
              "67.05%",

            top:
              "127px",
          }}
        />

        <MotionCue
          label="↓ reveal"
          style={{
            left:
              "50%",

            top:
              "318px",
          }}
        />

        <MotionCue
          label="→ merge"
          style={{
            left:
              "32.95%",

            top:
              "459px",
          }}
        />

        <MotionCue
          label="→ enter"
          style={{
            left:
              "67.05%",

            top:
              "459px",
          }}
        />
      </section>

      {/* ======================================== */}
      {/* FOOTER                                   */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[24px]
          left-[36px]
          right-[36px]

          flex
          items-center
          justify-between
        "
      >
        <p className="text-[9px] text-white/23">
          Suggested sequence — timing and transitions may adapt to each format.
        </p>

        <p className="text-[9px] text-white/23">
          Image · Noise · Glass · Refraction
        </p>
      </div>
    </GuidelinePage>
  );
}

/* ================================================= */
/* KEYFRAME                                          */
/* ================================================= */

function Keyframe({
  number,
  title,
  image,
  children,
}: {
  number:
    string;

  title:
    string;

  image:
    number;

  children:
    ReactNode;
}) {
  return (
    <div>
      <div
        className="
          relative

          aspect-video

          overflow-hidden

          rounded-[22px]

          border
          border-white/[0.10]

          bg-[#050506]
        "
      >
        <FrameBackground
          image={
            image
          }
        />

        <FrameAtmosphere />

        {children}
      </div>

      <div
        className="
          mt-[10px]

          flex
          items-center
          justify-between
        "
      >
        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.14em]

            text-white/22
          "
        >
          Key frame{" "}
          {number}
        </p>

        <p className="text-[8px] text-white/20">
          {title}
        </p>
      </div>
    </div>
  );
}

/* ================================================= */
/* BACKGROUND                                        */
/* ================================================= */

function FrameBackground({
  image,
}: {
  image:
    number;
}) {
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
    [image]
  );

  const extension =
    IMAGE_EXTENSIONS[
      extensionIndex
    ];

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
      "
    >
      <img
        src={`/images/image${image}.${extension}`}
        alt=""
        draggable={
          false
        }
        onError={() => {
          if (
            extensionIndex <
            IMAGE_EXTENSIONS.length -
              1
          ) {
            setExtensionIndex(
              (current) =>
                current +
                1
            );
          }
        }}
        className="
          h-full
          w-full

          scale-[1.03]

          object-cover
        "
        style={{
          filter:
            "grayscale(0.95) contrast(1.02)",
        }}
      />
    </div>
  );
}

/* ================================================= */
/* SAFE ATMOSPHERE                                   */
/* ================================================= */

function FrameAtmosphere() {
  return (
    <>
      {/*
        No CSS gradient.
        No blend mode.
        No blur.

        This gets exported as a normal image.
      */}

      <RasterGradient
        direction="vertical"
        className="
          absolute
          inset-0

          h-full
          w-full
        "
        stops={[
          {
            color:
              "#FFFFFF",

            offset:
              0,

            opacity:
              0.03,
          },

          {
            color:
              "#FFFFFF",

            offset:
              42,

            opacity:
              0,
          },

          {
            color:
              "#000000",

            offset:
              100,

            opacity:
              0.3,
          },
        ]}
      />

      <ScanLines />
    </>
  );
}

/* ================================================= */
/* SCAN LINES                                        */
/* ================================================= */

function ScanLines() {
  const count =
    34;

  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        opacity-[0.055]
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
              absolute
              left-0
              right-0

              h-px

              bg-white/20
            "
            style={{
              top:
                `${
                  (index /
                    count) *
                  100
                }%`,
            }}
          />
        )
      )}
    </div>
  );
}

/* ================================================= */
/* FRAME 01                                          */
/* ================================================= */

function AtmosphereFrame() {
  return (
    <VideoGlass
      className="
        absolute

        bottom-[18px]
        left-[18px]

        w-[58%]
      "
    >
      <p
        className="
          text-[7px]
          uppercase
          tracking-[0.13em]

          text-white/28
        "
      >
        Opening atmosphere
      </p>

      <p
        className="
          mt-[5px]

          text-[10px]

          text-white/62
        "
      >
        Establish mood before introducing identity.
      </p>
    </VideoGlass>
  );
}

/* ================================================= */
/* HERO LOGO                                         */
/* ================================================= */

function BareHeroLogo({
  brand,
}: {
  brand:
    BrandView;
}) {
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
      {/*
        Deliberately NO halo.

        The uploaded logo remains completely clean
        and therefore exports identically.
      */}

      <VideoLogo
        brand={
          brand
        }
        size="hero"
      />
    </div>
  );
}

/* ================================================= */
/* RELATIONSHIP                                      */
/* ================================================= */

function RelationshipFrame({
  relationship,
}: {
  relationship:
    string;
}) {
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
      <p
        className="
          text-[30px]
          leading-none

          text-white/72

          oook-light
        "
      >
        {
          relationship
        }
      </p>
    </div>
  );
}

/* ================================================= */
/* FINAL LOCKUP                                      */
/* ================================================= */

function FinalLockup({
  model,
  brandA,
  brandB,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;
}) {
  if (
    model ===
    "axb"
  ) {
    return (
      <CenteredLockup>
        <VideoLogo
          brand={
            brandA
          }
          size="primary"
        />

        <Symbol>
          ×
        </Symbol>

        <VideoLogo
          brand={
            brandB
          }
          size="primary"
        />
      </CenteredLockup>
    );
  }

  if (
    model ===
    "aandb"
  ) {
    return (
      <CenteredLockup>
        <VideoLogo
          brand={
            brandA
          }
          size="primary"
        />

        <RelationshipText>
          with
        </RelationshipText>

        <VideoLogo
          brand={
            brandB
          }
          size="secondary"
        />
      </CenteredLockup>
    );
  }

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <CenteredLockup>
        <VideoLogo
          brand={
            brandB
          }
          size="primary"
        />

        <RelationshipText>
          powered by
        </RelationshipText>

        <VideoLogo
          brand={
            brandA
          }
          size="credit"
        />
      </CenteredLockup>
    );
  }

  return (
    <CenteredLockup>
      <VideoLogo
        brand={
          brandA
        }
        size="secondary"
      />

      <RelationshipText>
        presents
      </RelationshipText>

      <VideoLogo
        brand={
          brandB
        }
        size="primary"
      />
    </CenteredLockup>
  );
}

function CenteredLockup({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <div
      className="
        absolute
        inset-0

        flex
        items-center
        justify-center

        gap-[16px]
      "
    >
      {
        children
      }
    </div>
  );
}

/* ================================================= */
/* CONTENT START                                     */
/* ================================================= */

function ContentStart({
  model,
  brandA,
  brandB,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;
}) {
  return (
    <>
      <VideoGlass
        className="
          absolute

          left-[18px]
          right-[18px]
          top-[16px]

          flex
          items-center
          justify-between
        "
      >
        <p className="text-[8px] text-white/55">
          Shared experience
        </p>

        <HeaderIdentity
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
      </VideoGlass>

      <VideoGlass
        className="
          absolute

          bottom-[16px]
          left-[18px]
          right-[18px]

          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.11em]

              text-white/25
            "
          >
            Live
          </p>

          <p
            className="
              mt-[2px]

              text-[10px]

              text-white/60
            "
          >
            Headline or key message
          </p>
        </div>

        <HeaderIdentity
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
      </VideoGlass>
    </>
  );
}

/* ================================================= */
/* HEADER IDENTITY                                   */
/* ================================================= */

function HeaderIdentity({
  model,
  brandA,
  brandB,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-[7px]
      "
    >
      {model ===
      "poweredByA" ? (
        <>
          <VideoLogo
            brand={
              brandB
            }
            size="footer"
          />

          <RelationshipText>
            powered by
          </RelationshipText>

          <VideoLogo
            brand={
              brandA
            }
            size="credit"
          />
        </>
      ) : model ===
        "presentsB" ? (
        <>
          <VideoLogo
            brand={
              brandA
            }
            size="credit"
          />

          <RelationshipText>
            presents
          </RelationshipText>

          <VideoLogo
            brand={
              brandB
            }
            size="footer"
          />
        </>
      ) : model ===
        "aandb" ? (
        <>
          <VideoLogo
            brand={
              brandA
            }
            size="footer"
          />

          <RelationshipText>
            with
          </RelationshipText>

          <VideoLogo
            brand={
              brandB
            }
            size="credit"
          />
        </>
      ) : (
        <>
          <VideoLogo
            brand={
              brandA
            }
            size="footer"
          />

          <Symbol>
            ×
          </Symbol>

          <VideoLogo
            brand={
              brandB
            }
            size="footer"
          />
        </>
      )}
    </div>
  );
}

/* ================================================= */
/* LOGO                                              */
/* ================================================= */

function VideoLogo({
  brand,
  size = "primary",
}: {
  brand:
    BrandView;

  size?:
    VideoLogoSize;
}) {
  const widths:
    Record<
      VideoLogoSize,
      number
    > = {
    hero:
      178,

    primary:
      130,

    secondary:
      95,

    credit:
      67,

    footer:
      74,
  };

  const heights:
    Record<
      VideoLogoSize,
      number
    > = {
    hero:
      56,

    primary:
      42,

    secondary:
      31,

    credit:
      22,

    footer:
      24,
  };

  return (
    <div
      className="
        flex
        shrink-0

        items-center
        justify-center
      "
      style={{
        width:
          widths[
            size
          ],

        height:
          heights[
            size
          ],

        /*
          Absolutely no drop-shadow.
          This is intentional.
        */

        filter:
          "none",
      }}
    >
      <BrandLogo
        logoUrl={
          brand.logoUrl
        }
        fallback={
          brand.name
        }
      />
    </div>
  );
}

/* ================================================= */
/* GLASS                                             */
/* ================================================= */

function VideoGlass({
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
        rounded-[12px]

        border
        border-white/[0.09]

        bg-black/65

        px-[11px]
        py-[9px]

        ${className}
      `}
    >
      {/*
        No backdrop-filter.
        The transparency alone gives enough
        glass appearance and exports reliably.
      */}

      {children}
    </div>
  );
}

/* ================================================= */
/* SMALL UI                                          */
/* ================================================= */

function Symbol({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <span
      className="
        shrink-0

        text-[15px]

        text-white/38
      "
    >
      {
        children
      }
    </span>
  );
}

function RelationshipText({
  children,
}: {
  children:
    ReactNode;
}) {
  return (
    <span
      className="
        shrink-0

        whitespace-nowrap

        text-[7px]
        uppercase
        tracking-[0.11em]

        text-white/28
      "
    >
      {
        children
      }
    </span>
  );
}

/* ================================================= */
/* MOTION CUE                                        */
/* ================================================= */

function MotionCue({
  label,
  style,
}: {
  label:
    string;

  style:
    React.CSSProperties;
}) {
  return (
    <div
      className="
        pointer-events-none

        absolute
        z-30

        flex
        h-[28px]

        -translate-x-1/2
        -translate-y-1/2

        items-center
        justify-center

        whitespace-nowrap

        rounded-full

        bg-[#979797]

        px-[11px]

        text-[7px]
        text-black/65

        shadow-none
      "
      style={
        style
      }
    >
      {label}
    </div>
  );
}