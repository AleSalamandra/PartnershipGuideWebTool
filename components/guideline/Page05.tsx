"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import BrandLogo from "./BrandLogo";
import GuidelinePage from "./GuidelinePage";
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

type VideoLogoSize =
  | "hero"
  | "property"
  | "primary"
  | "secondary"
  | "credit"
  | "footer";

interface BrandView {
  name: string;
  logoUrl: string | null;
}

interface PropertyView extends BrandView {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
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
      result.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() *
          (index + 1)
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

/*
  We keep image 6 reserved for the two
  individual A / B brand frames.

  Presenting mode still follows:

  01 X
  02 Brand 1
  03 Relationship
  04 Brand 2
  05 Full presenting lockup
  06 Content
*/

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
    random[0] ?? 1,
    RESERVED_BRAND_IMAGE,
    random[1] ?? 2,
    RESERVED_BRAND_IMAGE,
    random[2] ?? 3,
    random[3] ?? 4,
  ];
}

function getSequence(
  model: PartnershipModelId
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
          "Brand A establishes the platform and introduces Brand B as the featured partner.",
      };
  }
}

function getPageDescription(
  sequence: ModelSequence,
  mode: AdditionalRelationshipMode,
  propertyName: string
) {
  if (
    mode === "presenting"
  ) {
    return `${propertyName} establishes the opening world first. The partnership is then introduced as the relationship behind the experience before resolving into the complete presenting signature.`;
  }

  if (
    mode === "sponsored"
  ) {
    return `${sequence.description} Sponsor attribution remains secondary and does not alter the opening narrative or visual language.`;
  }

  return sequence.description;
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page05() {
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

  const sequence =
    getSequence(
      model
    );

  const presenting =
    additionalRelationship ===
    "presenting";

  const sponsored =
    additionalRelationship ===
    "sponsored";

  const brandAView:
    BrandView = {
    name:
      brandA.name.trim() ||
      "Brand A",

    logoUrl:
      brandA.logoUrl ??
      null,
  };

  const brandBView:
    BrandView = {
    name:
      brandB.name.trim() ||
      "Brand B",

    logoUrl:
      brandB.logoUrl ??
      null,
  };

  const propertyView:
    PropertyView = {
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

  const firstBrand =
    sequence.first === "A"
      ? brandAView
      : brandBView;

  const secondBrand =
    sequence.second === "A"
      ? brandAView
      : brandBView;

  const [
    images,
    setImages,
  ] =
    useState<number[]>([
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
    [
      model,
      additionalRelationship,
    ]
  );

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

              max-w-[840px]

              text-[15px]
              leading-[1.38]

              text-white/45
            "
          >
            {getPageDescription(
              sequence,
              additionalRelationship,
              propertyView.name
            )}
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
              property={
                propertyView
              }
              large
            />
          )}

          {sponsored && (
            <XHeaderSignature
              label="Sponsored by"
              property={
                propertyView
              }
            />
          )}
        </div>
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
        {/* ====================================== */}
        {/* FRAME 01                               */}
        {/* ====================================== */}

        <Keyframe
          number="01"
          title={
            presenting
              ? "Presented property"
              : "Atmosphere"
          }
          image={
            images[0]
          }
          mode={
            additionalRelationship
          }
          property={
            propertyView
          }
        >
          {presenting ? (
            <PresentedPropertyOpening
              property={
                propertyView
              }
            />
          ) : (
            <AtmosphereFrame />
          )}
        </Keyframe>

        {/* ====================================== */}
        {/* FRAME 02                               */}
        {/* ====================================== */}

        <Keyframe
          number="02"
          title={
            sequence.first === "A"
              ? "Brand A"
              : "Brand B"
          }
          image={
            images[1]
          }
          mode={
            additionalRelationship
          }
          property={
            propertyView
          }
        >
          <BareHeroLogo
            brand={
              firstBrand
            }
          />
        </Keyframe>

        {/* ====================================== */}
        {/* FRAME 03                               */}
        {/* ====================================== */}

        <Keyframe
          number="03"
          title="Partnership relationship"
          image={
            images[2]
          }
          mode={
            additionalRelationship
          }
          property={
            propertyView
          }
        >
          <RelationshipFrame
            relationship={
              sequence.relationship
            }
          />
        </Keyframe>

        {/* ====================================== */}
        {/* FRAME 04                               */}
        {/* ====================================== */}

        <Keyframe
          number="04"
          title={
            sequence.second === "A"
              ? "Brand A"
              : "Brand B"
          }
          image={
            images[3]
          }
          mode={
            additionalRelationship
          }
          property={
            propertyView
          }
        >
          <BareHeroLogo
            brand={
              secondBrand
            }
          />
        </Keyframe>

        {/* ====================================== */}
        {/* FRAME 05                               */}
        {/* ====================================== */}

        <Keyframe
          number="05"
          title={
            presenting
              ? "Complete presenting signature"
              : "Final lockup"
          }
          image={
            images[4]
          }
          mode={
            additionalRelationship
          }
          property={
            propertyView
          }
        >
          {presenting ? (
            <CompletePresentingLockup
              model={
                model
              }
              brandA={
                brandAView
              }
              brandB={
                brandBView
              }
              property={
                propertyView
              }
            />
          ) : (
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
              sponsor={
                sponsored
                  ? propertyView
                  : null
              }
            />
          )}
        </Keyframe>

        {/* ====================================== */}
        {/* FRAME 06                               */}
        {/* ====================================== */}

        <Keyframe
          number="06"
          title="Content starts"
          image={
            images[5]
          }
          mode={
            additionalRelationship
          }
          property={
            propertyView
          }
        >
          {presenting ? (
            <PresentedContentStart
              model={
                model
              }
              brandA={
                brandAView
              }
              brandB={
                brandBView
              }
              property={
                propertyView
              }
            />
          ) : (
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
              sponsor={
                sponsored
                  ? propertyView
                  : null
              }
            />
          )}
        </Keyframe>

        {/* ====================================== */}
        {/* TRANSITION CUES                        */}
        {/* ====================================== */}

        <MotionCue
          label={
            presenting
              ? "→ introduce"
              : "→ fade in"
          }
          style={{
            left:
              "32.95%",

            top:
              "127px",
          }}
        />

        <MotionCue
          label={
            presenting
              ? "→ connect"
              : "→ introduce"
          }
          style={{
            left:
              "67.05%",

            top:
              "127px",
          }}
        />

        <MotionCue
          label={
            presenting
              ? "↓ reveal"
              : "↓ reveal"
          }
          style={{
            left:
              "50%",

            top:
              "318px",
          }}
        />

        <MotionCue
          label={
            presenting
              ? "→ resolve"
              : "→ merge"
          }
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
          {presenting
            ? "Property first · Partnership reveal · Presenting signature · Content"
            : sponsored
              ? "Partnership identity · Content · Sponsor attribution"
              : "Image · Noise · Glass · Refraction"}
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
  mode,
  property,
  children,
}: {
  number: string;
  title: string;
  image: number;

  mode:
    AdditionalRelationshipMode;

  property:
    PropertyView;

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

        <FrameAtmosphere
          mode={
            mode
          }
          property={
            property
          }
        />

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
          Key frame {number}
        </p>

        <p
          className="
            text-[8px]
            text-white/20
          "
        >
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
  image: number;
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
        draggable={false}
        onError={() => {
          if (
            extensionIndex <
            IMAGE_EXTENSIONS.length -
              1
          ) {
            setExtensionIndex(
              (current) =>
                current + 1
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
/* FRAME ATMOSPHERE                                  */
/* ================================================= */

function FrameAtmosphere({
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
      {/* Base treatment */}

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
              "#FFFFFF",

            offset:
              38,

            opacity:
              0,
          },

          {
            color:
              "#000000",

            offset:
              100,

            opacity:
              0.32,
          },
        ]}
      />

      {/* Presenting X actively affects atmosphere */}

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
                0.16,
            },

            {
              color:
                property.secondaryColor,

              offset:
                48,

              opacity:
                0.07,
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
                  index /
                  count *
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
/* FRAME 01 — NORMAL                                 */
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
/* FRAME 01 — PRESENTING X                           */
/* ================================================= */

function PresentedPropertyOpening({
  property,
}: {
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
      {/* Small context */}

      <p
        className="
          mb-[12px]

          text-[7px]
          uppercase
          tracking-[0.16em]

          text-white/25
        "
      >
        Presented property
      </p>

      {/* X is the hero from the first frame */}

      <div
        className="
          h-[72px]
          w-[235px]
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

      {/* X colour signature */}

      <div
        className="
          mt-[15px]

          flex
          items-center
          gap-[5px]
        "
      >
        <div
          className="
            h-[4px]
            w-[58px]

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
            w-[24px]

            rounded-full
          "
          style={{
            backgroundColor:
              property.secondaryColor,
          }}
        />
      </div>

      {/* Optional property-language descriptor */}

      <p
        className="
          mt-[12px]

          text-[8px]
          tracking-[0.03em]

          text-white/27
        "
        style={{
          fontFamily:
            property.fontFamily,
        }}
      >
        Enter the world of {property.name}
      </p>
    </div>
  );
}

/* ================================================= */
/* INDIVIDUAL BRAND                                  */
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
        {relationship}
      </p>
    </div>
  );
}

/* ================================================= */
/* FRAME 05 — PRESENTING LOCKUP                      */
/* ================================================= */

function CompletePresentingLockup({
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
      {/* A / B partnership */}

      <PresenterSignature
        model={
          model
        }
        brandA={
          brandA
        }
        brandB={
          brandB
        }
        size="medium"
      />

      {/* Present relationship */}

      <p
        className="
          my-[8px]

          text-[7px]
          uppercase
          tracking-[0.16em]

          text-white/26
        "
      >
        present
      </p>

      {/* X receives the largest mark */}

      <VideoLogo
        brand={
          property
        }
        size="property"
      />

      <div
        className="
          mt-[10px]

          flex
          gap-[4px]
        "
      >
        <span
          className="
            h-[4px]
            w-[50px]

            rounded-full
          "
          style={{
            backgroundColor:
              property.primaryColor,
          }}
        />

        <span
          className="
            h-[4px]
            w-[20px]

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

/* ================================================= */
/* FINAL LOCKUP — NONE / SPONSORED                   */
/* ================================================= */

function FinalLockup({
  model,
  brandA,
  brandB,
  sponsor,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  sponsor:
    PropertyView | null;
}) {
  return (
    <>
      <BaseFinalLockup
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

      {sponsor && (
        <SponsorBug
          property={
            sponsor
          }
        />
      )}
    </>
  );
}

function BaseFinalLockup({
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
    model === "aandb"
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
    model === "poweredByA"
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
      {children}
    </div>
  );
}

/* ================================================= */
/* FRAME 06 — PRESENTED CONTENT                      */
/* ================================================= */

function PresentedContentStart({
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
    <>
      {/* TOP PRESENTER BAR */}

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
        <PresenterSignature
          model={
            model
          }
          brandA={
            brandA
          }
          brandB={
            brandB
          }
          size="small"
        />

        <div
          className="
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

              text-white/20
            "
          >
            presenting
          </span>

          <MiniLogo
            brand={
              property
            }
            width={68}
          />
        </div>
      </VideoGlass>

      {/* MAIN PROPERTY CONTENT IDENTITY */}

      <div
        className="
          absolute

          left-[22px]
          top-[42%]

          h-[56px]
          w-[42%]

          -translate-y-1/2
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

      {/* PROPERTY COLOUR */}

      <div
        className="
          absolute

          bottom-[18px]
          left-[22px]

          flex
          gap-[4px]
        "
      >
        <span
          className="
            h-[4px]
            w-[46px]

            rounded-full
          "
          style={{
            backgroundColor:
              property.primaryColor,
          }}
        />

        <span
          className="
            h-[4px]
            w-[20px]

            rounded-full
          "
          style={{
            backgroundColor:
              property.secondaryColor,
          }}
        />
      </div>

      {/* CONTENT INFO */}

      <VideoGlass
        className="
          absolute

          bottom-[16px]
          right-[18px]

          w-[42%]
        "
      >
        <p
          className="
            text-[7px]
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
          style={{
            fontFamily:
              property.fontFamily,
          }}
        >
          {property.name} content
        </p>
      </VideoGlass>
    </>
  );
}

/* ================================================= */
/* FRAME 06 — NORMAL CONTENT                         */
/* ================================================= */

function ContentStart({
  model,
  brandA,
  brandB,
  sponsor,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  sponsor:
    PropertyView | null;
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
        <p
          className="
            text-[8px]
            text-white/55
          "
        >
          Shared experience
        </p>

        <PresenterSignature
          model={
            model
          }
          brandA={
            brandA
          }
          brandB={
            brandB
          }
          size="small"
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

        {sponsor ? (
          <SponsorInline
            property={
              sponsor
            }
          />
        ) : (
          <PresenterSignature
            model={
              model
            }
            brandA={
              brandA
            }
            brandB={
              brandB
            }
            size="small"
          />
        )}
      </VideoGlass>
    </>
  );
}

/* ================================================= */
/* PRESENTER SIGNATURE                               */
/* ================================================= */

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
    size === "medium"
      ? 82
      : 55;

  const support =
    size === "medium"
      ? 58
      : 38;

  if (
    model === "axb"
  ) {
    return (
      <div
        className="
          flex
          items-center
          gap-[6px]
        "
      >
        <MiniLogo
          brand={
            brandA
          }
          width={
            lead
          }
        />

        <Symbol>
          ×
        </Symbol>

        <MiniLogo
          brand={
            brandB
          }
          width={
            lead
          }
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
          items-center
          gap-[6px]
        "
      >
        <MiniLogo
          brand={
            brandA
          }
          width={
            lead
          }
        />

        <RelationshipText>
          with
        </RelationshipText>

        <MiniLogo
          brand={
            brandB
          }
          width={
            support
          }
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
          items-center
          gap-[6px]
        "
      >
        <MiniLogo
          brand={
            brandB
          }
          width={
            lead
          }
        />

        <RelationshipText>
          powered by
        </RelationshipText>

        <MiniLogo
          brand={
            brandA
          }
          width={
            support
          }
        />
      </div>
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-[6px]
      "
    >
      <MiniLogo
        brand={
          brandA
        }
        width={
          support
        }
      />

      <RelationshipText>
        presents
      </RelationshipText>

      <MiniLogo
        brand={
          brandB
        }
        width={
          lead
        }
      />
    </div>
  );
}

/* ================================================= */
/* SPONSOR                                           */
/* ================================================= */

function SponsorBug({
  property,
}: {
  property:
    PropertyView;
}) {
  return (
    <div
      className="
        absolute

        bottom-[18px]
        right-[18px]

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

          text-white/20
        "
      >
        Sponsored by
      </span>

      <MiniLogo
        brand={
          property
        }
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
    <div
      className="
        flex
        items-center
        gap-[5px]
      "
    >
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
        brand={
          property
        }
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
    <div
      className="
        flex
        items-center
        gap-[8px]
      "
    >
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
/* VIDEO LOGO                                        */
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

    property:
      205,

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

    property:
      66,

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
          widths[size],

        height:
          heights[size],

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
/* MINI LOGO                                         */
/* ================================================= */

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
      {children}
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
      {children}
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
    CSSProperties;
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