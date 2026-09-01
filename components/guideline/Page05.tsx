"use client";

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import GuidelinePage from "./GuidelinePage";
import BrandLogo from "./BrandLogo";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* BACKGROUND IMAGES                                */
/* ------------------------------------------------ */

const BACKGROUND_IMAGE_IDS = Array.from(
  { length: 10 },
  (_, index) => index + 1
);

const RESERVED_BRAND_IMAGE = 6;

const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
];

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

type FrameVariant =
  | "atmosphere"
  | "brandAHero"
  | "brandBHero"
  | "connectorEqual"
  | "connectorWith"
  | "connectorPowered"
  | "connectorPresents"
  | "equalLockup"
  | "withLockup"
  | "poweredLockup"
  | "presentsLockup"
  | "contentEqual"
  | "contentWith"
  | "contentPowered"
  | "contentPresents";

type VideoLogoSize =
  | "hero"
  | "primary"
  | "secondary"
  | "credit"
  | "footer";

interface FrameSpec {
  id: string;
  title: string;
  variant: FrameVariant;
}

interface OpeningFlow {
  description: string;

  transitions: [
    string,
    string,
    string,
    string,
    string
  ];

  frames: [
    FrameSpec,
    FrameSpec,
    FrameSpec,
    FrameSpec,
    FrameSpec,
    FrameSpec
  ];
}

/* ------------------------------------------------ */
/* RANDOM IMAGES                                    */
/* ------------------------------------------------ */

function getRandomFrameImages(): number[] {
  /*
    image6 is completely reserved.

    It may ONLY be used by:
    - Keyframe 02
    - Keyframe 04

    It is explicitly removed from
    the random image pool.
  */

  const availableImages =
    BACKGROUND_IMAGE_IDS.filter(
      (imageId) =>
        imageId !== RESERVED_BRAND_IMAGE
    );

  /*
    Fisher-Yates shuffle.
  */

  for (
    let i =
      availableImages.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [
      availableImages[i],
      availableImages[j],
    ] = [
      availableImages[j],
      availableImages[i],
    ];
  }

  /*
    We need four random images because
    KF02 and KF04 are fixed to image6.
  */

  const randomImages =
    availableImages.slice(0, 4);

  return [
    randomImages[0],        // KF01
    RESERVED_BRAND_IMAGE,   // KF02
    randomImages[1],        // KF03
    RESERVED_BRAND_IMAGE,   // KF04
    randomImages[2],        // KF05
    randomImages[3],        // KF06
  ];
}

/* ------------------------------------------------ */
/* OPENING FLOW DATA                                */
/* ------------------------------------------------ */

function getOpeningFlow(
  model: PartnershipModelId,
  brandAName: string,
  brandBName: string
): OpeningFlow {
  switch (model) {
    /* ================================================= */
    /* A × B                                             */
    /* ================================================= */

    case "axb":
      return {
        description:
          "Both brands arrive with equal optical weight before resolving into a shared visual system.",

        transitions: [
          "fade in",
          "introduce",
          "reveal",
          "merge",
          "enter",
        ],

        frames: [
          {
            id: "01",
            title: "Atmosphere",
            variant: "atmosphere",
          },

          {
            id: "02",
            title: brandAName,
            variant: "brandAHero",
          },

          {
            id: "03",
            title: "×",
            variant:
              "connectorEqual",
          },

          {
            id: "04",
            title: brandBName,
            variant: "brandBHero",
          },

          {
            id: "05",
            title:
              `${brandAName} × ${brandBName}`,
            variant:
              "equalLockup",
          },

          {
            id: "06",
            title:
              "Content starts",
            variant:
              "contentEqual",
          },
        ],
      };

    /* ================================================= */
    /* A WITH B                                          */
    /* ================================================= */

    case "aandb":
      return {
        description:
          `${brandAName} introduces the experience first. ${brandBName} follows as a visible supporting partner.`,

        transitions: [
          "fade in",
          "type in",
          "reveal",
          "resolve",
          "enter",
        ],

        frames: [
          {
            id: "01",
            title: "Atmosphere",
            variant: "atmosphere",
          },

          {
            id: "02",
            title: brandAName,
            variant: "brandAHero",
          },

          {
            id: "03",
            title: "with",
            variant:
              "connectorWith",
          },

          {
            id: "04",
            title: brandBName,
            variant: "brandBHero",
          },

          {
            id: "05",
            title:
              `${brandAName} with ${brandBName}`,
            variant:
              "withLockup",
          },

          {
            id: "06",
            title:
              "Content starts",
            variant:
              "contentWith",
          },
        ],
      };

    /* ================================================= */
    /* B POWERED BY A                                    */
    /* ================================================= */

    case "poweredByA":
      return {
        description:
          `${brandBName} owns the opening. ${brandAName} appears later as a restrained technology endorsement.`,

        transitions: [
          "fade in",
          "type in",
          "reveal",
          "resolve",
          "enter",
        ],

        frames: [
          {
            id: "01",
            title: "Atmosphere",
            variant: "atmosphere",
          },

          {
            id: "02",
            title: brandBName,
            variant: "brandBHero",
          },

          {
            id: "03",
            title: "Powered by",
            variant:
              "connectorPowered",
          },

          {
            id: "04",
            title: brandAName,
            variant: "brandAHero",
          },

          {
            id: "05",
            title:
              `${brandBName} powered by ${brandAName}`,
            variant:
              "poweredLockup",
          },

          {
            id: "06",
            title:
              "Content starts",
            variant:
              "contentPowered",
          },
        ],
      };

    /* ================================================= */
    /* A PRESENTS B                                      */
    /* ================================================= */

    case "presentsB":
    default:
      return {
        description:
          `${brandAName} establishes ownership first and then introduces ${brandBName} as the featured content.`,

        transitions: [
          "fade in",
          "type in",
          "reveal",
          "resolve",
          "enter",
        ],

        frames: [
          {
            id: "01",
            title: "Atmosphere",
            variant: "atmosphere",
          },

          {
            id: "02",
            title: brandAName,
            variant: "brandAHero",
          },

          {
            id: "03",
            title: "presents",
            variant:
              "connectorPresents",
          },

          {
            id: "04",
            title: brandBName,
            variant: "brandBHero",
          },

          {
            id: "05",
            title:
              `${brandAName} presents ${brandBName}`,
            variant:
              "presentsLockup",
          },

          {
            id: "06",
            title:
              "Content starts",
            variant:
              "contentPresents",
          },
        ],
      };
  }
}

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page05() {
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

  const flow =
    getOpeningFlow(
      model,
      brandAName,
      brandBName
    );

  /*
    Initial state already respects
    image6 reservation.
  */

  const [
    frameImages,
    setFrameImages,
  ] = useState<number[]>([
    1,
    RESERVED_BRAND_IMAGE,
    2,
    RESERVED_BRAND_IMAGE,
    3,
    4,
  ]);

  /*
    Generate a fresh image sequence
    whenever partnership model changes.

    image6 will never enter random slots.
  */

  useEffect(() => {
    setFrameImages(
      getRandomFrameImages()
    );
  }, [model]);

  return (
    <GuidelinePage>
      {/* ------------------------------------------ */}
      {/* HEADER                                     */}
      {/* ------------------------------------------ */}

      <header
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[68px]

          flex
          items-start
          justify-between
        "
      >
        <div className="max-w-[730px]">
          <p
            className="
              text-[15px]
              uppercase
              tracking-[0.16em]
              text-white/30
            "
          >
            05 / Opening Motion
          </p>

          <h1
            className="
              mt-[18px]

              text-[60px]
              leading-none
              tracking-[-0.05em]

              oook-semibold
            "
          >
            Video opening keyframes
          </h1>

          <p
            className="
              mt-[17px]
              max-w-[650px]

              text-[18px]
              leading-[1.45]

              text-white/42
            "
          >
            {flow.description}
          </p>
        </div>

        <PartnershipLockup
          model={model}
          brandAName={brandAName}
          brandBName={brandBName}
          brandALogo={
            brandA.logoUrl
          }
          brandBLogo={
            brandB.logoUrl
          }
        />
      </header>

      {/* ------------------------------------------ */}
      {/* FLOW                                       */}
      {/* ------------------------------------------ */}

      <section
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[245px]
          bottom-[66px]
        "
      >
        {/* ======================================== */}
        {/* ROW 01                                   */}
        {/* ======================================== */}

        <div
          className="
            grid

            grid-cols-[1fr_58px_1fr_58px_1fr]

            items-center
            gap-[12px]
          "
        >
          <KeyframeCard
            frame={
              flow.frames[0]
            }
            imageId={
              frameImages[0]
            }
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
            brandALogo={
              brandA.logoUrl
            }
            brandBLogo={
              brandB.logoUrl
            }
          />

          <Transition
            label={
              flow.transitions[0]
            }
          />

          <KeyframeCard
            frame={
              flow.frames[1]
            }
            imageId={
              frameImages[1]
            }
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
            brandALogo={
              brandA.logoUrl
            }
            brandBLogo={
              brandB.logoUrl
            }
          />

          <Transition
            label={
              flow.transitions[1]
            }
          />

          <KeyframeCard
            frame={
              flow.frames[2]
            }
            imageId={
              frameImages[2]
            }
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
            brandALogo={
              brandA.logoUrl
            }
            brandBLogo={
              brandB.logoUrl
            }
          />
        </div>

        {/* ======================================== */}
        {/* TURN 03 → 04                             */}
        {/* ======================================== */}

        <FlowTurn
          label={
            flow.transitions[2]
          }
        />

        {/* ======================================== */}
        {/* ROW 02                                   */}
        {/* ======================================== */}

        <div
          className="
            grid

            grid-cols-[1fr_58px_1fr_58px_1fr]

            items-center
            gap-[12px]
          "
        >
          <KeyframeCard
            frame={
              flow.frames[3]
            }
            imageId={
              frameImages[3]
            }
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
            brandALogo={
              brandA.logoUrl
            }
            brandBLogo={
              brandB.logoUrl
            }
          />

          <Transition
            label={
              flow.transitions[3]
            }
          />

          <KeyframeCard
            frame={
              flow.frames[4]
            }
            imageId={
              frameImages[4]
            }
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
            brandALogo={
              brandA.logoUrl
            }
            brandBLogo={
              brandB.logoUrl
            }
          />

          <Transition
            label={
              flow.transitions[4]
            }
          />

          <KeyframeCard
            frame={
              flow.frames[5]
            }
            imageId={
              frameImages[5]
            }
            brandAName={
              brandAName
            }
            brandBName={
              brandBName
            }
            brandALogo={
              brandA.logoUrl
            }
            brandBLogo={
              brandB.logoUrl
            }
          />
        </div>

        {/* ======================================== */}
        {/* FOOTNOTE                                 */}
        {/* ======================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0

            flex
            items-center
            justify-between

            border-t
            border-white/[0.07]

            pt-[14px]
          "
        >
          <p
            className="
              text-[10px]
              text-white/20
            "
          >
            Suggested sequence — timing
            and transitions may adapt to
            each format.
          </p>

          <p
            className="
              text-[10px]
              text-white/20
            "
          >
            Image · Gaussian blur · Noise ·
            Glass · Refraction
          </p>
        </div>
      </section>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* KEYFRAME CARD                                    */
/* ------------------------------------------------ */

function KeyframeCard({
  frame,
  imageId,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  frame: FrameSpec;

  imageId: number;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  return (
    <article>
      {/* VIDEO FRAME */}

      <div
        className="
          relative

          aspect-video
          w-full

          overflow-hidden

          rounded-[20px]

          border
          border-white/[0.10]

          bg-[#080808]
        "
      >
        <FrameBackground
          imageId={imageId}
        />

        <FrameEffects />

        <FrameContent
          variant={
            frame.variant
          }
          brandAName={
            brandAName
          }
          brandBName={
            brandBName
          }
          brandALogo={
            brandALogo
          }
          brandBLogo={
            brandBLogo
          }
        />
      </div>

      {/* CAPTION */}

      <div
        className="
          mt-[8px]

          flex
          items-baseline
          justify-between

          gap-[12px]
        "
      >
        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.14em]
            text-white/20
          "
        >
          Key frame {frame.id}
        </p>

        <p
          className="
            max-w-[66%]
            truncate

            text-right
            text-[11px]
            text-white/56

            oook-medium
          "
        >
          {frame.title}
        </p>
      </div>
    </article>
  );
}

/* ------------------------------------------------ */
/* BACKGROUND IMAGE                                 */
/* ------------------------------------------------ */

function FrameBackground({
  imageId,
}: {
  imageId: number;
}) {
  const [
    extensionIndex,
    setExtensionIndex,
  ] = useState(0);

  const [
    failed,
    setFailed,
  ] = useState(false);

  useEffect(() => {
    setExtensionIndex(0);
    setFailed(false);
  }, [imageId]);

  const src =
    `/images/image${imageId}.${IMAGE_EXTENSIONS[extensionIndex]}`;

  return (
    <>
      {/* IMAGE */}

      {!failed && (
        <img
          src={src}
          alt=""
          draggable={false}
          onError={() => {
            if (
              extensionIndex <
              IMAGE_EXTENSIONS.length - 1
            ) {
              setExtensionIndex(
                (current) =>
                  current + 1
              );
            } else {
              setFailed(true);
            }
          }}
          className="
            absolute
            inset-0

            h-full
            w-full

            scale-[1.03]

            object-cover

            grayscale
            saturate-0

            opacity-[0.92]
          "
        />
      )}

      {/* FALLBACK */}

      {failed && (
        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_70%_12%,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,#111_0%,#050505_100%)]
          "
        />
      )}

      {/* CINEMATIC CONTRAST */}

      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_48%,rgba(0,0,0,0.48)_100%)]
        "
      />

      {/* SOFT LIGHT */}

      <div
        className="
          absolute

          -right-[20%]
          -top-[32%]

          h-[80%]
          w-[72%]

          rounded-full

          bg-white/[0.055]

          blur-[68px]
        "
      />
    </>
  );
}

/* ------------------------------------------------ */
/* FRAME EFFECTS                                    */
/* ------------------------------------------------ */

function FrameEffects() {
  return (
    <>
      {/* REFLECTION */}

      <div
        className="
          pointer-events-none

          absolute

          -left-[18%]
          top-[3%]

          h-[56%]
          w-[82%]

          rotate-[-13deg]

          bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.05)_48%,transparent_72%)]

          blur-[8px]
        "
      />

      {/* REFRACTION */}

      <div
        className="
          pointer-events-none

          absolute

          -bottom-[18%]
          left-[5%]

          h-[48%]
          w-[90%]

          rotate-[3deg]

          rounded-[50%]

          border
          border-white/[0.045]

          bg-white/[0.01]

          backdrop-blur-[6px]
        "
      />

      {/* NOISE */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-[0.09]

          mix-blend-screen

          [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_4px)]
        "
      />

      {/* EDGE */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          rounded-[20px]

          shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
        "
      />
    </>
  );
}

/* ------------------------------------------------ */
/* FRAME CONTENT                                    */
/* ------------------------------------------------ */

function FrameContent({
  variant,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  variant: FrameVariant;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  /* ================================================= */
  /* ATMOSPHERE                                        */
  /* ================================================= */

  if (
    variant ===
    "atmosphere"
  ) {
    return (
      <div
        className="
          absolute

          bottom-[7%]
          left-[6%]

          max-w-[68%]
        "
      >
        <VideoGlass>
          <p
            className="
              text-[6px]
              uppercase
              tracking-[0.16em]

              text-white/30
            "
          >
            Opening atmosphere
          </p>

          <p
            className="
              mt-[4px]

              text-[10px]
              leading-[1.35]

              text-white/68
            "
          >
            Establish mood before
            introducing identity.
          </p>
        </VideoGlass>
      </div>
    );
  }

  /* ================================================= */
  /* BRAND A                                           */
  /* ================================================= */

  if (
    variant ===
    "brandAHero"
  ) {
    return (
      <BareHeroLogo
        logoUrl={
          brandALogo
        }
        fallback={
          brandAName
        }
      />
    );
  }

  /* ================================================= */
  /* BRAND B                                           */
  /* ================================================= */

  if (
    variant ===
    "brandBHero"
  ) {
    return (
      <BareHeroLogo
        logoUrl={
          brandBLogo
        }
        fallback={
          brandBName
        }
      />
    );
  }

  /* ================================================= */
  /* RELATIONSHIP                                      */
  /* ================================================= */

  if (
    variant ===
    "connectorEqual"
  ) {
    return (
      <FloatingWord symbol>
        ×
      </FloatingWord>
    );
  }

  if (
    variant ===
    "connectorWith"
  ) {
    return (
      <FloatingWord>
        with
      </FloatingWord>
    );
  }

  if (
    variant ===
    "connectorPowered"
  ) {
    return (
      <FloatingWord spaced>
        Powered by
      </FloatingWord>
    );
  }

  if (
    variant ===
    "connectorPresents"
  ) {
    return (
      <FloatingWord>
        presents
      </FloatingWord>
    );
  }

  /* ================================================= */
  /* FINAL LOCKUP — A × B                              */
  /* ================================================= */

  if (
    variant ===
    "equalLockup"
  ) {
    return (
      <div
        className="
          absolute

          inset-x-[6%]
          top-1/2

          flex
          -translate-y-1/2

          items-center
          justify-center

          gap-[5%]
        "
      >
        <VideoLogo
          logoUrl={
            brandALogo
          }
          fallback={
            brandAName
          }
          size="primary"
          floating
        />

        <span
          className="
            text-[18px]

            text-white/78

            drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]

            oook-light
          "
        >
          ×
        </span>

        <VideoLogo
          logoUrl={
            brandBLogo
          }
          fallback={
            brandBName
          }
          size="primary"
          floating
        />
      </div>
    );
  }

  /* ================================================= */
  /* FINAL LOCKUP — WITH                               */
  /* ================================================= */

  if (
    variant ===
    "withLockup"
  ) {
    return (
      <div
        className="
          absolute
          inset-0

          flex
          flex-col
          items-center
          justify-center
        "
      >
        <VideoLogo
          logoUrl={
            brandALogo
          }
          fallback={
            brandAName
          }
          size="primary"
          floating
        />

        <p
          className="
            my-[2%]

            text-[8px]
            uppercase
            tracking-[0.12em]

            text-white/70

            drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]
          "
        >
          with
        </p>

        <VideoLogo
          logoUrl={
            brandBLogo
          }
          fallback={
            brandBName
          }
          size="secondary"
          floating
        />
      </div>
    );
  }

  /* ================================================= */
  /* FINAL LOCKUP — POWERED                            */
  /* ================================================= */

  if (
    variant ===
    "poweredLockup"
  ) {
    return (
      <div
        className="
          absolute
          inset-0

          flex
          flex-col
          items-center
          justify-center
        "
      >
        <VideoLogo
          logoUrl={
            brandBLogo
          }
          fallback={
            brandBName
          }
          size="hero"
          floating
        />

        <p
          className="
            my-[2%]

            text-[7px]
            uppercase
            tracking-[0.2em]

            text-white/64

            drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]
          "
        >
          Powered by
        </p>

        <VideoLogo
          logoUrl={
            brandALogo
          }
          fallback={
            brandAName
          }
          size="credit"
          floating
        />
      </div>
    );
  }

  /* ================================================= */
  /* FINAL LOCKUP — PRESENTS                           */
  /* ================================================= */

  if (
    variant ===
    "presentsLockup"
  ) {
    return (
      <div
        className="
          absolute
          inset-0

          flex
          flex-col
          items-center
          justify-center
        "
      >
        <VideoLogo
          logoUrl={
            brandALogo
          }
          fallback={
            brandAName
          }
          size="credit"
          floating
        />

        <p
          className="
            my-[2%]

            text-[8px]

            text-white/72

            drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)]
          "
        >
          presents
        </p>

        <VideoLogo
          logoUrl={
            brandBLogo
          }
          fallback={
            brandBName
          }
          size="hero"
          floating
        />
      </div>
    );
  }

  /* ================================================= */
  /* CONTENT — EQUAL                                   */
  /* ================================================= */

  if (
    variant ===
    "contentEqual"
  ) {
    return (
      <ContentFrame
        headline="Shared experience"
        left={
          <VideoLogo
            logoUrl={
              brandALogo
            }
            fallback={
              brandAName
            }
            size="footer"
          />
        }
        right={
          <VideoLogo
            logoUrl={
              brandBLogo
            }
            fallback={
              brandBName
            }
            size="footer"
          />
        }
      />
    );
  }

  /* ================================================= */
  /* CONTENT — WITH                                    */
  /* ================================================= */

  if (
    variant ===
    "contentWith"
  ) {
    return (
      <ContentFrame
        headline={
          `${brandAName} experience`
        }
        left={
          <VideoLogo
            logoUrl={
              brandALogo
            }
            fallback={
              brandAName
            }
            size="footer"
          />
        }
        right={
          <VideoLogo
            logoUrl={
              brandBLogo
            }
            fallback={
              brandBName
            }
            size="credit"
          />
        }
      />
    );
  }

  /* ================================================= */
  /* CONTENT — POWERED                                 */
  /* ================================================= */

  if (
    variant ===
    "contentPowered"
  ) {
    return (
      <ContentFrame
        headline={
          `${brandBName} experience`
        }
        left={
          <VideoLogo
            logoUrl={
              brandBLogo
            }
            fallback={
              brandBName
            }
            size="footer"
          />
        }
        right={
          <div
            className="
              flex
              items-center
              justify-end

              gap-[5px]
            "
          >
            <span
              className="
                whitespace-nowrap

                text-[5px]
                uppercase
                tracking-[0.14em]

                text-white/32
              "
            >
              Powered by
            </span>

            <VideoLogo
              logoUrl={
                brandALogo
              }
              fallback={
                brandAName
              }
              size="credit"
            />
          </div>
        }
      />
    );
  }

  /* ================================================= */
  /* CONTENT — PRESENTS                                */
  /* ================================================= */

  return (
    <ContentFrame
      headline={
        `${brandBName} content`
      }
      left={
        <div
          className="
            flex
            items-center

            gap-[5px]
          "
        >
          <VideoLogo
            logoUrl={
              brandALogo
            }
            fallback={
              brandAName
            }
            size="credit"
          />

          <span
            className="
              whitespace-nowrap

              text-[5px]

              text-white/34
            "
          >
            presents
          </span>
        </div>
      }
      right={
        <VideoLogo
          logoUrl={
            brandBLogo
          }
          fallback={
            brandBName
          }
          size="footer"
        />
      }
    />
  );
}

/* ------------------------------------------------ */
/* HERO LOGO                                        */
/* ------------------------------------------------ */

function BareHeroLogo({
  logoUrl,
  fallback,
}: {
  logoUrl: string | null;
  fallback: string;
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
      {/* LOCAL CONTRAST */}

      <div
        className="
          absolute

          left-1/2
          top-1/2

          h-[35%]
          w-[52%]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-black/28

          blur-[30px]
        "
      />

      <VideoLogo
        logoUrl={
          logoUrl
        }
        fallback={
          fallback
        }
        size="hero"
        floating
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* VIDEO LOGO                                       */
/* ------------------------------------------------ */

function VideoLogo({
  logoUrl,
  fallback,

  size = "primary",

  floating = false,
}: {
  logoUrl: string | null;
  fallback: string;

  size?: VideoLogoSize;

  floating?: boolean;
}) {
  const sizeClasses: Record<
    VideoLogoSize,
    string
  > = {
    hero:
      "w-[36%] aspect-[3/1]",

    primary:
      "w-[26%] aspect-[3/1]",

    secondary:
      "w-[20%] aspect-[3/1]",

    credit:
      "w-[14%] aspect-[3/1]",

    footer:
      "w-[16%] aspect-[3/1]",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        shrink-0
      `}
      style={{
        filter: floating
          ? `
              drop-shadow(
                0 10px 22px
                rgba(0,0,0,0.68)
              )
              drop-shadow(
                0 2px 6px
                rgba(0,0,0,0.78)
              )
            `
          : "none",
      }}
    >
      <BrandLogo
        logoUrl={logoUrl}
        fallback={fallback}
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* FLOATING RELATIONSHIP                            */
/* ------------------------------------------------ */

function FloatingWord({
  children,

  spaced = false,
  symbol = false,
}: {
  children: ReactNode;

  spaced?: boolean;
  symbol?: boolean;
}) {
  return (
    <div
      className="
        absolute

        left-1/2
        top-1/2

        -translate-x-1/2
        -translate-y-1/2
      "
    >
      <p
        className={`
          whitespace-nowrap

          text-white/92

          drop-shadow-[0_7px_16px_rgba(0,0,0,0.85)]

          ${
            symbol
              ? "text-[34px] oook-light"
              : spaced
                ? "text-[13px] uppercase tracking-[0.28em] oook-medium"
                : "text-[22px] tracking-[-0.03em] oook-medium"
          }
        `}
      >
        {children}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* CONTENT FRAME                                    */
/* ------------------------------------------------ */

function ContentFrame({
  headline,
  left,
  right,
}: {
  headline: string;

  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <>
      {/* HEADER */}

      <div
        className="
          absolute

          left-[6%]
          right-[6%]
          top-[7%]
        "
      >
        <VideoGlass>
          <p
            className="
              truncate

              text-[8px]

              tracking-[-0.01em]

              text-white/72
            "
          >
            {headline}
          </p>
        </VideoGlass>
      </div>

      {/* FOOTER */}

      <div
        className="
          absolute

          bottom-[7%]
          left-[6%]
          right-[6%]
        "
      >
        <VideoGlass>
          <div
            className="
              flex

              min-h-[20px]

              items-center

              gap-[8px]
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
              "
            >
              {left}
            </div>

            <div
              className="
                h-px
                min-w-[12px]
                flex-[1.8]

                bg-white/[0.11]
              "
            />

            <div
              className="
                flex
                min-w-0
                flex-1

                items-center
                justify-end
              "
            >
              {right}
            </div>
          </div>
        </VideoGlass>
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* VIDEO GLASS                                      */
/* ------------------------------------------------ */

function VideoGlass({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[9px]

        border
        border-white/[0.10]

        bg-black/38

        px-[9px]
        py-[6px]

        backdrop-blur-[14px]

        shadow-[0_8px_24px_rgba(0,0,0,0.22)]
      "
    >
      {/* SPECULAR EDGE */}

      <div
        className="
          pointer-events-none

          absolute

          left-[8%]
          right-[8%]
          top-0

          h-px

          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
        "
      />

      <div className="relative">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* FLOW TURN                                        */
/* ------------------------------------------------ */

function FlowTurn({
  label,
}: {
  label: string;
}) {
  return (
    <div
      className="
        relative
        h-[54px]
      "
    >
      <div
        className="
          absolute

          right-[15%]
          top-[16px]

          h-px
          w-[61%]

          bg-white/[0.10]
        "
      />

      <div
        className="
          absolute

          left-[20%]
          top-[16px]

          h-[22px]
          w-px

          bg-white/[0.10]
        "
      />

      <div
        className="
          absolute

          left-[20%]
          top-[37px]

          h-px
          w-[28%]

          bg-white/[0.10]
        "
      />

      <div
        className="
          absolute

          left-[45%]
          top-[22px]
        "
      >
        <Transition
          label={label}
          compact
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* TRANSITION                                       */
/* ------------------------------------------------ */

function Transition({
  label,

  compact = false,
}: {
  label: string;

  compact?: boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-center
      "
    >
      <div
        className={`
          flex

          items-center
          justify-center

          rounded-full

          border
          border-white/[0.10]

          bg-black/35

          backdrop-blur-[16px]

          ${
            compact
              ? "h-[26px] px-[8px]"
              : "h-[30px] px-[9px]"
          }
        `}
      >
        <span
          className="
            mr-[5px]

            text-[9px]
            text-white/48
          "
        >
          →
        </span>

        <span
          className={`
            whitespace-nowrap

            text-white/42

            ${
              compact
                ? "text-[7px]"
                : "text-[8px]"
            }
          `}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* TOP RIGHT LOCKUP                                 */
/* ------------------------------------------------ */

function PartnershipLockup({
  model,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  /* A × B */

  if (
    model ===
    "axb"
  ) {
    return (
      <div
        className="
          flex
          items-center
          gap-[15px]
        "
      >
        <TopLogo
          logoUrl={brandALogo}
          fallback={brandAName}
        />

        <span
          className="
            text-[23px]
            text-white/20
          "
        >
          ×
        </span>

        <TopLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
        />
      </div>
    );
  }

  /* A WITH B */

  if (
    model ===
    "aandb"
  ) {
    return (
      <div
        className="
          flex
          items-end
          gap-[23px]
        "
      >
        <TopLabeledLogo
          label="Immersive experience by"
          logoUrl={brandALogo}
          fallback={brandAName}
        />

        <TopLabeledLogo
          label="In collaboration with"
          logoUrl={brandBLogo}
          fallback={brandBName}
        />
      </div>
    );
  }

  /* POWERED BY */

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <div
        className="
          flex
          flex-col
          items-end
        "
      >
        <div
          className="
            h-[40px]
            w-[148px]
          "
        >
          <BrandLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
          />
        </div>

        <div
          className="
            mt-[6px]

            flex
            items-center
            gap-[8px]
          "
        >
          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.14em]

              text-white/20
            "
          >
            Powered by
          </span>

          <div
            className="
              h-[22px]
              w-[88px]
            "
          >
            <BrandLogo
              logoUrl={brandALogo}
              fallback={brandAName}
            />
          </div>
        </div>
      </div>
    );
  }

  /* PRESENTS */

  return (
    <div
      className="
        flex
        flex-col
        items-end
      "
    >
      <div
        className="
          h-[26px]
          w-[105px]
        "
      >
        <BrandLogo
          logoUrl={brandALogo}
          fallback={brandAName}
        />
      </div>

      <p
        className="
          my-[4px]

          text-[7px]
          uppercase
          tracking-[0.15em]

          text-white/20
        "
      >
        Presents
      </p>

      <div
        className="
          h-[36px]
          w-[136px]
        "
      >
        <BrandLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* TOP LOGOS                                        */
/* ------------------------------------------------ */

function TopLogo({
  logoUrl,
  fallback,
}: {
  logoUrl: string | null;
  fallback: string;
}) {
  return (
    <div
      className="
        h-[40px]
        w-[128px]
      "
    >
      <BrandLogo
        logoUrl={logoUrl}
        fallback={fallback}
      />
    </div>
  );
}

function TopLabeledLogo({
  label,

  logoUrl,
  fallback,
}: {
  label: string;

  logoUrl: string | null;
  fallback: string;
}) {
  return (
    <div>
      <p
        className="
          mb-[4px]

          text-[7px]
          text-white/18
        "
      >
        {label}
      </p>

      <div
        className="
          h-[32px]
          w-[124px]
        "
      >
        <BrandLogo
          logoUrl={logoUrl}
          fallback={fallback}
        />
      </div>
    </div>
  );
}