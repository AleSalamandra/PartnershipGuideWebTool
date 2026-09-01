"use client";

import React from "react";

import GuidelinePage from "./GuidelinePage";
import BrandLogo from "./BrandLogo";

import { useGuidelineStore } from "@/store/guidelineStore";

import {
  BrandConfig,
  PartnershipModelId,
} from "@/types/guideline";

export default function Page02() {
  const {
    partnershipModel,

    brandA,
    brandB,

    commonFontFamily,
  } = useGuidelineStore();

  const brandAName =
    brandA.name.trim() ||
    "Brand A";

  const brandBName =
    brandB.name.trim() ||
    "Brand B";

  return (
    <GuidelinePage>
      {/* HEADER */}

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
        </div>

        <PartnershipLockup
          model={
            partnershipModel
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
      </header>

      {/* BRAND CARDS */}

      <section
        className="
          absolute
          left-[90px]
          right-[90px]
          top-[210px]
          grid
          grid-cols-2
          gap-[28px]
        "
      >
        <BrandVisualCard
          label="Brand A"
          brand={brandA}
          fallbackName={
            brandAName
          }
        />

        <BrandVisualCard
          label="Brand B"
          brand={brandB}
          fallbackName={
            brandBName
          }
        />
      </section>

      {/* COMMON TYPOGRAPHY */}

      <section
        className="
          absolute
          bottom-[68px]
          left-1/2
          w-[780px]
          -translate-x-1/2
        "
      >
        <div
          className="
            rounded-[26px]
            border
            border-white/[0.08]
            bg-white/[0.03]
            px-[32px]
            py-[24px]
          "
        >
          <div
            className="
              flex
              items-center
              gap-[30px]
            "
          >
            <div
              className="
                flex
                h-[74px]
                w-[110px]
                shrink-0
                items-center
                justify-center
                border-r
                border-white/[0.08]
                pr-[28px]
              "
              style={{
                fontFamily:
                  commonFontFamily,
              }}
            >
              <span
                className="
                  text-[50px]
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
                  text-[12px]
                  uppercase
                  tracking-[0.15em]
                  text-white/30
                "
              >
                Common typography
              </p>

              <p
                className="
                  mt-[6px]
                  text-[20px]
                  text-white/75
                "
              >
                {getFontName(
                  commonFontFamily
                )}
              </p>

              <p
                className="
                  mt-[5px]
                  truncate
                  text-[18px]
                  text-white/40
                "
                style={{
                  fontFamily:
                    commonFontFamily,
                }}
              >
                Shared language for
                partnership communication.
              </p>
            </div>
          </div>
        </div>
      </section>
    </GuidelinePage>
  );
}

/* ------------------------------------------------ */
/* BRAND VISUAL CARD                                */
/* ------------------------------------------------ */

function BrandVisualCard({
  label,
  brand,
  fallbackName,
}: {
  label: string;
  brand: BrandConfig;
  fallbackName: string;
}) {
  return (
    <article
      className="
        h-[430px]
        rounded-[28px]
        border
        border-white/[0.08]
        bg-white/[0.025]
        p-[30px]
      "
    >
      {/* LABEL */}

      <div
        className="
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
              text-white/30
            "
          >
            {label}
          </p>

          <p
            className="
              mt-[7px]
              text-[22px]
              text-white/80
              oook-medium
            "
          >
            {fallbackName}
          </p>
        </div>

        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.12em]
            text-white/20
          "
        >
          Identity
        </p>
      </div>

      {/* LOGO */}

      <div
        className="
          mt-[26px]
          flex
          h-[135px]
          items-center
          justify-center
          rounded-[20px]
          border
          border-white/[0.07]
          bg-black/30
          px-[34px]
          py-[25px]
        "
      >
        <BrandLogo
          logoUrl={
            brand.logoUrl
          }
          fallback={
            fallbackName
          }
        />
      </div>

      {/* BOTTOM */}

      <div
        className="
          mt-[28px]
          grid
          grid-cols-[1fr_1fr]
          gap-[30px]
        "
      >
        {/* COLORS */}

        <div>
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.14em]
              text-white/25
            "
          >
            Colours
          </p>

          <div className="mt-[13px] space-y-[10px]">
            <ColorSample
              value={
                brand.primaryColor
              }
            />

            <ColorSample
              value={
                brand.secondaryColor
              }
            />
          </div>
        </div>

        {/* TYPEFACE */}

        <div>
          <p
            className="
              text-[11px]
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
              gap-[14px]
            "
          >
            <span
              className="
                text-[44px]
                leading-none
                text-white/85
              "
              style={{
                fontFamily:
                  brand.fontFamily,
              }}
            >
              Aa
            </span>

            <div>
              <p
                className="
                  text-[14px]
                  text-white/60
                "
              >
                {getFontName(
                  brand.fontFamily
                )}
              </p>

              <p
                className="
                  mt-[2px]
                  text-[12px]
                  text-white/25
                "
              >
                Brand typeface
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------ */
/* COLOR SAMPLE                                     */
/* ------------------------------------------------ */

function ColorSample({
  value,
}: {
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-[11px]
      "
    >
      <div
        className="
          h-[25px]
          w-[25px]
          shrink-0
          rounded-full
          border
          border-white/10
        "
        style={{
          backgroundColor: value,
        }}
      />

      <span
        className="
          font-mono
          text-[12px]
          uppercase
          text-white/45
        "
      >
        {value}
      </span>
    </div>
  );
}

/* ------------------------------------------------ */
/* PARTNERSHIP LOCKUP                               */
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

  if (model === "axb") {
    return (
      <div
        className="
          flex
          items-center
          gap-[16px]
        "
      >
        <CompactLogo
          logoUrl={
            brandALogo
          }
          fallback={
            brandAName
          }
        />

        <span
          className="
            text-[26px]
            text-white/20
            oook-light
          "
        >
          ×
        </span>

        <CompactLogo
          logoUrl={
            brandBLogo
          }
          fallback={
            brandBName
          }
        />
      </div>
    );
  }

  /* A WITH B */

  if (model === "aandb") {
    return (
      <div
        className="
          flex
          items-end
          gap-[26px]
        "
      >
        <LabeledLogo
          label="Immersive experience by"
          logoUrl={
            brandALogo
          }
          fallback={
            brandAName
          }
        />

        <LabeledLogo
          label="In collaboration with"
          logoUrl={
            brandBLogo
          }
          fallback={
            brandBName
          }
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
          w-[250px]
          flex-col
          items-end
        "
      >
        <div className="h-[46px] w-[165px]">
          <BrandLogo
            logoUrl={
              brandBLogo
            }
            fallback={
              brandBName
            }
          />
        </div>

        <div
          className="
            mt-[8px]
            flex
            items-center
            gap-[10px]
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.14em]
              text-white/20
            "
          >
            Powered by
          </span>

          <div className="h-[27px] w-[105px]">
            <BrandLogo
              logoUrl={
                brandALogo
              }
              fallback={
                brandAName
              }
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
        w-[230px]
        flex-col
        items-end
      "
    >
      <div className="h-[32px] w-[125px]">
        <BrandLogo
          logoUrl={
            brandALogo
          }
          fallback={
            brandAName
          }
        />
      </div>

      <p
        className="
          my-[5px]
          text-[9px]
          uppercase
          tracking-[0.16em]
          text-white/20
        "
      >
        Presents
      </p>

      <div className="h-[42px] w-[150px]">
        <BrandLogo
          logoUrl={
            brandBLogo
          }
          fallback={
            brandBName
          }
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* LOGO HELPERS                                     */
/* ------------------------------------------------ */

function CompactLogo({
  logoUrl,
  fallback,
}: {
  logoUrl: string | null;
  fallback: string;
}) {
  return (
    <div className="h-[46px] w-[140px]">
      <BrandLogo
        logoUrl={logoUrl}
        fallback={fallback}
      />
    </div>
  );
}

function LabeledLogo({
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
          mb-[6px]
          text-[9px]
          text-white/20
        "
      >
        {label}
      </p>

      <div className="h-[38px] w-[140px]">
        <BrandLogo
          logoUrl={logoUrl}
          fallback={fallback}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* FONT NAME                                        */
/* ------------------------------------------------ */

function getFontName(
  fontFamily: string
) {
  if (
    fontFamily ===
    "oook-variable"
  ) {
    return "Oook Variable";
  }

  return fontFamily;
}