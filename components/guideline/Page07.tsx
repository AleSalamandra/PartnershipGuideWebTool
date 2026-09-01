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
/* IMAGES                                           */
/* ------------------------------------------------ */

const BACKGROUND_IMAGE_IDS = Array.from(
  { length: 10 },
  (_, index) => index + 1
);

const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
];

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

type ClosingVariant =
  | "signature"
  | "footage"
  | "cta"
  | "minimal";

interface ClosingSpec {
  id: string;
  title: string;
  description: string;
  variant: ClosingVariant;
}

interface ClosingContent {
  intro: string;

  closings: [
    ClosingSpec,
    ClosingSpec,
    ClosingSpec,
    ClosingSpec
  ];
}

/* ------------------------------------------------ */
/* CLOSING HIERARCHY                                */
/* ------------------------------------------------ */

/*
  Closing hierarchy follows Page04:

  A × B
  Equal final prominence.

  A with B
  A = primary sign-off
  B = supporting partner
  approx. 68 / 32

  B powered by A
  B = consumer-facing owner
  A = technology endorsement
  approx. 85 / 15

  A presents B
  The experience returns to A after
  the featured B content has ended.
*/

const CLOSING_HIERARCHY = {
  axb: {
    brandA: 50,
    brandB: 50,
  },

  aandb: {
    brandA: 68,
    brandB: 32,
  },

  poweredByA: {
    brandA: 15,
    brandB: 85,
  },

  presentsB: {
    brandA: 70,
    brandB: 30,
  },
} satisfies Record<
  PartnershipModelId,
  {
    brandA: number;
    brandB: number;
  }
>;

/* ------------------------------------------------ */
/* RANDOM IMAGES                                    */
/* ------------------------------------------------ */

function getRandomImages() {
  const images = [
    ...BACKGROUND_IMAGE_IDS,
  ];

  for (
    let i = images.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [images[i], images[j]] = [
      images[j],
      images[i],
    ];
  }

  return images.slice(0, 4);
}

/* ------------------------------------------------ */
/* CONTENT                                          */
/* ------------------------------------------------ */

function getClosingContent(
  model: PartnershipModelId,
  brandAName: string,
  brandBName: string
): ClosingContent {
  switch (model) {
    /* ================================================= */
    /* A × B                                             */
    /* ================================================= */

    case "axb":
      return {
        intro:
          "Both brands close the experience together with equal optical prominence and a shared final signature.",

        closings: [
          {
            id: "01",
            title: "Final signature",
            description: "Equal brand sign-off",
            variant: "signature",
          },

          {
            id: "02",
            title: "Over footage",
            description: "Shared closing overlay",
            variant: "footage",
          },

          {
            id: "03",
            title: "CTA end card",
            description: "Neutral shared CTA",
            variant: "cta",
          },

          {
            id: "04",
            title: "Minimal closing",
            description:
              `${brandAName} × ${brandBName}`,
            variant: "minimal",
          },
        ],
      };

    /* ================================================= */
    /* A WITH B                                          */
    /* ================================================= */

    case "aandb":
      return {
        intro:
          `${brandAName} provides the primary final sign-off while ${brandBName} remains visible as the content partner.`,

        closings: [
          {
            id: "01",
            title: "Final signature",
            description:
              `${brandAName}-led sign-off`,
            variant: "signature",
          },

          {
            id: "02",
            title: "Over footage",
            description:
              "Primary + partner acknowledgement",
            variant: "footage",
          },

          {
            id: "03",
            title: "CTA end card",
            description:
              `${brandAName}-owned CTA`,
            variant: "cta",
          },

          {
            id: "04",
            title: "Minimal closing",
            description:
              `${brandAName} with ${brandBName}`,
            variant: "minimal",
          },
        ],
      };

    /* ================================================= */
    /* B POWERED BY A                                    */
    /* ================================================= */

    case "poweredByA":
      return {
        intro:
          `${brandBName} owns the final consumer relationship. ${brandAName} appears only as a restrained technology and production credit.`,

        closings: [
          {
            id: "01",
            title: "Final signature",
            description:
              `${brandBName}-owned`,
            variant: "signature",
          },

          {
            id: "02",
            title: "Over footage",
            description:
              "Technology endorsement",
            variant: "footage",
          },

          {
            id: "03",
            title: "CTA end card",
            description:
              `${brandBName}-owned CTA`,
            variant: "cta",
          },

          {
            id: "04",
            title: "Minimal closing",
            description:
              `Powered by ${brandAName}`,
            variant: "minimal",
          },
        ],
      };

    /* ================================================= */
    /* A PRESENTS B                                      */
    /* ================================================= */

    case "presentsB":
    default:
      return {
        intro:
          `After ${brandBName} content ends, the experience returns to ${brandAName} for the final product signature.`,

        closings: [
          {
            id: "01",
            title: "Final signature",
            description:
              `${brandAName} closes`,
            variant: "signature",
          },

          {
            id: "02",
            title: "Over footage",
            description:
              "Featured content acknowledgement",
            variant: "footage",
          },

          {
            id: "03",
            title: "CTA end card",
            description:
              `${brandAName}-owned CTA`,
            variant: "cta",
          },

          {
            id: "04",
            title: "Minimal closing",
            description:
              `${brandAName} featuring ${brandBName}`,
            variant: "minimal",
          },
        ],
      };
  }
}

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page07() {
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

  const content =
    getClosingContent(
      model,
      brandAName,
      brandBName
    );

  const hierarchy =
    CLOSING_HIERARCHY[model];

  const [
    images,
    setImages,
  ] = useState<number[]>([
    1,
    2,
    3,
    4,
  ]);

  useEffect(() => {
    setImages(
      getRandomImages()
    );
  }, [model]);

  return (
    <GuidelinePage>
      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

      <header
        className="
          absolute

          left-[76px]
          right-[76px]
          top-[62px]

          flex
          items-start
          justify-between
        "
      >
        <div
          className="
            min-w-0
            max-w-[980px]
          "
        >
          <p
            className="
              text-[13px]
              uppercase
              tracking-[0.17em]

              text-white/28
            "
          >
            07 / Closing Identity
          </p>

          <h1
            className="
              mt-[15px]

              whitespace-nowrap

              text-[52px]
              leading-[0.95]
              tracking-[-0.05em]

              oook-semibold
            "
          >
            Video closing applications
          </h1>

          <p
            className="
              mt-[15px]

              max-w-[760px]

              text-[16px]
              leading-[1.4]

              text-white/40
            "
          >
            {content.intro}
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

      {/* ================================================= */}
      {/* GRID                                              */}
      {/* ================================================= */}

      <section
        className="
          absolute

          left-[76px]
          right-[76px]

          top-[250px]
          bottom-[74px]

          grid
          grid-cols-2
          grid-rows-2

          gap-x-[46px]
          gap-y-[24px]
        "
      >
        {content.closings.map(
          (
            closing,
            index
          ) => (
            <ClosingCard
              key={closing.id}
              closing={closing}
              model={model}
              hierarchy={hierarchy}
              imageId={images[index]}
              brandAName={brandAName}
              brandBName={brandBName}
              brandALogo={brandA.logoUrl}
              brandBLogo={brandB.logoUrl}
            />
          )
        )}
      </section>

      {/* ================================================= */}
      {/* FOOTER                                            */}
      {/* ================================================= */}

      <footer
        className="
          absolute

          bottom-[39px]
          left-[76px]
          right-[76px]

          flex
          items-center
          justify-between

          border-t
          border-white/[0.07]

          pt-[12px]
        "
      >
        <p
          className="
            text-[9px]
            text-white/20
          "
        >
          Closing layouts may adapt to duration,
          platform and campaign requirements.
        </p>

        <p
          className="
            text-[9px]
            text-white/20
          "
        >
          Sign-off · CTA · Credits · Ownership · Clear space
        </p>
      </footer>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* CLOSING CARD                                     */
/* ------------------------------------------------ */

function ClosingCard({
  closing,
  model,
  hierarchy,
  imageId,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  closing: ClosingSpec;

  model: PartnershipModelId;

  hierarchy: {
    brandA: number;
    brandB: number;
  };

  imageId: number;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  return (
    <article
      className="
        grid
        min-h-0

        grid-cols-[112px_minmax(0,1fr)]

        gap-[18px]
      "
    >
      {/* LABEL */}

      <div
        className="
          flex
          flex-col
          justify-center
        "
      >
        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.15em]

            text-white/23
          "
        >
          {closing.id}
        </p>

        <h2
          className="
            mt-[6px]

            text-[17px]
            leading-[1.02]

            text-white/80

            oook-medium
          "
        >
          {closing.title}
        </h2>

        <div
          className="
            mt-[9px]

            h-px
            w-[52px]

            bg-white/14
          "
        />

        <p
          className="
            mt-[9px]

            max-w-[98px]

            text-[10px]
            leading-[1.35]

            text-white/33
          "
        >
          {closing.description}
        </p>
      </div>

      {/* VIDEO */}

      <div
        className="
          relative

          aspect-video
          w-full

          overflow-hidden

          rounded-[18px]

          border
          border-white/[0.10]

          bg-[#080808]
        "
      >
        <FrameBackground
          imageId={imageId}
        />

        <FrameEffects />

        <ClosingApplication
          variant={closing.variant}
          model={model}
          hierarchy={hierarchy}
          brandAName={brandAName}
          brandBName={brandBName}
          brandALogo={brandALogo}
          brandBLogo={brandBLogo}
        />
      </div>
    </article>
  );
}

/* ------------------------------------------------ */
/* CLOSING APPLICATION                              */
/* ------------------------------------------------ */

function ClosingApplication({
  variant,
  model,
  hierarchy,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  variant: ClosingVariant;

  model: PartnershipModelId;

  hierarchy: {
    brandA: number;
    brandB: number;
  };

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  if (
    variant === "signature"
  ) {
    return (
      <FinalSignature
        model={model}
        hierarchy={hierarchy}
        brandAName={brandAName}
        brandBName={brandBName}
        brandALogo={brandALogo}
        brandBLogo={brandBLogo}
      />
    );
  }

  if (
    variant === "footage"
  ) {
    return (
      <FootageSignoff
        model={model}
        brandAName={brandAName}
        brandBName={brandBName}
        brandALogo={brandALogo}
        brandBLogo={brandBLogo}
      />
    );
  }

  if (
    variant === "cta"
  ) {
    return (
      <CTAEndCard
        model={model}
        brandAName={brandAName}
        brandBName={brandBName}
        brandALogo={brandALogo}
        brandBLogo={brandBLogo}
      />
    );
  }

  return (
    <MinimalClosing
      model={model}
      hierarchy={hierarchy}
      brandAName={brandAName}
      brandBName={brandBName}
      brandALogo={brandALogo}
      brandBLogo={brandBLogo}
    />
  );
}

/* ------------------------------------------------ */
/* 01 — FINAL SIGNATURE                             */
/* ------------------------------------------------ */

function FinalSignature({
  model,
  hierarchy,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;

  hierarchy: {
    brandA: number;
    brandB: number;
  };

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  return (
    <>
      <div
        className="
          absolute
          inset-0

          bg-black/28
          backdrop-blur-[1px]
        "
      />

      {/* A × B */}

      {model === "axb" && (
        <div
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center

            gap-[7%]
          "
        >
          <ClosingLogo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="29%"
          />

          <span
            className="
              text-[17px]
              text-white/58
            "
          >
            ×
          </span>

          <ClosingLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="29%"
          />
        </div>
      )}

      {/* A WITH B */}

      {model === "aandb" && (
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
          <ClosingLogo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="35%"
          />

          <p
            className="
              my-[2%]

              text-[6px]
              uppercase
              tracking-[0.14em]

              text-white/36
            "
          >
            in collaboration with
          </p>

          <ClosingLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="18%"
          />
        </div>
      )}

      {/* POWERED BY */}

      {model === "poweredByA" && (
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
          <ClosingLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="40%"
          />

          <div
            className="
              mt-[8px]

              flex
              items-center

              gap-[6px]
            "
          >
            <span
              className="
                text-[5px]
                uppercase
                tracking-[0.16em]

                text-white/30
              "
            >
              Powered by
            </span>

            <ClosingLogo
              logoUrl={brandALogo}
              fallback={brandAName}
              width="11%"
            />
          </div>
        </div>
      )}

      {/* PRESENTS */}

      {model === "presentsB" && (
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
          <ClosingLogo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="36%"
          />

          <p
            className="
              mt-[7px]

              text-[6px]
              text-white/35
            "
          >
            A {brandAName} immersive experience
          </p>

          <p
            className="
              mt-[4px]

              text-[5px]
              text-white/22
            "
          >
            featuring {brandBName}
          </p>
        </div>
      )}

      <HierarchyMarker
        brandA={hierarchy.brandA}
        brandB={hierarchy.brandB}
      />
    </>
  );
}

/* ------------------------------------------------ */
/* 02 — OVER FOOTAGE                                */
/* ------------------------------------------------ */

function FootageSignoff({
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
  return (
    <>
      <div
        className="
          absolute
          inset-x-0
          bottom-0

          h-[46%]

          bg-gradient-to-t

          from-black/80
          via-black/35
          to-transparent
        "
      />

      <div
        className="
          absolute

          bottom-[7%]
          left-[6%]
          right-[6%]
        "
      >
        <VideoGlass>
          {/* A × B */}

          {model === "axb" && (
            <div
              className="
                flex
                min-h-[28px]

                items-center
                justify-between

                gap-[10px]
              "
            >
              <MiniLogo
                logoUrl={brandALogo}
                fallback={brandAName}
                width="66px"
              />

              <p
                className="
                  text-[7px]
                  text-white/42
                "
              >
                Thank you for watching
              </p>

              <MiniLogo
                logoUrl={brandBLogo}
                fallback={brandBName}
                width="66px"
              />
            </div>
          )}

          {/* A WITH B */}

          {model === "aandb" && (
            <div
              className="
                flex
                min-h-[28px]

                items-center

                gap-[10px]
              "
            >
              <MiniLogo
                logoUrl={brandALogo}
                fallback={brandAName}
                width="80px"
              />

              <div className="flex-1" />

              <span
                className="
                  text-[5px]
                  text-white/25
                "
              >
                with
              </span>

              <MiniLogo
                logoUrl={brandBLogo}
                fallback={brandBName}
                width="42px"
              />
            </div>
          )}

          {/* POWERED */}

          {model === "poweredByA" && (
            <div
              className="
                flex
                min-h-[28px]

                items-center

                gap-[10px]
              "
            >
              <MiniLogo
                logoUrl={brandBLogo}
                fallback={brandBName}
                width="86px"
              />

              <div className="flex-1" />

              <span
                className="
                  text-[5px]
                  uppercase
                  tracking-[0.14em]

                  text-white/25
                "
              >
                Technology by
              </span>

              <MiniLogo
                logoUrl={brandALogo}
                fallback={brandAName}
                width="34px"
              />
            </div>
          )}

          {/* PRESENTS */}

          {model === "presentsB" && (
            <div
              className="
                flex
                min-h-[28px]

                items-center

                gap-[8px]
              "
            >
              <MiniLogo
                logoUrl={brandALogo}
                fallback={brandAName}
                width="74px"
              />

              <p
                className="
                  ml-[5px]

                  text-[6px]
                  text-white/36
                "
              >
                Immersive experiences beyond the screen
              </p>

              <div className="flex-1" />

              <span
                className="
                  text-[5px]
                  text-white/22
                "
              >
                featuring
              </span>

              <MiniLogo
                logoUrl={brandBLogo}
                fallback={brandBName}
                width="42px"
              />
            </div>
          )}
        </VideoGlass>
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* 03 — CTA END CARD                                */
/* ------------------------------------------------ */

function CTAEndCard({
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
  const ownerLogo =
    model === "poweredByA"
      ? brandBLogo
      : brandALogo;

  const ownerName =
    model === "poweredByA"
      ? brandBName
      : brandAName;

  return (
    <>
      {/* GLASS CTA */}

      <div
        className="
          absolute

          left-[7%]
          top-1/2

          w-[52%]

          -translate-y-1/2
        "
      >
        <VideoGlass>
          <p
            className="
              text-[6px]
              uppercase
              tracking-[0.14em]

              text-white/28
            "
          >
            Continue the experience
          </p>

          <p
            className="
              mt-[5px]

              text-[14px]
              leading-[1.05]
              tracking-[-0.03em]

              text-white/82

              oook-medium
            "
          >
            Discover more
          </p>

          <div
            className="
              mt-[9px]

              inline-flex

              rounded-full

              border
              border-white/12

              bg-white/[0.05]

              px-[10px]
              py-[5px]
            "
          >
            <span
              className="
                text-[6px]
                text-white/48
              "
            >
              Visit experience →
            </span>
          </div>
        </VideoGlass>
      </div>

      {/* OWNER */}

      <div
        className="
          absolute

          bottom-[8%]
          right-[6%]

          w-[24%]
        "
      >
        <ClosingLogo
          logoUrl={ownerLogo}
          fallback={ownerName}
          width="100%"
        />
      </div>

      {/* MODEL-SPECIFIC CREDIT */}

      {model === "axb" && (
        <div
          className="
            absolute

            right-[6%]
            top-[9%]

            w-[24%]
          "
        >
          <ClosingLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="100%"
          />
        </div>
      )}

      {model === "aandb" && (
        <div
          className="
            absolute

            right-[6%]
            top-[9%]

            flex
            items-center

            gap-[5px]
          "
        >
          <span
            className="
              text-[5px]
              text-white/23
            "
          >
            with
          </span>

          <MiniLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="44px"
          />
        </div>
      )}

      {model === "poweredByA" && (
        <div
          className="
            absolute

            right-[6%]
            top-[9%]

            flex
            items-center

            gap-[5px]
          "
        >
          <span
            className="
              text-[5px]
              uppercase
              tracking-[0.12em]

              text-white/23
            "
          >
            Powered by
          </span>

          <MiniLogo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="36px"
          />
        </div>
      )}

      {model === "presentsB" && (
        <div
          className="
            absolute

            right-[6%]
            top-[9%]

            flex
            items-center

            gap-[5px]
          "
        >
          <span
            className="
              text-[5px]
              text-white/23
            "
          >
            featuring
          </span>

          <MiniLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="48px"
          />
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------ */
/* 04 — MINIMAL CLOSING                             */
/* ------------------------------------------------ */

function MinimalClosing({
  model,
  hierarchy,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;

  hierarchy: {
    brandA: number;
    brandB: number;
  };

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  return (
    <>
      <div
        className="
          absolute
          inset-0

          bg-black/30
        "
      />

      <ClosingLines />

      {/* A × B */}

      {model === "axb" && (
        <div
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center

            gap-[6%]
          "
        >
          <ClosingLogo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="24%"
          />

          <span
            className="
              text-[13px]
              text-white/50
            "
          >
            ×
          </span>

          <ClosingLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="24%"
          />
        </div>
      )}

      {/* A WITH B */}

      {model === "aandb" && (
        <div
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center

            gap-[7%]
          "
        >
          <ClosingLogo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="32%"
          />

          <span
            className="
              text-[6px]
              text-white/35
            "
          >
            with
          </span>

          <ClosingLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="16%"
          />
        </div>
      )}

      {/* POWERED */}

      {model === "poweredByA" && (
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
          <ClosingLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
            width="36%"
          />

          <div
            className="
              mt-[7px]

              flex
              items-center

              gap-[5px]
            "
          >
            <span
              className="
                text-[5px]
                uppercase
                tracking-[0.14em]

                text-white/28
              "
            >
              Powered by
            </span>

            <ClosingLogo
              logoUrl={brandALogo}
              fallback={brandAName}
              width="10%"
            />
          </div>
        </div>
      )}

      {/* PRESENTS */}

      {model === "presentsB" && (
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
          <ClosingLogo
            logoUrl={brandALogo}
            fallback={brandAName}
            width="32%"
          />

          <p
            className="
              mt-[6px]

              text-[6px]
              text-white/32
            "
          >
            featuring {brandBName}
          </p>
        </div>
      )}

      <HierarchyMarker
        brandA={hierarchy.brandA}
        brandB={hierarchy.brandB}
      />
    </>
  );
}

/* ------------------------------------------------ */
/* HIERARCHY MARKER                                 */
/* ------------------------------------------------ */

function HierarchyMarker({
  brandA,
  brandB,
}: {
  brandA: number;
  brandB: number;
}) {
  return (
    <div
      className="
        absolute

        bottom-[5%]
        right-[5%]
      "
    >
      <p
        className="
          text-[5px]
          uppercase
          tracking-[0.14em]

          text-white/16
        "
      >
        A {brandA}% · B {brandB}%
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* LOGOS                                            */
/* ------------------------------------------------ */

function ClosingLogo({
  logoUrl,
  fallback,
  width,
}: {
  logoUrl: string | null;
  fallback: string;
  width: string;
}) {
  return (
    <div
      style={{
        width,
        aspectRatio: "3 / 1",
        flexShrink: 0,

        filter: `
          drop-shadow(
            0 10px 22px
            rgba(0,0,0,0.70)
          )
          drop-shadow(
            0 2px 6px
            rgba(0,0,0,0.82)
          )
        `,
      }}
    >
      <BrandLogo
        logoUrl={logoUrl}
        fallback={fallback}
      />
    </div>
  );
}

function MiniLogo({
  logoUrl,
  fallback,
  width,
}: {
  logoUrl: string | null;
  fallback: string;
  width: string;
}) {
  return (
    <div
      style={{
        width,
        aspectRatio: "3 / 1",
        flexShrink: 0,
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
/* BACKGROUND                                       */
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

            opacity-[0.9]
          "
        />
      )}

      {failed && (
        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_70%_15%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,#111_0%,#050505_100%)]
          "
        />
      )}

      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.10)_45%,rgba(0,0,0,0.52)_100%)]
        "
      />
    </>
  );
}

/* ------------------------------------------------ */
/* EFFECTS                                          */
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

          h-[54%]
          w-[80%]

          rotate-[-13deg]

          bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.045)_48%,transparent_72%)]

          blur-[8px]
        "
      />

      {/* NOISE */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-[0.08]

          mix-blend-screen

          [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(255,255,255,0.018)_0px,rgba(255,255,255,0.018)_1px,transparent_1px,transparent_4px)]
        "
      />

      {/* BORDER */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          rounded-[18px]

          shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
        "
      />
    </>
  );
}

/* ------------------------------------------------ */
/* GLASS                                            */
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

        bg-black/40

        px-[9px]
        py-[6px]

        backdrop-blur-[14px]

        shadow-[0_8px_24px_rgba(0,0,0,0.22)]
      "
    >
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
          via-white/24
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
/* CLOSING GRAPHIC LINES                            */
/* ------------------------------------------------ */

function ClosingLines() {
  return (
    <>
      <div
        className="
          absolute

          -left-[8%]
          top-[16%]

          h-[68%]
          w-[30%]

          rounded-[50%]

          border
          border-white/[0.055]
        "
      />

      <div
        className="
          absolute

          -right-[8%]
          top-[16%]

          h-[68%]
          w-[30%]

          rounded-[50%]

          border
          border-white/[0.055]
        "
      />

      <div
        className="
          absolute

          left-[12%]
          right-[12%]
          top-1/2

          h-px

          bg-gradient-to-r

          from-transparent
          via-white/[0.06]
          to-transparent
        "
      />
    </>
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
  if (
    model === "axb"
  ) {
    return (
      <div
        className="
          flex
          items-center

          gap-[14px]
        "
      >
        <TopLogo
          logoUrl={brandALogo}
          fallback={brandAName}
        />

        <span
          className="
            text-[20px]
            text-white/18
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

  if (
    model === "aandb"
  ) {
    return (
      <div
        className="
          flex
          items-end

          gap-[20px]
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

  if (
    model === "poweredByA"
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
            h-[37px]
            w-[140px]
          "
        >
          <BrandLogo
            logoUrl={brandBLogo}
            fallback={brandBName}
          />
        </div>

        <div
          className="
            mt-[5px]

            flex
            items-center

            gap-[7px]
          "
        >
          <span
            className="
              text-[6px]
              uppercase
              tracking-[0.14em]

              text-white/18
            "
          >
            Powered by
          </span>

          <div
            className="
              h-[20px]
              w-[78px]
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
          h-[24px]
          w-[96px]
        "
      >
        <BrandLogo
          logoUrl={brandALogo}
          fallback={brandAName}
        />
      </div>

      <p
        className="
          my-[3px]

          text-[6px]
          uppercase
          tracking-[0.15em]

          text-white/18
        "
      >
        Presents
      </p>

      <div
        className="
          h-[34px]
          w-[128px]
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
        h-[36px]
        w-[118px]
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

          text-[6px]
          text-white/16
        "
      >
        {label}
      </p>

      <div
        className="
          h-[30px]
          w-[116px]
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