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

interface BrandView {
  name: string;
  logoUrl: string | null;
}

interface PropertyView extends BrandView {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

interface ClosingConfig {
  description: string;
  signature: string;
  overlay: string;
  cta: string;
  minimal: string;
}

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
/* BASE MODEL CONFIG                                 */
/* ================================================= */

function getClosingConfig(
  model:
    PartnershipModelId
): ClosingConfig {
  switch (model) {
    case "axb":
      return {
        description:
          "Both brands close the experience together with equal optical prominence and a shared final signature.",

        signature:
          "Equal brand sign-off",

        overlay:
          "Shared closing overlay",

        cta:
          "Neutral shared CTA",

        minimal:
          "Brand A × Brand B",
      };

    case "aandb":
      return {
        description:
          "Brand A owns the closing moment while Brand B remains clearly visible as the supporting partner.",

        signature:
          "Brand A-led sign-off",

        overlay:
          "Brand A persistent identity",

        cta:
          "Brand A CTA with partner credit",

        minimal:
          "Brand A with Brand B",
      };

    case "poweredByA":
      return {
        description:
          "Brand B closes the consumer experience. Brand A remains present only as a clear technology or production endorsement.",

        signature:
          "Brand B sign-off",

        overlay:
          "Brand B + powered-by credit",

        cta:
          "Brand B consumer CTA",

        minimal:
          "Brand B powered by Brand A",
      };

    case "presentsB":
    default:
      return {
        description:
          "Brand B closes the featured content before Brand A returns as the platform or presenting identity.",

        signature:
          "Featured content sign-off",

        overlay:
          "Brand B inside Brand A container",

        cta:
          "Return to Brand A platform",

        minimal:
          "Brand A presents Brand B",
      };
  }
}

function shuffledImages() {
  return [...IMAGE_NUMBERS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page07() {
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

  const config =
    getClosingConfig(
      model
    );

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
    5,
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

  const description =
    presenting
      ? `${x.name} receives the main content sign-off. Brand A and Brand B remain visible as the presenting relationship behind the property.`
      : sponsored
        ? `${config.description} ${x.name} is added only as a restrained sponsor attribution.`
        : config.description;

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

      <header
        className="
          absolute

          left-[44px]
          right-[44px]
          top-[36px]

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
              tracking-[0.16em]

              text-white/28
            "
          >
            07 / Closing identity
          </p>

          <h1
            className="
              mt-[15px]

              text-[50px]
              leading-[0.95]
              tracking-[-0.05em]

              text-white
              oook-semibold
            "
          >
            Video closing applications
          </h1>

          <p
            className="
              mt-[16px]
              max-w-[860px]

              text-[15px]
              leading-[1.4]

              text-white/40
            "
          >
            {description}
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
          left-[44px]
          right-[44px]
          top-[225px]

          grid
          grid-cols-2
          grid-rows-2

          gap-x-[26px]
          gap-y-[22px]
        "
      >
        <ClosingCard
          number="01"
          title="Final signature"
          description={
            presenting
              ? `${x.name} + presenting signature`
              : sponsored
                ? `${config.signature} + sponsor`
                : config.signature
          }
        >
          <FinalSignature
            model={model}
            mode={
              additionalRelationship
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
        </ClosingCard>

        <ClosingCard
          number="02"
          title="Over footage"
          description={
            presenting
              ? `${x.name} persistent content sign-off`
              : sponsored
                ? `${config.overlay} + sponsor credit`
                : config.overlay
          }
        >
          <OverFootage
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
        </ClosingCard>

        <ClosingCard
          number="03"
          title="CTA end card"
          description={
            presenting
              ? `${x.name}-led CTA`
              : sponsored
                ? `${config.cta} + sponsor credit`
                : config.cta
          }
        >
          <CTAEndCard
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
        </ClosingCard>

        <ClosingCard
          number="04"
          title="Minimal closing"
          description={
            presenting
              ? `${x.name} presented by A / B`
              : sponsored
                ? `${config.minimal} + sponsor`
                : config.minimal
          }
        >
          <MinimalClosing
            model={model}
            mode={
              additionalRelationship
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
        </ClosingCard>
      </section>

      {/* ======================================== */}
      {/* FOOTER                                   */}
      {/* ======================================== */}

      <div
        className="
          absolute

          bottom-[36px]
          left-[44px]
          right-[44px]

          flex
          items-center
          justify-between
        "
      >
        <p className="text-[9px] text-white/22">
          Closing layouts may adapt to duration, platform and campaign requirements.
        </p>

        <p className="text-[9px] text-white/22">
          {presenting
            ? "Property sign-off · Presenter signature · CTA · Ownership"
            : "Sign-off · CTA · Credits · Ownership · Clear space"}
        </p>
      </div>
    </GuidelinePage>
  );
}

/* ================================================= */
/* CARD                                              */
/* ================================================= */

function ClosingCard({
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
            max-w-[98px]

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

function ClosingBackground({
  image,
  mode,
  property,
}: {
  image:
    number;

  mode:
    AdditionalRelationshipMode;

  property:
    PropertyView;
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
    <>
      <div
        className="
          absolute
          inset-0
          overflow-hidden
        "
        style={{
          filter:
            "grayscale(0.96) contrast(1.04)",
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
              0.02,
          },
          {
            color:
              "#000000",
            offset:
              55,
            opacity:
              0,
          },
          {
            color:
              "#000000",
            offset:
              100,
            opacity:
              0.38,
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
    </>
  );
}

/* ================================================= */
/* FINAL SIGNATURE                                   */
/* ================================================= */

function FinalSignature({
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
  return (
    <>
      <ClosingBackground
        image={image}
        mode={mode}
        property={property}
      />

      {mode ===
      "presenting" ? (
        <PropertyClosingLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
          property={property}
          large
        />
      ) : (
        <>
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center
            "
          >
            <ClosingLockup
              model={model}
              brandA={brandA}
              brandB={brandB}
              large
            />
          </div>

          {mode ===
            "sponsored" && (
            <SponsorCredit
              property={property}
              isLight={isLight}
            />
          )}
        </>
      )}
    </>
  );
}

/* ================================================= */
/* OVER FOOTAGE                                      */
/* ================================================= */

function OverFootage({
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

  return (
    <>
      <ClosingBackground
        image={image}
        mode={mode}
        property={property}
      />

      <SafeClosingPanel
        isLight={isLight}
        className="
          absolute

          bottom-[14px]
          left-[14px]
          right-[14px]

          flex
          min-h-[55px]

          items-center
          justify-between

          px-[12px]
        "
      >
        {presenting ? (
          <>
            <ClosingLogo
              brand={property}
              width={105}
            />

            <div
              className="
                flex
                items-center
                gap-[10px]
              "
            >
              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.12em]

                  text-white/22
                "
              >
                presented by
              </span>

              <PresenterSignature
                model={model}
                brandA={brandA}
                brandB={brandB}
                small
              />
            </div>
          </>
        ) : (
          <>
            <ClosingLockup
              model={model}
              brandA={brandA}
              brandB={brandB}
            />

            {mode ===
            "sponsored" ? (
              <SponsorInline
                property={property}
              />
            ) : (
              <p
                className="
                  text-[7px]
                  text-white/25
                "
              >
                Thank you for watching
              </p>
            )}
          </>
        )}
      </SafeClosingPanel>
    </>
  );
}

/* ================================================= */
/* CTA END CARD                                      */
/* ================================================= */

function CTAEndCard({
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

  const primary =
    model ===
    "poweredByA"
      ? brandB
      : brandA;

  const secondary =
    primary === brandA
      ? brandB
      : brandA;

  return (
    <>
      <ClosingBackground
        image={image}
        mode={mode}
        property={property}
      />

      <SafeClosingPanel
        isLight={isLight}
        className="
          absolute

          bottom-[24px]
          left-[24px]

          w-[50%]

          p-[13px]
        "
      >
        {presenting && (
          <div
            className="
              mb-[10px]

              h-[28px]
              w-[100px]
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
        )}

        <p
          className="
            text-[7px]
            uppercase
            tracking-[0.12em]

            text-white/28
          "
        >
          Continue the experience
        </p>

        <p
          className="
            mt-[5px]

            text-[14px]
            text-white/76

            oook-medium
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
            ? `Explore ${property.name}`
            : "Discover more"}
        </p>

        <button
          type="button"
          className="
            mt-[10px]

            rounded-full

            px-[11px]
            py-[6px]

            text-[7px]
          "
          style={
            presenting
              ? {
                  backgroundColor:
                    property.primaryColor,
                  color:
                    "#FFFFFF",
                }
              : {
                  backgroundColor:
                    "#FFFFFF",
                  color:
                    "#000000",
                }
          }
        >
          Visit experience →
        </button>
      </SafeClosingPanel>

      {presenting ? (
        <div
          className="
            absolute

            right-[20px]
            top-[20px]

            flex
            flex-col
            items-end
          "
        >
          <p
            className="
              mb-[6px]

              text-[6px]
              uppercase
              tracking-[0.12em]

              text-white/20
            "
          >
            Presented by
          </p>

          <PresenterSignature
            model={model}
            brandA={brandA}
            brandB={brandB}
            small
          />
        </div>
      ) : (
        <>
          <div
            className="
              absolute

              right-[20px]
              top-[20px]
            "
          >
            <ClosingLogo
              brand={secondary}
              width={80}
            />
          </div>

          <div
            className="
              absolute

              bottom-[18px]
              right-[20px]
            "
          >
            <ClosingLogo
              brand={primary}
              width={100}
            />
          </div>

          {mode ===
            "sponsored" && (
            <SponsorCredit
              property={property}
              isLight={isLight}
            />
          )}
        </>
      )}
    </>
  );
}

/* ================================================= */
/* MINIMAL CLOSING                                   */
/* ================================================= */

function MinimalClosing({
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
  return (
    <>
      <ClosingBackground
        image={image}
        mode={mode}
        property={property}
      />

      {mode ===
      "presenting" ? (
        <PropertyClosingLockup
          model={model}
          brandA={brandA}
          brandB={brandB}
          property={property}
          minimal
        />
      ) : (
        <>
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center
            "
          >
            <ClosingLockup
              model={model}
              brandA={brandA}
              brandB={brandB}
              minimal
            />
          </div>

          {mode ===
            "sponsored" && (
            <SponsorCredit
              property={property}
              isLight={isLight}
            />
          )}
        </>
      )}

      <div
        className="
          absolute

          bottom-[13px]
          left-1/2

          h-px
          w-[34%]

          -translate-x-1/2

          bg-white/[0.08]
        "
      />
    </>
  );
}

/* ================================================= */
/* PROPERTY CLOSING                                  */
/* ================================================= */

function PropertyClosingLockup({
  model,
  brandA,
  brandB,
  property,

  large = false,
  minimal = false,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  property:
    PropertyView;

  large?:
    boolean;

  minimal?:
    boolean;
}) {
  const width =
    large
      ? 240
      : minimal
        ? 175
        : 190;

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
      <div
        style={{
          width,
          height:
            width / 3,
        }}
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
          mt-[13px]

          flex
          items-center
          gap-[9px]
        "
      >
        <span
          className="
            text-[7px]
            uppercase
            tracking-[0.13em]

            text-white/23
          "
        >
          Presented by
        </span>

        <PresenterSignature
          model={model}
          brandA={brandA}
          brandB={brandB}
          small
        />
      </div>

      <div
        className="
          mt-[11px]

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
            w-[19px]

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
/* BASE LOCKUP                                       */
/* ================================================= */

function ClosingLockup({
  model,
  brandA,
  brandB,
  large = false,
  minimal = false,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  large?:
    boolean;

  minimal?:
    boolean;
}) {
  const equalWidth =
    large
      ? 146
      : minimal
        ? 96
        : 70;

  if (
    model === "axb"
  ) {
    return (
      <div className="flex items-center justify-center gap-[13px]">
        <ClosingLogo
          brand={brandA}
          width={equalWidth}
        />

        <Symbol>
          ×
        </Symbol>

        <ClosingLogo
          brand={brandB}
          width={equalWidth}
        />
      </div>
    );
  }

  if (
    model === "aandb"
  ) {
    return (
      <div className="flex items-center justify-center gap-[11px]">
        <ClosingLogo
          brand={brandA}
          width={
            large
              ? 165
              : minimal
                ? 110
                : 78
          }
        />

        <Relationship>
          with
        </Relationship>

        <ClosingLogo
          brand={brandB}
          width={
            large
              ? 88
              : minimal
                ? 58
                : 42
          }
        />
      </div>
    );
  }

  if (
    model ===
    "poweredByA"
  ) {
    return (
      <div className="flex items-center justify-center gap-[11px]">
        <ClosingLogo
          brand={brandB}
          width={
            large
              ? 175
              : minimal
                ? 118
                : 82
          }
        />

        <Relationship>
          powered by
        </Relationship>

        <ClosingLogo
          brand={brandA}
          width={
            large
              ? 70
              : minimal
                ? 50
                : 34
          }
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-[11px]">
      <ClosingLogo
        brand={brandA}
        width={
          large
            ? 86
            : minimal
              ? 62
              : 38
        }
      />

      <Relationship>
        presents
      </Relationship>

      <ClosingLogo
        brand={brandB}
        width={
          large
            ? 160
            : minimal
              ? 108
              : 78
        }
      />
    </div>
  );
}

/* ================================================= */
/* PRESENTER SIGNATURE                               */
/* ================================================= */

function PresenterSignature({
  model,
  brandA,
  brandB,
  small = false,
}: {
  model:
    PartnershipModelId;

  brandA:
    BrandView;

  brandB:
    BrandView;

  small?:
    boolean;
}) {
  const lead =
    small
      ? 54
      : 72;

  const support =
    small
      ? 36
      : 48;

  if (
    model === "axb"
  ) {
    return (
      <div className="flex items-center gap-[5px]">
        <ClosingLogo
          brand={brandA}
          width={lead}
        />

        <Symbol>
          ×
        </Symbol>

        <ClosingLogo
          brand={brandB}
          width={lead}
        />
      </div>
    );
  }

  if (
    model === "aandb"
  ) {
    return (
      <div className="flex items-center gap-[5px]">
        <ClosingLogo
          brand={brandA}
          width={lead}
        />

        <Relationship>
          with
        </Relationship>

        <ClosingLogo
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
      <div className="flex items-center gap-[5px]">
        <ClosingLogo
          brand={brandB}
          width={lead}
        />

        <Relationship>
          powered by
        </Relationship>

        <ClosingLogo
          brand={brandA}
          width={support}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[5px]">
      <ClosingLogo
        brand={brandA}
        width={support}
      />

      <Relationship>
        presents
      </Relationship>

      <ClosingLogo
        brand={brandB}
        width={lead}
      />
    </div>
  );
}

/* ================================================= */
/* SAFE PANEL                                        */
/* ================================================= */

function SafeClosingPanel({
  children,
  isLight,
  className = "",
}: {
  children:
    ReactNode;

  isLight:
    boolean;

  className?:
    string;
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
        right-[14px]

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

      <ClosingLogo
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

      <ClosingLogo
        brand={property}
        width={50}
      />
    </div>
  );
}

/* ================================================= */
/* HEADER X                                          */
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
/* LOGO                                              */
/* ================================================= */

function ClosingLogo({
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
            18,
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

        text-white/28
      "
    >
      {children}
    </span>
  );
}