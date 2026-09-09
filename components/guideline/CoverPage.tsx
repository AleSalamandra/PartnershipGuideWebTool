"use client";

import BrandLogo from "./BrandLogo";
import GuidelinePage from "./GuidelinePage";
import PartnershipLockup from "./PartnershipLockup";

import {
  useGuidelineStore,
} from "@/store/guidelineStore";

import type {
  AdditionalRelationshipMode,
  PartnershipModelId,
} from "@/types/guideline";

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function getRelationshipLabel(
  model: PartnershipModelId
) {
  switch (model) {
    case "axb":
      return "×";

    case "aandb":
      return "with";

    case "poweredByA":
      return "powers";

    case "presentsB":
    default:
      return "presents";
  }
}

function getSubtitle(
  mode: AdditionalRelationshipMode
) {
  if (
    mode === "presenting"
  ) {
    return "A flexible visual system for two partner brands presenting a third content property.";
  }

  if (
    mode === "sponsored"
  ) {
    return "A flexible visual system for two partner brands with a controlled commercial sponsorship layer.";
  }

  return "A flexible visual system for creating a coherent collaboration between two brands.";
}

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function CoverPage() {
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

  const brandAName =
    brandA.name.trim() ||
    "Brand A";

  const brandBName =
    brandB.name.trim() ||
    "Brand B";

  const propertyXName =
    propertyX.name.trim() ||
    "X";

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* TOP LABEL                                */}
      {/* ======================================== */}

      <header
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[72px]

          flex
          items-start
          justify-between
        "
      >
        <p
          className="
            text-[18px]
            uppercase
            tracking-[0.16em]

            text-white/45
          "
        >
          Visual Partnership Guidelines
        </p>

        <div
          className="
            flex
            flex-col
            items-end
            gap-[13px]
          "
        >
          <PartnershipLockup
            model={model}
            brandA={brandA}
            brandB={brandB}
          />

          {additionalRelationship !==
            "none" && (
            <AdditionalRelationshipLabel
              mode={
                additionalRelationship
              }
              name={
                propertyXName
              }
            />
          )}
        </div>
      </header>

      {/* ======================================== */}
      {/* HERO                                     */}
      {/* ======================================== */}

      <section
        className="
          absolute

          left-[90px]
          right-[90px]
          top-[180px]
        "
      >
        <h1
          className="
            max-w-[1150px]

            text-[126px]
            leading-[0.9]
            tracking-[-0.065em]
          "
        >
          <span className="oook-semibold">
            Style
          </span>{" "}
          <span className="oook-light">
            Guide
          </span>
        </h1>

        <p
          className="
            mt-[30px]

            max-w-[760px]

            text-[26px]
            leading-[1.35]
            tracking-[-0.02em]

            text-white/50

            oook-light
          "
        >
          {getSubtitle(
            additionalRelationship
          )}
        </p>
      </section>

      {/* ======================================== */}
      {/* RELATIONSHIP                             */}
      {/* ======================================== */}

      <section
        className="
          absolute

          bottom-[82px]
          left-[90px]
          right-[90px]
        "
      >
        <div className="mb-[24px] h-px bg-white/12" />

        {/* ====================================== */}
        {/* NO X                                   */}
        {/* ====================================== */}

        {additionalRelationship ===
          "none" && (
          <div
            className="
              grid

              grid-cols-[1fr_110px_1fr]

              items-center
              gap-[26px]
            "
          >
            <BrandCard
              eyebrow="Brand A"
              name={
                brandAName
              }
              logoUrl={
                brandA.logoUrl
              }
              fallback={
                brandAName
              }
            />

            <RelationshipWord>
              {getRelationshipLabel(
                model
              )}
            </RelationshipWord>

            <BrandCard
              eyebrow="Brand B"
              name={
                brandBName
              }
              logoUrl={
                brandB.logoUrl
              }
              fallback={
                brandBName
              }
            />
          </div>
        )}

        {/* ====================================== */}
        {/* PRESENTING X                           */}
        {/* ====================================== */}

        {additionalRelationship ===
          "presenting" && (
          <div
            className="
              grid

              grid-cols-[1fr_68px_1fr_92px_1.18fr]

              items-center

              gap-[18px]
            "
          >
            <BrandCard
              eyebrow="Brand A"
              name={
                brandAName
              }
              logoUrl={
                brandA.logoUrl
              }
              fallback={
                brandAName
              }
              compact
            />

            <RelationshipWord compact>
              {getRelationshipLabel(
                model
              )}
            </RelationshipWord>

            <BrandCard
              eyebrow="Brand B"
              name={
                brandBName
              }
              logoUrl={
                brandB.logoUrl
              }
              fallback={
                brandBName
              }
              compact
            />

            <RelationshipWord
              compact
              label
            >
              present
            </RelationshipWord>

            <BrandCard
              eyebrow="Presented property"
              name={
                propertyXName
              }
              logoUrl={
                propertyX.logoUrl
              }
              fallback={
                propertyXName
              }
              accent={
                propertyX.primaryColor
              }
              featured
            />
          </div>
        )}

        {/* ====================================== */}
        {/* SPONSORED BY X                         */}
        {/* ====================================== */}

        {additionalRelationship ===
          "sponsored" && (
          <>
            <div
              className="
                grid

                grid-cols-[1fr_110px_1fr]

                items-center
                gap-[26px]
              "
            >
              <BrandCard
                eyebrow="Brand A"
                name={
                  brandAName
                }
                logoUrl={
                  brandA.logoUrl
                }
                fallback={
                  brandAName
                }
              />

              <RelationshipWord>
                {getRelationshipLabel(
                  model
                )}
              </RelationshipWord>

              <BrandCard
                eyebrow="Brand B"
                name={
                  brandBName
                }
                logoUrl={
                  brandB.logoUrl
                }
                fallback={
                  brandBName
                }
              />
            </div>

            <SponsorSignature
              name={
                propertyXName
              }
              logoUrl={
                propertyX.logoUrl
              }
            />
          </>
        )}
      </section>
    </GuidelinePage>
  );
}

/* ================================================= */
/* BRAND CARD                                        */
/* ================================================= */

interface BrandCardProps {
  eyebrow:
    string;

  name:
    string;

  logoUrl:
    string | null;

  fallback:
    string;

  accent?:
    string;

  compact?:
    boolean;

  featured?:
    boolean;
}

function BrandCard({
  eyebrow,
  name,
  logoUrl,
  fallback,
  accent,
  compact = false,
  featured = false,
}: BrandCardProps) {
  const height =
    compact
      ? 170
      : 190;

  return (
    <div
      className="
        relative

        rounded-[24px]

        border
        border-white/10

        bg-white/[0.025]

        p-[24px]
      "
      style={{
        height,

        borderColor:
          featured &&
          accent
            ? `${accent}55`
            : undefined,
      }}
    >
      <div
        className="
          absolute

          left-[24px]
          right-[24px]
          top-[20px]

          flex
          items-center
          justify-between

          gap-[14px]
        "
      >
        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.16em]

            text-white/32
          "
        >
          {eyebrow}
        </p>

        <p
          className="
            max-w-[60%]

            truncate

            text-[10px]

            text-white/20
          "
        >
          {name}
        </p>
      </div>

      {featured &&
        accent && (
          <div
            className="
              absolute

              left-[24px]
              top-[49px]

              h-[4px]
              w-[48px]

              rounded-full
            "
            style={{
              backgroundColor:
                accent,
            }}
          />
        )}

      <div
        className="
          absolute

          bottom-[25px]
          left-[24px]
          right-[24px]
          top-[64px]
        "
      >
        <BrandLogo
          logoUrl={
            logoUrl
          }
          fallback={
            fallback
          }
        />
      </div>
    </div>
  );
}

/* ================================================= */
/* RELATIONSHIP                                      */
/* ================================================= */

function RelationshipWord({
  children,
  compact = false,
  label = false,
}: {
  children:
    ReactNode;

  compact?:
    boolean;

  label?:
    boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-center

        text-center
      "
    >
      <span
        className={`
          ${
            label
              ? `
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                `
              : compact
                ? "text-[24px]"
                : "text-[40px]"
          }

          text-white/42

          oook-light
        `}
      >
        {children}
      </span>
    </div>
  );
}

/* ================================================= */
/* SPONSOR                                           */
/* ================================================= */

function SponsorSignature({
  name,
  logoUrl,
}: {
  name:
    string;

  logoUrl:
    string | null;
}) {
  return (
    <div
      className="
        absolute

        bottom-[-45px]
        right-0

        flex
        items-center
        gap-[12px]
      "
    >
      <span
        className="
          text-[9px]
          uppercase
          tracking-[0.14em]

          text-white/22
        "
      >
        Sponsored by
      </span>

      <div
        className="
          h-[26px]
          w-[95px]
        "
      >
        <BrandLogo
          logoUrl={
            logoUrl
          }
          fallback={
            name
          }
        />
      </div>
    </div>
  );
}

/* ================================================= */
/* ADDITIONAL LABEL                                  */
/* ================================================= */

function AdditionalRelationshipLabel({
  mode,
  name,
}: {
  mode:
    AdditionalRelationshipMode;

  name:
    string;
}) {
  return (
    <div
      className="
        flex
        items-center

        gap-[7px]

        rounded-full

        border
        border-white/[0.07]

        px-[10px]
        py-[6px]
      "
    >
      <span
        className="
          text-[7px]
          uppercase
          tracking-[0.13em]

          text-white/24
        "
      >
        {mode ===
        "presenting"
          ? "Presenting"
          : "Sponsored by"}
      </span>

      <span
        className="
          max-w-[130px]
          truncate

          text-[8px]

          text-white/48
        "
      >
        {name}
      </span>
    </div>
  );
}