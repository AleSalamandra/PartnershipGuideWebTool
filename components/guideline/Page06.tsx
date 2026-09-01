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

type ApplicationVariant =
  | "hero"
  | "lowerThird"
  | "overlay"
  | "transition";

type BrandRole =
  | "equal"
  | "brandALead"
  | "brandBLead";

interface ApplicationSpec {
  id: string;
  title: string;
  description: string;
  variant: ApplicationVariant;
}

interface ModelContent {
  intro: string;
  applications: [
    ApplicationSpec,
    ApplicationSpec,
    ApplicationSpec,
    ApplicationSpec
  ];
}

interface HierarchyConfig {
  brandA: number;
  brandB: number;
  role: BrandRole;
}

/* ------------------------------------------------ */
/* BRAND HIERARCHY                                  */
/* ------------------------------------------------ */

/*
  These values drive the relative visual scale
  across this page.

  A × B
  50 / 50

  A with B
  ~68 / 32

  B powered by A
  ~15 / 85

  A presents B
  Platform A remains the owner of the visual
  container, while B receives greater prominence
  as featured content.
*/

const BRAND_HIERARCHY: Record<
  PartnershipModelId,
  HierarchyConfig
> = {
  axb: {
    brandA: 50,
    brandB: 50,
    role: "equal",
  },

  aandb: {
    brandA: 68,
    brandB: 32,
    role: "brandALead",
  },

  poweredByA: {
    brandA: 15,
    brandB: 85,
    role: "brandBLead",
  },

  presentsB: {
    brandA: 35,
    brandB: 65,
    role: "brandBLead",
  },
};

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
/* MODEL CONTENT                                    */
/* ------------------------------------------------ */

function getModelContent(
  model: PartnershipModelId,
  brandAName: string,
  brandBName: string
): ModelContent {
  switch (model) {
    /* ================================================= */
    /* A × B                                             */
    /* ================================================= */

    case "axb":
      return {
        intro:
          "Both identities share the visual system with equivalent prominence across content applications.",

        applications: [
          {
            id: "01",
            title: "Hero frame",
            description: "Equal brand presence",
            variant: "hero",
          },
          {
            id: "02",
            title: "Lower third",
            description: "Shared persistent identity",
            variant: "lowerThird",
          },
          {
            id: "03",
            title: "Information overlay",
            description: "Neutral co-branded UI",
            variant: "overlay",
          },
          {
            id: "04",
            title: "Transition",
            description:
              `${brandAName} × ${brandBName}`,
            variant: "transition",
          },
        ],
      };

    /* ================================================= */
    /* A WITH B                                          */
    /* ================================================= */

    case "aandb":
      return {
        intro:
          `${brandAName} defines the visual environment while ${brandBName} remains clearly visible as the content partner.`,

        applications: [
          {
            id: "01",
            title: "Hero frame",
            description:
              `${brandAName}-led composition`,
            variant: "hero",
          },
          {
            id: "02",
            title: "Lower third",
            description:
              "Primary + supporting identity",
            variant: "lowerThird",
          },
          {
            id: "03",
            title: "Information overlay",
            description:
              `${brandAName} interface language`,
            variant: "overlay",
          },
          {
            id: "04",
            title: "Transition",
            description:
              `${brandAName} with ${brandBName}`,
            variant: "transition",
          },
        ],
      };

    /* ================================================= */
    /* B POWERED BY A                                    */
    /* ================================================= */

    case "poweredByA":
      return {
        intro:
          `${brandBName} owns the consumer-facing visual system. ${brandAName} appears only as a restrained technology endorsement.`,

        applications: [
          {
            id: "01",
            title: "Hero frame",
            description:
              `${brandBName}-owned experience`,
            variant: "hero",
          },
          {
            id: "02",
            title: "Lower third",
            description:
              "Technology endorsement",
            variant: "lowerThird",
          },
          {
            id: "03",
            title: "Information overlay",
            description:
              `${brandBName} interface`,
            variant: "overlay",
          },
          {
            id: "04",
            title: "Transition",
            description:
              `${brandBName} powered by ${brandAName}`,
            variant: "transition",
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
          `${brandAName} owns the visual container while ${brandBName} becomes the featured content identity.`,

        applications: [
          {
            id: "01",
            title: "Hero frame",
            description:
              `${brandAName} presents ${brandBName}`,
            variant: "hero",
          },
          {
            id: "02",
            title: "Lower third",
            description:
              "Platform + featured content",
            variant: "lowerThird",
          },
          {
            id: "03",
            title: "Information overlay",
            description:
              `${brandAName} container`,
            variant: "overlay",
          },
          {
            id: "04",
            title: "Transition",
            description:
              "Presented content bumper",
            variant: "transition",
          },
        ],
      };
  }
}

/* ------------------------------------------------ */
/* PAGE                                             */
/* ------------------------------------------------ */

export default function Page06() {
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
    getModelContent(
      model,
      brandAName,
      brandBName
    );

  const hierarchy =
    BRAND_HIERARCHY[model];

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
        {/* TITLE */}

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
            06 / Content Identity
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
            Content branding applications
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

        {/* PARTNERSHIP SIGNATURE */}

        <PartnershipLockup
          model={model}
          brandAName={brandAName}
          brandBName={brandBName}
          brandALogo={brandA.logoUrl}
          brandBLogo={brandB.logoUrl}
        />
      </header>

      {/* ================================================= */}
      {/* APPLICATION GRID                                  */}
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
        {content.applications.map(
          (
            application,
            index
          ) => (
            <ApplicationCard
              key={application.id}
              application={application}
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
          Examples are indicative — adapt placement
          to content, format and legibility.
        </p>

        <p
          className="
            text-[9px]
            text-white/20
          "
        >
          Safe area · Hierarchy · Contrast · Motion · Clear space
        </p>
      </footer>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* APPLICATION CARD                                 */
/* ------------------------------------------------ */

function ApplicationCard({
  application,
  model,
  hierarchy,
  imageId,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  application: ApplicationSpec;

  model: PartnershipModelId;
  hierarchy: HierarchyConfig;

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
      {/* ------------------------------------------ */}
      {/* LABEL                                      */}
      {/* ------------------------------------------ */}

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
          {application.id}
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
          {application.title}
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

            max-w-[95px]

            text-[10px]
            leading-[1.35]

            text-white/33
          "
        >
          {application.description}
        </p>
      </div>

      {/* ------------------------------------------ */}
      {/* VIDEO FRAME                                */}
      {/* ------------------------------------------ */}

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

        <ApplicationContent
          variant={application.variant}
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
/* APPLICATION CONTENT                              */
/* ------------------------------------------------ */

function ApplicationContent({
  variant,
  model,
  hierarchy,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  variant: ApplicationVariant;

  model: PartnershipModelId;
  hierarchy: HierarchyConfig;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  if (
    variant === "hero"
  ) {
    return (
      <HeroApplication
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
    variant === "lowerThird"
  ) {
    return (
      <LowerThirdApplication
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
    variant === "overlay"
  ) {
    return (
      <OverlayApplication
        model={model}
        hierarchy={hierarchy}
        brandAName={brandAName}
        brandBName={brandBName}
        brandALogo={brandALogo}
        brandBLogo={brandBLogo}
      />
    );
  }

  return (
    <TransitionApplication
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
/* HERO APPLICATION                                 */
/* ------------------------------------------------ */

function HeroApplication({
  model,
  hierarchy,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;
  hierarchy: HierarchyConfig;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  /* A × B */

  if (
    model === "axb"
  ) {
    return (
      <div
        className="
          absolute

          inset-x-[12%]
          top-1/2

          flex
          -translate-y-1/2

          items-center
          justify-center

          gap-[6%]
        "
      >
        <FloatingLogo
          logoUrl={brandALogo}
          fallback={brandAName}
          scale={hierarchy.brandA}
          mode="equal"
        />

        <div
          className="
            h-[42px]
            w-px

            bg-white/28
          "
        />

        <FloatingLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
          scale={hierarchy.brandB}
          mode="equal"
        />
      </div>
    );
  }

  /* A WITH B */

  if (
    model === "aandb"
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
        <FloatingLogo
          logoUrl={brandALogo}
          fallback={brandAName}
          scale={hierarchy.brandA}
          mode="lead"
        />

        <p
          className="
            my-[2%]

            text-[7px]
            uppercase
            tracking-[0.14em]

            text-white/52
          "
        >
          with
        </p>

        <FloatingLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
          scale={hierarchy.brandB}
          mode="support"
        />
      </div>
    );
  }

  /* B POWERED BY A */

  if (
    model === "poweredByA"
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
        <FloatingLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
          scale={hierarchy.brandB}
          mode="lead"
        />

        <p
          className="
            my-[2%]

            text-[6px]
            uppercase
            tracking-[0.2em]

            text-white/50
          "
        >
          Powered by
        </p>

        <FloatingLogo
          logoUrl={brandALogo}
          fallback={brandAName}
          scale={hierarchy.brandA}
          mode="endorsement"
        />
      </div>
    );
  }

  /* A PRESENTS B */

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
      <FloatingLogo
        logoUrl={brandALogo}
        fallback={brandAName}
        scale={hierarchy.brandA}
        mode="endorsement"
      />

      <p
        className="
          my-[2%]

          text-[7px]

          text-white/55
        "
      >
        presents
      </p>

      <FloatingLogo
        logoUrl={brandBLogo}
        fallback={brandBName}
        scale={hierarchy.brandB}
        mode="lead"
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* LOWER THIRD                                      */
/* ------------------------------------------------ */

function LowerThirdApplication({
  model,
  hierarchy,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;
  hierarchy: HierarchyConfig;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  return (
    <div
      className="
        absolute

        bottom-[6%]
        left-[5%]
        right-[5%]
      "
    >
      <VideoGlass>
        <div
          className="
            flex
            min-h-[27px]

            items-center

            gap-[10px]
          "
        >
          {/* LEFT IDENTITY */}

          <LowerThirdIdentity
            model={model}
            side="left"
            hierarchy={hierarchy}
            brandAName={brandAName}
            brandBName={brandBName}
            brandALogo={brandALogo}
            brandBLogo={brandBLogo}
          />

          {/* CONTENT */}

          <div
            className="
              h-[23px]
              w-px

              bg-white/14
            "
          />

          <div
            className="
              min-w-0
              flex-1
            "
          >
            <p
              className="
                truncate

                text-[8px]
                text-white/65
              "
            >
              Headline or key message
            </p>
          </div>

          <div
            className="
              h-[23px]
              w-px

              bg-white/14
            "
          />

          {/* RIGHT IDENTITY */}

          <LowerThirdIdentity
            model={model}
            side="right"
            hierarchy={hierarchy}
            brandAName={brandAName}
            brandBName={brandBName}
            brandALogo={brandALogo}
            brandBLogo={brandBLogo}
          />
        </div>
      </VideoGlass>
    </div>
  );
}

/* ------------------------------------------------ */
/* LOWER THIRD IDENTITY                             */
/* ------------------------------------------------ */

function LowerThirdIdentity({
  model,
  side,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;
  side: "left" | "right";

  hierarchy: HierarchyConfig;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  if (
    model === "axb"
  ) {
    return side === "left" ? (
      <MiniLogo
        logoUrl={brandALogo}
        fallback={brandAName}
        width="66px"
      />
    ) : (
      <MiniLogo
        logoUrl={brandBLogo}
        fallback={brandBName}
        width="66px"
      />
    );
  }

  if (
    model === "aandb"
  ) {
    return side === "left" ? (
      <MiniLogo
        logoUrl={brandALogo}
        fallback={brandAName}
        width="78px"
      />
    ) : (
      <div
        className="
          flex
          items-center
          gap-[5px]
        "
      >
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
    );
  }

  if (
    model === "poweredByA"
  ) {
    return side === "left" ? (
      <MiniLogo
        logoUrl={brandBLogo}
        fallback={brandBName}
        width="84px"
      />
    ) : (
      <div
        className="
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

            text-white/24
          "
        >
          Powered by
        </span>

        <MiniLogo
          logoUrl={brandALogo}
          fallback={brandAName}
          width="34px"
        />
      </div>
    );
  }

  return side === "left" ? (
    <div
      className="
        flex
        items-center
        gap-[5px]
      "
    >
      <MiniLogo
        logoUrl={brandALogo}
        fallback={brandAName}
        width="38px"
      />

      <span
        className="
          text-[5px]
          text-white/25
        "
      >
        presents
      </span>
    </div>
  ) : (
    <MiniLogo
      logoUrl={brandBLogo}
      fallback={brandBName}
      width="78px"
    />
  );
}

/* ------------------------------------------------ */
/* OVERLAY                                          */
/* ------------------------------------------------ */

function OverlayApplication({
  model,
  hierarchy,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;
  hierarchy: HierarchyConfig;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  return (
    <>
      {/* DATA */}

      <div
        className="
          absolute

          left-[6%]
          top-[11%]

          w-[46%]
        "
      >
        <VideoGlass>
          <div
            className="
              flex
              items-center

              gap-[10px]
            "
          >
            <div
              className="
                relative

                flex
                h-[44px]
                w-[44px]

                shrink-0

                items-center
                justify-center

                rounded-full

                border
                border-white/18
              "
            >
              <div
                className="
                  absolute
                  inset-[4px]

                  rounded-full

                  border
                  border-white/[0.06]
                "
              />

              <span
                className="
                  text-[12px]

                  text-white/82

                  oook-medium
                "
              >
                65%
              </span>
            </div>

            <div>
              <p
                className="
                  text-[9px]
                  text-white/76

                  oook-medium
                "
              >
                Key metric
              </p>

              <p
                className="
                  mt-[2px]

                  text-[6px]
                  leading-[1.35]

                  text-white/34
                "
              >
                Short supporting information.
              </p>
            </div>
          </div>
        </VideoGlass>
      </div>

      {/* BRAND FOOTER */}

      <div
        className="
          absolute

          bottom-[6%]
          left-[5%]
          right-[5%]
        "
      >
        <VideoGlass>
          <OverlayFooter
            model={model}
            hierarchy={hierarchy}
            brandAName={brandAName}
            brandBName={brandBName}
            brandALogo={brandALogo}
            brandBLogo={brandBLogo}
          />
        </VideoGlass>
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* OVERLAY FOOTER                                   */
/* ------------------------------------------------ */

function OverlayFooter({
  model,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;
  hierarchy: HierarchyConfig;

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
          min-h-[20px]

          items-center
          justify-between

          gap-[12px]
        "
      >
        <MiniLogo
          logoUrl={brandALogo}
          fallback={brandAName}
          width="62px"
        />

        <div
          className="
            h-px
            flex-1

            bg-white/[0.10]
          "
        />

        <MiniLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
          width="62px"
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
          min-h-[20px]

          items-center

          gap-[9px]
        "
      >
        <MiniLogo
          logoUrl={brandALogo}
          fallback={brandAName}
          width="76px"
        />

        <div className="flex-1" />

        <span
          className="
            text-[5px]
            text-white/24
          "
        >
          with
        </span>

        <MiniLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
          width="40px"
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
          min-h-[20px]

          items-center

          gap-[9px]
        "
      >
        <MiniLogo
          logoUrl={brandBLogo}
          fallback={brandBName}
          width="82px"
        />

        <div className="flex-1" />

        <span
          className="
            text-[5px]
            uppercase
            tracking-[0.12em]

            text-white/24
          "
        >
          Powered by
        </span>

        <MiniLogo
          logoUrl={brandALogo}
          fallback={brandAName}
          width="32px"
        />
      </div>
    );
  }

  return (
    <div
      className="
        flex
        min-h-[20px]

        items-center

        gap-[7px]
      "
    >
      <MiniLogo
        logoUrl={brandALogo}
        fallback={brandAName}
        width="36px"
      />

      <span
        className="
          text-[5px]
          text-white/24
        "
      >
        presents
      </span>

      <div className="flex-1" />

      <MiniLogo
        logoUrl={brandBLogo}
        fallback={brandBName}
        width="76px"
      />
    </div>
  );
}

/* ------------------------------------------------ */
/* TRANSITION                                       */
/* ------------------------------------------------ */

function TransitionApplication({
  model,
  hierarchy,

  brandAName,
  brandBName,

  brandALogo,
  brandBLogo,
}: {
  model: PartnershipModelId;
  hierarchy: HierarchyConfig;

  brandAName: string;
  brandBName: string;

  brandALogo: string | null;
  brandBLogo: string | null;
}) {
  return (
    <>
      {/* DARKEN THE IMAGE A LITTLE MORE */}

      <div
        className="
          absolute
          inset-0

          bg-black/20
        "
      />

      <TransitionLines />

      {/* LOCKUP AREA
          IMPORTANT:
          explicit width fixes percentage-logo collapse.
      */}

      <div
        className="
          absolute

          left-1/2
          top-1/2

          w-[68%]

          -translate-x-1/2
          -translate-y-1/2
        "
      >
        {model === "axb" && (
          <div
            className="
              flex
              w-full

              items-center
              justify-center

              gap-[8%]
            "
          >
            <TransitionLogo
              logoUrl={brandALogo}
              fallback={brandAName}
              width="34%"
            />

            <span
              className="
                shrink-0

                text-[16px]

                text-white/58

                drop-shadow-[0_5px_12px_rgba(0,0,0,0.8)]
              "
            >
              ×
            </span>

            <TransitionLogo
              logoUrl={brandBLogo}
              fallback={brandBName}
              width="34%"
            />
          </div>
        )}

        {model === "aandb" && (
          <div
            className="
              flex
              w-full

              items-center
              justify-center

              gap-[7%]
            "
          >
            <TransitionLogo
              logoUrl={brandALogo}
              fallback={brandAName}
              width="46%"
            />

            <span
              className="
                shrink-0

                text-[7px]
                uppercase
                tracking-[0.12em]

                text-white/42
              "
            >
              with
            </span>

            <TransitionLogo
              logoUrl={brandBLogo}
              fallback={brandBName}
              width="24%"
            />
          </div>
        )}

        {model === "poweredByA" && (
          <div
            className="
              flex
              w-full

              flex-col
              items-center
              justify-center
            "
          >
            <TransitionLogo
              logoUrl={brandBLogo}
              fallback={brandBName}
              width="56%"
            />

            <div
              className="
                mt-[7px]

                flex
                items-center

                gap-[6px]
              "
            >
              <span
                className="
                  text-[6px]
                  uppercase
                  tracking-[0.16em]

                  text-white/38
                "
              >
                Powered by
              </span>

              <div className="w-[52px]">
                <TransitionLogo
                  logoUrl={brandALogo}
                  fallback={brandAName}
                  width="100%"
                />
              </div>
            </div>
          </div>
        )}

        {model === "presentsB" && (
          <div
            className="
              flex
              w-full

              flex-col
              items-center
              justify-center
            "
          >
            <div
              className="
                flex
                items-center

                gap-[6px]
              "
            >
              <div className="w-[62px]">
                <TransitionLogo
                  logoUrl={brandALogo}
                  fallback={brandAName}
                  width="100%"
                />
              </div>

              <span
                className="
                  text-[7px]

                  text-white/40
                "
              >
                presents
              </span>
            </div>

            <div className="mt-[8px] w-[54%]">
              <TransitionLogo
                logoUrl={brandBLogo}
                fallback={brandBName}
                width="100%"
              />
            </div>
          </div>
        )}
      </div>

      {/* HIERARCHY NOTE */}

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

            text-white/18
          "
        >
          A {hierarchy.brandA}% · B {hierarchy.brandB}%
        </p>
      </div>
    </>
  );
}

/* ------------------------------------------------ */
/* TRANSITION LOGO                                  */
/* ------------------------------------------------ */

function TransitionLogo({
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
            rgba(0,0,0,0.72)
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

/* ------------------------------------------------ */
/* FLOATING LOGO                                    */
/* ------------------------------------------------ */

function FloatingLogo({
  logoUrl,
  fallback,
  scale,
  mode,
}: {
  logoUrl: string | null;
  fallback: string;

  scale: number;

  mode:
    | "equal"
    | "lead"
    | "support"
    | "endorsement";
}) {
  /*
    Translate conceptual hierarchy into
    useful frame dimensions.

    We do NOT literally use 85% frame width.
    The percentage controls the relative visual
    relationship between the two identities.
  */

  let width = "28%";

  if (mode === "equal") {
    width = "29%";
  }

  if (mode === "lead") {
    if (scale >= 80) {
      width = "39%";
    } else if (scale >= 60) {
      width = "34%";
    } else {
      width = "30%";
    }
  }

  if (mode === "support") {
    width =
      scale >= 30
        ? "20%"
        : "16%";
  }

  if (mode === "endorsement") {
    width =
      scale <= 20
        ? "12%"
        : "15%";
  }

  return (
    <div
      style={{
        width,
        aspectRatio: "3 / 1",
        flexShrink: 0,

        filter: `
          drop-shadow(
            0 10px 22px
            rgba(0,0,0,0.68)
          )
          drop-shadow(
            0 2px 6px
            rgba(0,0,0,0.76)
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

/* ------------------------------------------------ */
/* MINI LOGO                                        */
/* ------------------------------------------------ */

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

            opacity-[0.92]
          "
        />
      )}

      {failed && (
        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_72%_15%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,#111_0%,#050505_100%)]
          "
        />
      )}

      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.48)_100%)]
        "
      />

      <div
        className="
          absolute

          -right-[20%]
          -top-[30%]

          h-[80%]
          w-[70%]

          rounded-full

          bg-white/[0.05]

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
/* TRANSITION LINES                                 */
/* ------------------------------------------------ */

function TransitionLines() {
  return (
    <>
      <div
        className="
          absolute

          -left-[5%]
          top-[14%]

          h-[72%]
          w-[27%]

          rounded-[50%]

          border
          border-white/[0.07]
        "
      />

      <div
        className="
          absolute

          left-[0%]
          top-[20%]

          h-[60%]
          w-[20%]

          rounded-[50%]

          border
          border-white/[0.045]
        "
      />

      <div
        className="
          absolute

          -right-[5%]
          top-[14%]

          h-[72%]
          w-[27%]

          rounded-[50%]

          border
          border-white/[0.07]
        "
      />

      <div
        className="
          absolute

          right-[0%]
          top-[20%]

          h-[60%]
          w-[20%]

          rounded-[50%]

          border
          border-white/[0.045]
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