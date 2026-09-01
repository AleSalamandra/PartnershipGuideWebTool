"use client";

import React, {
  useEffect,
  useState,
} from "react";

import GuidelinePage from "./GuidelinePage";
import BrandLogo from "./BrandLogo";

import { useGuidelineStore } from "@/store/guidelineStore";
import { PartnershipModelId } from "@/types/guideline";

/* ------------------------------------------------ */
/* IMAGES                                           */
/* ------------------------------------------------ */

const BACKGROUND_IMAGES = Array.from(
  { length: 10 },
  (_, index) =>
    `/images/image${index + 1}.png`
);

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

type FrameVariant =
  | "atmosphere"
  | "brandAHero"
  | "brandBHero"
  | "connectorWith"
  | "connectorPowered"
  | "connectorPresents"
  | "equalLockup"
  | "withLockup"
  | "poweredLockup"
  | "contentEqual"
  | "contentWith"
  | "contentPowered"
  | "contentPresents";

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
    string
  ];

  frames: FrameSpec[];
}

/* ------------------------------------------------ */
/* RANDOM IMAGES                                    */
/* ------------------------------------------------ */

function getRandomFrameImages() {
  const shuffled = [
    ...BACKGROUND_IMAGES,
  ].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 5);
}

/* ------------------------------------------------ */
/* FLOW DATA                                        */
/* ------------------------------------------------ */

function getOpeningFlow(
  model: PartnershipModelId,
  brandAName: string,
  brandBName: string
): OpeningFlow {
  switch (model) {
    /* -------------------------------------------- */
    /* A × B                                        */
    /* -------------------------------------------- */

    case "axb":
      return {
        description:
          "Both brands arrive with equal optical weight before resolving into a shared visual system.",

        transitions: [
          "fade in",
          "crossfade",
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
            title: brandBName,
            variant: "brandBHero",
          },
          {
            id: "04",
            title: `${brandAName} × ${brandBName}`,
            variant: "equalLockup",
          },
          {
            id: "05",
            title: "Content starts",
            variant: "contentEqual",
          },
        ],
      };

    /* -------------------------------------------- */
    /* A WITH B                                     */
    /* -------------------------------------------- */

    case "aandb":
      return {
        description:
          `${brandAName} introduces the experience first. ${brandBName} follows as a visible supporting partner.`,

        transitions: [
          "fade in",
          "type in",
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
            variant: "connectorWith",
          },
          {
            id: "04",
            title: `${brandAName} with ${brandBName}`,
            variant: "withLockup",
          },
          {
            id: "05",
            title: "Content starts",
            variant: "contentWith",
          },
        ],
      };

    /* -------------------------------------------- */
    /* B POWERED BY A                               */
    /* -------------------------------------------- */

    case "poweredByA":
      return {
        description:
          `${brandBName} owns the opening. ${brandAName} appears later as a restrained technology endorsement.`,

        transitions: [
          "fade in",
          "crossfade",
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
            variant: "connectorPowered",
          },
          {
            id: "04",
            title: `${brandBName} powered by ${brandAName}`,
            variant: "poweredLockup",
          },
          {
            id: "05",
            title: "Content starts",
            variant: "contentPowered",
          },
        ],
      };

    /* -------------------------------------------- */
    /* A PRESENTS B                                 */
    /* -------------------------------------------- */

    case "presentsB":
    default:
      return {
        description:
          `${brandAName} establishes the platform first and then introduces ${brandBName} as the featured content.`,

        transitions: [
          "fade in",
          "type in",
          "reveal",
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
            variant: "connectorPresents",
          },
          {
            id: "04",
            title: brandBName,
            variant: "brandBHero",
          },
          {
            id: "05",
            title: "Content starts",
            variant: "contentPresents",
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
    brandA.name.trim() || "Brand A";

  const brandBName =
    brandB.name.trim() || "Brand B";

  const flow = getOpeningFlow(
    model,
    brandAName,
    brandBName
  );

  const [frameImages, setFrameImages] =
    useState<string[]>([
      BACKGROUND_IMAGES[0],
      BACKGROUND_IMAGES[1],
      BACKGROUND_IMAGES[2],
      BACKGROUND_IMAGES[3],
      BACKGROUND_IMAGES[4],
    ]);

  /*
    Escoge 5 fondos al entrar en la página.

    También cambia la selección si el usuario
    cambia de partnership model.
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
          brandALogo={brandA.logoUrl}
          brandBLogo={brandB.logoUrl}
        />
      </header>

      {/* ------------------------------------------ */}
      {/* KEYFRAME FLOW                              */}
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
        {/* TOP ROW */}

        <div
          className="
            grid
            grid-cols-[1fr_62px_1fr_62px_1fr]

            items-center
            gap-[14px]
          "
        >
          <KeyframeCard
            frame={flow.frames[0]}
            image={frameImages[0]}
            brandAName={brandAName}
            brandBName={brandBName}
            brandALogo={brandA.logoUrl}
            brandBLogo={brandB.logoUrl}
          />

          <Transition
            label={
              flow.transitions[0]
            }
          />

          <KeyframeCard
            frame={flow.frames[1]}
            image={frameImages[1]}
            brandAName={brandAName}
            brandBName={brandBName}
            brandALogo={brandA.logoUrl}
            brandBLogo={brandB.logoUrl}
          />

          <Transition
            label={
              flow.transitions[1]
            }
          />

          <KeyframeCard
            frame={flow.frames[2]}
            image={frameImages[2]}
            brandAName={brandAName}
            brandBName={brandBName}
            brandALogo={brandA.logoUrl}
            brandBLogo={brandB.logoUrl}
          />
        </div>

        {/* FLOW TURN */}

        <div
          className="
            relative
            h-[62px]
          "
        >
          <div
            className="
              absolute

              right-[16%]
              top-[18px]

              h-px
              w-[63%]

              bg-white/[0.10]
            "
          />

          <div
            className="
              absolute

              left-[21%]
              top-[18px]

              h-[25px]
              w-px

              bg-white/[0.10]
            "
          />

          <div
            className="
              absolute

              left-[21%]
              top-[42px]

              h-px
              w-[26%]

              bg-white/[0.10]
            "
          />

          <div
            className="
              absolute
              left-[44%]
              top-[26px]
            "
          >
            <Transition
              label={
                flow.transitions[2]
              }
              compact
            />
          </div>
        </div>

        {/* BOTTOM ROW */}

        <div
          className="
            grid
            max-w-[940px]

            grid-cols-[1fr_62px_1fr]

            items-center
            gap-[14px]
          "
        >
          <KeyframeCard
            frame={flow.frames[3]}
            image={frameImages[3]}
            brandAName={brandAName}
            brandBName={brandBName}
            brandALogo={brandA.logoUrl}
            brandBLogo={brandB.logoUrl}
          />

          <Transition
            label={
              flow.transitions[3]
            }
          />

          <KeyframeCard
            frame={flow.frames[4]}
            image={frameImages[4]}
            brandAName={brandAName}
            brandBName={brandBName}
            brandALogo={brandA.logoUrl}
            brandBLogo={brandB.logoUrl}
          />
        </div>

        {/* FOOTNOTE */}

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
            Suggested sequence — timing and
            transitions may adapt to each format.
          </p>

          <p
            className="
              text-[10px]
              text-white/20
            "
          >
            Image · Gaussian blur · Noise · Glass ·
            Refraction
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
  image,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  frame: FrameSpec;

  image: string;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  return (
    <article>
      {/* VISUAL */}

      <div
        className="
          relative

          h-[215px]

          overflow-hidden

          rounded-[26px]

          border
          border-white/[0.10]

          bg-[#080808]
        "
      >
        <FrameBackground
          src={image}
        />

        <FrameEffects />

        <FrameContent
          variant={frame.variant}
          brandAName={brandAName}
          brandBName={brandBName}
          brandALogo={brandALogo}
          brandBLogo={brandBLogo}
        />
      </div>

      {/* CAPTION */}

      <div
        className="
          mt-[10px]

          flex
          items-baseline
          justify-between
          gap-[15px]
        "
      >
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.14em]
            text-white/22
          "
        >
          Key frame {frame.id}
        </p>

        <p
          className="
            truncate

            text-right
            text-[13px]
            text-white/58

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
  src,
}: {
  src: string;
}) {
  return (
    <>
      <img
        src={src}
        alt=""
        draggable={false}
        className="
          absolute
          inset-0

          h-full
          w-full

          scale-[1.04]

          object-cover

          opacity-[0.82]

          grayscale

          saturate-0
        "
      />

      {/* cinematic darkening */}

      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.62)_100%)]
        "
      />

      {/* optical glow */}

      <div
        className="
          absolute
          -right-[18%]
          -top-[30%]

          h-[80%]
          w-[70%]

          rounded-full

          bg-white/[0.09]

          blur-[70px]
        "
      />
    </>
  );
}

/* ------------------------------------------------ */
/* APPLE-LIKE EFFECTS                               */
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
          top-[4%]

          h-[58%]
          w-[85%]

          rotate-[-13deg]

          bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.06)_48%,transparent_72%)]

          blur-[8px]
        "
      />

      {/* REFRACTION BAND */}

      <div
        className="
          pointer-events-none

          absolute
          -bottom-[15%]
          left-[5%]

          h-[48%]
          w-[90%]

          rotate-[3deg]

          rounded-[50%]

          border
          border-white/[0.05]

          bg-white/[0.015]

          backdrop-blur-[7px]
        "
      />

      {/* NOISE */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-[0.11]

          mix-blend-screen

          [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_4px)]
        "
      />

      {/* EDGE LIGHT */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          rounded-[26px]

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
  /* -------------------------------------------- */
  /* ATMOSPHERE                                   */
  /* -------------------------------------------- */

  if (
    variant ===
    "atmosphere"
  ) {
    return (
      <div
        className="
          absolute
          bottom-[18px]
          left-[18px]
          right-[18px]
        "
      >
        <GlassLowerThird>
          <div>
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.15em]
                text-white/35
              "
            >
              Opening atmosphere
            </p>

            <p
              className="
                mt-[5px]

                max-w-[250px]

                text-[14px]
                leading-[1.35]

                text-white/72
              "
            >
              Establish mood before
              introducing identity.
            </p>
          </div>
        </GlassLowerThird>
      </div>
    );
  }

  /* -------------------------------------------- */
  /* BRAND A                                      */
  /* -------------------------------------------- */

  if (
    variant ===
    "brandAHero"
  ) {
    return (
      <BareHeroLogo
        logoUrl={brandALogo}
        fallback={brandAName}
      />
    );
  }

  /* -------------------------------------------- */
  /* BRAND B                                      */
  /* -------------------------------------------- */

  if (
    variant ===
    "brandBHero"
  ) {
    return (
      <BareHeroLogo
        logoUrl={brandBLogo}
        fallback={brandBName}
      />
    );
  }

  /* -------------------------------------------- */
  /* WORDS                                        */
  /* -------------------------------------------- */

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

  /* -------------------------------------------- */
  /* EQUAL LOCKUP                                 */
  /* -------------------------------------------- */

  if (
    variant ===
    "equalLockup"
  ) {
    return (
      <div
        className="
          absolute
          left-[12%]
          right-[12%]
          top-1/2

          flex
          -translate-y-1/2

          items-center
          justify-center

          gap-[22px]
        "
      >
        <Logo
          logoUrl={brandALogo}
          fallback={brandAName}
          width="145px"
          height="48px"
        />

        <span
          className="
            text-[27px]
            text-white/58

            oook-light
          "
        >
          ×
        </span>

        <Logo
          logoUrl={brandBLogo}
          fallback={brandBName}
          width="145px"
          height="48px"
        />
      </div>
    );
  }

  /* -------------------------------------------- */
  /* WITH LOCKUP                                  */
  /* -------------------------------------------- */

  if (
    variant ===
    "withLockup"
  ) {
    return (
      <div
        className="
          absolute
          left-1/2
          top-1/2

          flex
          -translate-x-1/2
          -translate-y-1/2

          flex-col
          items-center
        "
      >
        <Logo
          logoUrl={brandALogo}
          fallback={brandAName}
          width="165px"
          height="48px"
        />

        <p
          className="
            my-[7px]

            text-[12px]
            text-white/55
          "
        >
          with
        </p>

        <Logo
          logoUrl={brandBLogo}
          fallback={brandBName}
          width="125px"
          height="38px"
        />
      </div>
    );
  }

  /* -------------------------------------------- */
  /* POWERED LOCKUP                               */
  /* -------------------------------------------- */

  if (
    variant ===
    "poweredLockup"
  ) {
    return (
      <div
        className="
          absolute
          left-1/2
          top-1/2

          flex
          -translate-x-1/2
          -translate-y-1/2

          flex-col
          items-center
        "
      >
        <Logo
          logoUrl={brandBLogo}
          fallback={brandBName}
          width="170px"
          height="54px"
        />

        <p
          className="
            my-[8px]

            text-[9px]
            uppercase
            tracking-[0.18em]

            text-white/40
          "
        >
          Powered by
        </p>

        <Logo
          logoUrl={brandALogo}
          fallback={brandAName}
          width="100px"
          height="30px"
        />
      </div>
    );
  }

  /* -------------------------------------------- */
  /* CONTENT                                      */
  /* -------------------------------------------- */

  if (
    variant ===
    "contentEqual"
  ) {
    return (
      <ContentFrame
        headline="Shared experience"
        left={
          <Logo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="82px"
            height="22px"
          />
        }
        right={
          <Logo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="82px"
            height="22px"
          />
        }
      />
    );
  }

  if (
    variant ===
    "contentWith"
  ) {
    return (
      <ContentFrame
        headline={`${brandAName} experience`}
        left={
          <Logo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="90px"
            height="24px"
          />
        }
        right={
          <Logo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="64px"
            height="20px"
          />
        }
      />
    );
  }

  if (
    variant ===
    "contentPowered"
  ) {
    return (
      <ContentFrame
        headline={`${brandBName} experience`}
        left={
          <Logo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="90px"
            height="24px"
          />
        }
        right={
          <div
            className="
              flex
              items-center
              gap-[7px]
            "
          >
            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.14em]
                text-white/35
              "
            >
              Powered by
            </span>

            <Logo
              logoUrl={brandALogo}
              fallback={brandAName}
              width="56px"
              height="18px"
            />
          </div>
        }
      />
    );
  }

  return (
    <ContentFrame
      headline={`${brandBName} content`}
      left={
        <div
          className="
            flex
            items-center
            gap-[6px]
          "
        >
          <Logo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="58px"
            height="18px"
          />

          <span
            className="
              text-[8px]
              text-white/35
            "
          >
            presents
          </span>
        </div>
      }
      right={
        <Logo
          logoUrl={brandBLogo}
          fallback={brandBName}
          width="84px"
          height="24px"
        />
      }
    />
  );
}

/* ------------------------------------------------ */
/* BARE LOGO                                        */
/* ------------------------------------------------ */

function BareHeroLogo({
  logoUrl,
  fallback,
}: {
  logoUrl: string | null;
  fallback: string;
}) {
  return (
    <>
      {/* subtle bloom behind logo */}

      <div
        className="
          absolute
          left-1/2
          top-1/2

          h-[65px]
          w-[190px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-white/[0.08]

          blur-[42px]
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-1/2

          h-[62px]
          w-[190px]

          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <BrandLogo
          logoUrl={logoUrl}
          fallback={fallback}
        />
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* FLOATING WORD                                    */
/* ------------------------------------------------ */

function FloatingWord({
  children,
  spaced = false,
}: {
  children: React.ReactNode;
  spaced?: boolean;
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

          text-white/88

          ${
            spaced
              ? "text-[17px] uppercase tracking-[0.28em]"
              : "text-[29px] tracking-[-0.03em]"
          }

          oook-medium
        `}
      >
        {children}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* GLASS LOWER THIRD                                */
/* ------------------------------------------------ */

function GlassLowerThird({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[18px]

        border
        border-white/[0.12]

        bg-black/35

        px-[15px]
        py-[12px]

        backdrop-blur-[20px]

        shadow-[0_14px_40px_rgba(0,0,0,0.28)]
      "
    >
      {/* reflection */}

      <div
        className="
          pointer-events-none

          absolute
          inset-x-0
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
/* CONTENT FRAME                                    */
/* ------------------------------------------------ */

function ContentFrame({
  headline,
  left,
  right,
}: {
  headline: string;

  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <>
      {/* HEADER GLASS */}

      <div
        className="
          absolute

          left-[16px]
          right-[16px]
          top-[16px]
        "
      >
        <GlassLowerThird>
          <p
            className="
              truncate

              text-[14px]
              text-white/75
            "
          >
            {headline}
          </p>
        </GlassLowerThird>
      </div>

      {/* LOWER THIRD */}

      <div
        className="
          absolute

          bottom-[16px]
          left-[16px]
          right-[16px]
        "
      >
        <GlassLowerThird>
          <div
            className="
              flex
              items-center
              justify-between

              gap-[16px]
            "
          >
            <div className="shrink-0">
              {left}
            </div>

            <div
              className="
                h-px
                flex-1
                bg-white/[0.12]
              "
            />

            <div className="shrink-0">
              {right}
            </div>
          </div>
        </GlassLowerThird>
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* LOGO                                             */
/* ------------------------------------------------ */

function Logo({
  logoUrl,
  fallback,
  width,
  height,
}: {
  logoUrl: string | null;
  fallback: string;

  width: string;
  height: string;
}) {
  return (
    <div
      style={{
        width,
        height,
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

          bg-white/[0.035]

          backdrop-blur-[16px]

          ${
            compact
              ? "h-[30px] px-[10px]"
              : "h-[34px] px-[11px]"
          }
        `}
      >
        <span
          className="
            mr-[6px]

            text-[11px]
            text-white/50
          "
        >
          →
        </span>

        <span
          className={`
            whitespace-nowrap

            text-white/45

            ${
              compact
                ? "text-[9px]"
                : "text-[10px]"
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
/* TOP RIGHT PARTNERSHIP LOCKUP                     */
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

  /* B POWERED BY A */

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

  /* A PRESENTS B */

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