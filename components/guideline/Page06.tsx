"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import BrandLogo from "./BrandLogo";

import GuidelinePage, {
  useGuidelineThemeStore,
} from "./GuidelinePage";

import PartnershipLockup from "./PartnershipLockup";
import RasterGradient from "./RasterGradient";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import type {
  AdditionalRelationshipMode,
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* TYPES                                             */
/* ================================================= */

interface HierarchyConfig {
  brandA: number;
  brandB: number;
}

interface BrandView {
  name: string;
  logoUrl: string | null;
}

interface PropertyView extends BrandView {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

/* ================================================= */
/* HIERARCHY                                         */
/* ================================================= */

const BRAND_HIERARCHY: Record<
  PartnershipModelId,
  HierarchyConfig
> = {
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
    brandA: 35,
    brandB: 65,
  },
};

/* ================================================= */
/* IMAGES                                            */
/* ================================================= */

const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
];

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

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function shuffledImages() {
  return [...IMAGE_NUMBERS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
}

function getBaseHeroDescription(
  model: PartnershipModelId
) {
  switch (model) {
    case "axb":
      return "Equal brand presence";

    case "aandb":
      return "Brand A-led hero";

    case "poweredByA":
      return "Brand B consumer identity";

    case "presentsB":
    default:
      return "Featured Brand B content";
  }
}

function getTransitionDescription(
  model: PartnershipModelId
) {
  switch (model) {
    case "axb":
      return "Brand A × Brand B";

    case "aandb":
      return "Brand A leads the transition";

    case "poweredByA":
      return "Brand B with Brand A endorsement";

    case "presentsB":
    default:
      return "Brand A introduces Brand B";
  }
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page06() {
  const {
    partnershipModel,
    additionalRelationship,

    brandA,
    brandB,
    propertyX,
  } = useGuidelineStore();

  const theme =
    useGuidelineThemeStore(
      (state) => state.theme
    );

  const isLight =
    theme === "light";

  const model =
    partnershipModel as PartnershipModelId;

  const hierarchy =
    BRAND_HIERARCHY[
      model
    ];

  const presenting =
    additionalRelationship ===
    "presenting";

  const sponsored =
    additionalRelationship ===
    "sponsored";

  const a: BrandView = {
    name:
      brandA.name.trim() ||
      "Brand A",

    logoUrl:
      brandA.logoUrl ??
      null,
  };

  const b: BrandView = {
    name:
      brandB.name.trim() ||
      "Brand B",

    logoUrl:
      brandB.logoUrl ??
      null,
  };

  const x: PropertyView = {
    name:
      propertyX.name.trim() ||
      "X",

    logoUrl:
      propertyX.logoUrl ??
      null,

    primaryColor:
      propertyX.primaryColor,

    secondaryColor:
      propertyX.secondaryColor,

    fontFamily:
      propertyX.fontFamily,
  };

  const [
    images,
    setImages,
  ] = useState([
    2,
    4,
    7,
    9,
  ]);

  useEffect(
    () => {
      setImages(
        shuffledImages()
      );
    },
    [
      model,
      additionalRelationship,
    ]
  );

  const pageDescription =
    presenting
      ? `${x.name} becomes the dominant content identity while the Brand A / Brand B relationship remains visible as its presenting signature.`
      : sponsored
        ? `${x.name} appears only as a controlled sponsor credit. The underlying Brand A / Brand B content system remains unchanged.`
        : "Four recurring content applications showing how partnership hierarchy remains visible without interrupting the experience.";

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

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
        <div>
          <p
            className="
              text-[12px]
              uppercase
              tracking-[0.16em]
              text-white/28
            "
          >
            06 / Content identity
          </p>

          <h1
            className="
              mt-[15px]
              whitespace-nowrap

              text-[52px]
              leading-[0.95]
              tracking-[-0.05em]

              text-white
              oook-semibold
            "
          >
            Content branding applications
          </h1>

          <p
            className="
              mt-[15px]
              max-w-[820px]

              text-[16px]
              leading-[1.4]

              text-white/40
            "
          >
            {pageDescription}
          </p>
        </div>

        <div
          className="
            flex
            flex-col
            items-end
            gap-[10px]
          "
        >
          <PartnershipLockup
            model={model}
            brandA={brandA}
            brandB={brandB}
          />

          {presenting && (
            <XHeaderSignature
              label="Presenting"
              property={x}
              large
            />
          )}

          {sponsored && (
            <XHeaderSignature
              label="Sponsored by"
              property={x}
            />
          )}
        </div>
      </header>

      {/* ======================================== */}
      {/* GRID                                     */}
      {/* ======================================== */}

      <section
        className="
          absolute

          bottom-[74px]
          left-[76px]
          right-[76px]
          top-[250px]

          grid
          grid-cols-2
          grid-rows-2

          gap-x-[26px]
          gap-y-[22px]
        "
      >
        <ApplicationCard
          number="01"
          title="Hero frame"
          description={
            presenting
              ? `${x.name} leads the hero`
              : sponsored
                ? `${getBaseHeroDescription(model)} + sponsor credit`
                : getBaseHeroDescription(model)
          }
        >
          <HeroApplication
            model={model}
            mode={
              additionalRelationship
            }
            hierarchy={
              hierarchy
            }
            brandA={a}
            brandB={b}
            property={x}
            image={
              images[0]
            }
            isLight={
              isLight
            }
          />
        </ApplicationCard>

        <ApplicationCard
          number="02"
          title="Lower third"
          description={
            presenting
              ? "X content + presenting signature"
              : sponsored
                ? "Persistent identity + sponsor credit"
                : "Persistent shared identity"
          }
        >
          <LowerThirdApplication
            model={model}
            mode={
              additionalRelationship
            }
            brandA={a}
            brandB={b}
            property={x}
            image={
              images[1]
            }
            isLight={
              isLight
            }
          />
        </ApplicationCard>

        <ApplicationCard
          number="03"
          title="Information overlay"
          description={
            presenting
              ? "X-authored content UI"
              : sponsored
                ? "Neutral UI + restrained sponsorship"
                : "Neutral co-branded UI"
          }
        >
          <OverlayApplication
            model={model}
            mode={
              additionalRelationship
            }
            brandA={a}
            brandB={b}
            property={x}
            image={
              images[2]
            }
            isLight={
              isLight
            }
          />
        </ApplicationCard>

        <ApplicationCard
          number="04"
          title="Transition"
          description={
            presenting
              ? `${x.name} leads the transition`
              : sponsored
                ? `${getTransitionDescription(model)} + sponsor credit`
                : getTransitionDescription(model)
          }
        >
          <TransitionApplication
            model={model}
            mode={
              additionalRelationship
            }
            hierarchy={
              hierarchy
            }
            brandA={a}
            brandB={b}
            property={x}
            image={
              images[3]
            }
            isLight={
              isLight
            }
          />
        </ApplicationCard>
      </section>

      {/* ======================================== */}
      {/* FOOTER                                   */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[39px]
          left-[76px]
          right-[76px]

          flex
          items-center
          justify-between
        "
      >
        <p className="text-[9px] text-white/22">
          Examples are indicative — adapt placement to content, format and legibility.
        </p>

        <p className="text-[9px] text-white/22">
          {presenting
            ? "X identity · Presenter signature · Content · Hierarchy"
            : sponsored
              ? "Core identity · Sponsor credit · Clear space"
              : "Safe area · Hierarchy · Contrast · Motion · Clear space"}
        </p>
      </div>
    </GuidelinePage>
  );
}

/* ================================================= */
/* CARD                                              */
/* ================================================= */

function ApplicationCard({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article
      className="
        grid
        min-h-0
        grid-cols-[112px_minmax(0,1fr)]
        gap-[14px]
      "
    >
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
            tracking-[0.14em]
            text-white/20
          "
        >
          {number}
        </p>

        <h3
          className="
            mt-[8px]

            text-[16px]
            leading-[1.05]
            tracking-[-0.025em]

            text-white/72
            oook-medium
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-[10px]

            h-px
            w-[42px]

            bg-white/[0.14]
          "
        />

        <p
          className="
            mt-[9px]
            max-w-[96px]

            text-[9px]
            leading-[1.38]

            text-white/31
          "
        >
          {description}
        </p>
      </div>

      <div
        className="
          relative
          min-h-0
          overflow-hidden

          rounded-[22px]

          border
          border-white/[0.08]

          bg-[#050506]
        "
      >
        {children}
      </div>
    </article>
  );
}

/* ================================================= */
/* BACKGROUND                                        */
/* ================================================= */

function FrameBackground({
  image,
}: {
  image: number;
}) {
  const [
    extension,
    setExtension,
  ] = useState(0);

  useEffect(
    () => {
      setExtension(0);
    },
    [image]
  );

  return (
    <div
      className="
        absolute
        inset-0
        overflow-hidden
      "
      style={{
        filter:
          "grayscale(0.95) contrast(1.03)",
      }}
    >
      <img
        src={`/images/image${image}.${IMAGE_EXTENSIONS[extension]}`}
        alt=""
        draggable={false}
        onError={() => {
          if (
            extension <
            IMAGE_EXTENSIONS.length -
              1
          ) {
            setExtension(
              (current) =>
                current + 1
            );
          }
        }}
        className="
          h-full
          w-full

          scale-[1.035]
          object-cover
        "
      />
    </div>
  );
}

/* ================================================= */
/* SAFE FRAME TREATMENT                              */
/* ================================================= */

function FrameTreatment({
  mode,
  property,
}: {
  mode:
    AdditionalRelationshipMode;

  property:
    PropertyView;
}) {
  return (
    <>
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
              0.025,
          },
          {
            color:
              "#000000",
            offset:
              58,
            opacity:
              0,
          },
          {
            color:
              "#000000",
            offset:
              100,
            opacity:
              0.34,
          },
        ]}
      />

      {mode ===
        "presenting" && (
        <RasterGradient
          direction="diagonal"
          className="
            absolute
            inset-0
            h-full
            w-full
          "
          stops={[
            {
              color:
                property.primaryColor,
              offset:
                0,
              opacity:
                0.18,
            },
            {
              color:
                property.secondaryColor,
              offset:
                48,
              opacity:
                0.08,
            },
            {
              color:
                property.secondaryColor,
              offset:
                100,
              opacity:
                0,
            },
          ]}
        />
      )}

      <ScanLines />
    </>
  );
}

function ScanLines() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        opacity-[0.045]
      "
    >
      {Array.from({
        length: 30,
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
              bg-white/15
            "
            style={{
              top:
                `${
                  index /
                  30 *
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
/* HERO                                              */
/* ================================================= */

function HeroApplication({
  model,
  mode,
  hierarchy,

  brandA,
  brandB,
  property,

  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  mode:
    AdditionalRelationshipMode;

  hierarchy:
    HierarchyConfig;

  brandA:
    BrandView;

  brandB:
    BrandView;

  property:
    PropertyView;

  image:
    number;

  isLight:
    boolean;
}) {
  const presenting =
    mode ===
    "presenting";

  const sponsored =
    mode ===
    "sponsored";

  return (
    <>
      <FrameBackground
        image={image}
      />

      <FrameTreatment
        mode={mode}
        property={property}
      />

      {presenting ? (
        <PresentedHero
          model={model}
          brandA={brandA}
          brandB={brandB}
          property={property}
        />
      ) : (
        <PartnershipHero
          model={model}
          brandA={brandA}
          brandB={brandB}
        />
      )}

      {sponsored && (
        <SponsorCredit
          property={
            property
          }
          isLight={
            isLight
          }
        />
      )}

      <div
        className="
          absolute
          bottom-[12px]
          right-[14px]

          text-[7px]
          text-white/20
        "
      >
        {presenting
          ? "Presenter 45% · X 55%"
          : sponsored
            ? `A ${hierarchy.brandA}% · B ${hierarchy.brandB}% · Sponsor credit only`
            : `A ${hierarchy.brandA}% · B ${hierarchy.brandB}%`}
      </div>
    </>
  );
}

function PresentedHero({
  model,
  brandA,
  brandB,
  property,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  property:
    PropertyView;
}) {
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
      <div className="mb-[8px]">
        <PresenterSignature
          model={model}
          brandA={brandA}
          brandB={brandB}
          size="medium"
        />
      </div>

      <p
        className="
          mb-[7px]

          text-[7px]
          uppercase
          tracking-[0.14em]

          text-white/25
        "
      >
        present
      </p>

      <div
        className="
          h-[70px]
          w-[230px]
        "
      >
        <BrandLogo
          logoUrl={
            property.logoUrl
          }
          fallback={
            property.name
          }
        />
      </div>

      <div
        className="
          mt-[12px]
          flex
          gap-[4px]
        "
      >
        <div
          className="
            h-[4px]
            w-[52px]
            rounded-full
          "
          style={{
            backgroundColor:
              property.primaryColor,
          }}
        />

        <div
          className="
            h-[4px]
            w-[22px]
            rounded-full
          "
          style={{
            backgroundColor:
              property.secondaryColor,
          }}
        />
      </div>
    </div>
  );
}

function PartnershipHero({
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
        absolute
        inset-0

        flex
        items-center
        justify-center
      "
    >
      {model ===
        "axb" && (
        <div
          className="
            flex
            w-[68%]
            items-center
            justify-center
            gap-[22px]
          "
        >
          <FloatingLogo
            brand={brandA}
            width={150}
          />

          <Symbol>
            ×
          </Symbol>

          <FloatingLogo
            brand={brandB}
            width={150}
          />
        </div>
      )}

      {model ===
        "aandb" && (
        <div
          className="
            flex
            w-[70%]
            items-center
            justify-center
            gap-[18px]
          "
        >
          <FloatingLogo
            brand={brandA}
            width={190}
          />

          <Relationship>
            with
          </Relationship>

          <FloatingLogo
            brand={brandB}
            width={105}
          />
        </div>
      )}

      {model ===
        "poweredByA" && (
        <div
          className="
            flex
            w-[72%]
            items-center
            justify-center
            gap-[16px]
          "
        >
          <FloatingLogo
            brand={brandB}
            width={190}
          />

          <Relationship>
            powered by
          </Relationship>

          <FloatingLogo
            brand={brandA}
            width={70}
          />
        </div>
      )}

      {model ===
        "presentsB" && (
        <div
          className="
            flex
            w-[72%]
            items-center
            justify-center
            gap-[16px]
          "
        >
          <FloatingLogo
            brand={brandA}
            width={105}
          />

          <Relationship>
            presents
          </Relationship>

          <FloatingLogo
            brand={brandB}
            width={190}
          />
        </div>
      )}
    </div>
  );
}

/* ================================================= */
/* LOWER THIRD                                       */
/* ================================================= */

function LowerThirdApplication({
  model,
  mode,

  brandA,
  brandB,
  property,

  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  mode:
    AdditionalRelationshipMode;

  brandA:
    BrandView;

  brandB:
    BrandView;

  property:
    PropertyView;

  image:
    number;

  isLight:
    boolean;
}) {
  const presenting =
    mode ===
    "presenting";

  const sponsored =
    mode ===
    "sponsored";

  return (
    <>
      <FrameBackground
        image={image}
      />

      <FrameTreatment
        mode={mode}
        property={property}
      />

      <SafePanel
        isLight={isLight}
        className="
          absolute

          bottom-[14px]
          left-[14px]
          right-[14px]

          flex
          min-h-[54px]

          items-center

          px-[12px]
        "
      >
        {presenting ? (
          <>
            <MiniLogo
              brand={property}
              width={86}
            />

            <div
              className="
                mx-[12px]

                h-[26px]
                w-px

                bg-white/[0.08]
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

                  text-[10px]
                  text-white/66
                "
                style={{
                  fontFamily:
                    property.fontFamily,
                }}
              >
                {property.name} live coverage
              </p>

              <div
                className="
                  mt-[4px]
                  flex
                  gap-[3px]
                "
              >
                <span
                  className="
                    h-[3px]
                    w-[28px]
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      property.primaryColor,
                  }}
                />

                <span
                  className="
                    h-[3px]
                    w-[14px]
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      property.secondaryColor,
                  }}
                />
              </div>
            </div>

            <PresenterSignature
              model={model}
              brandA={brandA}
              brandB={brandB}
              size="small"
            />
          </>
        ) : (
          <>
            <PartnershipIdentity
              model={model}
              brandA={brandA}
              brandB={brandB}
            />

            <div
              className="
                mx-[12px]

                h-[25px]
                w-px

                bg-white/[0.08]
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

                  text-[9px]
                  text-white/59
                "
              >
                Headline or key message
              </p>

              <p
                className="
                  mt-[2px]

                  text-[7px]
                  text-white/24
                "
              >
                Persistent identity
              </p>
            </div>

            {sponsored && (
              <SponsorInline
                property={
                  property
                }
              />
            )}
          </>
        )}
      </SafePanel>
    </>
  );
}

/* ================================================= */
/* OVERLAY                                           */
/* ================================================= */

function OverlayApplication({
  model,
  mode,

  brandA,
  brandB,
  property,

  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  mode:
    AdditionalRelationshipMode;

  brandA:
    BrandView;

  brandB:
    BrandView;

  property:
    PropertyView;

  image:
    number;

  isLight:
    boolean;
}) {
  const presenting =
    mode ===
    "presenting";

  const sponsored =
    mode ===
    "sponsored";

  return (
    <>
      <FrameBackground
        image={image}
      />

      <FrameTreatment
        mode={mode}
        property={property}
      />

      <SafePanel
        isLight={isLight}
        className="
          absolute

          left-[15px]
          top-[15px]

          flex
          w-[46%]

          items-center

          px-[11px]
          py-[10px]
        "
      >
        <div
          className="
            flex
            h-[36px]
            w-[36px]

            shrink-0

            items-center
            justify-center

            rounded-full

            border
            border-white/[0.10]
          "
          style={
            presenting
              ? {
                  borderColor:
                    property.primaryColor,
                }
              : undefined
          }
        >
          <span
            className="
              text-[11px]
              text-white/55
            "
          >
            65%
          </span>
        </div>

        <div className="ml-[10px]">
          <p
            className="
              text-[9px]
              text-white/57
            "
            style={
              presenting
                ? {
                    fontFamily:
                      property.fontFamily,
                  }
                : undefined
            }
          >
            {presenting
              ? `${property.name} metric`
              : "Key metric"}
          </p>

          <p
            className="
              mt-[2px]

              text-[7px]
              text-white/24
            "
          >
            Short supporting information.
          </p>
        </div>
      </SafePanel>

      {presenting ? (
        <div
          className="
            absolute

            bottom-[12px]
            left-[12px]
            right-[12px]

            flex
            items-center
            justify-between
          "
        >
          <MiniLogo
            brand={property}
            width={90}
          />

          <PresenterSignature
            model={model}
            brandA={brandA}
            brandB={brandB}
            size="small"
          />
        </div>
      ) : (
        <div
          className="
            absolute

            bottom-[12px]
            left-[12px]
            right-[12px]

            flex
            items-center
            justify-between
          "
        >
          <PartnershipIdentity
            model={model}
            brandA={brandA}
            brandB={brandB}
          />

          {sponsored && (
            <SponsorInline
              property={property}
            />
          )}
        </div>
      )}
    </>
  );
}

/* ================================================= */
/* TRANSITION                                        */
/* ================================================= */

function TransitionApplication({
  model,
  mode,
  hierarchy,

  brandA,
  brandB,
  property,

  image,
  isLight,
}: {
  model:
    PartnershipModelId;

  mode:
    AdditionalRelationshipMode;

  hierarchy:
    HierarchyConfig;

  brandA:
    BrandView;

  brandB:
    BrandView;

  property:
    PropertyView;

  image:
    number;

  isLight:
    boolean;
}) {
  const presenting =
    mode ===
    "presenting";

  const sponsored =
    mode ===
    "sponsored";

  return (
    <>
      <FrameBackground
        image={image}
      />

      <FrameTreatment
        mode={mode}
        property={property}
      />

      <TransitionLines
        accent={
          presenting
            ? property.primaryColor
            : null
        }
      />

      {presenting ? (
        <div
          className="
            absolute

            left-1/2
            top-1/2

            flex
            w-[72%]

            -translate-x-1/2
            -translate-y-1/2

            flex-col
            items-center
          "
        >
          <PresenterSignature
            model={model}
            brandA={brandA}
            brandB={brandB}
            size="small"
          />

          <p
            className="
              my-[8px]

              text-[7px]
              uppercase
              tracking-[0.14em]

              text-white/23
            "
          >
            presenting
          </p>

          <div
            className="
              h-[62px]
              w-[230px]
            "
          >
            <BrandLogo
              logoUrl={
                property.logoUrl
              }
              fallback={
                property.name
              }
            />
          </div>
        </div>
      ) : (
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
          <TransitionPartnership
            model={model}
            brandA={brandA}
            brandB={brandB}
          />
        </div>
      )}

      {sponsored && (
        <SponsorCredit
          property={property}
          isLight={isLight}
        />
      )}

      <div
        className="
          absolute
          bottom-[12px]
          right-[13px]

          text-[7px]
          text-white/19
        "
      >
        {presenting
          ? "Presenter 45% · X 55%"
          : `A ${hierarchy.brandA}% · B ${hierarchy.brandB}%`}
      </div>
    </>
  );
}

function TransitionLines({
  accent,
}: {
  accent:
    string | null;
}) {
  const strongBorder =
    accent
      ? accent
      : "rgba(255,255,255,.13)";

  return (
    <>
      <div
        className="
          absolute

          -left-[65px]
          top-[15%]

          h-[70%]
          w-[150px]

          rounded-[50%]
          border
        "
        style={{
          borderColor:
            strongBorder,
          opacity:
            0.5,
        }}
      />

      <div
        className="
          absolute

          -left-[45px]
          top-[24%]

          h-[52%]
          w-[105px]

          rounded-[50%]

          border
          border-white/[0.07]
        "
      />

      <div
        className="
          absolute

          -right-[65px]
          top-[15%]

          h-[70%]
          w-[150px]

          rounded-[50%]
          border
        "
        style={{
          borderColor:
            strongBorder,
          opacity:
            0.5,
        }}
      />

      <div
        className="
          absolute

          -right-[45px]
          top-[24%]

          h-[52%]
          w-[105px]

          rounded-[50%]

          border
          border-white/[0.07]
        "
      />
    </>
  );
}

/* ================================================= */
/* PARTNERSHIP IDENTITIES                            */
/* ================================================= */

function PartnershipIdentity({
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
    model === "axb"
  ) {
    return (
      <div className="flex items-center gap-[7px]">
        <MiniLogo
          brand={brandA}
          width={66}
        />

        <Symbol>
          ×
        </Symbol>

        <MiniLogo
          brand={brandB}
          width={66}
        />
      </div>
    );
  }

  if (
    model === "aandb"
  ) {
    return (
      <div className="flex items-center gap-[7px]">
        <MiniLogo
          brand={brandA}
          width={78}
        />

        <Relationship>
          with
        </Relationship>

        <MiniLogo
          brand={brandB}
          width={42}
        />
      </div>
    );
  }

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <div className="flex items-center gap-[7px]">
        <MiniLogo
          brand={brandB}
          width={84}
        />

        <Relationship>
          powered by
        </Relationship>

        <MiniLogo
          brand={brandA}
          width={34}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[7px]">
      <MiniLogo
        brand={brandA}
        width={38}
      />

      <Relationship>
        presents
      </Relationship>

      <MiniLogo
        brand={brandB}
        width={78}
      />
    </div>
  );
}

function PresenterSignature({
  model,
  brandA,
  brandB,
  size,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  size:
    "small" | "medium";
}) {
  const lead =
    size ===
    "medium"
      ? 88
      : 58;

  const support =
    size ===
    "medium"
      ? 60
      : 40;

  if (
    model ===
    "axb"
  ) {
    return (
      <div className="flex items-center gap-[6px]">
        <MiniLogo
          brand={brandA}
          width={lead}
        />

        <Symbol>
          ×
        </Symbol>

        <MiniLogo
          brand={brandB}
          width={lead}
        />
      </div>
    );
  }

  if (
    model ===
    "aandb"
  ) {
    return (
      <div className="flex items-center gap-[6px]">
        <MiniLogo
          brand={brandA}
          width={lead}
        />

        <Relationship>
          with
        </Relationship>

        <MiniLogo
          brand={brandB}
          width={support}
        />
      </div>
    );
  }

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <div className="flex items-center gap-[6px]">
        <MiniLogo
          brand={brandB}
          width={lead}
        />

        <Relationship>
          powered by
        </Relationship>

        <MiniLogo
          brand={brandA}
          width={support}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[6px]">
      <MiniLogo
        brand={brandA}
        width={support}
      />

      <Relationship>
        presents
      </Relationship>

      <MiniLogo
        brand={brandB}
        width={lead}
      />
    </div>
  );
}

function TransitionPartnership({
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
    model === "axb"
  ) {
    return (
      <div className="flex items-center justify-center gap-[18px]">
        <TransitionLogo
          brand={brandA}
          width="39%"
        />

        <Symbol>
          ×
        </Symbol>

        <TransitionLogo
          brand={brandB}
          width="39%"
        />
      </div>
    );
  }

  if (
    model === "aandb"
  ) {
    return (
      <div className="flex items-center justify-center gap-[16px]">
        <TransitionLogo
          brand={brandA}
          width="46%"
        />

        <Relationship>
          with
        </Relationship>

        <TransitionLogo
          brand={brandB}
          width="24%"
        />
      </div>
    );
  }

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <div className="flex items-center justify-center gap-[14px]">
        <TransitionLogo
          brand={brandB}
          width="52%"
        />

        <Relationship>
          powered by
        </Relationship>

        <TransitionLogo
          brand={brandA}
          width="18%"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-[14px]">
      <TransitionLogo
        brand={brandA}
        width="23%"
      />

      <Relationship>
        presents
      </Relationship>

      <TransitionLogo
        brand={brandB}
        width="46%"
      />
    </div>
  );
}

/* ================================================= */
/* SAFE PANEL                                        */
/* ================================================= */

function SafePanel({
  children,
  className = "",
  isLight,
}: {
  children:
    ReactNode;

  className?:
    string;

  isLight:
    boolean;
}) {
  return (
    <div
      className={`
        rounded-[11px]
        border

        ${className}
      `}
      style={{
        backgroundColor:
          isLight
            ? "rgba(250,250,248,.88)"
            : "rgba(0,0,0,.62)",

        borderColor:
          isLight
            ? "rgba(10,10,10,.09)"
            : "rgba(255,255,255,.09)",
      }}
    >
      {children}
    </div>
  );
}

/* ================================================= */
/* SPONSOR                                           */
/* ================================================= */

function SponsorCredit({
  property,
}: {
  property:
    PropertyView;

  isLight:
    boolean;
}) {
  return (
    <div
      className="
        absolute

        bottom-[13px]
        left-[14px]

        flex
        items-center
        gap-[6px]
      "
    >
      <span
        className="
          text-[6px]
          uppercase
          tracking-[0.12em]

          text-white/18
        "
      >
        Sponsored by
      </span>

      <MiniLogo
        brand={property}
        width={52}
      />
    </div>
  );
}

function SponsorInline({
  property,
}: {
  property:
    PropertyView;
}) {
  return (
    <div className="flex items-center gap-[5px]">
      <span
        className="
          text-[6px]
          uppercase
          tracking-[0.11em]

          text-white/18
        "
      >
        Sponsored by
      </span>

      <MiniLogo
        brand={property}
        width={48}
      />
    </div>
  );
}

/* ================================================= */
/* X HEADER                                          */
/* ================================================= */

function XHeaderSignature({
  label,
  property,
  large = false,
}: {
  label:
    string;

  property:
    PropertyView;

  large?:
    boolean;
}) {
  return (
    <div className="flex items-center gap-[8px]">
      <span
        className="
          text-[7px]
          uppercase
          tracking-[0.13em]

          text-white/22
        "
      >
        {label}
      </span>

      <div
        className={
          large
            ? "h-[32px] w-[108px]"
            : "h-[21px] w-[70px]"
        }
      >
        <BrandLogo
          logoUrl={
            property.logoUrl
          }
          fallback={
            property.name
          }
        />
      </div>
    </div>
  );
}

/* ================================================= */
/* LOGOS                                             */
/* ================================================= */

function FloatingLogo({
  brand,
  width,
}: {
  brand:
    BrandView;

  width:
    number;
}) {
  return (
    <div
      className="
        flex
        shrink-0

        items-center
        justify-center
      "
      style={{
        width,
        height:
          Math.max(
            26,
            width / 3
          ),

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

function MiniLogo({
  brand,
  width,
}: {
  brand:
    BrandView;

  width:
    number;
}) {
  return (
    <div
      className="
        flex
        shrink-0

        items-center
        justify-center
      "
      style={{
        width,
        height:
          Math.max(
            15,
            width / 3
          ),

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

function TransitionLogo({
  brand,
  width,
}: {
  brand:
    BrandView;

  width:
    string;
}) {
  return (
    <div
      className="
        flex
        h-[48px]

        items-center
        justify-center
      "
      style={{
        width,
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
/* SMALL ELEMENTS                                    */
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
      {children}
    </span>
  );
}

function Relationship({
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

        text-white/29
      "
    >
      {children}
    </span>
  );
}