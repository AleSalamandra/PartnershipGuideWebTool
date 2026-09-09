"use client";

import type {
  ReactNode,
} from "react";

import GuidelinePage from "./GuidelinePage";
import BrandLogo from "./BrandLogo";
import PartnershipLockup from "./PartnershipLockup";

import {
  DEFAULT_FONT,
  useGuidelineStore,
} from "@/store/guidelineStore";

import type {
  BrandConfig,
  PartnershipModelId,
  PropertyXConfig,
} from "@/types/guideline";

/* ================================================= */
/* PAGE                                              */
/* ================================================= */

export default function Page02() {
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

  const isPresenting =
    additionalRelationship ===
    "presenting";

  const isSponsored =
    additionalRelationship ===
    "sponsored";

  return (
    <GuidelinePage>
      {/* ======================================== */}
      {/* HEADER                                   */}
      {/* ======================================== */}

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
        <div>
          <p
            className="
              text-[15px]
              uppercase
              tracking-[0.16em]

              text-white/30
            "
          >
            02 / Visual system
          </p>

          <h1
            className="
              mt-[20px]

              text-[58px]
              leading-[1]
              tracking-[-0.05em]

              oook-semibold
            "
          >
            Corporate visuals
          </h1>

          {isPresenting && (
            <p
              className="
                mt-[12px]

                text-[13px]
                leading-[1.4]

                text-white/35
              "
            >
              Presented property assets participate actively in the shared visual territory.
            </p>
          )}

          {isSponsored && (
            <p
              className="
                mt-[12px]

                text-[13px]
                leading-[1.4]

                text-white/35
              "
            >
              Sponsor assets remain separate from the core partnership system.
            </p>
          )}
        </div>

        <div
          className="
            flex
            flex-col
            items-end

            gap-[12px]
          "
        >
          <PartnershipLockup
            model={model}
            brandA={brandA}
            brandB={brandB}
          />

          {isPresenting && (
            <AdditionalIdentitySignature
              label="Presenting"
              name={
                propertyXName
              }
              logoUrl={
                propertyX.logoUrl
              }
              prominent
            />
          )}

          {isSponsored && (
            <AdditionalIdentitySignature
              label="Sponsored by"
              name={
                propertyXName
              }
              logoUrl={
                propertyX.logoUrl
              }
            />
          )}
        </div>
      </header>

      {/* ======================================== */}
      {/* MAIN VISUAL CARDS                        */}
      {/* ======================================== */}

      <section
        className={`
          absolute

          left-[90px]
          right-[90px]
          top-[210px]

          grid

          ${
            isPresenting
              ? `
                  grid-cols-3
                  gap-[18px]
                `
              : `
                  grid-cols-2
                  gap-[28px]
                `
          }
        `}
      >
        <IdentityVisualCard
          label="Brand A"
          identity={
            brandA
          }
          fallbackName={
            brandAName
          }
          compact={
            isPresenting
          }
        />

        <IdentityVisualCard
          label="Brand B"
          identity={
            brandB
          }
          fallbackName={
            brandBName
          }
          compact={
            isPresenting
          }
        />

        {isPresenting && (
          <IdentityVisualCard
            label="Presented property"
            identity={
              propertyX
            }
            fallbackName={
              propertyXName
            }
            compact
            featured
          />
        )}
      </section>

      {/* ======================================== */}
      {/* BOTTOM — NONE / PRESENTING               */}
      {/* ======================================== */}

      {!isSponsored && (
        <section
          className="
            absolute

            bottom-[58px]
            left-1/2

            w-[780px]

            -translate-x-1/2
          "
        >
          <CommonTypography />
        </section>
      )}

      {/* ======================================== */}
      {/* BOTTOM — SPONSORED                       */}
      {/* ======================================== */}

      {isSponsored && (
        <section
          className="
            absolute

            bottom-[58px]
            left-[90px]
            right-[90px]

            grid
            grid-cols-[1.45fr_0.75fr]

            gap-[18px]
          "
        >
          <CommonTypography />

          <SponsorAssetCard
            property={
              propertyX
            }
            fallbackName={
              propertyXName
            }
          />
        </section>
      )}
    </GuidelinePage>
  );
}

/* ================================================= */
/* IDENTITY CARD                                     */
/* ================================================= */

function IdentityVisualCard({
  label,
  identity,
  fallbackName,
  compact = false,
  featured = false,
}: {
  label:
    string;

  identity:
    BrandConfig |
    PropertyXConfig;

  fallbackName:
    string;

  compact?:
    boolean;

  featured?:
    boolean;
}) {
  const cardHeight =
    compact
      ? 425
      : 430;

  const logoHeight =
    compact
      ? 122
      : 135;

  return (
    <article
      className="
        rounded-[28px]

        border
        border-white/[0.08]

        bg-white/[0.025]

        p-[26px]
      "
      style={{
        height:
          cardHeight,

        borderColor:
          featured
            ? `${identity.primaryColor}55`
            : undefined,
      }}
    >
      {/* ======================================== */}
      {/* LABEL                                    */}
      {/* ======================================== */}

      <div
        className="
          flex
          items-start
          justify-between

          gap-[15px]
        "
      >
        <div className="min-w-0">
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.16em]

              text-white/30
            "
          >
            {label}
          </p>

          <p
            className="
              mt-[7px]

              truncate

              text-[20px]

              text-white/80

              oook-medium
            "
          >
            {fallbackName}
          </p>
        </div>

        <p
          className="
            shrink-0

            text-[9px]
            uppercase
            tracking-[0.12em]

            text-white/20
          "
        >
          {featured
            ? "Content identity"
            : "Identity"}
        </p>
      </div>

      {/* ======================================== */}
      {/* LOGO                                     */}
      {/* ======================================== */}

      <div
        className="
          mt-[22px]

          flex

          items-center
          justify-center

          rounded-[20px]

          border
          border-white/[0.07]

          bg-black/30

          px-[28px]
          py-[22px]
        "
        style={{
          height:
            logoHeight,
        }}
      >
        <BrandLogo
          logoUrl={
            identity.logoUrl
          }
          fallback={
            fallbackName
          }
        />
      </div>

      {/* ======================================== */}
      {/* COLOUR + TYPE                            */}
      {/* ======================================== */}

      <div
        className="
          mt-[24px]

          grid
          grid-cols-2

          gap-[22px]
        "
      >
        <div>
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.14em]

              text-white/25
            "
          >
            Colours
          </p>

          <div className="mt-[11px] space-y-[9px]">
            <ColorSample
              value={
                identity.primaryColor
              }
            />

            <ColorSample
              value={
                identity.secondaryColor
              }
            />
          </div>
        </div>

        <div>
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.14em]

              text-white/25
            "
          >
            Typeface
          </p>

          <div
            className="
              mt-[10px]

              flex
              items-end

              gap-[12px]
            "
          >
            <span
              className="
                text-[38px]
                leading-none

                text-white/85
              "
              style={{
                fontFamily:
                  identity.fontFamily,
              }}
            >
              Aa
            </span>

            <div className="min-w-0">
              <p
                className="
                  max-w-[140px]

                  truncate

                  text-[12px]

                  text-white/60
                "
              >
                {getFontName(
                  identity.fontFamily
                )}
              </p>

              <p
                className="
                  mt-[2px]

                  text-[10px]

                  text-white/25
                "
              >
                {featured
                  ? "Property typeface"
                  : "Brand typeface"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================== */}
      {/* FEATURED INDICATOR                       */}
      {/* ======================================== */}

      {featured && (
        <div className="mt-[20px] flex items-center gap-[6px]">
          <span
            className="
              h-[4px]
              w-[42px]

              rounded-full
            "
            style={{
              backgroundColor:
                identity.primaryColor,
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
                identity.secondaryColor,
            }}
          />

          <p
            className="
              ml-[5px]

              text-[8px]

              text-white/24
            "
          >
            Active shared-system contributor
          </p>
        </div>
      )}
    </article>
  );
}

/* ================================================= */
/* COMMON TYPOGRAPHY                                 */
/* ================================================= */

function CommonTypography() {
  return (
    <div
      className="
        rounded-[26px]

        border
        border-white/[0.08]

        bg-white/[0.03]

        px-[30px]
        py-[22px]
      "
    >
      <div
        className="
          flex
          items-center
          gap-[28px]
        "
      >
        <div
          className="
            flex

            h-[68px]
            w-[105px]

            shrink-0

            items-center
            justify-center

            border-r
            border-white/[0.08]

            pr-[26px]
          "
          style={{
            fontFamily:
              DEFAULT_FONT,
          }}
        >
          <span
            className="
              text-[46px]
              leading-none

              text-white/90
            "
          >
            Aa
          </span>
        </div>

        <div className="min-w-0">
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.15em]

              text-white/30
            "
          >
            Common typography
          </p>

          <p
            className="
              mt-[5px]

              text-[18px]

              text-white/75
            "
          >
            {getFontName(
              DEFAULT_FONT
            )}
          </p>

          <p
            className="
              mt-[4px]

              truncate

              text-[15px]

              text-white/40
            "
            style={{
              fontFamily:
                DEFAULT_FONT,
            }}
          >
            Shared language for partnership communication.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* SPONSOR ASSET                                     */
/* ================================================= */

function SponsorAssetCard({
  property,
  fallbackName,
}: {
  property:
    PropertyXConfig;

  fallbackName:
    string;
}) {
  return (
    <div
      className="
        flex

        min-h-[114px]

        items-center

        rounded-[26px]

        border
        border-white/[0.07]

        bg-white/[0.018]

        px-[24px]
        py-[19px]
      "
    >
      <div className="min-w-0 flex-1">
        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.14em]

            text-white/24
          "
        >
          Sponsor asset
        </p>

        <p
          className="
            mt-[5px]

            truncate

            text-[13px]

            text-white/50
          "
        >
          {fallbackName}
        </p>

        <p
          className="
            mt-[4px]

            text-[8px]
            leading-[1.35]

            text-white/20
          "
        >
          Logo only. No influence on the shared palette or typography.
        </p>
      </div>

      <div
        className="
          ml-[18px]

          h-[38px]
          w-[120px]

          shrink-0
        "
      >
        <BrandLogo
          logoUrl={
            property.logoUrl
          }
          fallback={
            fallbackName
          }
        />
      </div>
    </div>
  );
}

/* ================================================= */
/* ADDITIONAL SIGNATURE                              */
/* ================================================= */

function AdditionalIdentitySignature({
  label,
  name,
  logoUrl,
  prominent = false,
}: {
  label:
    string;

  name:
    string;

  logoUrl:
    string | null;

  prominent?:
    boolean;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-[9px]
      "
    >
      <span
        className="
          text-[8px]
          uppercase
          tracking-[0.13em]

          text-white/22
        "
      >
        {label}
      </span>

      <div
        className={
          prominent
            ? "h-[36px] w-[120px]"
            : "h-[24px] w-[82px]"
        }
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
/* COLOUR                                            */
/* ================================================= */

function ColorSample({
  value,
}: {
  value:
    string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-[10px]
      "
    >
      <div
        className="
          h-[23px]
          w-[23px]

          shrink-0

          rounded-full

          border
          border-white/10
        "
        style={{
          backgroundColor:
            value,
        }}
      />

      <span
        className="
          font-mono

          text-[10px]
          uppercase

          text-white/45
        "
      >
        {value}
      </span>
    </div>
  );
}

/* ================================================= */
/* FONT NAME                                         */
/* ================================================= */

function getFontName(
  fontFamily:
    string
) {
  const cleaned =
    fontFamily
      .replace(
        /["']/g,
        ""
      )
      .split(
        ","
      )[0]
      .trim();

  if (
    cleaned ===
      "oook-variable" ||
    cleaned ===
      "oook variable"
  ) {
    return "Oook Variable";
  }

  return (
    cleaned ||
    "Oook Variable"
  );
}